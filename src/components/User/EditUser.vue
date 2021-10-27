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
        edit(id){
			this.id = id
            this.load = true
			this.user = { ...this.users[id]}
		},
        save(){
            const method = this.id ? 'patch' : 'post'
            const finalUrl = this.id ? `/${this.id}.json` : '.json'
            this.$http[method](`/users${finalUrl}`, this.user)
            .then( 
                () => {
                    this.sucsMesage()
                    setTimeout(
                        () => {
                            this.clearForm()
                            this.getAllUsers()
                            this.load = false
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
                            this.getAllUsers()
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
                text: 'Edit Success',
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
                text: 'Edit Error',
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