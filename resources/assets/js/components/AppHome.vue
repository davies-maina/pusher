<template>
    <div>
        <navbar></navbar>

        <router-view></router-view>
    <appfooter></appfooter>
    
    </div>
</template>

<script>
import navbar from './NavBar';
import appfooter from './AppFooter';
import login from './login/Login';
export default {
    components:{

        navbar,appfooter,login
    }
}
</script>