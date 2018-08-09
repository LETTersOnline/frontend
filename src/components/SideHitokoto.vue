<template>
  <div>
    <h4 class="ui top attached block header">一言
      <sui-dropdown>
        {{ this.hitokotoState }}
        :)
        <sui-dropdown-menu >
          <sui-dropdown-item v-for="(item, index) in type"
                             :key="item"
                             :content="item"
                             @click="select(index)"
          >
            {{ index }}
          </sui-dropdown-item>
        </sui-dropdown-menu>
      </sui-dropdown>
    </h4>
    <div class="ui bottom attached center aligned segment">
      <div class="ui centered inline loader" v-bind:class="loading ? 'active' : '' "></div>
      <div style="font-size: 1em; line-height: 1.5em;">{{ this.content }}</div>
      <div style="text-align: right; margin-top: 15px; font-size: 0.9em; color: rgb(102, 102, 102);"
           v-if="!!this.author">{{ this.author }}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */

import api from '@/api';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'SideHitokoto',
  data() {
    return {
      loading: true,
      author: '',
      content: '',
      type: api.hitokoto_type,
    };
  },
  computed: {
    ...mapState({
      hitokotoState: 'hitokoto',
    }),
  },
  methods: {
    ...mapMutations([
      'SET_HITOKOTO',
    ]),

    getHitokoto(cat) {
      this.loading = true;
      this.author = '';
      this.content = '';
      api.hitokoto(cat)
        .then(req => req.data)
        .catch((error) => {
          console.log(error);
        })
        .then((dat) => {
          if (dat) {
            this.content = dat.hitokoto;
            this.author = 'from' in dat ? `-- ${dat.from}` : '';
          }
        })
        .finally(() => {
          this.loading = false;
        })
      ;
    },
    select(name) {
      const sel = api.hitokoto_type.name;
      this.SET_HITOKOTO(name);
      this.getHitokoto(sel);
    },
  },
  created() {
    const sel = api.hitokoto_type.hitokotoState;
    this.getHitokoto(sel);
  },
};
</script>

<style scoped>

</style>
