import Vue from 'vue'
import App from './App.vue'
import './style.css'
import './plugins/axios'
import './plugins/bootstrap-vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
