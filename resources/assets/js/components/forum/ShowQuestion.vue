<template>
    <v-card>
        <v-container fluid>
            <v-card-title>
                <div>
                <div class="headline">{{data.title}}</div>
                <span class="grey--text">{{data.user}} , {{data.created_at}}</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn class="mx-auto">{{data.reply_count}} replies</v-btn>
                
            </v-card-title>
            <v-card-text v-html="body"></v-card-text>
            <v-card-actions v-if="own">
                <v-btn icon small>
                    <v-icon color="primary" @click="editing">edit</v-icon>
                </v-btn>
                <v-btn icon small @click="deleteQ">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>
import md from 'marked';
import User from '../../Helpers/User';
export default {
    props:[

        'data'
    ],

    data() {
        return {
            own : User.own(this.data.user_id)
        }
    },

    computed: {
        body(){

            return md.parse(this.data.body);
        }
    },

    methods: {
        deleteQ(){

            axios.delete(`/api/question/${this.data.slug}`)
                .then((response)=>{

                     this.$router.push('/forum');
                })

                .catch((error)=>{

                    console.log(error.response.data);
                })
        },

        editing(){

            EventBus.$emit('editingQuestion');
        }
    },
}
</script>