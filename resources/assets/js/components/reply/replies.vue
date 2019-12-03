<template>
    <div>
        <reply  v-for="reply in content" :data="reply" :key="reply.id"></reply>
    </div>
</template>

<script>
import reply from './reply';
export default {
    props:['replies'],
    components:{
        reply
    },

    created() {
        this.listen();
    },
    data() {
        return {
            content:this.replies
        }
    },

    methods: {
        listen(){

            EventBus.$on('newReplyCreated', (reply)=>{
                this.content.unshift(reply);

            })
        }
    },
}
</script>