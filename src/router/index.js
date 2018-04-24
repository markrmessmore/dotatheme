import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import createTheme from '@/components/createTheme'
import login from '@/components/login'
import logout from '@/components/logout'
import editHeroes from '@/components/editHeroes'
import editThemes from '@/components/editThemes'

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
    {
      path: '/signOut',
      component: logout
    },
    {
      path: '/editHeroes',
      component: editHeroes
    },
    {
      path: '/editThemes',
      component: editThemes
    }
  ]
})
