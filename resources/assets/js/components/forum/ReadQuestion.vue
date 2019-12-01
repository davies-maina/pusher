<template>
   <div v-if="question">
        <editquestion v-if="editing" :data=question></editquestion>
        <div v-else>
            <showquestion :data=question></showquestion>
        </div>
   </div>
</template>

<script>
import showquestion from './ShowQuestion';
import editquestion from './EditQuestion';
export default {
    
    components:{
        showquestion,editquestion
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