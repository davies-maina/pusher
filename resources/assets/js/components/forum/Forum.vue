<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>

            <v-flex xs8>
                <questioncomp v-for="question in questions"
                :key="question.path"
                
                :question=question
                ></questioncomp>
            </v-flex>
            sidebar
        </v-layout>
    </v-container>
</template>

<script>
import questioncomp from './Question';
export default {
    components:{
        questioncomp
    },
    created() {
        axios.get('api/question')
            .then((response)=>{

                this.questions=response.data.data;
            })

            .catch((error)=>{

                console.log(error.response.data);

            })

    },

    data() {
        return {
            questions:{}
        }
    },
}
</script>