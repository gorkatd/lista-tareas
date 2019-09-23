const state = {
    tareas: []
}

const mutations = {
    AÑADE_TAREA(state, tarea){
        state.tareas.push({id: tarea.id, ...tarea.data})            
    },

    VACIA_TAREAS(state){
        state.tareas = []
    },

    borrarTarea(state, index){
        state.tareas.splice(index, 1);
    },

    cambiarEstado(state, index){
        state.tareas[index].completed = !state.tareas[index].completed
    },
    cargaTareas(state, tareas){
        state.tareas = tareas;
    }
}

const actions = {
    guardarTarea({commit, rootState}, tarea){
        console.log("TODO - Guardar tarea: " + tarea);
        
        rootState.db.collection('tareas').add({nombre: tarea, completed:false, createdOn: new Date()})
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });      
    },

    borraTarea({commit, rootState}, idTarea){
        console.log("TODO - Borrar tarea: " + idTarea);
        rootState.db.collection('tareas').doc(idTarea).delete()
        .then(function(){
            console.log("Documento borrado: " + idTarea);
        })
        .catch(function(error){
            console.log("Error borrando documento: " + idTarea );
            console.log(error);
        })
    },

    cambiarEstado({commit, rootState}, tarea){
        console.log("TODO - cambiarEstado tarea: " + tarea.id);
        rootState.db.collection('tareas').doc(tarea.id).set({completed: !tarea.completed}, {merge:true});        
    }
}


export default { 
    namespaced: true, state, mutations, actions
  }