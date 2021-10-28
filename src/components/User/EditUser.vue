<template>
    <div class="container">
        <way-user-edit></way-user-edit>
        <b-alert show dismissible v-for="mesage in mesages" :key="mesage.text" :variant="mesage.type">
                {{mesage.text}}
        </b-alert>
        <b-card v-if="load">
            <b-form-group class="item form">
                <div class="label">What is your new Name ?</div>
                <b-form-input id="name" type="text" size="lg"
                    v-model="user.name"
                    placeholder="Name">
                </b-form-input>
            </b-form-group>
            <b-form-group class="item form">
                <div class="label">What is your new Email ?</div>
                <b-form-input id="email" type="text" size="lg"
                    v-model="user.email"
                    placeholder="Email">
                </b-form-input>
            </b-form-group>
            <b-button class="btn" @click.prevent="save" size="lg" variant="success">
                Save Changes
            </b-button>
        </b-card>
        <b-card v-else>
            <b-list-group class="lista">
                <b-list-group-item class="item" v-for="(user, id) in users" :key="id">
                    <div class="itemLabel"><strong>Name: </strong>{{user.name}}</div>
                    <div class="itemLabel"><strong>Email: </strong>{{user.email}}</div>
                    <div class="itemLabel"><strong>ID: </strong>{{id}}</div>
                    <b-button class="btn get" variant="warning" size="lg"
                        @click.prevent="edit(id)">Edit
                    </b-button>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </div>
</template>

<script>
import WayUserEdit from '../templates/way/user/WayUserEdit.vue'
import {mapActions} from 'vuex'

export default {
    data(){
        return{
            load: false
        }
    },
    components:{
        WayUserEdit
    },
    methods:{
        ...mapActions(['newMesageForm', 'clearForm']),
        edit(id){
			this.id = id
            this.load = true
			this.user = { ...this.users[id]}
		},
        save(){
            const finalUrl = this.id ? `/${this.id}.json` : '.json'
            this.$http.patch(`/users${finalUrl}`, this.user)
            .then( 
                () => {
                    this.successMesage()
                    this.clear()
                    setTimeout(() => {
                        this.load = false
                        this.getAllUsers()
                    }, 700)
                },
            )
            .catch(
                () => {
                    this.successMesage()
                    this.clear()
                },
            )
        },
        getAllUsers(){
            this.$http('users.json').then(res => {this.users = res.data})
        },
        successMesage(){
            const payload = {
                text: 'Changes Saved',
                type: 'success'
            }
            this.newMesageForm(payload)
        },
        faliedMesage(){
            const payload = {
                text: 'Edit Error',
                type: 'danger'
            }
            this.newMesageForm(payload)
        },
        clear(){
            const payload = {
                mesages: [],
                user: {email:'', name:''},
            }
            this.clearForm(payload)
        }
    },
    created(){
        this.getAllUsers()
    },
    computed:{
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
        users: {
            get(){
                return this.$store.state.users
            },
            set(users){
                this.$store.commit('setUsers', users)
            }
        },
        mesages: {
            get(){
                return this.$store.state.mesages
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        if(this.load) {
            if(confirm('all changes will be undone, do you want to leave now ?')) {
                next()
                this.clearForm()
            } else {
                next(false)
            }
        } else{
            next()
        }
    }
}
</script>

<style>
    
</style>