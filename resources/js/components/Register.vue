<template>
    <div class="container col-md-3">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h1 class="h3 mb-3 font-weight-normal">Регистрация нового пользователя</h1>
                <template v-for="error in errors">
                    <div class="alert alert-danger" role="alert">
                        {{ error }}
                    </div>
                </template>
                <div v-if="success" class="alert alert-success" role="alert">
                    Вы успешно зарегистрированы, чтобы авторизоваться перейдите по <router-link to="/login">ссылке</router-link>
                </div>
            </div>
            <div class="panel-body">
                <form role="form" @submit.prevent="_register">
                    <div class="form-group">
                        <input type="text" name="name" class="form-control input-sm"
                               v-model.lazy="name"
                               placeholder="Введите ваше имя"
                               required
                        >
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" id="email" class="form-control input-sm"
                               v-model.lazy="email"
                               placeholder="Введите email"
                               required
                        >
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6">
                            <div class="form-group">
                                <input type="password" name="password"
                                       id="password"
                                       class="form-control input-sm"
                                       v-model.lazy="password"
                                       placeholder="Пароль"
                                       required
                                >
                            </div>
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6">
                            <div class="form-group">
                                <input type="password" name="password_confirmation"
                                       id="password_confirmation"
                                       class="form-control input-sm"
                                       v-model.lazy="password_confirmation"
                                       placeholder="Подтверждение пароля"
                                       required
                                >
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Зарегистрироваться" class="btn btn-primary btn-block">
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
    mounted() {
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: [],
            success: false
        }
    },
    computed: {},
    methods: {
        ...mapActions([
            'register'
        ]),
        _register() {
            this.register({
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            }).then(({result, message}) => {
                if (result)
                    this.success = message;
                else
                    this.errors = message
            });
        }
    }
}
</script>
