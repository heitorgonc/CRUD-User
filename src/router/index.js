import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/HomePage'
import HomeUser from '../components/User/HomeUser'
import RegisterUser from '../components/User/RegisterUser'
import ExludeUser from '../components/User/ExcludeUser'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/users',
      component: HomeUser,
      children: [
        {
          path:'register',
          component: RegisterUser
        },
        {
          path:'exclude',
          component: ExludeUser
        }
      ]
    },
  ]
})