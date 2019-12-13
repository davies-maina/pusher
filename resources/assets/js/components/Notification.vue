<template>
    <div class="text-xs-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
            <v-btn v-on="on">

        <v-icon :color="color">add_alert</v-icon> {{unreadCount}}
    </v-btn>
    </template>
    <v-list v-for="item in unread" :key="item.id">
        <v-list-item >
            <router-link :to="item.path">
        
            <v-list-item-title  class="mx-2" @click="markMessageRead(item)">{{item.question}}</v-list-item-title>
            </router-link>
       </v-list-item>
       <v-divider></v-divider>

        <v-list-item v-for="item in read" :key="item.id">
          <v-list-item-title>{{item.question}}</v-list-item-title>
        </v-list-item>
    </v-list>
            
        </v-menu>
    </div>
</template>

<script>
import User from '../Helpers/User'
import Exception from '../Helpers/Exception'
export default {
    created() {
        if(User.loggedIn){

            this.getNotifications();
        }
        Echo.private('App.User.' + User.id())
    .notification((notification) => {
        this.unread.unshift(notification);
        this.unreadCount++;
    });
    },

    data() {
        return {
            read:{},
            unread:{},
            unreadCount: 0
        }
    },

    methods: {
        getNotifications(){
           
        axios.post("/api/notifications")
        .then(res => {
          this.read = res.data.read;
          this.unread = res.data.unread;
          this.unreadCount = res.data.unread.length;

          /* console.log(res) */
        })

    .catch((error)=>{
        Exception.handle(error)

    })

        },

        markMessageRead(notification){

            axios.post('/api/markAsRead',{id:notification.id})
                .then((res)=>{
                    this.read.push(notification);
                    this.unread.splice(notification,1);
                    
                    this.unreadCount--;
                })
        }
    },

    computed: {
        color(){
            return this.unreadCount>0 ? 'red' : 'grey';

        }
    },
}
</script>