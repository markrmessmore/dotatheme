<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
        <v-card class="elevation-5">
          <v-container>
            <v-layout row>
              <v-flex xs12>
                <v-card color="secondary" dark>
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
                <!-- <v-btn large color="indigo" dark @click.native.stop="randomTheme = !randomTheme"> -->
                <v-btn large color="indigo" dark @click.native="createRand">
                  <v-icon left>fas fa-random</v-icon>
                  <!-- {{randomNumber}} -->
                  Give A Random Theme
                </v-btn>
                <v-btn large color="indigo" dark>
                  <v-icon left>cached</v-icon>
                  Create Random Theme Matchup
                </v-btn>
                <v-dialog v-model="randomTheme" max-width="290">
                  <v-card>
                    <v-toolbar color="indigo" class="white--text">
                      <v-toolbar-title>{{getRandomTheme.name}}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-title class="title">{{getRandomTheme.description}}</v-card-title>
                    <v-card-text>
                      <li v-for="hero in getRandomTheme.heroes">{{hero}}</li>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="randomMatchup" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Random Theme</v-card-title>
                    <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <br>
            <v-layout row>
              <v-flex xs12>
                <v-data-table
                  :headers="headers"
                  :items="getThemes"
                  item-key="name"
                  class="elevation-5"
                  :search="search"
                >
                  <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                      Sorry, we seem to be having trouble contacting the server :-(.
                    </v-alert>
                  </template>
                  <template slot="items" slot-scope="props">
                    <tr class="data-table-row" @click="props.expanded = !props.expanded">
                      <td class="title">{{props.item.name}}</td>
                      <td class="title">{{props.item.description}}</td>
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
                            <li v-for="hero in props.item.heroes">{{ hero }}</li>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </template>
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                  </v-alert>
                </v-data-table>
                <v-layout row>
                  <v-flex xs6 offset-xs6>
                    <v-text-field
                       append-icon="search"
                       label="Search"
                       single-line
                       hide-details
                       v-model="search"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
          <template>
            <v-footer class="pa-3">
              <v-spacer></v-spacer>
              <div class="title">Currently serving {{numberThemes}} different wacky themes to choose from!</div>
              <v-spacer></v-spacer>
              <div>&copy; {{ new Date().getFullYear() }}</div>
            </v-footer>
          </template>
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
      randomNumber: 0,
      randomTheme: false,
      randomMatchup: false,
      headers: [
        {
          text: "Theme Title",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Description",
          align: "left",
          sortable: false,
          value: "description"
        }
      ]
    }
  },
  methods: {
    createRand () {
      this.randomNumber = Math.random();
    }
  },
  computed: {
    clickRand () {

    },
    getThemes () {
      this.$store.dispatch('sortThemeHeroes');
      return this.$store.getters.getThemes
    },
    numberThemes () {
      return this.$store.getters.getThemes.length
    },
    getRandomTheme () {
      var themeList = this.$store.getters.getThemes;
      var randNum   = Math.floor(Math.random())
      // console.log(randNum);
      var rand      = randNum * themeList.length;
      return themeList[rand];
    }
  }
}

</script>

<style scoped>
.data-table-row:nth-child(4n-3) {
  background: #3F51B5;
  color: white;
}
.data-table-row:hover{
  color: black;
}
</style>
