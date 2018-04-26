<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <br>
              <v-card class="indigo elevation-5 white--text">
                <v-card-text>
                  <h3 class="title">Editing Theme: {{themeName}}</h3>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <form>
            <v-layout row>
              <v-flex xs10 offset-xs1>
                <v-text-field
                  name="themeName"
                  label="Theme Name"
                  id="themeName"
                  v-model="themeName"
                  type="text"
                  required
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs10 offset-xs1>
                <v-text-field
                  name="themeDesc"
                  label="Theme Description"
                  id="themDesc"
                  v-model="themeDesc"
                  type="text"
                  required
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs10 offset-xs1>
                <v-text-field
                  name="themeNotes"
                  label="Theme Notes"
                  id="themeNotes"
                  v-model="themeNotes"
                  placeholder="Make notes about the theme, certain hero cosmetics, etc."
                  multi-line
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm3 offset-sm1>
                <v-card>
                  <div  class="text-xs-center">
                    <v-icon left color="red" large>far fa-hand-rock</v-icon>
                    <h4 class="title">Strength Heroes</h4>
                  </div>
                  <br>
                  <hr>
                  <v-checkbox v-for="(hero, index) in strHeroes" :key="hero.index" :label="hero.hero" :value="hero.hero" v-model="selectedHeroes"></v-checkbox>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4>
                <v-card>
                  <div  class="text-xs-center">
                    <v-icon left color="green" large>fab fa-google-wallet</v-icon>
                    <h4 class="title">Agility Heroes</h4>
                  </div>
                  <br>
                  <hr>
                  <v-checkbox v-for="hero in agiHeroes" :key="hero.hero" :label="hero.hero" :value="hero.hero" v-model="selectedHeroes"></v-checkbox>
                </v-card>
              </v-flex>
              <v-flex xs12 sm3>
                <v-card>
                  <div  class="text-xs-center">
                    <v-icon left color="blue" large>fas fa-magic</v-icon>
                    <h4 class="title">Int Heroes</h4>
                  </div>
                  <br>
                  <hr>
                  <v-checkbox v-for="hero in intHeroes" :key="hero.hero" :label="hero.hero" :value="hero.hero" v-model="selectedHeroes"></v-checkbox>
                </v-card>
              </v-flex>
            </v-layout>
            <br>
            <hr>
            <br>
            <v-container>
              <v-alert type ="error" :value="true">
                ***Themes must have a <b>NAME</b>, <b>DESCRIPTION</b> and a <b>MINIMUM</b> of <b>FIVE</b> heroes selected to be submitted.
              </v-alert>
            </v-container>
            <v-layout>
              <v-flex xs8 offset-xs2 class="text-xs-center">
                <v-btn large class="red darken-4 white--text" router-link :to="{path: '/manageThemes'}">Cancel Changes</v-btn>
                <v-btn large class="indigo white--text" @click="updateTheme" :disabled="!validateTheme" :loading="loading">
                  Update Theme
                  <span slot="loader" class="custom-loader">
                    <v-icon dark>cached</v-icon>
                  </span>
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    id: "",
    themeName: "",
    themeDesc: "",
    themeNotes: "",
    selectedHeroes: []
  },
  data() {
    return {
      strHeroes: [],
      agiHeroes: [],
      intHeroes: []
    }
  },
  created: function () {
    this.getHeroByAtt();
  },
  watch: {
    getThemes (value) {
      location.replace('/')
    }
  },
  computed: {
    validateTheme () {
      return this.themeName != "" && this.themeDesc !== "" && this.selectedHeroes.length >= 5
    },
    loading () {
      return this.$store.getters.getLoading
    },
    getThemes () {
      return this.$store.getters.getThemes
    }
  },
  methods: {
    getHeroByAtt () {
      this.strHeroes  = this.$store.getters.getStrHeroes;
      this.agiHeroes   = this.$store.getters.getAgiHeroes;
      this.intHeroes  = this.$store.getters.getIntHeroes;
    },
    updateTheme () {
      const editedTheme = {
          themeName: this.themeName,
          themeDesc: this.themeDesc,
          selectedHeroes: this.selectedHeroes,
          themeNotes: this.themeNotes,
          themeId: this.id
      }
      this.$store.dispatch('updateTheme', editedTheme)
    }
  }
}
</script>

<style lang="css">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
