// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import uploader from 'vue-simple-uploader'
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import Snotify from 'vue-snotify'; // 1. Import Snotify


Vue.use(Snotify, {

});
Vue.use(BootstrapVue);
Vue.use(uploader);
axios.defaults.baseURL = 'http://127.0.0.1:4800';
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
