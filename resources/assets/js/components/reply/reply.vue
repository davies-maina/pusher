<template>
    <div class="mt-1">
        <v-card>
            <v-card-title>
                <div class="headline">{{data.user}}</div>
                <div class="ml-2"> , {{data.created_at}}</div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-html="data.reply"></v-card-text>
            <v-divider></v-divider>
            <v-card-actions v-if="own">

                <v-btn icon small>
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn icon small>
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import User from '../../Helpers/User';
export default {
    props:['data'],



    computed: {
        own(){
            return User.own(this.data.user_id)
        }
    },
}
</script>