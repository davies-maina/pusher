<template>
    <div class="mt-1">
        <v-card>
            <v-card-title>
                <div class="headline">{{data.user}}</div>
                <div class="ml-2"> , {{data.created_at}}</div>
                <v-spacer></v-spacer>
                <like :content="data"></like>
            </v-card-title>
            <v-divider></v-divider>
            <editreply v-if="editingR" :reply="data"></editreply>
            <v-card-text v-html="reply" v-else></v-card-text>
            <v-divider></v-divider>
            <div v-if="!editingR">

                <v-card-actions v-if="own">

                <v-btn icon small @click="editR">
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn icon small @click="deleteR">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-card-actions>
            </div>
        </v-card>
    </div>
</template>

<script>
import User from '../../Helpers/User';
import md from 'marked';
import editreply from './EditReply';
import like from '../like/Like';
export default {
    props:['data','index'],
    components:{
        editreply,like
    },
    data() {
        return {
            editingR:false
        }
    },
    created() {
        this.listen();
    },
    computed: {
        own(){
            return User.own(this.data.user_id)
        },

        reply(){

            return md.parse(this.data.reply);
        }
    },

    methods: {
        deleteR(){
            EventBus.$emit('deleteReply', this.index)

        },

        editR(){
            this.editingR=true;
        },

        listen(){
            EventBus.$on('cancelEditingReply', ()=>{

                this.editingR=false;
                /* window.scrollTo(0,0); */
            })
        }
    },
}
</script>