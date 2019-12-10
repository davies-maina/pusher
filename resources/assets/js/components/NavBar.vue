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
          v-if="item.show"

         
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
            <v-icon color="gre y darken-1">mdi-settings</v-icon>
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
        <notification v-if="loggedIn"></notification>
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
import User from '../Helpers/User';
import notification from './Notification';
  export default {
    props: {
      source: String,
    },
     components:{

        navbar,appfooter,login,notification
    },

    
    data(){
      
      return {
         drawer:null,
         loggedIn:User.loggedIn(),
        items: [
         
        { icon: 'forum', text: 'Forum', route:'/forum',show:true},
        { icon: 'question_answer', text: 'Ask question', route:'/ask',show: User.loggedIn()},
        { icon: 'category', text: 'Category', route:'/category', show: User.admin() },
        { icon: 'navigate_next', text: 'Log in', route:'/login', show: !User.loggedIn()},
        { icon: 'power_settings_new', text: 'Log out', route:'/logout', show: User.loggedIn()},
        { icon: 'navigate_next', text: 'Sign up', route:'/signup', show: !User.loggedIn() },
        
      ]
      }

      
      
      
     
    },
    created() {
      this.$vuetify.theme.dark = false;
      EventBus.$on('logout', ()=>{

        User.logout();

      })
    },
    

    computed: {
      /* items(){

        return [
        { icon: 'forum', text: 'Forum', route:'/forum',show:true},
        { icon: 'question_answer', text: 'Ask question', route:'/ask',show: User.loggedIn()},
        { icon: 'category', text: 'Category', route:'/category', show: User.loggedIn() },
        { icon: 'navigate_next', text: 'Log in', route:'/login', show: !User.loggedIn()},
        { icon: 'power_settings_new', text: 'Log out', route:'/logout', show: User.loggedIn()},
        { icon: 'navigate_next', text: 'Sign up', route:'/signup', show: !User.loggedIn() },
        
      
        ]
    }, */
  }}
</script>
