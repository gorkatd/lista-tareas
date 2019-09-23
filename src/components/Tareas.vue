<template>
  <div>
    <h1>{{title}}</h1>
    <nueva-tarea></nueva-tarea>
    <div class="container mt-3">
        <div v-for="tarea in orderBy(tareas, 'createdOn') " :key="tarea.id"
            :class="['alert', tarea.completed ? 'alert-success' : 'alert-primary', 'alert-dismissible', 'fade', 'show']">
          <div class="d-flex justify-content-between">
            <div :style="{ 'text-decoration': estiloTarea(tarea.completed) }" > 
              {{tarea.nombre}}
            </div>
          
            <div>
              <button :class="['btn', 'btn-sm', tarea.completed ? 'btn-danger' : 'btn-success']" 
                        @click="cambiarEstado(tarea)">Ok</button>
              <button class="close" data-dismiss="alert"
                        @click="borrar(tarea.id)">
                        <span aria-hidden="true">&times;</span>
              </button>

            </div>
          </div>
        </div>
          
    </div>
  </div>
    
</template>

<script>
import NuevaTarea from './NuevaTarea.vue'
import {mapState} from 'vuex';
import Vue2Filters from 'vue2-filters'


export default {
  name: 'Tareas',
  props: {
    title: String
  },

  data() {
    return{
      tareas: [],

    }
  },
  components: {
    NuevaTarea
  },
  mixins: [Vue2Filters.mixin],
  computed: {
    ...mapState['db'],
    tareasOrdenadas(){
      return _.orderBy(this.tareas, 'createdOn');
    }
  },
  created () {
    this.$store.state.db.collection('tareas').onSnapshot(elem => {
        this.tareas = []
        elem.docs.forEach(doc => {
          this.tareas.push({id: doc.id, ...doc.data()});
        });
    })
  },
  methods: {
    estiloTarea(completed){
      return completed ? 'line-through' : 'none';
    },
    borrar(idTarea){
      console.log("Borrar : " + idTarea);
      this.$store.state.db.collection('tareas').doc(idTarea).delete()
      .then(function(){
        console.log("Documento borrado: " + idTarea);
       })
      .catch(function(error){
        console.log("Error borrando documento: " + idTarea );
        console.log(error);
      })
    },

    cambiarEstado(tarea){
      this.$store.state.db.collection('tareas').doc(tarea.id).set({completed: !tarea.completed}, {merge:true}); 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
