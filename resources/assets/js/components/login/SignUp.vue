<template>
   <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Sign up</v-toolbar-title>
                <v-spacer />
                
              </v-toolbar>
              <v-card-text>
                <v-form ref="form"
                    v-model="valid"
                    @submit.prevent="signUp"
                    lazy-validation>

                    <v-text-field
                    v-model="form.name"
                    :rules="nameRules"
                    label="Name"
                    required
                    prepend-icon="person_outline"
                  />
                  <span class="red--text" v-if="errors.name">{{errors.name[0]}}</span>
                  <v-text-field
                    v-model="form.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    prepend-icon="email"
                  />
                  
                  <span class="red--text" v-if="errors.email">{{errors.email[0]}}</span>
                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="form.password"
                    :rules="passwordRule"
                    
                    prepend-icon="lock"
                    type="password"
                    required
                  />

                  <span class="red--text" v-if="errors.password">{{errors.password[0]}}</span>

                  <v-text-field
                    id="confirm_password"
                    label="confirm password"
                    v-model="form.password_confirmation"
                    :rules="confirm_passwordRule"
                    name="password_confirmation"
                    prepend-icon="lock"
                    type="password"
                    required
                  />

                  <v-spacer />
                <v-btn color="primary" :disabled="!valid" @click="validate"  type="submit">Sign up</v-btn>
                  
                </v-form>
              </v-card-text>
              <v-card-actions>
                
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import User from '../../Helpers/User'
export default {


    data(){
      return{
         
         valid: true,
     form:{
       email:'',
       password:'',
       name:'',
       password_confirmation:''
     },
      passwordRule: [
        v => !!v || 'Password is required is required',
        v => (v && v.length >=5) || 'Password must be more than 5 characters',
      ],
     
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      nameRules: [
        v => !!v || 'Name is required',
        
      ],

      confirm_passwordRule:[
         v => !!v || 'confirm pass is required',
         v=>(v!==this.password) || 'password do not match'

      ],

      errors:{}
        
    }}
    ,
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },

      signUp(){

        if (this.valid) {
        axios.post('api/auth/signup',this.form)
          .then((response)=>{

            User.responseAfterLogin(response);
            this.$router.push('/forum');

          })


          .catch((error)=>{

            this.errors=error.response.data.errors;
          })
        }
      }
    },
    
    created(){

      if (User.loggedIn()) {
        this.$router.push('/forum');
      }
    }}
</script>