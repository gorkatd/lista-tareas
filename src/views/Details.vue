<template>
  <div id="app">
    <div class="container bg-light p-2">
      <Tareas :lista="list"></Tareas>
    </div>
    
  </div>
</template>



<script>
import Tareas from '../components/Tareas.vue'
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

export default {
  name: 'Details',
  components: {
    Tareas
  },
   created () {
  },
  computed:{
    list(){
      return this.$route.params.list;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
