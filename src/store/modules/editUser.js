export default {
    namespaced: true,
    state:{
        users: [],
        user:{
            name: '',
            email:'',
        },
        id: null,
        mesages: [],
    },
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
                context.commit('setMesages', payload.mesages)
                context.commit('setUser', payload.user)
                context.commit('setId', payload.id)
            }, 700)
        }
    }
}