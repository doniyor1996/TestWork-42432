<template>
    <div class="container col-md-3">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-3 font-weight-normal">Маршруты</h5>
            </div>

            <div class="card-body">
                <form class="d-md-flex mb-4" @submit.prevent="formAction">
                    <input class="form-control" type="text" v-model="routeName" placeholder="Название маршрута"
                           required>
                    <button class="btn btn-primary ml-2">
                        {{ edit_id ? 'Сохранить' : 'Добавить' }}
                    </button>
                </form>
                <div v-if="success" class="alert alert-success" role="alert">
                    {{success}}
                </div>
                <div v-else-if="error" class="alert alert-danger" role="alert">
                    {{error}}
                </div>
                <ul v-if="routes.length" class="routes">
                    <li v-for="route in routes" class="d-flex justify-content-between border-bottom">
                        <span>{{ route.name }}</span>
                        <div class="d-flex">
                            <div class="route-action mr-2" @click="_editRoute(route)">
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
            </div>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
    mounted() {
        this.getRoutes();
    },
    data() {
        return {
            edit_id: false,
            error: false,
            success: false,
            routeName: ''
        }
    },
    computed: {
        ...mapGetters([
            'routes'
        ])
    },
    methods: {
        ...mapActions([
            'getRoutes',
            'createRoute',
            'updateRoute',
            'deleteRoute'
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
        _editRoute(route) {
            this.edit_id = route.id;
            this.routeName = route.name;
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
.routes
    list-style: none
    padding: 0

.route-action
    cursor: pointer

</style>
