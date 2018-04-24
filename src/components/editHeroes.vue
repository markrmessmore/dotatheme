<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h3 class="display-1">Manage Themes:</h3>
        <v-data-table
          :headers="headers"
          :items="getHeroes"
          class="elevation-5"
          :rows-per-page-items="rows"
        >
        <template slot="items" slot-scope="props">
          <td>{{props.item.hero}}</td>
          <td>{{props.item.attribute}}</td>
          <td>{{props.item.color}}</td>
          <td>{{props.item.aghs}}</td>
          <td>{{props.item.passive}}</td>
        </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>


</template>

<script>
export default {
  data () {
    return {
      rows: [25, 50],
      items: [],
      headers: [
        {
          text: "Hero",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Attribute",
          align: "left",
          sortable: true,
          value: "attribute"
        },
        {
          text: "Primary Color",
          align: "left",
          sortable: true,
          value: "color"
        },
        {
          text: "Has Aghs?",
          align: "left",
          sortable: true,
          value: "aghs"
        },
        {
          text: "Has a passive?",
          align: "left",
          sortable: true,
          value: "passive"
        }
      ]
    }
  },
  computed: {
    getHeroes () {
      return this.$store.getters.getHeroes
    }
  }
}
</script>

<style lang="css">
</style>
