export default {
    state: {
        is_authorised: false
    },
    mutations: {
        'SET_STORE'(state, products) {
            state.products = products;
        },
        'SET_SESSION'(state, session) {
            state.session = session;
        },
        'LOG_IN'(state) {
            state.is_authorised = true
        },
        'LOG_OUT'(state) {
            state.is_authorised = false
        }
    },
    getters: {
        is_authorised: state => state.is_authorised
    },
    actions: {
        login: ({commit}) => {
            commit('LOG_IN');
            // $axios.get(API_URL + '')
            //     .then((response) =>{
            //     });
        },
        logout: ({commit}) => {
            commit('LOG_OUT');
            // $axios.get(API_URL + '')
            //     .then((response) =>{
            //     });
        }
    }
}
