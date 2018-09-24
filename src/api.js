/* eslint-disable no-console,camelcase,new-cap */
import Vue from 'vue';
import axios from 'axios';

const external_axios = axios.create({
  timeout: 1000,
});
const hitokoto_url = 'https://v1.hitokoto.cn/?c=';
const hitokoto_type = {
  Anime: 'a',
  Comic: 'b',
  Game: 'c',
  Novel: 'd',
  Custom: 'e',
  Internet: 'f',
  Other: 'g',
  Random: '',
};

export default {
  hitokoto_type,
  hitokoto(cat) {
    return external_axios.get(hitokoto_url + cat);
  },
  // account method
  login_jwt(handle, password) {
    const payload = {
      username: handle,
      password,
    };
    return Vue.axios.post('/account/login/', payload);
  },
  verify_jwt(token) {
    const payload = {
      token,
    };
    return Vue.axios.post('/account/verify/', payload);
  },
  register(username, email, password, confirm_password, code = '') {
    const payload = {
      username,
      email,
      password,
      confirm_password,
      code,
    };
    return Vue.axios.post('/account/register/', payload);
  },
  get_user_info(id) {
    return Vue.axios.get(`/account/user/${id}/`);
  },
  update_get_user_info(id) {
    return Vue.axios.get(`/account/user/${id}/update/`);
  },
  update_user_info(id, payload) {
    console.log(payload);
    return Vue.axios.patch(`/account/user/${id}/update/`, payload);
  },
  update_password(id, old_password, new_password) {
    const payload = {
      id,
      old_password,
      new_password,
    };
    return Vue.axios.post('/account/update-password/', payload);
  },
  upload_avatar(id, avatar) {
    const data = new FormData();
    data.append('profile.avatar', avatar, 'avatar.png');
    return Vue.axios.patch(`/account/user/${id}/update/`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  },
  get_user_list(page = -1) {
    if (page === -1) {
      return Vue.axios.get('/account/users/');
    }
    return Vue.axios.get(`/account/users/?page=${page}`);
  },
};
