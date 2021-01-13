import {setToken} from "../../plugins/axios";

export default {
    state: {
        is_authorised: false,
        access_token: '',
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
            state.is_authorised = false
        }
    },
    getters: {
        is_authorised: state => state.is_authorised,
        access_token: state => state.access_token,
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
            setToken('');
        },
        register: async ({commit}, {name, email, password, password_confirmation}) => {
            let response = await $axios.post('register', {name, email, password, password_confirmation});
            if (response.data.error)
                return {message: response.data.error};
            else
                return {result: true, message: 'Вы успешно зарегистрировались!'}
        },
    }
}
