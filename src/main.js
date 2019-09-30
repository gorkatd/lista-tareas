import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// import VueFirestore from 'vue-firestore';

// import Vue2Filters from 'vue2-filters'

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;

// Vue.use(VueFirestore);
// Vue.use(Vue2Filters);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')



