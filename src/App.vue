<template>
  <div id="app">
    <NavBar/>
    <MessageBlock
      :message="glob_message"
      @postMessage="glob_message = $event"/>
    <router-view @postMessage="glob_message = $event"/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable prefer-arrow-callback,func-names,no-console */
// TODO 把template改造为使用纯vue.js+semantic-ui, 不再使用sui扩展
// TODO 待改造: NavBar.vue Login.vue
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import MessageBlock from '@/components/MessageBlock';
import router from '@/router';

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
    // console.log('app created');
    // console.log(this.$store);
    console.log(router.currentRoute.path);
    this.$store.dispatch('AUTH_INSPECT', router.currentRoute.path);
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
