import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'bootstrap'
import Login from './components/Login.vue'
import User from './components/User.vue'
import Classifica from './components/Classifica.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [{
      path: '/user',
      component: User
    },{
      path: '/user/:legaID/:campionatoID',
      component: Classifica
    },{
      path: '',
      component: Login
    }
] 

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
