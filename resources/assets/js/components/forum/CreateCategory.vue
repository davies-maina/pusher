use App\Model\Category;
<template>
    <v-container>
        <v-form @submit.prevent="newCategory">
            <v-text-field label="Category name *" v-model="form.name" required>

            </v-text-field>
            
            <v-btn type="submit" color="primary" v-if="editSlug" class="mt-2 mb-2">Update</v-btn>
            <v-btn type="submit" color="primary" class="mt-2 mb-2" v-else>Create</v-btn>
        </v-form>
        <v-card class="mt-2">
          <v-toolbar color="indigo" dark dense>
          <v-toolbar-title>Categories</v-toolbar-title>
        </v-toolbar>

        <v-list>
            <div v-for="(category,index) in categories" :key="category.id">
                <v-list-item>

                <v-list-item-action>
                    <v-btn icon small @click="edit(index)">
                        <v-icon color="orange">edit</v-icon>
                    </v-btn>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>
                        {{category.name}}
                    </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn icon small @click="destroy(category.slug,index)">
                        <v-icon color="red">delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            </div>
        </v-list>
      </v-card>
    </v-container>
</template>

<script>
import User from '../../Helpers/User'
export default {
    data() {
        return {
            form:{
                name:''
            },

            categories:{},
            editSlug:''
        }
    },

    methods: {
        newCategory(){
            this.editSlug ? this.update() : this.create()
            

                
        },

        create(){
            axios.post('/api/category', this.form)
                .then((response)=>{

                   this.categories.unshift(response.data);
                   this.form.name='';

                })

        },

        update(){

            axios.patch(`/api/category/${this.editSlug}`, this.form)
                .then((res)=>{
                    this.categories.unshift(res.data);
                    this.form.name=''

                })
        },

        destroy(slug,index){

             axios
        .delete(`/api/category/${slug}`)
        .then(res => this.categories.splice(index, 1));

                
        },

        edit(index){
            this.form.name=this.categories[index].name;
            this.editSlug=this.categories[index].slug;
            this.categories.splice(index,1)
        }
    },

    created() {

        if(!User.admin()){

            this.$router.push('/formu');
        }
        axios.get('/api/category')
            .then((res)=>{

                this.categories=res.data.data;
            })
    },
}
</script>