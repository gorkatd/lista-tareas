<template>
  <div>
    <h1>{{title}}</h1>
    <nueva-tarea></nueva-tarea>
    <div class="container mt-3">
        <div v-for="tarea in orderBy(tareas, 'createdOn') " :key="tarea.id"
            :class="['alert', tarea.completed ? 'alert-success' : 'alert-primary', 'alert-dismissible', 'fade', 'show']">
          <div class="d-flex justify-content-between">
            <div> 
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
import {mapState, mapActions} from 'vuex';
import Vue2Filters from 'vue2-filters'


export default {
  name: 'Tareas',
  props: {
    title: String
  },
  components: {
    NuevaTarea
  },
  mixins: [Vue2Filters.mixin],
  computed: {
    ...mapState({
      tareas: state => state.tareas.tareas
    }),
    tareasOrdenadas(){
      return _.orderBy(this.tareas, 'createdOn');
    }
  },
  created () {
    this.$store.state.db.collection('tareas').onSnapshot(elem => {
        this.$store.commit('tareas/VACIA_TAREAS')
        elem.docs.forEach(doc => {
          this.$store.commit('tareas/AÑADE_TAREA', {id: doc.id, data: doc.data()})
        });
    })
  },
  methods: {
    borrar(idTarea){
      console.log("Borrar : " + idTarea);
      this.$store.dispatch('tareas/borraTarea', idTarea)
    },

    cambiarEstado(tarea){
      this.$store.dispatch('tareas/cambiarEstado', tarea)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
