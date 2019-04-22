import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './axiosConfig';

Vue.config.productionTip = false;

Vue.filter('date', function (value) {
  return new Date(value).toLocaleDateString();
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
