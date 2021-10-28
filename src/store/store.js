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
    // getters: {
    //     user(state){
    //         return state.user
    //     },
    //     mesages(state){
    //         return state.mesages
    //     },
    //     users(state){
    //         return state.user
    //     },
    //     id(state){
    //         return state.id
    //     }
    // },
    mutations:{
        setMesages(state, payload){
            state.mesages = payload
        },
        setUser(state, payload){
            state.user = payload
        },
        addMesage(state, payload){
            state.mesages.push(payload)
        },
        setUsers(state, payload){
            state.users = payload
        },
        setId(state, payload){
            state.id = payload
        }
    },
    actions: {
        newMesageForm(context, payload){
            setTimeout(() => {
                context.commit('addMesage', payload)
            }, 200)
        },
        clearForm(context, payload){
            setTimeout(() => {
                context.commit('setUser', payload.user)
                context.commit('setMesages', payload.mesages)
                // context.commit('setId', payload.id)
                // context.commit('setUsers', payload.users)
            }, 700)
        }
    }
})