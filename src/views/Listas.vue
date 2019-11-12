<template>
  <div class="container bg-light p-2">
    <h1>Listas</h1>
    <listado-listas></listado-listas>
  </div>
</template>



<script>

import ListadoListas from '../components/ListadoListas.vue'

export default {
  name: 'Listas',
  components: {
    ListadoListas
  },
   created () {

  },
  methods:{
    createList(){
      console.log("createList");
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
