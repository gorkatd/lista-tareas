import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

export default new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'listas',
            component: () => import(/* webpackChunkName: "about" */ './views/Listas.vue')
        },
        {
            path: '/details/:list',
            name: 'details',
            component: () => import(/* webpackChunkName: "about" */ './views/Details.vue')
        }
    ]
});