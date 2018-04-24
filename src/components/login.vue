<template lang="html">
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title xs12>
            <h3 class="title" text-xs-center>DotaTheme.com Login:</h3>
          </v-card-title>
          <v-card-text>
            <v-container>
              <form @submit.prevent="login">
                <v-layout row>
                  <v-flex sm12>
                    <v-text-field
                      name="adminEmail"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex sm12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex sm12>
                    <v-btn type="submit" @click="login" :disabled="loading" :loading="loading">
                      Login
                      <span slot="loader" class="custom-loader">
                        <v-icon dark>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: "",
      password: ""
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    error () {
      return this.$store.getters.getErrors
    },
    loading () {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    login () {
      this.$store.dispatch('signIn', {email: this.email, password: this.password})
    },
    onDismissed(){
      this.$store.dispatch('clearError')
    }
  }
}
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
