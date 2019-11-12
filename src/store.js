import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './firebase';
import listas from './store/listas'
import tareas from './store/tareas'


Vue.use(Vuex)


const state = {
    db: db
}

export default new Vuex.Store({
    state,
    modules:{
        listas,
        tareas
    }
})
