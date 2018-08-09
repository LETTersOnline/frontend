<template>
  <div class="ui container grid" id="nav-bar">
    <sui-menu :fixed="true" :borderless="true">
      <sui-dimmer inverted v-bind:class="menu_loading">
        <sui-loader></sui-loader>
      </sui-dimmer>
      <sui-container>
        <a is="sui-menu-item">
          <img src="../assets/icpclogo/icpc_logo.png">
        </a>
        <router-link
          is="sui-menu-item"
          exact-active-class="active"
          v-for="(item, index) in items"
          :key="item"
          :content="item"
          v-bind:to="links[index]"
          @click="select(item)"
          >
          <sui-icon v-bind:name="icons[index]"></sui-icon>
          {{item}}
        </router-link>
        <sui-dropdown item icon="wrench" simple>
          More
          <sui-dropdown-menu >
            <sui-dropdown-item>Open</sui-dropdown-item>
            <sui-dropdown-item>Save...</sui-dropdown-item>
            <sui-dropdown-item>Edit Permissions</sui-dropdown-item>
            <sui-dropdown-divider></sui-dropdown-divider>
            <sui-dropdown-header>Export</sui-dropdown-header>
            <sui-dropdown-item>Share</sui-dropdown-item>
          </sui-dropdown-menu>
        </sui-dropdown>
        <sui-menu-menu position="right">
          <sui-menu-item>
            <sui-input transparent icon="search" placeholder="Search something..."></sui-input>
          </sui-menu-item>
          <sui-menu-item v-if="!isAuthenticated">
            <router-link to="/login" tag="sui-button" style="margin-right: 0.5em;">
              Login
            </router-link>
            <!--<sui-button-or></sui-button-or>-->
            <router-link to="/register" tag="sui-button" class="primary">
              Register
            </router-link>
          </sui-menu-item>

          <div class="ui simple dropdown item" v-else>
            <router-link :to="{ name: 'profile', params: { id: userid }}"
                         style="color: inherit; padding-left: 10px">
              <avatar v-bind:username="username"
                      v-bind:size="avatar_size"
                      v-bind:src="useravatar">
              </avatar>
            </router-link>

            <router-link :to="{ name: 'profile', params: { id: userid }}"
                         style="color: inherit; padding-left: 10px">
                {{username}}
              <i class="dropdown icon"></i>
            </router-link>
            <div class="menu">
              <a class="item" href=""><i class="edit icon"></i>Edit</a>
              <a class="item" v-on:click="logout"><i class="power icon"></i>Logout</a>
            </div>
          </div>
        </sui-menu-menu>
      </sui-container>
    </sui-menu>
  </div>

</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      active: 'Home',
      menu_loading: '',
      items: ['Home', 'Problem', 'Contest', 'Status', 'Rank'],
      icons: ['home', 'list', 'calendar', 'tasks', 'signal'],
      links: ['/', '#', '#', '#', '#'],
      avatar_size: 24,
    };
  },
  methods: {
    select(name) {
      this.active = name;
      this.menu_loading = 'active';
    },
    logout() {
      this.$store.dispatch('AUTH_LOGOUT')
        .then(() => {
          this.$router.push('/login');
        });
    },
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'username',
      'useravatar',
      'userid',
    ]),
  },
};
</script>

<style scoped>
</style>
