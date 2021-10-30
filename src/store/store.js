import Vue from 'vue'
import Vuex from 'vuex'
import register from './modules/registerUser'
import exclude from './modules/excludeUser'
import edit from './modules/editUser'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {register, exclude, edit}
})