<template>
   <div v-if="question">
        <editquestion v-if="editing" :data=question></editquestion>
        <div v-else>
            <showquestion :data=question></showquestion>
            <v-container>
                <replies :replies="question.replies"></replies>
            <newreply :qSlug="question.slug"></newreply>
            </v-container>
        </div>
   </div>
</template>

<script>
import showquestion from './ShowQuestion';
import editquestion from './EditQuestion';
import replies from '../reply/replies';
import newreply from '../reply/NewReply';
export default {
    
    components:{
        showquestion,editquestion,replies,newreply
    },
    data() {
        return {
            question:'',
            editing:false
        }
    },
    created(){
        this.getQuestion();
        this.listenToEditing();
    },

    methods: {
        listenToEditing(){

            EventBus.$on('editingQuestion',()=>{
            this.editing=true;

        EventBus.$on('cancelEditing', ()=>{

            this.editing=false;
        })

        })
        },

        getQuestion(){

            axios.get(`/api/question/${this.$route.params.slug}`)
            .then((response)=>{

                this.question=response.data.data;
            })
        }
    },
}
</script>