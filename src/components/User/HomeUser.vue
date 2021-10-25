<template>
    <div class="homeUser">
        <MenuUser></MenuUser>
        <router-view></router-view>
    </div>
</template>

<script>
import MenuUser from '../templates/MenuUser.vue'

export default {
    components:{
        MenuUser
    }
}
</script>
<style>
    
</style>