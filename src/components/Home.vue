<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
        <v-card class="elevation-5">
          <v-container>
            <v-layout row>
              <v-flex xs12>
                <v-alert type="info" :value="true" class="text-xs-center">
                  <a href="https://docs.google.com/spreadsheets/d/1ts2x4eZW45JDee47MeQ3ZgsomYYZWdBJDAPD8WznzLw/edit?usp=sharing" target="_blank" class="white--text">
                    Click here to go to the old themes spreadsheet.
                    <br>
                    This link will be active until we get everything switched over.
                  </a>
                </v-alert>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-card color="secondary" dark class="elevation-5">
                  <v-card-text>
                    <h3 class="display-1 text-xs-center">Welcome to DotaTheme.com</h3>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <br>
            <v-layout row>
              <v-flex xs12>
                <v-card class="elevation-5">
                  <v-card-text>
                    <p class="headline">What is this random site you've stumbled across?</p>
                    <p class="subtitle">Basically members of the
                      <v-tooltip top>
                        <span slot="activator" style="cursor: pointer"><b>WeLikeDota community</b></span>
                        <span>The Internet's <i>casual</i> Dota 2 Podcast</span>
                      </v-tooltip>
                      like to do Theme Thursdays where lots of quirky drafts are made up pairing Dota heroes together with certain themes. This site has been created solely to oversee that.
                    </p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <br>
            <v-layout row>
              <v-flex xs12 text-xs-center>
                <v-btn large color="indigo" dark @click.native.stop="getRandomTheme">
                  <v-icon left>fas fa-random</v-icon>
                  Give A Random Theme
                </v-btn>
                <v-btn large color="indigo" dark @click.native.stop="getRandomMatchup">
                  <v-icon left>cached</v-icon>
                  Create Random Theme Matchup
                </v-btn>
                <v-dialog v-model="randomTheme" max-width="500">
                  <v-card>
                    <v-toolbar color="indigo" class="white--text">
                      <v-toolbar-title>{{randThemeName}}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-title class="title">{{randThemeDesc}}</v-card-title>
                    <v-card-text>
                      <li v-for="hero in randThemeHeroes">{{hero}}</li>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="randomMatchup" max-width="500">
                  <v-layout column>
                    <v-flex xs12>
                      <v-toolbar color="indigo" dark>
                        <v-toolbar-title>
                          {{matchupA.name}} vs. {{matchupB.name}}
                        </v-toolbar-title>
                      </v-toolbar>
                    </v-flex>
                    <v-card>
                      <v-container fluid fill-height>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-card color="indigo" class="elevation-3 white--text">
                              <v-container>
                                <h6 class="title">{{matchupA.name}}</h6>
                                <div>{{matchupA.description}}</div>
                                <hr>
                                <li v-for="(hero, index) in matchupA.heroes" :key="index" class="body-2">{{hero}}</li>
                              </v-container>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                    <v-card>
                      <v-container fluid fill-height>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-card color="secondary" class="elevation-3 white--text">
                              <v-container>
                                <h6 class="title">{{matchupB.name}}</h6>
                                <div>{{matchupB.description}}</div>
                                <hr>
                                <li v-for="(hero, index) in matchupB.heroes" :key="index" class="body-2">{{hero}}</li>
                              </v-container>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-layout>
                </v-dialog>
              </v-flex>
            </v-layout>
            <br>
            <v-layout row>
              <v-flex xs12>
                <v-data-table
                  :headers="headers"
                  :items="getThemes"
                  class="elevation-5"
                  :search="search"
                  :loading="getLoading"
                  :rows-per-page-items="rows"
                >
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                  <template slot="no-data">
                    <v-alert :value="true" color="info">
                      Loading theme data...
                    </v-alert>
                  </template>
                  <template slot="items" slot-scope="props">
                    <tr class="data-table-row" @click="props.expanded = !props.expanded">
                      <td class="subheading">{{props.item.name}}</td>
                      <td class="body-2">{{props.item.description}}</td>
                      <td class="subheading">{{props.item.heroes.length}} Heroes</td>
                    </tr>
                  </template>
                  <template slot="expand" slot-scope="props">
                    <v-card flat color="indigo lighten-5">
                      <v-container>
                        <v-layout row wrap>
                          <v-flex xs5>
                            <b class="title">Notes</b>:
                            <hr>
                            {{props.item.notes}}
                          </v-flex>
                          <v-flex xs6 offset-xs1>
                            <b class="title">Heroes</b>:
                            <hr>
                            <li v-for="(hero, index) in props.item.heroes" :key="index">{{ hero }}</li>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </template>
                  <v-alert slot="no-results" :value="true" color="info" icon="warning">
                    Your search for "{{ search }}" found no results.
                  </v-alert>
                </v-data-table>
                <v-layout row>
                  <v-flex xs6 offset-xs6>
                    <v-text-field
                       append-icon="search"
                       label="Search for theme titles or descriptions..."
                       single-line
                       hide-details
                       v-model="search"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
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
      search: "",
      rows: [10, 25, 50],
      randomNumber: 0,
      randomTheme: false,
      randomMatchup: false,
      randThemeName: "",
      randThemeDesc: "",
      randThemeHeroes: [],
      matchupA: {},
      matchupB: {},
      headers: [
        {
          text: "Theme Title",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Description",
          align: "left",
          sortable: false,
          value: "description"
        },
        {
          text: "Number of Heroes",
          align: "left",
          sortable: true,
          value: "heroNum"
        }
      ]
    }
  },
  methods: {
  },
  computed: {
    getRandomMatchup: function () {
      var rand1 = Math.floor(Math.random() * this.getThemes.length)
      var rand2 = Math.floor(Math.random() * this.getThemes.length)
      while (rand1 == rand2) {
        rand2 = Math.floor(Math.random() * this.getThemes.length)
      }
      this.randomMatchup = !this.randomMatchup
      this.matchupA = {
        name: this.getThemes[rand1].name.toUpperCase(),
        description: this.getThemes[rand1].description,
        heroes: this.getThemes[rand1].heroes,
      },
      this.matchupB = {
        name: this.getThemes[rand2].name.toUpperCase(),
        description: this.getThemes[rand2].description,
        heroes: this.getThemes[rand2].heroes,
      }

    },
    getRandomTheme: function () {
      var randNum = Math.floor(Math.random() * this.getThemes.length)
      this.randomTheme = !this.randomTheme
      this.randThemeName = this.getThemes[randNum].name
      this.randThemeDesc = this.getThemes[randNum].description
      this.randThemeHeroes = this.getThemes[randNum].heroes
    },
    getLoading: function () {
      return this.$store.getters.getLoading
    },
    getThemes: function () {
      this.$store.dispatch('sortThemeHeroes');
      return this.$store.getters.getThemes
    },
    numberThemes: function () {
      return this.$store.getters.getThemes.length
    }
  }
}

</script>

<style scoped>
.data-table-row:nth-child(4n+3) {
  background: #3F51B5;
  color: white;
}
.data-table-row:hover{
  color: black;
}
</style>
