import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import VueFirestore from 'vue-firestore';

// import Vue2Filters from 'vue2-filters'

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;
Vue.use(BootstrapVue);

// Vue.use(VueFirestore);
// Vue.use(Vue2Filters);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')



