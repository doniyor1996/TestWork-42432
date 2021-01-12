import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
    products: {},
    session: false
};

const getters = {
    products: state => state.products,
    session: state => state.session
};

const actions = {
    initStore: ({commit}) => {
        // $axios.get(API_URL + '')
        //     .then((response) =>{
        //         console.log(response.data.products);
        //         commit('SET_STORE', response.data.products )
        //     });
    }
};

const mutations = {
    'SET_STORE'(state, products) {
        state.products = products;
    },
    'SET_SESSION'(state, session) {
        state.session = session;
    }
};

const _store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});


export default _store;
