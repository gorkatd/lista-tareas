<template>
  <div>
    <div class="row mb-1 align-items-center">      
      <h1 class="col-sm-10">{{lista.nombre}}</h1>
    </div>
    
    <nueva-tarea :list="lista.nombre"></nueva-tarea>
    <div class="container mt-3">
        <div v-for="tarea in orderBy(tareas, 'createdOn') " :key="tarea.id"
            :class="['alert', tarea.completed ? 'alert-success' : 'alert-primary', 'alert-dismissible', 'fade', 'show']">
          <div class="d-flex justify-content-between">
            <div>
              <div :style="{ 'text-decoration': estiloTarea(tarea.completed) }" > 
                {{tarea.nombre}}
              </div>
            </div>
          
            <div> 
              <button class="btn btn-sm btn-info mr-1"
                @click="abreEditarTareaModal(tarea.id)">
                Editar
              </button>
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


    <div class="container">
    <div class="form-row mb-1 align-items-center justify-content-end">
        <button class="btn btn-primary col-12 col-md-auto mr-md-2 mb-1 mb-md-0" @click="$router.go(-1)" > Volver </button>

        <button class="btn btn-danger col-12 col-md-auto" @click="borrarCompletados"> Borrar completados </button>     
      
    </div>
    </div>



<!-- MODAL -->
    <div>
      <b-modal id="modalEditaTarea" 
              title="Edición de Tarea"
              @ok="modalOK">
        <div class="form-group">
          <label for="nombreTarea">Descripción de la tarea</label>
          <input type="text" 
                class="form-control" 
                id="nombreTarea"
                v-model="editTarea.nombre">
        </div>



        <div class="form-group">
          <label>Mover de lista</label>
          <select class="form-control" v-model="editTarea.list">
            <option v-for="lista in listas"
              :value="lista.nombre">{{lista.nombre}}</option>
          </select>
        </div>

      </b-modal>
    </div>

  </div>

  
    
</template>

<script>
import NuevaTarea from './NuevaTarea.vue'
import {mapState} from 'vuex';
import Vue2Filters from 'vue2-filters'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);


export default {
  name: 'Tareas',
  props: {
    lista: {}
  },

  data() {
    return{
      tareas: [],
      editTarea: {},
      bckTarea: {}
    }
  },
  components: {
    NuevaTarea
  },
  mixins: [Vue2Filters.mixin],
  computed: {
    ...mapState({
      db: state => state.db,
      listas: state => state.listas.listas
    }),
    tareasOrdenadas(){
      return _.orderBy(this.tareas, 'createdOn');
    }
  },
  created () {
    this.$store.state.db.collection('tareas').where("list" ,"==", this.lista.nombre).onSnapshot(elem => {
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
    },

    abreEditarTareaModal(idTarea){
      for (var i in this.tareas)
      {
        if(this.tareas[i].id == idTarea){
          this.editTarea = {...this.tareas[i]};
          this.bckTarea = {...this.tareas[i]};
          break;
        }   
      }
      this.$bvModal.show('modalEditaTarea');
    },

    modalOK(){
      if(this.bckTarea.list != this.editTarea.list || this.bckTarea.nombre != this.editTarea.nombre){
        this.$store.state.db.collection('tareas')
              .doc(this.editTarea.id)
              .set(
                  {nombre: this.editTarea.nombre,
                   list: this.editTarea.list},
                  {merge:true});
      this.editTarea={};
      this.bckTarea={}; 
      }
    },

    borrarCompletados(){
      var completados = [];
      this.tareas.forEach(function(tarea){
        if (tarea.completed == true){
          completados.push(tarea.id);
        }
      });

      completados.forEach(this.borrar);
      
    }


  }
}
</script>

