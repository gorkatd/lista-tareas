<template>
  <div id="app">
    <div class="container bg-light p-2">
      <Tareas></Tareas>
    </div>
    
  </div>
</template>



<script>
import Tareas from '../components/Tareas.vue'


export default {
  name: 'Listas',
  components: {
    Tareas
  },
   created () {

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
