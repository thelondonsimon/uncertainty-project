import Vue from 'vue'
import { BootstrapVue, BIcon, BIconXCircleFill, BIconCheckCircle } from 'bootstrap-vue'
import App from './App.vue'
import './scss/main.scss'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.component('BIconXCircleFill', BIconXCircleFill)
Vue.component('BIconCheckCircle', BIconCheckCircle)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
