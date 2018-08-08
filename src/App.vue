<template>
  <div id="app">
    <NavBar></NavBar>
    <MessageBlock v-bind:message="glob_message"
                  v-on:postMessage="glob_message = $event"></MessageBlock>
    <router-view v-on:postMessage="glob_message = $event"/>
    <Footer></Footer>
  </div>
</template>

<script>
/* eslint-disable prefer-arrow-callback,func-names */
// TODO 把template改造为使用纯vue.js+semantic-ui, 不再使用sui扩展
// TODO 待改造: NavBar.vue Login.vue
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import MessageBlock from '@/components/MessageBlock';
import Vue from 'vue';

export default {
  name: 'App',
  components: { MessageBlock, Footer, NavBar },
  data() {
    return {
      glob_message: '',
    };
  },
  methods: {

  },
  created() {
    Vue.axios.interceptors.response.use(function (response) {
      // Do something with response data
      return response;
    }, function (error) {
      // Do something with response error
      if (error.status === 401 && error.config) {
        this.$store.dispatch('AUTH_LOGOUT').then();
        this.$route.push('/login');
      }
      return Promise.reject(error);
    });
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
