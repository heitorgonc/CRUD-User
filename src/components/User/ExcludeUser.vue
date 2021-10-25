<template>
    <b-card class="container">
        <!-- <b-button  class="btn" @click="getUsers()" variant="primary" size="lg">
            Get Users
        </b-button> -->
        <b-list-group class="lista">
            <b-list-group-item class="item" v-for="(childUser, childId) in childUsers" :key="childId">
                <div class="itemLabel"><strong>Name: </strong>{{childUser.name}}</div>
                <div class="itemLabel"><strong>Email: </strong>{{childUser.email}}</div>
                <div class="itemLabel"><strong>ID: </strong>{{childId}}</div>
                <b-button class="btn get" variant="danger" size="lg"
                    @click="exclude(childId)">Exclude
                </b-button>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>
<script>

export default {
    data(){
        return{
            childUsers: this.users,
            childId: this.id,
            childUser: this.user
        }
    },
    props:{
        users: {type: Array, required: true},
        id: {type: Number},
        user: {type: Object, required: true},
        clear: {type: Function},
        save: {type: Function}
    },
    methods:{
        exclude(childId){
            this.$http.delete(`/users/${childId}.json`)
                .then(() => this.getUsers())
        },
        getUsers(){
            this.$http('users.json').then(res => {this.childUsers = res.data})
                .then( () => this.clear())
        }
    },
    created(){
        this.getUsers()
    }
}
</script>
<style>
    
</style>