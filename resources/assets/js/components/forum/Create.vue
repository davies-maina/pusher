<template>
    <v-container>
        <v-form @submit.prevent="create">
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

    <v-select
    :items="categories"
    v-model="form.category_id"
    item-value="id"
    item-text="name"
    label="Category"
    autocomplete
    ></v-select>

        <vue-simplemde v-model="form.body" ref="markdownEditor" />
       <v-btn type="submit" color="primary">Create</v-btn>
    </v-form>
    </v-container>
</template>

<script>
import VueSimplemde from 'vue-simplemde';
export default {
    components: {
      VueSimplemde
    },
    data(){

        return {
            form:{
                title:'',
                category_id:'',
                body:''
            },

            categories:{},
            errors:{}
        }
    }, 
    methods: {
        create(){

            axios.post('api/question', this.form)
                .then((response)=>{

                   /*  console.log(response.data.data); */
                   this.$router.push(response.data.path);
                })

                .catch((error)=>{

                    this.errors=error.response.data.error;
                })

        }
    },

    created() {
        axios.get('api/category')
            .then((response)=>{

                this.categories=response.data.data;

                /* console.log(response.data.data.name); */
            })

    },
    
}
</script>
<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>