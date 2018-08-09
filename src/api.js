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
  login_jwt(handle, password) {
    const payload = {
      username: handle,
      password,
    };
    console.log(payload);
    return Vue.axios.post('/auth/login/', payload);
  },
  refresh_jwt(token) {
    const payload = {
      token,
    };
    return Vue.axios.post('/auth/refresh/', payload);
  },
  verify_jwt(token) {
    const payload = {
      token,
    };
    return Vue.axios.post('/auth/verify/', payload);
  },
  register(username, email, password, confirm_password, code = '') {
    const payload = {
      username,
      email,
      password,
      confirm_password,
      code,
    };
    return Vue.axios.post('/auth/user/', payload);
  },
  get_user_list() {
    return Vue.axios.get('/auth/user/');
  },
  get_user_info(id) {
    return Vue.axios.get(`/auth/user/${id}`);
  },
};
