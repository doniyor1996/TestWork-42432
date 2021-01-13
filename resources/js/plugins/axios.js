import axios from 'axios'
import {BASE_URL} from "../config";

let config = {
	timeout: 15 * 1000, // Timeout
	withCredentials: true, // Check cross-site Access-Control
    baseURL: BASE_URL
};

const _axios = axios.create(config);

export const setToken = (token) => {
    _axios.defaults.headers.Authorization = 'Bearer ' + token
}

_axios.get('/sanctum/csrf-cookie');


export default _axios;
