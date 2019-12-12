<template>
    <div>
        <reply  v-for="(reply,index) in content" :data="reply" :key="reply.id" :index=index></reply>
    </div>
</template>

<script>
import reply from './reply';
import User from '../../Helpers/User';
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

            Echo.private('App.User.' + User.id())
    .notification((notification) => {
        this.content.unshift(notification.reply)
    });

            Echo.channel('deleteReplyChannel')
                .listen('DeleteReplyEvent', (e)=>{

                    for (let index = 0; index < this.content.length; index++) {
                        if (this.content[index].id==e.id) {
                            this.content.splice(index,1)
                        }
                        
                    }
                })

        }
    },
}
</script>