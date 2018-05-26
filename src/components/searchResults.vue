<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-card color="indigo" dark class="elevation-5">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text>
                  <h4 class="title">Search Results</h4>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <v-card class="elevation-5">
          <v-container>
            <v-layout row>
              <v-flex xs12>
                <v-data-table
                  :headers="headers"
                  :items="searchResults"
                  class="elevation-5"
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
                            <li v-for="(note, index) in fixNotes(props.item.notes)" :key="index">{{note}}</li>
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
                    Your search for "{{  }}" found no results.
                  </v-alert>
                </v-data-table>
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
      rows: [10, 25, 50],
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
  props: {
    searchResults: []
  },
  methods: {
    fixNotes (themeNotes) {
      if (themeNotes) {
        return themeNotes.split("\n")
      }
      else {
        return null
      }
    }
  },
  computed: {
    getLoading: function () {
      return this.$store.getters.getLoading
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
