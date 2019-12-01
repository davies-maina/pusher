import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


import Login from '../components/login/Login.vue';
import Signup from '../components/login/SignUp.vue';
import Forum from '../components/forum/Forum.vue';
import Logout from '../components/login/Logout.vue';
import Read from '../components/forum/ReadQuestion.vue';
import Create from '../components/forum/Create.vue';

const routes = [

    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/forum', component: Forum },
    { path: '/question/:slug', component: Read },
    { path: '/logout', component: Logout },
    { path: '/ask', component: Create },

];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;