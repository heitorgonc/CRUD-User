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
export default {
    components:{
        WayUserRegister
    },
    methods:{
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
        clearForm(){
			const payload = {
                user: {name: '',email: ''}, id: null, mesages: []
            }
            this.$store.commit('clear', payload)
		},
        sucsMesage(){
            const mesage = {
                text: 'Save Success',
                type: 'success'
            }
            this.$store.commit('successMesage', mesage)
        },
        falMesage(){
            const mesage = {
                text: 'Save Error',
                type: 'danger'
            }
            this.$store.commit('faliedMesage', mesage)
        }
    },
    computed: {
        user: {
            get(){return this.$store.state.user},
            set(user){
                this.$store.commit('setUser', user)
            }
        },
        id:{
            get(){return this.$store.state.id}
        },
        mesages:{
            get(){return this.$store.state.mesages}
        },
    },
    beforeRouteLeave(to, from, next) {
        if( this.$store.state.user.name == '' && this.$store.state.user.email == '' ) {
            next()
        } else{
            if(confirm('all changes will be undone, do you want to leave now ?')) {
                next()
                this.clearForm()
            } else {
                next(false)
            }
            
        }
    }
}
</script>
<style>
    
</style>