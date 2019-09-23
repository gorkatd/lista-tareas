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
import {mapState} from 'vuex';

export default {
  name: 'nueva-tarea',
  
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
          this.$store.state.db.collection('tareas').add({nombre: this.nuevaTarea, completed:false, createdOn: new Date()})
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