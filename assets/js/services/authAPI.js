import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {LOGIN_API} from "../config";
// import customersAPI from "./customersAPI";

// let token;

/**
 * Disconnection (manage token deletion in localStorage and axios default params
 */
function logout() {
    // document.cookie = `authToken = ; HttpOnly`;
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers['Authorization']
    // customersAPI.findAll().then(data => console.log(data))
}

/**
 * Generate user authentication token (store it in localStorage and in axios default params
 * @param credentials
 * @returns {Promise<boolean>}
 */
function authenticate(credentials) {
    return axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            // document.cookie = `authToken = ${token}; HttpOnly`;
            window.localStorage.setItem('authToken', token)
            setAxiosToken(token)
            // customersAPI.findAll().then(data => console.log(data))
            return true;
        })
}

/**
 * Set token in axios default params once Authenticated
 * @param token
 */
function setAxiosToken(token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
}

/**
 * Set the token at application loading automatically
 */
function setup() {
    // const geToken = () => {
    //     const name = "authToken=";
    //     const decodedCookie = decodeURIComponent(document.cookie);
    //     console.log(decodedCookie)
    //     const ca = decodedCookie.split(';');
    //     for(let i = 0; i <ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    // }
    // const token = geToken()

    const token = window.localStorage.getItem('authToken')
    // console.log( 'token ' + token)
    if(token) {
        // alias the destructuring exp and alias it
        const {exp: expiration} = jwtDecode(token)
        // console.log(jwtData)
        // console.log(jwtData.exp * 1000,  new Date().getTime())
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
            // console.log( 'connection established with axios')
        }
    }
}

/**
 * Check if user is authenticated ( check token expiration date and if it exists)
 * @returns {boolean}
 */
function isAuthenticated() {
    const token = window.localStorage.getItem('authToken')
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        return expiration * 1000 > new Date().getTime();
    }
    return false
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};
