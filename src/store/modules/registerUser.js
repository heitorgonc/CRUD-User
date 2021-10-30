export default {
    namespaced: true,
    state:{
        user:{
            name: '',
            email:'',
        },
        mesages: [],
    },
    mutations:{
        setUser(state, payload){
            state.user = payload
        },
        setMesages(state, payload){
            state.mesages = payload
        },
        addMesage(state, payload){
            state.mesages.push(payload)
        },
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
            }, 700)
        }
    }
}