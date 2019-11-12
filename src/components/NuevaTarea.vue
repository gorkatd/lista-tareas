<template>
    <div class="container">
        <div class="form-row input-group">
                <input type="text" class="form-control col-12 mb-1 col-md-11 mb-md-0 mr-md-1" 
                id="nuevaTarea" 
                placeholder="Introduce una tarea nueva"
                v-model="nuevaTarea"
                @keyup.enter="guardar">
                
                <button class="btn btn-primary col-12 col-md-1 mb-2" @click="guardar" >Aceptar</button>
        </div>
    </div>
</template>




// <script>
import {mapState} from 'vuex';

export default {
  name: 'nueva-tarea',
  props:{
    list: String
  },
  
  data(){
      return{
        nuevaTarea: ""
      }
  },

  computed:{
    ...mapState['db']
  },

  methods:{
      guardar(){
        if (this.nuevaTarea != ""){
          this.$store.state.db.collection('tareas')
          .add({nombre: this.nuevaTarea, completed:false, list: this.list, createdOn: new Date()})
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });      

          this.nuevaTarea="";  
        }
        
      }


  }
}
</script>