import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './firebase';
import tareas from './store/tareas'


Vue.use(Vuex)


const state = {
    db: db
}

export default new Vuex.Store({
    state,
    modules:{
        tareas
    }    
})
