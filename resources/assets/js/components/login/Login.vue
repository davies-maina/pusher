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
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                
              </v-toolbar>
              <v-card-text>
                <v-form ref="form"
                    v-model="valid"
                    @submit.prevent="login"
                    lazy-validation>
                  <v-text-field
                    v-model="form.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    prepend-icon="email"
                  />
                  

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="form.password"
                    :rules="passwordRule"
                    
                    prepend-icon="lock"
                    type="password"
                    required
                  />

                  <v-spacer />
                <v-btn color="primary" :disabled="!valid" @click="validate"  type="submit">Login</v-btn>
                  
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
  import Vue from 'vue'
  import * as VeeValidate from 'vee-validate'

  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new',
    },

    data(){
      return{
         
         valid: true,
     form:{
       email:'',
       password:''
     },
      passwordRule: [
        v => !!v || 'Password is required is required',
        v => (v && v.length >=5) || 'Password must be more than 5 characters',
      ],
     
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
        
    }}
    ,
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },

      login(){

        if (this.valid) {
         User.login(this.form);
        }
      }
    },
    
    
    
    }
</script>
