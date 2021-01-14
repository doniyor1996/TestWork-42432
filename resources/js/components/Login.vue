<template>
    <div class="container col-md-3">
        <form class="form-signin" @submit.prevent="_login">
            <h1 class="h3 mb-3 font-weight-normal">Пожалуйста войдите</h1>
            <div v-if="error" class="alert alert-danger" role="alert">
                {{error}}
            </div>
            <label for="inputEmail" class="sr-only">Логин</label>
            <input type="email" id="inputEmail" class="form-control"
                   v-model.lazy="email"
                   placeholder="Логин"
                   required
                   autofocus>
            <label for="inputPassword"
                   class="sr-only">Пароль</label>
            <input type="password" id="inputPassword" class="form-control"
                   v-model.lazy="password"
                   placeholder="Пароль"
                   required>
            <div class="d-flex justify-content-between">
                <button class="btn btn-lg btn-primary btn-block mt-3"
                        type="submit">Войти
                </button>
                <button class="btn btn-lg btn-block mt-3"
                        @click.prevent="gotoRegister"
                        type="submit">Зарегистрироваться
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: false
        }
    },
    mounted() {
    },
    computed: {
        ...mapGetters([
            'is_authorised'
        ])
    },
    methods: {
        ...mapActions([
            'login'
        ]),
        _login() {
            this.error = false;
            let data = {
                email: this.email,
                password: this.password
            }
            this.login(data).then(res => {
                if (res)
                    this.$router.push({name: 'home'});
                else
                    this.error = 'Неправильный логин или пароль';
            })
        },
        gotoRegister() {
            this.$router.push({name: 'register'});
        }
    }
}
</script>
