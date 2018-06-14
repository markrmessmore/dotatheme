<template>
  <v-app>
  <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer
      temporary
      clipped
      floating
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile v-for="item in navList" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
  <!-- TOOLBAR -->
    <v-toolbar
      color="indigo"
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <img src="./assets/logo-white.png" height="15px" width="15px">
          DotaTheme.com
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in navList" :key="item.title" router :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

  <!-- CONTAINER -->
    <main>
      <!-- ALERT TO THEMES PENDING APPROVAL -->
        <v-alert type="info" v-if="getUser && getPending" :value="true">
          There are currently {{getPending}} themes waiting approval
        </v-alert>
        <router-view></router-view>
    </main>
    <template>
      <v-footer class="pa-3">
        <v-spacer></v-spacer>
        <div class="title">Currently serving {{numberThemes}} different wacky themes to choose from!</div>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    getUser: function () {
      return this.$store.getters.getUser
    },
    getPending: function () {
      return this.$store.getters.getThemesToApprove.length
    },
    pendingApprovals: function () {
      return this.$store.getters.getThemesToApprove.length
    },
    numberThemes: function () {
      return this.$store.getters.getThemes.length
    },
    navList () {
      let navList = [
        {
          title: "Create Theme",
          icon: "create",
          link: "/createTheme"
        },
        {
          title: "Advanced Search",
          icon: "fas fa-search-plus",
          link: "/search"
        },
        {
          title: "About",
          icon: "fas fa-info-circle",
          link: "/about"
        },
        {
          title: "Admin Login",
          icon: "perm_identity",
          link: "/login"
        },
      ]
      if (this.getUser !== null && this.getUser !== "undefined") {
        navList = [
          {
            title: "Create Theme",
            icon: "create",
            link: "/createTheme"
          },
          {
            title: "Advanced Search",
            icon: "fas fa-search-plus",
            link: "/search"
          },
          {
            title: "Manage Themes",
            icon: "view_list",
            link: "/manageThemes"
          },
          {
            title: "Sign Out",
            icon: "play_for_work",
            link: "/signOut"
          }
        ]
      }
      return navList
    }
  },
  name: 'App'
}
</script>
