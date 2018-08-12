<template>
  <sui-grid :columns="3" class="container">
    <sui-dimmer inverted v-bind:class="loading">
      <sui-loader></sui-loader>
    </sui-dimmer>
    <sui-grid-row stretched v-if="user">
      <sui-grid-column>
            <sui-card>
              <sui-dimmer-dimmable
                @mouseenter.native="cardActive = true"
                @mouseleave.native="cardActive = false">
                <sui-image v-bind:src="user.avatar ?
                  user.avatar : iconTestPath "></sui-image>
                <sui-dimmer blurring :active="onCardActive">
                  <sui-button inverted>Edit Profile</sui-button>
                </sui-dimmer>
              </sui-dimmer-dimmable>
              <sui-card-content>
                <sui-card-header>{{ user.username }}</sui-card-header>
                <sui-card-meta>Created in {{ user.date_joined }}</sui-card-meta>
                <sui-card-meta>Last Seen {{ user.date_active }}</sui-card-meta>
              </sui-card-content>
              <sui-card-content extra>
                <sui-statistics-group class="mini three">
                  <sui-statistic>
                    <sui-statistic-value>{{ user.accepted_number }}</sui-statistic-value>
                    <sui-statistic-label>Accepted</sui-statistic-label>
                  </sui-statistic>
                  <sui-statistic>
                    <sui-statistic-value>{{ user.submission_number }}</sui-statistic-value>
                    <sui-statistic-label>Submitted</sui-statistic-label>
                  </sui-statistic>
                  <sui-statistic>
                    <sui-statistic-value>{{ user.total_score }}</sui-statistic-value>
                    <sui-statistic-label>Score</sui-statistic-label>
                  </sui-statistic>
                </sui-statistics-group>
              </sui-card-content>
            </sui-card>
      </sui-grid-column>
      <sui-grid-column class="left aligned">
        <sui-grid-row>
          <h4 class="ui top attached block header">Information</h4>
          <div class="ui bottom attached segment">
            <a class="ui red ribbon label"
               v-clipboard:copy="user.uid"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">UID</a>
              <div class="ui tag label">
                {{ user.uid }}
              </div>
            <p></p>
            <a class="ui orange ribbon label"
               v-clipboard:copy="user.email"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">Email</a>
              <div class="ui tag label">
                {{ user.email }}
              </div>
            <p></p>
            <a class="ui yellow ribbon label"
               v-clipboard:copy="user.major"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">Major</a>
              <div class="ui tag label">
               {{ user.major }}
              </div>
            <p></p>
            <a class="ui olive ribbon label"
               v-clipboard:copy="user.school"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">School</a>
              <div class="ui tag label">
                {{ user.school }}
              </div>
            <p></p>
            <a class="ui green ribbon label"
               v-clipboard:copy="user.fullname"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">Fullname</a>
              <div class="ui tag label">
               {{ user.fullname }}
              </div>
            <p></p>
            <a class="ui blue ribbon label">User Role</a>
            <sui-icon name="star"
                      v-for="id in user.user_type"
                      v-bind:key="id"
            ></sui-icon>
          </div>
        </sui-grid-row>
        <sui-grid-row>
          <h4 class="ui top attached block header">Mood</h4>
          <div class="ui bottom attached segment">
            {{ user.mood }}
          </div>
        </sui-grid-row>
      </sui-grid-column>
      <sui-grid-column class="left aligned">
        <sui-grid-row>
          <h4 class="ui top attached block header">Statics</h4>
          <div class="ui bottom attached segment">
            Some Statics For User Solve here
          </div>
        </sui-grid-row>
      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>
</template>

<script>
/* eslint-disable no-alert,no-console */

import { mapGetters } from 'vuex';
import API from '@/api';

import PIC from '@/assets/default-user-image.png';

export default {
  name: 'Profile',
  data() {
    return {
      user: null,
      loading: '',
      cardActive: false,
      iconTestPath: PIC,
    };
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'username',
      'useravatar',
      'userid',
    ]),
    onCardActive() {
      return this.cardActive && this.isAuthenticated && (this.userid === this.$route.params.id);
    },
  },
  methods: {
    getUser() {
      this.loading = 'active';
      this.user = null;
      API.get_user_info(this.$route.params.id).then((req) => {
        console.log(req.data);
        this.user = req.data;
      }).catch((err) => {
        console.log(err);
        // this.$route.push('/');
      }).finally(() => {
        this.loading = '';
      });
    },
    onCopy(e) {
      const title = e.trigger.innerText;
      this.$emit('postMessage', ` ${title} copied`);
    },
    onError() {
      alert('Failed to copy texts');
    },
  },
  created() {
    this.getUser();
  },


};
</script>

<style scoped>

</style>
