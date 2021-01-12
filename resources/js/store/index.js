import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const state = {
    products: {},
    is_authorised: false
};

const getters = {
    products: state => state.products,
    is_authorised: state => state.is_authorised
};

const actions = {
    login: ({commit}) => {
        commit('LOG_IN');
        // $axios.get(API_URL + '')
        //     .then((response) =>{
        //         console.log(response.data.products);
        //     });
    }
};

const mutations = {
    'SET_STORE'(state, products) {
        state.products = products;
    },
    'SET_SESSION'(state, session) {
        state.session = session;
    },
    'LOG_IN'() {
        state.is_authorised = true;
    }
};

const _store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [createPersistedState()]
});

export default _store;
