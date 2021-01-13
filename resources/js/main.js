import '../css/app.sass'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import axios, {setToken} from './plugins/axios'
import _store from "./store";

Vue.config.productionTip = false;

window.$axios = axios;

if (_store.getters.access_token)
    setToken(_store.getters.access_token)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
