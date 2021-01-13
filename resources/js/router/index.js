import Vue from 'vue'
import Router from 'vue-router'
import _store from "../store";

Vue.use(Router);

const _router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                default: () => import('../components/Main')
            },
            meta: {
                needAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            components: {
                default: () => import('../components/Login')
            }
        },
        {
            path: '/register',
            name: 'register',
            components: {
                default: () => import('../components/Register')
            }
        },
    ]
});

_router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.needAuth)) {
        if (_store.getters.is_authorised)
            next()
        else next('/login')
    } else {
        next()
    }
})

export default _router;
