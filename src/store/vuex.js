import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    heroes: [],
    themes: [
      {
        name: "Ice Heroes",
        heroes: ["Ancient Apparition", "Crystal Maiden", "Drow Ranger", "Invoker", "Jakiro", "Lich", "Tusk", "Winter Wyvern"],
        description: "Heroes with ice as a primary visual theme",
        notes: "Won on 12/1. Lost bad on 12/2."
      },
      {
        name: "Hurt from Below",
        heroes: [ "Lion", "Earthshaker", "Leshrac", "Nyx Assassin", "Sand King", "Slardar", "Tidehunter"],
        description: "Heroes with abilities bursting from the ground",
        notes: ""
      }
    ]
  },
  mutations: {
    addHero (state, payload) {
      state.heroes.push(payload);
    },
    setUser (state, payload) {
      state.user = payload.id;
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
    getHeroes ({commit}){
      console.log("Getting Heroes");
      var dbHeroes = firebase.database().ref('Heroes/')
      dbHeroes.orderByChild("hero").on("child_added", function(data) {
        var heroInfo = {
          hero: data.val().hero,
          characteristics: {
            aghs: data.val().characteristics.aghs,
            attribute: data.val().characteristics.attribute,
            color: data.val().characteristics.color,
            img: data.val().characteristics.img,
            passive: data.val().characteristics.passive
          }
        }
        commit('addHero', heroInfo);
      });

    },
    signIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.id
          }
          commit('setUser', newUser);
        }
      )
      .catch(
        error => {
          console.log(error);
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
    createNewHero(state) {
      var i;
      // for (i=0; i<this.state.heroes.length; i++) {
      //   firebase.firestore().collection('heroes').doc(this.state.heroes[i].hero)
      //   .then(function(res){
      //     console.log("Hero created. Document reference:" + res);
      //   })
      //   .catch(function(res){
      //     console.error("Error adding document: " + error);
      //   })
      // }
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getHeroes (state) {
      this.$store.dispatch('getHeroes');
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
      return state.heroes.filter(hero => hero.characteristics.attribute == "Strength").sort(function (heroA, heroB){
        if (heroA.hero < heroB.hero) {
          return -1;
        }
        if (heroA.hero > heroB.hero)
          return 1;
      });
    },
    getAgiHeroes (state) {
      return state.heroes.filter(hero => hero.characteristics.attribute == "Agility").sort(function (heroA, heroB){
        if (heroA.hero < heroB.hero) {
          return -1;
        }
        if (heroA.hero > heroB.hero)
          return 1;
      });
    },
    getIntHeroes (state) {
       return state.heroes.filter(hero => hero.characteristics.attribute == "Intelligence").sort(function (heroA, heroB){
         if (heroA.hero < heroB.hero) {
           return -1;
         }
         if (heroA.hero > heroB.hero)
           return 1;
       });
    }
  }
})
