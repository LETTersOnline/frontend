<template>
  <div>
    <h4 class="ui top attached block left aligned header">→ Rank</h4>
    <div class="ui bottom attached center aligned segment">
      <sui-table class="very basic center aligned fixed single line">
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell class="one wide">#</sui-table-header-cell>
            <sui-table-header-cell class="five wide">Nickname</sui-table-header-cell>
            <sui-table-header-cell>Mood</sui-table-header-cell>
            <sui-table-header-cell class="four wide">Score</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row
            v-for="(item, index) in users"
            v-bind:key=item.id
          >
            <sui-table-cell>{{st_rank + index}}</sui-table-cell>
            <sui-table-cell>
              <div class="ui">
                <div class="ui grid">
                  <router-link :to="{ name: 'profile', params: { id: item.id }}"
                               style="color: inherit;">
                    <avatar v-bind:username="item.profile.nickname"
                            v-bind:size="avatar_size"
                            v-bind:src="item.profile.avatar">
                    </avatar>
                    <!--{{item.profile.nickname}}-->
                  </router-link>
                  <router-link :to="{ name: 'profile', params: { id: item.id }}"
                               style="color: inherit; padding-top: 5px;">
                    {{item.profile.nickname}}
                  </router-link>
                </div>
              </div>
            </sui-table-cell>
            <sui-table-cell>
              <div class="ui grid container" style="max-height: 50px;">
                <vue-markdown style="overflow: auto;"
                              :source="item.profile.mood">
                </vue-markdown>
              </div>
            </sui-table-cell>
            <sui-table-cell>{{item.profile.total_score}}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </div>
  </div>
</template>

<script>
  import API from '@/api';
  import VueMarkdown from 'vue-markdown';

  export default {
    name: 'UserRank',
    components: {
      VueMarkdown,
    },
    props: ['page'],
    data() {
      return {
        avatar_size: 24,
        users: [],
        cur: 0,
        total: 0,
        prev: 0,
        next: 0,
        loading: '',
        st_rank: 0,
      };
    },
    methods: {
      getUsers() {
        this.loading = 'active';
        this.user = null;
        API.get_user_list(this.page)
          .then((req) => {
            this.users = req.data.results;
            this.cur = req.data.number;
            this.total = req.data.count;
            this.prev = req.data.previous;
            this.next = req.data.next;
            this.st_rank = 1;
            this.st_rank += (this.cur - 1) * req.data.size;
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
          })
          .finally(() => {
            this.loading = '';
          });
      },
    },
    created() {
      this.getUsers();
    },
  };
</script>

<style scoped>

</style>
