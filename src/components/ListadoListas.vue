<template>
  <div>
    <h1>{{title}}</h1>
    <NuevaLista></NuevaLista>
    <div class="container mt-3">
        <div v-for="lista in orderBy(listas, 'createdOn') " :key="lista.id"
            class="alert alert-primary alert-dismissible fade show"
            >
          <div class="d-flex justify-content-between" @click="navegarDetalle(lista.nombre)">
              <div> 
                {{lista.nombre}}
              </div>
            <div>
              <button class="close" data-dismiss="alert"
                        @click="borrar(lista.id)">
                        <span aria-hidden="true">&times;</span>
              </button>

            </div>
          </div>
        </div>
          
    </div>
  </div>
    
</template>

<script>
import NuevaLista from './NuevaLista.vue'
import {mapState} from 'vuex'
import Vue2Filters from 'vue2-filters'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default {
  name: 'ListadoListas',
  props: {
    title: 'Listas'
  },

  data() {
    return{
      listas: [],

    }
  },
  components: {
    NuevaLista
  },
  mixins: [Vue2Filters.mixin],
  computed: {
    ...mapState['db'],
    listasOrdenadas(){
      return _.orderBy(this.listas, 'createdOn');
    }
  },
  created () {
    this.$store.state.db.collection('listas').onSnapshot(elem => {
        this.listas = []
        elem.docs.forEach(doc => {
          this.listas.push({id: doc.id, ...doc.data()});
        });
    })
  },
  methods: {
    borrar(idLista){
      console.log("Borrar : " + idLista);
      this.$store.state.db.collection('listas').doc(idLista).delete()
      .then(function(){
        console.log("Documento borrado: " + idLista);
       })
      .catch(function(error){
        console.log("Error borrando documento: " + idLista );
        console.log(error);
      })
    },
    navegarDetalle(listName){
      this.$router.push({name:'details', params:{ listName } });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
