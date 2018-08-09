/* eslint-disable no-shadow,no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import jwtDecode from 'jwt-decode';
import router from '@/router';
import API from '@/api';

Vue.use(Vuex);


const debug = process.env.NODE_ENV !== 'production';

const state = {
  token: localStorage.getItem('user-token') || '',
  user: JSON.parse(localStorage.getItem('user')) || '',
  hitokoto: localStorage.getItem('hitokoto') || '',
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
  userid: (state) => {
    if (state.user) return state.user.id;
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
  SET_HITOKOTO: (state, hitokoto) => {
    state.hitokoto = hitokoto;
    localStorage.setItem('hitokoto', state.hitokoto);
  },
};

const actions = {
  AUTH_REQUEST: ({ commit }, { username, password }) => new Promise((resolve, reject) => {
    // The Promise used for router redirect in login
    API.login_jwt(username, password)
      .then((resp) => {
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

  AUTH_REFRESH({ commit }) {
    API.refresh_jwt(this.state.token)
      .then((resp) => {
        const token = resp.data.token;
        const user = resp.data.user;
        commit('AUTH_SUCCESS', { token, user });
      }).catch(() => {
        commit('AUTH_LOGOUT');
      });
  },

  AUTH_INSPECT({ commit, dispatch }, { path }) {
    const token = this.state.token;
    if (token) {
      const decoded = jwtDecode(token);
      const exp = decoded.exp;
      const origIat = decoded.orig_iat;
      // 7天过期，有效期30天
      console.log('exp: ', exp);
      console.log('orig iat: ', origIat);
      console.log('date now: ', (Date.now() / 1000));
      if (exp - (Date.now() / 1000) >= 24 * 60 * 60) {
        // do nothing
      } else if (exp - (Date.now() / 1000) < 24 * 60 * 60
        && (Date.now() / 1000) - origIat < 30 * 24 * 60 * 60) {
        dispatch('AUTH_REFRESH');
        console.log('auth refresh');
      } else if (exp - (Date.now() / 1000) < 24 * 60 * 60) {
        // DO NOTHING, DO NOT REFRESH
        console.log('do nothing');
      } else {
        // PROMPT USER TO RE-LOGIN,
        // THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
        console.log('re-login');
        commit('AUTH_LOGOUT');
        router.push({ name: 'login', query: { redirect: path } });
      }
    }
  },
};

export default new Vuex.Store({
  modules: {},
  strict: debug,
  state,
  getters,
  mutations,
  actions,
});
