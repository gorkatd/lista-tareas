<template>
    <div class="container">
        <div class="form-row">
                <input type="text" class="form-control col-sm mb-2 mr-2" 
                id="nuevaTarea" 
                placeholder="Introduce una tarea nueva"
                v-model="nuevaTarea"
                @keyup.enter="guardar">
                
                <button class="btn btn-primary col-xs-3 mb-2" @click="guardar" >Aceptar</button>
        </div>
    </div>
</template>




// <script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'nueva-tarea',
  data(){
    return {
      nuevaTarea: ""
    }
    
  },

  methods:{
      ...mapActions(['guardarTarea']),
      guardar(){
        if (this.nuevaTarea != ""){
          this.$store.dispatch('tareas/guardarTarea', this.nuevaTarea)
          this.nuevaTarea="";  
        }
        
      }


  }
}
</script>