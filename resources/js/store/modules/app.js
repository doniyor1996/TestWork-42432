import {setToken} from "../../plugins/axios";

export default {
    state: {
        is_authorised: false,
        access_token: '',
        routes: [],
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 5,
        loading: false
    },
    getters: {
        is_authorised: state => state.is_authorised,
        access_token: state => state.access_token,
        routes: state => state.routes,
        currentPage: state => state.currentPage,
        totalPages: state => state.totalPages,
        itemsPerPage: state => state.itemsPerPage,
        loading: state => state.loading
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
        },
        'SET_ITEMS_PER_PAGE'(state, number) {
            state.itemsPerPage = number;
        },
        'SET_TOTAL_PAGES'(state, number) {
            state.totalPages = number;
        },
        'SET_CURRENT_PAGE'(state, number) {
            state.currentPage = number;
        },
        'SET_LOADING'(state, bool) {
            state.loading = !!bool;
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
            commit('SET_ROUTES', []);
        },
        setCurrentPage({commit, dispatch}, number) {
            commit('SET_CURRENT_PAGE', number);
        },
        setItemsPerPage({commit, dispatch}, number) {
            commit('SET_ITEMS_PER_PAGE', number);
            dispatch('getRoutes');
        },
        register: async ({commit}, {name, email, password, password_confirmation}) => {
            let response = await $axios.post('register', {name, email, password, password_confirmation});
            if (response.data.error)
                return {message: response.data.error};
            else
                return {result: true, message: 'Вы успешно зарегистрировались!'}
        },
        getRoutes: ({commit, state}) => {
            commit('SET_LOADING', true);
            let start = state.itemsPerPage * state.currentPage - state.itemsPerPage;
            $axios.get('routes?start=' + start + '&limit=' + state.itemsPerPage).then(response => {
                commit('SET_ROUTES', response.data.routes);
                commit('SET_LOADING', false);
                commit('SET_TOTAL_PAGES', Math.ceil(response.data.totalItems / state.itemsPerPage));
            });
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
