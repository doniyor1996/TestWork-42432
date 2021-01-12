import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const _router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                default: () => import('../components/ExampleComponent')
            }
        },
    ]
});

export default _router;
