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
import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'

export default {
    components:{
        WayUserExclude
    },
    methods:{
        ...mapMutations('exclude', ['setUsers', 'setUser']),
        ...mapActions('exclude',['newMesageForm', 'clearForm']),
        exclude(id){
            this.$http.delete(`/users/${id}.json`)
                .then( 
                    () => {
                        this.successMesage(),
                        this.clear(),
                        setTimeout(
                            () => {
                                this.getAllUsers()
                            }, 700
                        )
                    },
                )
                .catch(
                    () => { 
                        this.faliedMesage(),
                        this.clear(),
                        setTimeout(
                            () => {
                                this.getAllUsers()
                            }, 700
                        )
                    },
                )
        },
        getAllUsers(){
            this.$http('users.json').then(res => {this.users = res.data})
        },
        clear(){
			const payload = {
                mesages: [],
            }
            this.clearForm(payload)
		},
        successMesage(){
            const payload = {
                text: 'Exclude Success',
                type: 'success'
            }
            this.newMesageForm(payload)
        },
        faliedMesage(){
            const payload = {
                text: 'Exclude Error',
                type: 'danger'
            }
            this.newMesageForm(payload)
        }
    },
    created(){
        this.getAllUsers()
    },
    computed: {
        users: {
            get(){
                return this.$store.state.exclude.users
            },
            set( users){
                this.setUsers(users)
            }
        },
        user: {
            get(){
                return this.$store.state.exclude.user
            },
            set( user){
                this.setUser(user)
            }
        },
        id:{
            get(){
                return this.$store.state.exclude.id
            }
        },
        mesages:{
            get(){
                return this.$store.state.exclude.mesages
            }
        }
    },
}
</script>
<style>
    
</style>