<template>
    <div class="container">
        <way-user-register></way-user-register>
        <b-alert show dismissible v-for="mesage in mesages" :key="mesage.text" :variant="mesage.type">
            {{mesage.text}}
        </b-alert>
        <b-card>
            <b-form-group class="item form">
                <div class="label">What is your Name ?</div>
                <b-form-input id="name" type="text" size="lg"
                    v-model="user.name" 
                    placeholder="Name">
                </b-form-input>
            </b-form-group>
            <b-form-group class="item form">
                <div class="label">What is your Email ?</div>
                <b-form-input id="email" type="text" size="lg"
                    v-model="user.email"
                    placeholder="Email">
                </b-form-input>
            </b-form-group>
            <b-button class="btn" @click="save" size="lg" variant="success">
                Save
            </b-button>
        </b-card>
    </div>
</template>
<script>
import WayUserRegister from '../templates/way/user/WayUserRegister.vue'
import {mapActions} from 'vuex'

export default {
    components:{
        WayUserRegister
    },
    methods:{
        ...mapActions('register', ['newMesageForm', 'clearForm']),
        save(){
            const finalUrl = this.id ? `/${this.id}.json` : '.json'
            this.$http.post(`/users${finalUrl}`, this.user)
            .then( 
                () => {
                    this.successMesage(),
                    this.clear()
                },
            )
            .catch(
                () => {
                    this.faliedMesage()
                    this.clear()
                },
            )
        },
        clear(){
            const payload = {
                user:{
                    name: '',
                    email:'',
                },
                mesages: []
            }
            this.clearForm(payload)
        },
        successMesage(){
            const payload = {
                text: 'Save Success',
                type: 'success'
            }
            this.newMesageForm(payload)
        },
        faliedMesage(){
            const payload = {
                text: 'Save Error',
                type: 'danger'
            }
            this.newMesageForm(payload)
        }
    },
    computed:{
        user: {
            get(){
                return this.$store.state.register.user
            }
        },
        id:{
            get(){
                return this.$store.state.register.id
            }
        },
        mesages: {
            get(){
                return this.$store.state.register.mesages
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        if( this.user.name == '' && this.user.email == '' ) {
            next()
        } else{
            if(confirm('all changes will be undone, do you want to leave now ?')) {
                next()
                this.clear()
            } else {
                next(false)
            }
            
        }
    }
}
</script>