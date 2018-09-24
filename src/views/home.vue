<template>
  <div class="hello">
    <sui-grid class="container">
      <sui-grid-column class="eleven wide">
        <sui-grid-row>
          <div class="ui huge header left aligned">
            <a href="">
              Title
            </a></div>
        </sui-grid-row>
        <sui-grid-row>
          <user-full-rank :page="page_num" style="padding-top: 20px;"></user-full-rank>
        </sui-grid-row>
      </sui-grid-column>

      <sui-grid-column class="five wide">
        <side-hitokoto></side-hitokoto>
        <user-rank :page="page_num" style="padding-top: 20px;"></user-rank>
      </sui-grid-column>

    </sui-grid>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SideHitokoto from '@/components/SideHitokoto';
  import UserRank from '@/components/UserMiniRank';
  import UserFullRank from '@/components/UserRank';

  export default {
  name: 'HelloWorld',
    components: { SideHitokoto, UserRank, UserFullRank },
  data() {
    return {
      page_num: 1,
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
