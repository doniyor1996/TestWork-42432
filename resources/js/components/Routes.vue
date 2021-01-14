<template>
    <div class="container col-md-3">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-3 font-weight-normal">Маршруты</h5>
            </div>

            <div class="card-body">
                <form class="d-md-flex mb-4 align-items-center" id="route-form" @submit.prevent="formAction">
                    <input class="form-control" type="text" v-model="routeName" placeholder="Название маршрута"
                           required>
                    <div class="ml-2">
                        <button class="btn btn-primary">
                            {{ edit_id ? 'Сохранить' : 'Добавить' }}
                        </button>
                        <button v-if="edit_id" @click.prevent="_editRouteToggle({id:edit_id})" class="btn btn-light mt-2">
                            Отменить
                        </button>
                    </div>
                </form>
                <div v-if="success" class="alert alert-success" role="alert">
                    {{success}}
                </div>
                <div v-else-if="error" class="alert alert-danger" role="alert">
                    {{error}}
                </div>
                <template v-if="loading">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </template>
                <template v-else>
                    <ul v-if="routes.length" class="routes">
                        <li v-for="route in routes" class="d-flex justify-content-between border-bottom">
                            <span>{{ route.name }}</span>
                            <div class="d-flex">
                                <div class="route-action mr-2" @click="_editRouteToggle(route)">
                                    &#9998;
                                </div>
                                <div class="route-action" @click="_deleteRoute(route.id)">
                                    ❌
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div v-else>
                        У вас нет ни одного маршрута
                    </div>
                </template>
                <div v-if="totalPages > 1">
                    <nav aria-label="...">
                        <ul class="pagination">
                            <li :class="'page-item' + (page === 1 ? ' disabled' : '')">
                                <router-link class="page-link"
                                             :disabled="page === 1"
                                             tabindex="-1"
                                             :to="'/routes' + (page > 1 ? '/' + (page - 1) : '')">
                                    Пред.
                                </router-link>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">{{page}}</a>
                            </li>
                            <li :class="'page-item' + (page >= totalPages ? ' disabled' : '')">
                                <router-link
                                    :disabled="page >= totalPages"
                                    class="page-link" :to="'/routes/' + (page + 1)">След.</router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
    mounted() {
        this.page = this.$route.params.page > 0 ? this.$route.params.page * 1 : 1;
        this.setCurrentPage(this.page);
        this.getRoutes();
    },
    data() {
        return {
            edit_id: false,
            error: false,
            success: false,
            routeName: '',
            page: ''
        }
    },
    computed: {
        ...mapGetters([
            'routes',
            'totalPages',
            'loading'
        ])
    },
    methods: {
        ...mapActions([
            'getRoutes',
            'createRoute',
            'updateRoute',
            'deleteRoute',
            'setCurrentPage'
        ]),
        addSuccessMessage(message) {
            this.success = message;
            setTimeout(() => {
                this.success = '';
            }, 5000)
        },
        addErrorMessage(message) {
            this.error = message;
            setTimeout(() => {
                this.error = false;
            }, 3000)
        },
        formAction() {
            if (this.edit_id)
                this._updateRoute()
            else
                this._createRoute();
        },
        _createRoute() {
            this.createRoute({name: this.routeName}).then(res => {
                if (res) {
                    this.routeName = '';
                    this.addSuccessMessage('Маршрут успешно создан');
                } else
                    this.addErrorMessage('Ошибка при создании маршрута');
            });
        },
        _editRouteToggle(route) {
            if (this.edit_id === route.id) {
                this.edit_id = '';
                this.routeName = '';
            } else {
                this.edit_id = route.id;
                this.routeName = route.name;
            }
        },
        _updateRoute() {
            this.updateRoute({id: this.edit_id, name: this.routeName}).then(res => {
                if (res) {
                    this.addSuccessMessage('Маршрут обновлён')
                    this.edit_id = '';
                    this.routeName = '';
                } else
                    this.addErrorMessage('Ошибка при обновлении');
            })
        },
        _deleteRoute(id) {
            if (confirm('Удалить маршрут?'))
                this.deleteRoute({id}).then(res => {
                    res ?
                        this.addSuccessMessage('Маршрут удалён')
                        : this.addErrorMessage('Ошибка при удалении');
                });
        },
    }
}
</script>

<style lang="sass" scoped>
#route-form .btn
    width: 100%

.routes
    list-style: none
    padding: 0

.route-action
    cursor: pointer

</style>
