<template>
    <div>
        <reply  v-for="(reply,index) in content" :data="reply" :key="reply.id" :index=index></reply>
    </div>
</template>

<script>
import reply from './reply';
export default {
    props:['question'],
    components:{
        reply
    },

    created() {
        this.listen();
    },
    data() {
        return {
            content:this.question.replies
        }
    },

    methods: {
        listen(){

            EventBus.$on('newReplyCreated', (reply)=>{
                this.content.unshift(reply);

            })

            EventBus.$on('deleteReply', (index)=>{
                
                axios.delete(`/api/question/${this.question.slug}/reply/${this.content[index].id}`)
                    .then((res)=>{

                        this.content.splice(index,1)
                    })
                
            })
        }
    },
}
</script>