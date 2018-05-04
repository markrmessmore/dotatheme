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
                    <h3 class="subheading">Search by theme name:</h3>
                  </v-card-title>
                  <v-container>
                    <v-text-field
                    v-model="searchName"
                    label="Name:"
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
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs5 offset-xs1>
                        <v-text-field
                          v-model="heroMax"
                          label="Max:"
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
                    <h3 class="subheading">Search by heroes:</h3>
                  </v-card-title>
                  <v-card-text>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm1>

                      </v-flex>
                      <v-flex xs12 sm6>

                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 sm6>
                        <span v-for="hero in heroes1" :key="hero.hero">
                          <input type="checkbox" :label="hero.hero" :value="hero.hero" v-model="searchHeroes">
                          {{hero.hero}}
                          <br>
                        </span>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

          <!--
          <v-container v-if="results">
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-container> -->

          <!-- <v-data-table
            :headers="headers"
            :items="searchResults"
            class="elevation-5"
            :rows-per-page-items="rows"
            :loading="getLoading"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props" class="data-row">
              <tr class="data-row">
                <td class="subheading" :key="props.item.id + '-name'">{{props.item.name}}</td>
                <td class="subheading" :key="props.item.id + '-desc'">{{props.item.description}}</td>
                <td class="subheading" :key="props.item.id + 'heroes'">{{props.item.heroes.length}}</td>
              </tr>
            </template>
            <template slot="no-data">
              <v-alert :value="true" color="info">
                Loading theme data...
              </v-alert>
            </template>
          </v-data-table> -->

</template>

<script>
export default {
  data () {
    return {
      searchName: '',
      results: '',
      heroMin: '',
      heroMax: '',
      allHeroes: [],
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
  created: function() {
    this.getHeroes();
  },
  methods: {
    getHeroes () {
      this.allHeroes = this.$store.getters.getHeroes;
    }
  },
  computed: {
    factor () {
      return Math.floor(this.allHeroes.length/4)
    },
    searchResults: function (){
      if (!this.search) {
        this.results = null
        return this.$store.getters.getThemes
      }
      else {
        return this.$store.getters.getThemes.filter()
      }
    },
    getLoading: function () {
      return this.$store.getters.getLoading
    },
    heroes1 () {
      return this.allHeroes
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
