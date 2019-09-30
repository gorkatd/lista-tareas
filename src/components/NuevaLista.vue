<template>
    <div class="container">
        <div class="form-row">
                <input type="text" class="form-control col-sm mb-2 mr-2" 
                id="nuevaLista" 
                placeholder="lista nueva a crear"
                v-model="nuevaLista"
                @keyup.enter="guardar">
                
                <button class="btn btn-primary col-xs-3 mb-2" @click="guardar" >Aceptar</button>
        </div>
    </div>
</template>




// <script>
import {mapState} from 'vuex';

export default {
  name: 'nueva-lista',
  
  data(){
      return{
        nuevaLista: ""
      }
  },

  computed:{
    ...mapState['db']
  },

  methods:{
      guardar(){
        if (this.nuevaLista != ""){
          this.$store.state.db.collection('listas').add({nombre: this.nuevaLista, createdOn: new Date()})
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });      

          this.nuevaLista="";  
        }
        
      }


  }
}
</script>