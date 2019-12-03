<template>
    <div class="mt-3">
        <vue-simplemde v-model="form.body" ref="markdownEditor" />
       <v-btn type="submit" color="primary" @click="submitR">
           <v-icon>done</v-icon>Reply</v-btn>
    </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde';
export default {

    props:['qSlug'],
    components:{
        VueSimplemde
    },

    data() {
        return {
            form:{
                body:''
            }
        }
    },

    methods: {
        submitR(){
            axios.post(`/api/question/${this.qSlug}/reply`,{body:this.form.body})
                .then((res)=>{
                    this.form.body=''
                    EventBus.$emit('newReplyCreated', res.data.reply);
                    window.scrollTo(0,0);
                   /*  console.log(res.data) */
                })

        }
    },
}
</script>
<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>