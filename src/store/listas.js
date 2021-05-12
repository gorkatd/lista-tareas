const state = {
    listas: []
}

const mutations = {
    CARGA_LISTAS(state, tareas){
        state.listas = listas;
    },

    VACIA_LISTAS(state){
        state.listas=[];
    },

    AÑADE_LISTA(state, lista){
        state.listas.push(lista);
    }

}

const actions = {

    cargaListas({commit, rootState}, listas){
        commit('CARGA_LISTAS', listas);
    },

    vaciaListas({commit}){
        commit('VACIA_LISTAS');
    },

    añadeLista({commit}, lista){
        commit('AÑADE_LISTA', lista);
    },

    borraLista({dispatch, rootState}, lista){
        console.log("Voy a borrar: " + lista.id);
        dispatch('borraTareasLista', lista);
        rootState.db.collection('listas').doc(lista.id).delete()
        .then(function(){
            console.log("Documento borrado: " + lista.id);
        })
        .catch(function(error){
            console.log("Error borrando documento: " + lista.id );
            console.log(error);
        })
    },

    borraTareasLista({dispatch, rootState}, lista){
        console.log("Voy a borrar tareas de la lista");
        rootState.db.collection('tareas').where("list", "==", lista.nombre)
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                dispatch('tareas/borraTarea', doc.id, {root: true});
            })
        })
    },

    crearLista({rootState}, nuevaLista){
        rootState.db.collection('listas').add({nombre: nuevaLista, createdOn: new Date()})
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
    }
}


export default { 
    namespaced: true, state, mutations, actions
  }