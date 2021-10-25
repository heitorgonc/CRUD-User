<template>
    <div class="container">
        <b-card>
            <b-form-group>
                <div class="label">What is your Name ?</div>
                <b-form-input type="text" size="lg"
                    v-model="user.name"
                    placeholder="Name">
                </b-form-input>
            </b-form-group>
            <b-form-group >
                <div class="label">What is your Email ?</div>
                <b-form-input type="text" size="lg"
                    v-model="user.email"
                    placeholder="Email">
                </b-form-input>
            </b-form-group>
            <b-button class="btn" @click="save"
                size="lg" variant="success">
                Save
            </b-button>
        </b-card>
        <b-alert show dismissible v-for="mesage in mesages" :key="mesage.text" :variant="mesage.type">
            {{mesage.text}}
        </b-alert>
    </div>
</template>
<script>

export default {
    data(){
        return{
            users: [],
            id: null,
            user:{
                name: '',
                email:'',
            },
            mesages: []
        }
    },
    methods:{
        save(){
            const method = this.id ? 'patch' : 'post'
            const finalUrl = this.id ? `/${this.id}.json` : '.json'
            this.$http[method](`/users${finalUrl}`, this.user)
                .then( function () {
                    this.mesages.push({
                        text: 'Save Success',
                        type:'success'
                    })
                    this.clear()
                })
                .catch(() => {
                    this.mesages.push({
                        text: 'Save Error',
                        type:'danger'
                    })
                    this.clear()
                })
        },
        clear(){
			this.user.name = ''
			this.user.email = ''
			this.id = null
			this.mesages = []
		},
    }
}
</script>
<style>
    
</style>