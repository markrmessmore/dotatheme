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
                  <h3 class="title">Create a New Theme:</h3>
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
                  <v-checkbox v-for="hero in strHeroes" :key="hero.hero" :label="hero.hero" :value="hero.hero" v-model="selectedHeroes">
                  </v-checkbox>
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
                  <v-checkbox v-for="hero in agiHeroes" :key="hero.hero" :label="hero.hero" :value="hero.hero" v-model="selectedHeroes">
                  </v-checkbox>
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
                  <v-checkbox v-for="hero in intHeroes" :key="hero.hero" :label="hero.hero" :value="hero.hero" v-model="selectedHeroes">
                  </v-checkbox>
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
                <v-btn large class="indigo white--text" @click="clearForm">Reset Form</v-btn>
                <v-btn large class="indigo white--text" @click="submitTheme" :disabled="!validateTheme" :loading="loading">
                  Create Theme
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
  data() {
    return {
      themeName: "",
      themeDesc: "",
      themeNotes: "",
      selectedHeroes: [],
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
    getThemes () {
      return this.$store.getters.getThemes
    },
    validateTheme () {
      return this.themeName != "" && this.themeDesc !== "" && this.selectedHeroes.length >= 5
    },
    loading () {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    getHeroByAtt () {
      this.strHeroes  = this.$store.getters.getStrHeroes;
      this.agiHeroes   = this.$store.getters.getAgiHeroes;
      this.intHeroes  = this.$store.getters.getIntHeroes;
    },
    clearForm () {
      this.themeName = '',
      this.themeDesc = '',
      this.selectedHeroes = null
    },
    submitTheme () {
      const themeInfo = {
        themeName: this.themeName,
        themDesc: this.themeDesc,
        selectedHeroes: this.selectedHeroes,
        themeNotes: this.themeNotes
      }
      this.$store.dispatch('createNewTheme', themeInfo);
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
