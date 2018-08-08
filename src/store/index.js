/* eslint-disable no-shadow,no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import API from '../api';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  token: localStorage.getItem('user-token') || '',
  user: JSON.parse(localStorage.getItem('user')) || '',
};

const getters = {
  isAuthenticated: state => !!state.token,
  username: (state) => {
    if (state.user) return state.user.username;
    return '';
  },
  useravatar: (state) => {
    if (state.user) return state.user.avatar;
    return '';
  },
};

const mutations = {
  AUTH_SUCCESS: (state, { token, user }) => {
    state.token = token;
    state.user = user;
    localStorage.setItem('user-token', state.token); // store the token in local storage
    localStorage.setItem('user', JSON.stringify(user));
    console.log(state.user);
    Vue.axios.defaults.headers.Authorization = `JWT ${token}`;
  },
  AUTH_LOGOUT: (state) => {
    state.token = null;
    state.user = null;
    localStorage.removeItem('user-token');
    localStorage.removeItem('user');
    delete Vue.axios.defaults.headers.Authorization;
  },
};

const actions = {
  AUTH_REQUEST: ({ commit }, { username, password }) => new Promise((resolve, reject) => {
    // The Promise used for router redirect in login
    API.login_jwt(username, password)
      .then((resp) => {
        console.log(resp.data);
        const token = resp.data.token;
        const user = resp.data.user;
        commit('AUTH_SUCCESS', { token, user });
        resolve(resp);
      })
      .catch((err) => {
        commit('AUTH_LOGOUT');
        reject(err);
      });
  }),

  AUTH_LOGOUT: ({ commit }) => new Promise((resolve) => {
    commit('AUTH_LOGOUT');
    resolve();
  }),
};

export default new Vuex.Store({
  modules: {},
  strict: debug,
  state,
  getters,
  mutations,
  actions,
});
