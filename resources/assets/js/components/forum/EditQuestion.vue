<template>
     <v-container>
        <v-form @submit.prevent="update">
         <v-text-field
          v-model="form.title"
          label="Title*"
        ></v-text-field>
        <!-- <v-autocomplete
      label="Category"
      :items="categories"
      v-model="form.category_id"
      
      filled
      rounded
    ></v-autocomplete> -->

   

        <vue-simplemde v-model="form.body" ref="markdownEditor" />
       <v-btn type="submit" color="primary">Save</v-btn>
       <v-btn  color="primary" @click="cancelEditing">Cancel</v-btn>
    </v-form>
    </v-container>
</template>

<script>
import VueSimplemde from 'vue-simplemde';
export default {
    props:['data'],
    components: {
      VueSimplemde
    },
    data() {
        return {
            form:{
                title:'',
                body:''
            }
        }
    },

    created() {
        this.form=this.data;
    },
    methods: {
        cancelEditing(){

            EventBus.$emit('cancelEditing');
        },
        update(){

            axios.put(`/api/question/${this.form.slug}`, this.form)
                .then((response)=>{

                    this.cancelEditing();
                })
        }

    },
}
</script>
<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>