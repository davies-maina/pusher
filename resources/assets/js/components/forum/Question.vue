<template>
  <v-card
    class="mx-auto mt-2"
    max-width="400"
  >
    
      <v-card-title>
          
          <router-link :to="question.path">{{question.title}}</router-link>
          
          
          </v-card-title>
    

    <v-card-subtitle class="pb-0">
        {{question.user}} asked 
        {{question.created_at}}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{question.body}}</div>

      
    </v-card-text>

    
  </v-card>
</template>

<script>
export default {
    props:[
        'question'
    ]
}
</script>