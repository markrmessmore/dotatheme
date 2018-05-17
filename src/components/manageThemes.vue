<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="title">Themes pending approval</h4>
          </v-card-title>
          <v-data-table
            hide-actions
            :headers="approvalHeaders"
            :items="toBeApproved"
            class="elevation-5"
          >
          <template slot="no-data">
            <v-alert :value="true" color="secondary">
              No themes pending approval.
            </v-alert>
          </template>
          <template slot="items" slot-scope="props" class="data-row">
            <tr class="data-row">
              <td class="subheading" :key="props.item.id + '-name'">
                <br>
                {{props.item.name}}
                <v-container>
                  <p class="caption">
                    * {{props.item.description}}
                  </p>
                </v-container>
              </td>
              <td class="body-1" :key="props.item.id + '-notes'">
                <li v-for="(note, index) in fixNotes(props.item.notes)" :key="index">{{note}}</li>
              </td>
              <td>
                <v-btn small color="black" dark @click.native.stop="editTheme(props.item)">
                  <v-icon left>edit</v-icon>
                  Review
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
        </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <br>
    <hr>
    <br>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="title">Previously Approved Themes:</h4>
          </v-card-title>
          <v-layout row>
            <v-flex xs6 offset-xs6>
              <v-text-field
                 append-icon="search"
                 label="Search for a specific theme..."
                 single-line
                 hide-details
                 v-model="search"
              ></v-text-field>
            </v-flex>
          </v-layout>
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
      rows: [25, 50],
      approvalHeaders: [
        {
          text: "Title & Description",
          align: "left",
          sortable: true,
          value: 'name'
        },
        {
          text: "Submitted Notes",
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
      ]
    }
  },
  methods: {
    fixNotes (themeNotes) {
      if (themeNotes) {
        return themeNotes.split("\n")
      }
      else {
        return null
      }
    },
    editTheme(theme) {
      var approved;
        if (theme.approved == true || theme.approved == "true" || theme.approved == "" || theme.approved == undefined) {
          approved = "true"
        }
        if (theme.approved = false || theme.approved == "false") {
          approved = "false"
        }
      this.$router.push({name: 'editTheme', params: {id: theme.id, themeName: theme.name, themeDesc: theme.description, selectedHeroes: theme.heroes, themeNotes: theme.notes, approved: approved }})
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
    },
    toBeApproved: function (){
      return this.$store.getters.getThemesToApprove
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
