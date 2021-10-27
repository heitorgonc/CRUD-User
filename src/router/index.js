import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HomePage = () => import('../components/HomePage')
const User = () => import('../components/User/User')
const HomeUser = () => import('../components/User/HomeUser')
const RegisterUser = () => import('../components/User/RegisterUser')
const EditUser = () => import('../components/User/EditUser')
const ExcludeUser = () => import('../components/User/ExcludeUser')

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
        return savedPosition
    } else if(to.hash) {
        return { selector: to.hash }
    } else{
        return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/users',
      component: User,
      children: [
        {
          path:'',
          component: HomeUser
        },
        {
          path:'register',
          component: RegisterUser
        },
        {
          path: 'edit',
          component: EditUser
        },
        {
          path:'exclude',
          component: ExcludeUser
        },
        {
          path: '*',
          redirect: '/'
        }
      ]
    },
  ]
})