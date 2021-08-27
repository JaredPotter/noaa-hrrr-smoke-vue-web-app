import Vue from 'vue';
import VueRouter from 'vue-router';
import Forecast from '../components/Forecast.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/united-states',
  },
  {
    path: '/:area',
    component: Forecast,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
