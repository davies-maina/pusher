<template>
    <v-container>
        <span class="red--text" v-if="errors.title">{{errors.title[0]}}</span>
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
<span class="red--text" v-if="errors.category_id">{{errors.category_id[0]}}</span>
    <v-select
    :items="categories"
    v-model="form.category_id"
    item-value="id"
    item-text="name"
    label="Category"
    autocomplete
    ></v-select>
<span class="red--text" v-if="errors.body">{{errors.body[0]}}</span>
        <vue-simplemde v-model="form.body" ref="markdownEditor" />
       <v-btn type="submit" color="primary" :disabled="disabled">Create</v-btn>
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

                    this.errors=error.response.data.errors;
                })

        }
    },
    computed: {
        disabled(){

            return !(!this.form.body && this.form.title && this.form.category_id)
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