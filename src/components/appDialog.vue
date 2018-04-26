<template lang="html">
    <v-dialog persistent max-width="500" v-model="dialog">
      <v-btn small color="red darken-4" dark slot="activator">
        <v-icon left>delete_forever</v-icon>
        Delete
      </v-btn>
      <v-card>
        <v-toolbar :class="barColor">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container class="subheading">
            <div v-html="msg"></div>
            <br>
            <v-layout row>
              <v-flex xs6 text-xs-left>
                <v-btn flat :class="btn1Color" v-if="btn1Msg" @click="dialog = false">{{btn1Msg}}</v-btn>
              </v-flex>
              <v-flex xs6 text-xs-right>
                <v-btn flat :class="btn2Color" v-if="btn2Msg" @click="deleteTheme()">{{btn2Msg}}</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    theme: {},
    barColor: '',
    modalStyle: '',
    title: '',
    msg: '',
    btn1Msg: '',
    btn1Color: '',
    btn2Color: '',
    btn2Msg: ''
  },
  data (){
    return {
      dialog: false
    }
  },
  methods: {
    deleteTheme (){
      this.$store.dispatch('deleteTheme', this.theme.id)
    }
  }
}
</script>


<style lang="css">
</style>
