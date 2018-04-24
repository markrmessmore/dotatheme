import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    heroes: [],
    themes: []
    //   {
    //     name: "Ice Heroes",
    //     heroes: ["Ancient Apparition", "Crystal Maiden", "Drow Ranger", "Invoker", "Jakiro", "Lich", "Tusk", "Winter Wyvern"],
    //     description: "Heroes with ice as a primary visual theme",
    //     notes: "Won on 12/1. Lost bad on 12/2."
    //   },
    //   {
    //     name: "Hurt from Below",
    //     heroes: [ "Lion", "Earthshaker", "Leshrac", "Nyx Assassin", "Sand King", "Slardar", "Tidehunter"],
    //     description: "Heroes with abilities bursting from the ground",
    //     notes: ""
    //   }
    // ]
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    loadHeroes (state, payload) {
      state.heroes = payload;
    },
    loadThemes (state, payload) {
      state.themes = payload;
    },
    setUser (state, payload) {
      state.user = payload.id;

    },
    signOut (state) {
      state.user = null
    },
    sortThemeHeroes (state) {
      var i;
      var themesToSort = state.themes;
      for (i=0; i<themesToSort.length; i++) {
        themesToSort[i].heroes.sort()
      }
    },
    createNewTheme (state, payload) {
      state.themes.push(payload)
    }
  },
  actions: {
    getThemes({commit}) {
      firebase.database().ref('Themes').once('value')
      .then((data) => {
        const themeInfo = []
        const themeObj = data.val()
        for (let key in themeObj) {
          themeInfo.push({
            id: themeObj[key].id,
            name: themeObj[key].name,
            heroes: themeObj[key].heroes,
            description: themeObj[key].description,
            notes: themeObj[key].notes,
          })
          console.log(themeInfo)
        }
        commit('loadThemes', themeInfo);
      })
      .catch((error) => {

      })
    },
    getHeroes ({commit}){
      firebase.database().ref('Heroes').once('value')
      .then((data) => {
        const heroInfo = [];
        const obj = data.val();
        for (let key in obj) {
          heroInfo.push({
            hero: obj[key].hero,
            aghs: obj[key].characteristics.aghs,
            attribute: obj[key].characteristics.attribute,
            color: obj[key].characteristics.color,
            img: obj[key].characteristics.img,
            passive: obj[key].characteristics.passive
          })
        }
        commit('loadHeroes', heroInfo);
      })
      .catch((error) => {
        console.log(error)
      })
    },
    signOut ({commit}) {
      commit('signOut')
    },
    signIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser);
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error.message)
        }
      )
    },
    sortThemeHeroes(context){
      context.commit('sortThemeHeroes')
    },
    createNewTheme({commit}, payload){
      const userTheme = {
        name: payload.themeName,
        description: payload.themDesc,
        heroes: payload.selectedHeroes,
        notes: ""
      }
      firebase.database().ref('Themes').push(userTheme)
        .then((data) => {
          commit('createNewTheme', userTheme)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    clearError({commit}) {
      commit('clearError')
    }
  },
  getters: {
    getLoading (state) {
      return state.loading
    },
    getErrors (state) {
      return state.error
    },
    getUser (state) {
      return state.user
    },
    getHeroes (state) {
      return state.heroes.sort((heroA, heroB) => {
        return state.heroA > state.heroB
      })
    },
    getThemes (state) {
      return state.themes.sort((themeA, themeB) => {
        return themeA.name > themeB.name
      })
    },
    getStrHeroes (state) {
      return state.heroes.filter(hero => hero.attribute == "Strength").sort(function (heroA, heroB){
        if (heroA.hero < heroB.hero) {
          return -1;
        }
        if (heroA.hero > heroB.hero)
          return 1;
      });
    },
    getAgiHeroes (state) {
      return state.heroes.filter(hero => hero.attribute == "Agility").sort(function (heroA, heroB){
        if (heroA.hero < heroB.hero) {
          return -1;
        }
        if (heroA.hero > heroB.hero)
          return 1;
      });
    },
    getIntHeroes (state) {
       return state.heroes.filter(hero => hero.attribute == "Intelligence").sort(function (heroA, heroB){
         if (heroA.hero < heroB.hero) {
           return -1;
         }
         if (heroA.hero > heroB.hero)
           return 1;
       });
    }
  }
})
