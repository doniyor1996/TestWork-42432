import '../css/app.sass'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import axios from './plugins/axios'

Vue.config.productionTip = false;

window.$axios = axios;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
