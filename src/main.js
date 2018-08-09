/* eslint-disable no-console */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 导入外部包
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import 'highlight.js/styles/xcode.css';
import Avatar from 'vue-avatar';
import VueHighlightJS from 'vue-highlightjs';

// 导入内部资源
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);

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

Vue.axios.interceptors.response.use(
  response => response,
  (error) => {
    // Do something with response error
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('AUTH_LOGOUT');
          // 只有在当前路由不是登录页面才跳转
          if (router.currentRoute.path !== 'login') {
            router.push({ name: 'login', query: { redirect: router.currentRoute.path } });
          }
          break;
        case 403:
          // forbid
          router.push({ name: 'forbid' });
          break;
        case 404:
          // not found
          router.push({ name: 'notFound' });
          break;
        default: break;
      }
    }
    return Promise.reject(error);
  },
);

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

