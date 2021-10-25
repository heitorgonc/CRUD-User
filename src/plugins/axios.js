import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://project01-d62a2-default-rtdb.firebaseio.com/',
            headers:{
                "Authorization":"007"
            }
        })

        Vue.prototype.$http.interceptors.request.use(config =>{
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res => {
            return res
        }, error => Promise.reject(error))
    }
})