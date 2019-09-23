<template>
  <div id="app">
    <div class="container bg-light p-2">
    </div>
      <h1>Listas</h1>
      <button class="btn btn-primary" @click="createList()"> Nueva Lista </button>
  </div>
</template>



<script>


export default {
  name: 'Listas',
  components: {
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
