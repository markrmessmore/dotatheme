import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import createTheme from '@/components/createTheme'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/createTheme',
      component: createTheme
    },
  ]
})
