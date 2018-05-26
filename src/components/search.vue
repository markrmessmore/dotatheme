<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card class="elevation-5">
          <v-container>
            <v-layout row>
              <v-flex xs12>
                <v-card-title>
                  <h3 class="title">Search by any variations of criteria:</h3>
                </v-card-title>
              </v-flex>
            </v-layout>
            <br>
            <v-layout row>
              <v-flex xs6>
                <v-card class="elevation-5">
                  <v-card-title>
                    <h3 class="subheading">Search by theme name/description:</h3>
                  </v-card-title>
                  <v-container>
                    <v-text-field
                    v-model="searchName"
                    label="Name:"
                    @blur="enableSearch"
                    ></v-text-field>
                  </v-container>
                </v-card>
              </v-flex>
              <v-flex xs6>
                <v-card class="elevation-5">
                  <v-card-title>
                    <h3 class="subheading">Number of theme heroes:</h3>
                  </v-card-title>
                  <v-container>
                    <v-layout row>
                      <v-flex xs5>
                        <v-text-field
                          v-model="heroMin"
                          label="Min:"
                          @blur="enableSearch"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs5 offset-xs1>
                        <v-text-field
                          v-model="heroMax"
                          label="Max:"
                          @blur="enableSearch"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-card class="elevation-5">
                  <v-card-title>
                    <h3 class="title">Search by heroes:</h3>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    <h4 class="subheading">*Searching by hero will return EVERY theme that has ANY of the selected heroes.</h4>
                    <v-container fluid grid-list-xs>
                      <v-layout row wrap>
                        <v-flex xs3 v-for="hero in getHeroes" :key="hero.hero">
                          <v-card tile ripple raised color="indigo" dark>
                            <v-card-text>
                              <input
                                type="checkbox"
                                v-model="searchHeroes"
                                :value="hero.hero"
                                @click="enableSearch"
                              >
                              <v-spacer></v-spacer>
                                {{hero.hero}}
                              </input>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container>
            <v-layout row wrap>
              <v-flex xs6 offset-xs3>
                <v-btn color="indigo" dark class="elevation-5" @click="resetSearch">Reset the Search</v-btn>
                <v-btn
                  class="elevation-5"
                  @click="searchNow"
                  :disabled="searchDisabled"
                >
                  Show me the Themes
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      searchDisabled: true,
      searchName: '',
      heroMin: 0,
      heroMax: 0,
      searchHeroes: [],
      headers: [
        {
          text: "Title",
          align: "left",
          sortable: true,
          value: 'name'
        },
        {
          text: "Description",
          align: "left",
          sortable: false,
          value: "description"
        },
        {
          text: "Hero Count",
          align: "left",
          sortable: false,
          value: "count"
        }
      ],
      rows: [25, 50]
    }
  },
  watch: {
  },
  methods: {
    resetSearch: function () {
      this.searchName = '',
      this.heroMin    = 0,
      this.heroMax    = this.getHeroes.length,
      this.searchHeroes = []
    },
    searchNow: function () {
      this.filterByName();
    },
    filterByName: function () {
      var themeList = []
      if (this.searchName) {
        this.getThemes.filter(theme => {
          if (
            theme.name.toLowerCase().includes(this.searchName.toLowerCase()) == true || theme.description.toLowerCase().includes(this.searchName.toLowerCase()) == true
            ) {
              themeList.push(theme)
          }
        })
      }
      else {
        themeList = this.getThemes
      }
      this.filterByNumber(themeList)
    },
    filterByNumber: function (themeList){
      var themeListNum = []
      if (this.heroMin || this.heroMax) {
        themeList.filter(theme => {
          if (theme.heroes.length >= this.heroMin && theme.heroes.length <= this.heroMax) {
            themeListNum.push(theme)
          }
        })
      }
      else {
        themeListNum = themeList
      }
      this.filterByHeroes(themeListNum)
    },
    filterByHeroes: function (themeList) {
      var i;
      var j;
      var themesByHero = []
      if (this.searchHeroes) {
        for (i=0; i<themeList.length; i++) {
          for (j=0; j<this.searchHeroes.length; j++) {
            if (themeList[i].heroes.includes(this.searchHeroes[j]) == true) {
              themesByHero.push(themeList[i])

            }
          }
        }
      }
      else {
        themesByHero = themeList
      }
      let searchResults = []
      for (let k=0; k<themesByHero.length; k++) {
        if(searchResults.indexOf(themesByHero[k]) == -1) {
          searchResults.push(themesByHero[k])
        }
      }
      this.$router.push({name: 'searchResults', params: {searchResults}})
    },
    enableSearch: function () {
      if (this.searchName !== "" || this.heroMin !== "" || this.heroMax !== "" || this.searchHeroes[0] !== ""){
          this.searchDisabled = false
      }
      else {
        this.searchDisabled = true
      }
    }
  },
  computed: {
    getLoading: function () {
      return this.$store.getters.getLoading
    },
    getHeroes: function () {
      this.heroMax = this.$store.getters.getHeroes.length
      return this.$store.getters.getHeroes
    },
    getThemes: function () {
      return this.$store.getters.getThemes
    }
  }
}
</script>

<style lang="css">
.data-row:nth-child(odd) {
  background: #3F51B5;
  color: white;
}
.data-row:hover{
  color: black;
}
</style>
