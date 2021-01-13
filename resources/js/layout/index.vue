<template>
    <div id="layout">
        <nav class="navbar navbar-light navbar-expand-md" style="background-color: #e3f2fd;">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand">TestWork 42432</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarsExample04">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item active">
                            <router-link class="nav-link" to="/">Главная</router-link>
                        </li>
                        <li class="nav-item active">
                            <router-link class="nav-link" to="/routes">Маршруты</router-link>
                        </li>
                    </ul>
                    <button class="btn btn-primary" v-if="is_authorised" @click="_logout">Выйти</button>
                    <div v-else>
                        <router-link class="btn btn-primary mr-3" to="/login">Войти</router-link>
                        <router-link class="btn btn-dark" to="/register">Зарегистрироваться</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <router-view :key="route" style="padding: 1rem;"/>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    name: "layout",
    computed: {
        ...mapGetters([
            'is_authorised'
        ]),
        route() {
            return this.$route.path;
        }
    },
    methods: {
        ...mapActions(['logout']),
        _logout() {
            this.logout();
            this.$router.push({name : 'login'});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
