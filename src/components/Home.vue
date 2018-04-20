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
                <v-btn large color="indigo" dark>
                  <v-icon left>fas fa-random</v-icon>
                  Give A Random Theme
                </v-btn>
                <v-btn large color="indigo" dark>
                  <v-icon left>cached</v-icon>
                  Create Random Theme Matchup
                </v-btn>
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
                >
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
                            <!-- <p> -->
                              <b class="title">Notes</b>:
                              <hr>
                              {{props.item.notes}}
                            <!-- </p> -->
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
  computed: {
    getThemes () {
      this.$store.dispatch('sortThemeHeroes');
      return this.$store.getters.getThemes
    },
    numberThemes () {
      return this.$store.getters.getThemes.length
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
