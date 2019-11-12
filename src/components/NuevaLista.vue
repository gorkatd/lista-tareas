<template>
    <div class="container pepe">
        <div class="form-row">
            <div class="input-group mb-3 col-12">
                <input type="text" class="form-control col-12 mb-1 col-md-11 mb-md-0 mr-sm-2" 
                id="nuevaLista" 
                placeholder="lista nueva a crear"
                v-model="nuevaLista"
                @keyup.enter="guardar">
                <!-- <div class="input-group-append col-xs-12"></div> -->
                  <button class="btn btn-primary col-12 col-md-1" @click="guardar" >Aceptar</button>
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>




// <script>
import {mapState, mapActions} from 'vuex';

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
      ...mapActions({
        crearLista: 'listas/crearLista'
      }),
      guardar(){
        if (this.nuevaLista != ""){
          console.log("en guardar");
          this.crearLista(this.nuevaLista);

          this.nuevaLista="";  
        }
        
      }


  }
}
</script>