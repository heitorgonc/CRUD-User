<template>
    <div class="menu user">
        <ul>
            <router-link to="/users/register" custom tag="li" active-class="active" exact><a>Register</a></router-link>
            <router-link to="/users/exclude" tag="li" active-class="active" exact><a>Exclude</a></router-link>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>