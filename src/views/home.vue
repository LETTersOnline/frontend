<template>
  <div class="hello">
    <sui-grid class="container">
      <sui-grid-column class="eleven wide">

      </sui-grid-column>

      <sui-grid-column class="five wide">
        <side-hitokoto></side-hitokoto>
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SideHitokoto from '@/components/SideHitokoto';

export default {
  name: 'HelloWorld',
  components: { SideHitokoto },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      fetch: '',
    };
  },
  computed: mapGetters([
    'isAuthenticated',
  ]),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
