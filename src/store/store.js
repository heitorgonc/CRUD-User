import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        users: [],
        id: null,
        user:{
            name: '',
            email:'',
        },
        mesages: [],
    },
    getters: {
        
    },
    mutations:{
        clear(state, payload){
            state.user = payload.user
            state.mesages = payload.mesages
            state.id = payload.id
        },
        successMesage(state, payload){
            state.mesages.push(payload)
        },
        faliedMesage(state, payload){
            state.mesages.push(payload)
        },
        setUsers(state, payload){
            state.users = payload
        },
        setUser(state, payload){
            state.user = payload
        },
        setId(state, payload){
            state.id = payload
        }
    }
})