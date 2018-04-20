import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    heroes: [
      {
        name: "Witch Doctor",
        attribute: "Intelligence",
        aghs: true,
        color: "Purple",
        img: "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/3/33/Witch_Doctor_icon.png?version=47cfe2ee65a45d5356dce201089cdbbd",
        skills: ["Paralyzing Cask", "Voodoo Restoration", "Maledict", "Death Ward"]
      },
      {
        name: "Abaddon",
        attribute: "Strength",
        aghs: true,
        color: "Black",
        img: "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/2/26/Abaddon_icon.png?version=b115fcf61682dc67860ce75bf90c950e",
        skills: ["Mist Coil", "Aphotic Shield", "Curse of Avernus", "Borrowed Time"]
      },
      {
        name: "Monkey King",
        attribute: "Agility",
        aghs: false,
        color: "Brown",
        img: "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/7/7b/Monkey_King_icon.png?version=f248a4549ebe79593fb663f7a49f1a04",
        skills: ["Boundless Strike", "Tree Dance", "Primal Spring", "Jingu Mastery", "Mischief", "Wokong's Command"]
      },
    ],
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
    sortThemeHeroes (state) {
      var i;
      var themesToSort = state.themes;
      for (i=0; i<themesToSort.length; i++) {
        themesToSort[i].heroes.sort()
      }
    }
  },
  actions: {
    sortThemeHeroes(context){
      context.commit('sortThemeHeroes')
    }
  },
  getters: {
    getHeroes (state) {
      return state.heroes.sort((heroA, heroB) => {
        return state.heroA > state.heroB
      })
    },
    getThemes (state) {
      return state.themes.sort((themeA, themeB) => {
        return themeA.name > themeB.name
      })
    }
  }
})
