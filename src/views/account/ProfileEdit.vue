<template>
  <sui-grid :columns="2" class="container">
    <sui-dimmer inverted v-bind:class="loading">
      <sui-loader></sui-loader>
    </sui-dimmer>
    <sui-grid-row stretched v-if="user">
      <sui-grid-column class="five wide">
        <sui-grid-row>
          <sui-card>
            <sui-dimmer-dimmable
              @mouseenter.native="cardActive = true"
              @mouseleave.native="cardActive = false">
              <sui-image v-bind:src="onAvatar()"></sui-image>
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
          </sui-card>
        </sui-grid-row>
        <sui-grid-row>
          <div class="ui compact vertical labeled icon menu">
            <a class="item"><i class="gamepad icon"></i> 游戏 </a>
            <a class="item"><i class="video camera icon"></i> 频道 </a>
            <a class="item"><i class="video play icon"></i> 视频 </a>
          </div>
        </sui-grid-row>
      </sui-grid-column>

      <sui-grid-column class="eleven wide">
        <sui-grid-row stretched>
          <sui-form>
            <sui-form-fields>
              <sui-form-field inline>
                <label>fullname</label>
                <sui-input type="text" placeholder="fullname"></sui-input>
              </sui-form-field>
              <sui-form-field inline>
                <label>fullname</label>
                <sui-input type="text" placeholder="fullname"></sui-input>
              </sui-form-field>
            </sui-form-fields>
          </sui-form>
        </sui-grid-row>
      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters } from 'vuex';
import API from '@/api';
import Constants from '@/constants';
import myUpload from 'vue-image-crop-upload';
import data2blob from 'vue-image-crop-upload/utils/data2blob';
import defaultAvatarImage from '@/assets/default-user-image.png';

export default {
  name: 'ProfileEdit',
  data() {
    return {
      user: null,
      loading: '',
      cardActive: false,
      defaultAvatarImage,
      // for upload avatar
      show: false,
      imgDataUrl: '', // the datebase64 url of created image
      headers: '',
    };
  },
  components: {
    'my-upload': myUpload,
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
    // for avatar upload
    toggleShow() {
      this.show = !this.show;
    },
    onAvatar() {
      return this.user.avatar ? this.user.avatar : defaultAvatarImage;
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
          this.cropSuccess(req, field);
          this.getUser();
        })
        .catch((err) => {
          this.cropUploadSuccess(err, field);
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
    getUser() {
      this.loading = 'active';
      this.user = null;
      API.get_user_info(this.$route.params.id).then((req) => {
        this.user = req.data;
        if (this.user.id !== this.userId &&
          this.userType <= this.user.user_type &&
          this.userType !== Constants.UserType.super_admin) {
          this.$router.replace({ name: 'forbid' });
        }
      // eslint-disable-next-line no-unused-vars
      }).catch((err) => {
        this.$router.replace({ name: 'notFound' });
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

</style>
