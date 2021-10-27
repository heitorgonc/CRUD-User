<template>
    <div>
        <nav class="way exclude user">
            <ul>
                <router-link to="/" custom tag="li" active-class="active" exact><a>Home</a></router-link>
                <div class="way-separator">/</div>
                <router-link to="/users" tag="li" active-class="active" exact><a>Users</a></router-link>
                <div class="way-separator">/</div>
                <router-link to="/users/exclude" tag="li" active-class="active" exact><a>Exclude</a></router-link>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>