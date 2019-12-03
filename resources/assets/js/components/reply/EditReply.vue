<template>
    <div>
        <vue-simplemde v-model="reply.reply" ref="markdownEditor" />
         <v-card-actions>

                <v-btn icon small @click="updateR">
                    <v-icon>update</v-icon>
                </v-btn>
                <v-btn icon small @click="cancel">
                    <v-icon>cancel</v-icon>
                </v-btn>
            </v-card-actions>
    </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde';

export default {
    props:['reply'],
    components:{
        VueSimplemde
    },
   /*  data() {
        return {
            reply:''
        }
    }, */

    methods: {
        cancel(){

            EventBus.$emit('cancelEditingReply')
        },

        updateR(){
            axios.patch(`/api/question/${this.reply.question_slug}/reply/${this.reply.id}`,{body:this.reply.reply})
                .then((res)=>{

                    this.cancel();
                })

        }
    },
}
</script>