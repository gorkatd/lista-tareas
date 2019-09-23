import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './firebase';


Vue.use(Vuex)


const state = {
    db: db
}

export default new Vuex.Store({
    state  
})
