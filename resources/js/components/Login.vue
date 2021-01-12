<template>
    <div class="container">
        <router-link to="/">back</router-link>
        <button @click="login">login</button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    mounted() {
        console.log(this.is_authorised);
    },
    data() {
        return {}
    },
    computed:{
        ...mapGetters([
            'is_authorised'
        ])
    },
    methods:{
        ...mapActions([
            'login'
        ])
    }
}
</script>
