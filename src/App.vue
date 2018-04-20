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
          DotaThemes.com
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
      <!-- <v-container> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </main>


  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      navList: [
        {
          title: "Create Theme",
          icon: "create",
          link: "/createTheme"
        },
        {
          title: "Admin Login",
          icon: "perm_identity",
          link: "/login"
        },
      ]
    }
  },
  name: 'App'
}
</script>
