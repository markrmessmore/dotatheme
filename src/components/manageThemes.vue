<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="getThemes"
            class="elevation-5"
            :rows-per-page-items="rows"
            :loading="getLoading"
            :search="search"
            item-key="id"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="no-data">
              <v-alert :value="true" color="info">
                Loading theme data...
              </v-alert>
            </template>
            <template slot="items" slot-scope="props" class="data-row">
              <tr class="data-row">
                <td class="subheading">{{props.item.name}}</td>
                <td class="subheading">{{props.item.description}}</td>
                <td>
                  <v-btn small color="black" dark @click.native.stop="editTheme(props.item)">
                    <v-icon left>edit</v-icon>
                    Edit
                  </v-btn>
                </td>
                <td>
                  <v-btn small color="red darken-4" dark @click.native.stop="">
                    <v-icon left>delete_forever</v-icon>
                    Delete
                  </v-btn>
                </td>
              </tr>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
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
          sortable: true,
          value: 'name'
        },
        {
          text: "Theme Description",
          align: "left",
          sortable: false,
          value: "description"
        },
        {
          text: "",
          value: "button"
        },
        {
          text: "",
          value: "button"
        }
      ],
      rows: [25, 50]
    }
  },
  methods: {
    editTheme(theme) {
      this.$router.push({name: 'editTheme', params: {id: theme.id, themeName: theme.name, themeDesc: theme.description, selectedHeroes: theme.heroes, themeNotes: theme.notes}})
    }
  },
  computed: {
    getThemes: function (){
      return this.$store.getters.getThemes
    },
    getLoading: function () {
      return this.$store.getters.getLoading
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
