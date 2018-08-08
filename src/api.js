/* eslint-disable no-console,camelcase */
import Vue from 'vue';

export default {
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
};
