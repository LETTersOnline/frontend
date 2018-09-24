<template>
  <sui-grid :columns="2" class="container">
    <sui-dimmer inverted v-bind:class="loading">
      <sui-loader></sui-loader>
    </sui-dimmer>
    <sui-grid-row v-if="user">
      <sui-grid-column class="five wide">
        <sui-grid-row>
          <sui-card class="fluid">
            <sui-dimmer-dimmable
              @mouseenter.native="cardActive = true"
              @mouseleave.native="cardActive = false">
              <sui-image v-bind:src="onAvatar()" class="fluid"></sui-image>
              <sui-dimmer blurring :active="onCardActive">
                <sui-button inverted v-on:click="toggleShow">Update Avatar</sui-button>
                <my-upload field="avatar"
                           @crop-success="cropSuccess"
                           @crop-upload-success="cropUploadSuccess"
                           @crop-upload-fail="cropUploadFail"
                           v-model="show"
                           :width="300"
                           :height="300"
                           :no-rotate="false"
                           langType="en"></my-upload>
              </sui-dimmer>
            </sui-dimmer-dimmable>
            <sui-card-content>
              <sui-card-header>{{ user.profile.nickname }}</sui-card-header>
              <sui-card-meta>Created in {{ user.date_joined }}</sui-card-meta>
              <sui-card-meta>Last Seen {{ user.last_login }}</sui-card-meta>
            </sui-card-content>
            <sui-card-content extra>
              <sui-statistics-group class="mini three">
                <sui-statistic>
                  <sui-statistic-value>{{ user.profile.accepted_number }}</sui-statistic-value>
                  <sui-statistic-label>Accepted</sui-statistic-label>
                </sui-statistic>
                <sui-statistic>
                  <sui-statistic-value>{{ user.profile.submission_number }}</sui-statistic-value>
                  <sui-statistic-label>Submitted</sui-statistic-label>
                </sui-statistic>
                <sui-statistic>
                  <sui-statistic-value>{{ user.profile.total_score }}</sui-statistic-value>
                  <sui-statistic-label>Score</sui-statistic-label>
                </sui-statistic>
              </sui-statistics-group>
            </sui-card-content>
          </sui-card>
        </sui-grid-row>
        <sui-grid-row class="fluid" style="margin-top: 15px;">
          <h4 class="ui top attached block header">Update Password</h4>
          <div class="ui bottom attached segment">
            <sui-form>
              <sui-dimmer inverted v-bind:class="password_form_loading">
                <sui-loader></sui-loader>
              </sui-dimmer>
              <div class="field" v-bind:class=" password_errors['old_password'] ? 'error' : '' ">
                <div class="ui left action input inline large">
                  <button class="ui button"><i class="eye slash icon"></i></button>
                  <input type="password" placeholder="old password"
                         autocomplete="off"
                         v-model="old_password"/>
                </div>
              </div>
              <div class="field" v-bind:class=" password_errors['new_password']  ? 'error' : '' ">
                <div class="ui left action input inline large">
                  <button class="ui button"><i class="eye slash icon"></i></button>
                  <input type="password" placeholder="new password"
                         autocomplete="off"
                         v-model="new_password"/>
                </div>
              </div>
              <div class="field">
                <sui-button primary @click="updatePassword()"> Submit</sui-button>
              </div>
              <div class="ui negative message" v-if="has_password_errors">
                <div class="header">
                  Update Failed
                </div>
                <ul class="ui list">
                  <li v-for="(err, index) in password_errors"
                      v-bind:key=index
                      v-bind:index=index
                      value="*">
                    {{index}}: {{err}}
                  </li>
                </ul>
              </div>
            </sui-form>
          </div>
        </sui-grid-row>
        <!--<sui-grid-row>-->
        <!--<div class="ui compact vertical labeled icon menu">-->
        <!--<a class="item"><i class="gamepad icon"></i> 游戏 </a>-->
        <!--<a class="item"><i class="video camera icon"></i> 频道 </a>-->
        <!--<a class="item"><i class="video play icon"></i> 视频 </a>-->
        <!--</div>-->
        <!--</sui-grid-row>-->
      </sui-grid-column>

      <sui-grid-column class="eleven wide">
        <sui-grid-row>
          <h4 class="ui top attached block header">Edit Profile</h4>
          <div class="ui bottom attached segment">
            <div class="ui form">
              <sui-dimmer inverted v-bind:class="profile_form_loading">
                <sui-loader></sui-loader>
              </sui-dimmer>
              <div class="field" v-bind:class="profiles_errors['username'] ? 'error' : ''">
                <div class="ui left action input inline large">
                  <button class="ui button fixed"><i class="user icon"></i>Username</button>
                  <input type="text" readonly placeholder="username"
                         v-model="user.username"/>
                </div>
              </div>
              <div class="field" v-bind:class="profiles_errors['email'] ? 'error' : ''">
                <div class="ui left action input inline large">
                  <button class="ui button fixed"><i class="envelope icon"></i>Email</button>
                  <input type="text" placeholder="you can log in by username or email"
                         v-model="user.email"/>
                </div>
              </div>
              <div class="field"
                   v-bind:class="profiles_errors[key] ? 'error' : '' "
                   v-for="(value, key) in profiles"
                   :key="key"
              >
                <div class="ui left action input inline large">
                  <button class="ui button fixed">
                    <i v-bind:class="value.icon"></i>{{ key }}
                  </button>
                  <input type="text" :placeholder="value.place_holder"
                         title="key"
                         v-model="user.profile[key]"/>
                </div>
              </div>
              <div class="field">
                <label for="mood">Mood</label>
                <textarea id="mood" v-model="user.profile.mood"></textarea>
              </div>
              <div class="field">
                <label for="mood-preview">Mood Preview</label>
                <vue-markdown class="ui bottom attached segment"
                              id="mood-preview" style="overflow:auto;"
                              :source="user.profile.mood"></vue-markdown>
              </div>
              <div class="field">
                <button class="ui primary button" @click="saveProfile()">Save</button>
                <button class="ui button" @click="getUser()">Reset</button>
                <router-link :to="{ name: 'profile', params: { id: this.user.id }}"
                             class="ui secondary button">Profile
                </router-link>
              </div>
              <div class="ui negative message" v-if="has_profiles_errors">
                <div class="header">
                  Update Failed
                </div>
                <ul class="ui list">
                  <li v-for="(err, index) in profiles_errors"
                      v-bind:key=index
                      v-bind:index=index
                      value="*">
                    {{index}}: {{err}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </sui-grid-row>

      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>
</template>

<script>
  /* eslint-disable no-console */

  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import API from '@/api';
  import myUpload from 'vue-image-crop-upload';
  import data2blob from 'vue-image-crop-upload/utils/data2blob';
  import defaultAvatarImage from '@/assets/default-user-image.png';
  import VueMarkdown from 'vue-markdown';


  export default {
  name: 'ProfileEdit',
  data() {
    return {
      user: null,
      old_password: '',
      new_password: '',
      loading: '',
      password_form_loading: '',
      profile_form_loading: '',
      cardActive: false,
      defaultAvatarImage,
      // for upload avatar
      show: false,
      imgDataUrl: '', // the datebase64 url of created image
      headers: '',
      // for form errors
      password_errors: {},
      has_password_errors: false,

      // for-loop profile data
      profiles_errors: {},
      has_profiles_errors: false,
      profiles: {
        uid: {
          icon: 'id card icon',
          place_holder: 'maybe useful in some contest',
        },
        nickname: {
          icon: 'user circle icon',
          place_holder: 'nick name for display',
        },
        fullname: {
          icon: 'user plus icon',
          place_holder: 'full name for display',
        },
        school: {
          icon: 'building icon',
          place_holder: 'school',
        },
        major: {
          icon: 'book icon',
          place_holder: 'major',
        },
      },
    };
  },
  components: {
    'my-upload': myUpload,
    VueMarkdown,
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'username',
      'userAvatar',
      'userId',
      'userType',
    ]),
    onCardActive() {
      return this.cardActive;
    },
  },
  methods: {
    test() {
      const str = 'school';
      console.log(this.user.profile[str]);
    },
    ...mapMutations({
      setAvatar: 'SET_AVATAR',
    }),
    ...mapActions({
      logout: 'AUTH_LOGOUT',
    }),
    // for avatar upload
    toggleShow() {
      this.show = !this.show;
    },
    onAvatar() {
      return this.user.profile.avatar ? this.user.profile.avatar : defaultAvatarImage;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    // eslint-disable-next-line no-unused-vars
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------');
      this.loading = 'active';
      this.imgDataUrl = imgDataUrl;
      const mime = 'image/png';
      API.upload_avatar(this.user.id, data2blob(this.imgDataUrl, mime))
        .then((req) => {
          this.cropUploadSuccess(req, field);
          this.toggleShow();
          this.getUser();
        })
        .catch((err) => {
          this.cropUploadFail(err, field);
        })
        .finally(() => {
          this.loading = '';
        });
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------');
      console.log(field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------');
      console.log(status);
      console.log(`field: ${field}`);
    },
    saveProfile() {
      this.profile_form_loading = 'active';
      this.has_profiles_errors = false;
      this.profiles_errors = {};
      const payload = {
        email: this.user.email,
        profile: {
          uid: this.user.profile.uid,
          nickname: this.user.profile.nickname,
          fullname: this.user.profile.fullname,
          school: this.user.profile.school,
          major: this.user.profile.major,
          mood: this.user.profile.mood,
        },
      };
      API.update_user_info(this.$route.params.id, payload)
        .then((req) => {
          this.$emit('postMessage', 'update profile success');
          this.user = req.data;
          if (this.user.id === this.userId) {
            this.setAvatar(this.user.profile.avatar);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          const response = err.response;
          this.has_profiles_errors = true;
          if (response && response.data) {
            const data = response.data;
            Object.keys(data)
              .forEach((key) => {
                if (!isNaN(key) || key === 'non_field_errors') {
                  this.profiles_errors.invalid = data[key];
                } else {
                  data[key].forEach((item) => {
                    this.profiles_errors[key] = item;
                  });
                }
              });
          }
        })
        .finally(() => {
          this.profile_form_loading = '';
        });
    },
    updatePassword() {
      this.password_errors = {};
      this.has_password_errors = false;
      API.update_password(this.$route.params.id,
        this.old_password, this.new_password)
        .then(() => {
          this.old_password = '';
          this.new_password = '';
          if (this.user.id === this.userId) {
            // eslint-disable-next-line no-alert
            // alert('you show re login after change password');
            this.$emit('postMessage', 'update password success, you should re-login now');
            this.logout();
            this.$router.push({ name: 'login', query: { redirect: this.$router.currentRoute.path } });
          } else {
            this.$emit('postMessage', 'update password success');
          }
        })
        .catch((err) => {
          console.log(err);
          const response = err.response;
          this.has_password_errors = true;
          if (response && response.data) {
            const data = response.data;
            Object.keys(data)
              .forEach((key) => {
                if (!isNaN(key) || key === 'non_field_errors') {
                  this.password_errors.invalid = data[key];
                } else {
                  data[key].forEach((item) => {
                    this.password_errors[key] = item;
                  });
                }
              });
          }
        })
        .finally(() => {
          this.profile_form_loading = '';
        });
    },
    getUser() {
      this.loading = 'active';
      this.old_password = '';
      this.new_password = '';
      this.user = null;
      API.update_get_user_info(this.$route.params.id)
        .then((req) => {
        this.user = req.data;
          if (this.user.id === this.userId) {
            this.setAvatar(this.user.profile.avatar);
        }
      // eslint-disable-next-line no-unused-vars
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        this.loading = '';
      });
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style scoped>
  button.fixed {
    width: 140px;
  }
</style>
