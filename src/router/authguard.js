import {store} from '../store/vuex.js'
export default (to, from, next) => {
  if (store.getters.getUser) {
    next()
  }
  else {
    next('/login')
  }
}
