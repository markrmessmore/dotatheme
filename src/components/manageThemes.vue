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
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="no-data">
              <v-alert :value="true" color="info">
                Loading theme data...
              </v-alert>
            </template>
            <template slot="items" slot-scope="props" class="data-row">
              <tr class="data-row">
                <td class="subheading" :key="props.item.id + '-name'">{{props.item.name}}</td>
                <td class="subheading" :key="props.item.id + '-desc'">{{props.item.description}}</td>
                <td>
                  <v-btn small color="black" dark @click.native.stop="editTheme(props.item)">
                    <v-icon left>edit</v-icon>
                    Edit
                  </v-btn>
                </td>
                <td>
                  <template v-if="true">
                    <appDialog
                      :theme="props.item"
                      barColor="red darken-4 white--text"
                      title="HOLD UP A SEC..."
                      msg="Are you <b>SURE</b> you want to delete this theme? It will be gone for good if you click yes." btn1Msg="Oops. Cancel!"
                      btn1Color="red darken-4 white--text"
                      btn2Msg="Yep. Let it be gone!"
                      btn2Color="red darken-4 white--text"
                    >
                    </appDialog>
                  </template>
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
    },
    deleteTheme() {
      this.dialog = true;
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
