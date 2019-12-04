<template>
    <div>

        <v-btn icon @click="likeR">
            <v-icon :color="likeCol">favorite</v-icon> {{count}}
        </v-btn>
    </div>
</template>

<script>
import User from '../../Helpers/User';
export default {

    props:['content'],
    data() {
        return {
            liked:this.content.liked,
            count:this.content.like_count

        }
    },
    methods: {
        likeR(){
            if (User.loggedIn()) {
                this.liked ? this.reduceLike():this.addLike();
                this.liked=!this.liked;
            }
        
        },
        addLike(){

            axios.post(`/api/like/${this.content.id}`)
                .then((res)=>{
                    this.count++;

                })

            
        },

        reduceLike(){
            axios.delete(`/api/like/${this.content.id}`)
                .then((res)=>{

                     this.count--;
                })

           
        }


    },

    computed: {
        likeCol(){

            return this.liked ? 'pink' : 'grey';
        }
    },
}
</script>