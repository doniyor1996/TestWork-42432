import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app from "./modules/app";

Vue.use(Vuex);

const _store = new Vuex.Store({
    modules:{
        app
    },
    plugins: [createPersistedState()]
});

export default _store;
