import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import createTheme from '@/components/createTheme'
import login from '@/components/login'
import logout from '@/components/logout'
import editHeroes from '@/components/editHeroes'
import editTheme from '@/components/editTheme'
import manageThemes from '@/components/manageThemes'
import AuthGuard from './authguard.js'
import about from '@/components/about'

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
      path: '/about',
      component: about
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
      name: 'editHeroes',
      component: editHeroes,
      beforeEnter: AuthGuard
    },
    {
      path: '/editTheme/:id',
      component: editTheme,
      name: 'editTheme',
      beforeEnter: AuthGuard,
      props: true
    },
    {
      path: '/manageThemes',
      component: manageThemes,
      props: true,
      beforeEnter: AuthGuard
    }
  ]
})
