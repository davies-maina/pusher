<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          link
          router :to="item.route"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
       <!--  <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="blue"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4">explore</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Sonar</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height">
        <v-row
          justify="center"
          align="center"
        >
          <router-view></router-view>
    
        </v-row>
      </v-container>
      <appfooter></appfooter>
    </v-content>
    
  </v-app>
</template>

<script>
import navbar from './NavBar';
import appfooter from './AppFooter';
import login from './login/Login';
  export default {
    props: {
      source: String,
    },
     components:{

        navbar,appfooter,login
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'forum', text: 'Forum' },
        { icon: 'question_answer', text: 'Ask question' },
        { icon: 'category', text: 'Category' },
        { icon: 'navigate_next', text: 'Log in', route:'/login'},
        
      ],
     
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
