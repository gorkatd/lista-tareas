<template>
  <div>
    <h1>{{title}}</h1>
    <NuevaLista></NuevaLista>
    <div class="container mt-3">
        <div v-for="lista in orderBy(listas, 'createdOn') " :key="lista.id"
            class="alert alert-primary alert-dismissible fade show">
            <div class="d-flex justify-content-between" @click="navegarDetalle(lista)"> 
                  {{lista.nombre}}
            </div>
            <button class="close"
                          @click="borrarLista(lista)">
                          <span aria-hidden="true">&times;</span>
            </button>
        </div>
          
    </div>


  </div>
    
</template>

<script>
import NuevaLista from './NuevaLista.vue'
import {mapState, mapActions} from 'vuex'
import Vue2Filters from 'vue2-filters'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default {
  name: 'ListadoListas',
  props: {
    title: 'Listas'
  },
  components: {
    NuevaLista
  },
  mixins: [Vue2Filters.mixin],
  computed: {
    ...mapState({
      db: state => state.db,
      listas: state => state.listas.listas
    }),
    listasOrdenadas(){
      return _.orderBy(this.listas, 'createdOn');
    }
  },
  created () {
    this.$store.state.db.collection('listas').onSnapshot(elem => {
        this.vaciaListas();
        // this.$store.dispatch('listas/vaciaListas')
        elem.docs.forEach(doc => {
          this.añadeLista({id: doc.id, ...doc.data()});
        });
    })
  },
  methods: {
    ...mapActions({
      vaciaListas: 'listas/vaciaListas',
      añadeLista: 'listas/añadeLista',
      borraLista: 'listas/borraLista'
    }),
    borrarLista(lista){
      this.$bvModal.msgBoxConfirm(lista.nombre, {
          title: "Vas a borrar la lista y todas sus tareas",
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Confirmar',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(opcion => {
            if(opcion == true){
              console.log("borro la lista " +lista.id + '  ' + lista.nombre);
              this.borraLista(lista);
            }
          })
          .catch(err => {
            console.log(err);
          })

    },
    navegarDetalle(list){
      this.$router.push({name:'details', params:{ list } });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
