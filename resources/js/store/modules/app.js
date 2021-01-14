import {setToken} from "../../plugins/axios";

export default {
    state: {
        is_authorised: false,
        access_token: '',
        routes: []
    },
    getters: {
        is_authorised: state => state.is_authorised,
        access_token: state => state.access_token,
        routes: state => state.routes,
    },
    mutations: {
        'SET_STORE'(state, products) {
            state.products = products;
        },
        'SET_SESSION'(state, session) {
            state.session = session;
        },
        'LOG_IN'(state, token) {
            state.is_authorised = true;
            state.access_token = token;
        },
        'LOG_OUT'(state) {
            $axios.get('logout').then(resp => {
                state.is_authorised = false
                setToken('');
            });
        },
        'SET_ROUTES'(state, routes) {
            state.routes = routes;
        }
    },
    actions: {
        login: async ({commit}, {email, password}) => {
            let response = await $axios.post('login', {email, password});
            if (response.data.status_code === 200 && response.data.access_token) {
                commit('LOG_IN', response.data.access_token);
                setToken(response.data.access_token);
                return true;
            }
            return false;
        },
        logout: ({commit}) => {
            commit('LOG_OUT');
        },
        register: async ({commit}, {name, email, password, password_confirmation}) => {
            let response = await $axios.post('register', {name, email, password, password_confirmation});
            if (response.data.error)
                return {message: response.data.error};
            else
                return {result: true, message: 'Вы успешно зарегистрировались!'}
        },
        getRoutes: ({commit}) => {
            $axios.get('routes').then(response => {
                commit('SET_ROUTES', response.data.routes)
            })
        },
        createRoute: async ({commit, dispatch}, {name}) => {
            let response = await $axios.post('route/add', {name});
            let res = response.data.status_code === 200;
            if (res) {
                dispatch('getRoutes');
            }
            return response.data.status_code === 200;
        },
        updateRoute: async ({commit, dispatch}, {id, name}) => {
            let response = await $axios.post('route/update/'+id, {name});
            let res = response.data.status_code === 200;
            if (res) {
                dispatch('getRoutes');
            }
            return response.data.status_code === 200;
        },
        deleteRoute: async ({commit, dispatch}, {id}) => {
            let response = await $axios.get('route/delete/'+id);
            let res = response.data.status_code === 200;
            if (res) {
                dispatch('getRoutes');
            }
            return response.data.status_code === 200;
        },
    }
}
