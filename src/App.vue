<template>
  <div id="app">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/templates/menus/Menu.vue'
export default{
  components:{
    Menu
  }
}
</script>