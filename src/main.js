import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as firebase from "./firebase.js"
import {store} from './store/vuex.js'
import Alert from "./components/alert.vue"

Vue.component('app-alert', Alert)
Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.use(Vuetify, { theme: {
  primary: '#3F51B5',
  secondary: '#8987BC',
  accent: '#F0EDFF',
  info: '#6DBAA1'
}});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('getHeroes')
    this.$store.dispatch('getThemes')
  }
})
