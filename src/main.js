// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 导入外部包
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import Avatar from 'vue-avatar';

// 导入内部资源
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 配置axios全局绑定
Vue.use(VueAxios, axios);

// 配置axios的默认前缀
Vue.axios.defaults.baseURL = '/api';

// 配置semantic-ui
Vue.use(SuiVue);

// 配置vuex
Vue.use(Vuex);

Vue.component('avatar', Avatar);

const token = localStorage.getItem('user-token');
if (token) {
  Vue.axios.defaults.headers.Authorization = token;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App,
  },
  template: '<App/>',
});
