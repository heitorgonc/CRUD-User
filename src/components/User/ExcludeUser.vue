<template>
    <div class="container">
        <way-user-exclude></way-user-exclude>
        <b-alert show dismissible v-for="mesage in mesages" :key="mesage.text" :variant="mesage.type">
                {{mesage.text}}
            </b-alert>
        <b-card>
            <b-list-group class="lista">
                <b-list-group-item class="item" v-for="(user, id) in users" :key="id">
                    <div class="itemLabel"><strong>Name: </strong>{{user.name}}</div>
                    <div class="itemLabel"><strong>Email: </strong>{{user.email}}</div>
                    <div class="itemLabel"><strong>ID: </strong>{{id}}</div>
                    <b-button class="btn get" variant="danger" size="lg"
                        @click="exclude(id)">Exclude
                    </b-button>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </div>
</template>
<script>
import WayUserExclude from '../templates/way/user/WayUserExclude.vue'

export default {
    components:{
        WayUserExclude
    },
    methods:{
        exclude(id){
            this.$http.delete(`/users/${id}.json`)
                .then( 
                    () => {
                        this.sucsMesage()
                        setTimeout(
                            () => {
                                this.clearForm()
                                this.getAllUsers()
                            }, 
                            600
                        )
                    },
                )
                .catch(
                    () => { 
                        this.falMesage() 
                        setTimeout(
                            () => {
                                this.clearForm()
                            }, 
                            600
                        )
                    },
                )
        },
        getAllUsers(){
            this.$http('users.json').then(res => {this.users = res.data})
        },
        sucsMesage(){
            const mesage = {
                text: 'Exclude Success',
                type: 'success'
            }
            this.$store.commit('successMesage', mesage)
        },
        clearForm(){
			const payload = {
                user: {name: '',email: ''}, id: null, mesages: []
            }
            this.$store.commit('clear', payload)
		},
        falMesage(){
            const mesage = {
                text: 'Exclude Error',
                type: 'danger'
            }
            this.$store.commit('faliedMesage', mesage)
        }
    },
    created(){
        this.getAllUsers()
    },
    computed: {
        users: {
            get(){
                return this.$store.state.users
            },
            set(users){
                this.$store.commit('setUsers', users)
            }
        },
        user: {
            get(){
                return this.$store.state.user
            },
            set(user){
                this.$store.commit('setUser', user)
            }
        },
        id:{
            get(){
                return this.$store.state.id
            },
            set(id){
                this.$store.commit('setId', id)
            }
        },
        mesages:{
            get(){
                return this.$store.state.mesages
            },
            set(mesages){
                this.$store.commit('setMesages', mesages)
            }
        }
    },
}
</script>
<style>
    
</style>