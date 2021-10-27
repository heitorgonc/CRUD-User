<template>
    <div class="user">
        <MenuHomeUser></MenuHomeUser>
        <router-view></router-view>
    </div>
</template>

<script>
import MenuHomeUser from '../templates/menus/user/MenuHomeUser.vue'

export default {
    components:{
        MenuHomeUser,
    }
}
</script>
<style>
    
</style>