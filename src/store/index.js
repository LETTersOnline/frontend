/* eslint-disable no-shadow,no-console */
import Vue from 'vue';
import Vuex from 'vuex';
// import jwtDecode from 'jwt-decode';
// import router from '@/router';
import API from '@/api';

Vue.use(Vuex);


const debug = process.env.NODE_ENV !== 'production';

const state = {
  token: localStorage.getItem('user-token') || '',
  user: JSON.parse(localStorage.getItem('user')) || '',
  hitokoto: localStorage.getItem('hitokoto') || '',
  avatar: localStorage.getItem('avatar') || '',
};

const getters = {
  isAuthenticated: state => !!state.token,
  username: (state) => {
    if (state.user) return state.user.username;
    return '';
  },
  userId: (state) => {
    if (state.user) return state.user.id;
    return '';
  },
  userType: (state) => {
    if (state.user) return state.user.user_type;
    return '';
  },
  userAvatar: (state) => {
    if (state.avatar && state.avatar !== 'null') return state.avatar;
    return '';
  },
};

const mutations = {
  AUTH_SUCCESS: (state, { token, user }) => {
    state.token = token;
    state.user = user;
    localStorage.setItem('user-token', state.token); // store the token in local storage
    localStorage.setItem('user', JSON.stringify(user));
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
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
    localStorage.setItem('avatar', state.avatar);
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
        Vue.axios.defaults.headers.Authorization = `JWT ${resp.data.token}`;
        API.get_user_info(user.id)
          .then((resp) => {
            const avatar = resp.data.profile.avatar;
            commit('SET_AVATAR', avatar);
          });
        resolve(resp);
      })
      .catch((err) => {
        commit('AUTH_LOGOUT');
        reject(err);
      });
  }),
  AUTH_VERIFY: ({ state, commit }) => new Promise((resolve, reject) => {
    API.verify_jwt(state.token)
      .then(() => {
        resolve();
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

  // AUTH_REFRESH({ commit }) {
  //   API.refresh_jwt(this.state.token)
  //     .then((resp) => {
  //       const token = resp.data.token;
  //       const user = resp.data.user;
  //       commit('AUTH_SUCCESS', { token, user });
  //     }).catch(() => {
  //       commit('AUTH_LOGOUT');
  //     });
  // },

  // AUTH_INSPECT({ commit, dispatch }, { path }) {
  //   const token = this.state.token;
  //   if (token) {
  //     const decoded = jwtDecode(token);
  //     const exp = decoded.exp;
  //     const origIat = decoded.orig_iat;
  //     // 7天过期，有效期30天
  //     // console.log('exp: ', exp);
  //     // console.log('orig iat: ', origIat);
  //     // console.log('date now: ', (Date.now() / 1000));
  //     if (exp - (Date.now() / 1000) >= 24 * 60 * 60) {
  //       // do nothing
  //     } else if (exp - (Date.now() / 1000) < 24 * 60 * 60
  //       && (Date.now() / 1000) - origIat < 30 * 24 * 60 * 60) {
  //       dispatch('AUTH_REFRESH');
  //       console.log('auth refresh');
  //     } else if (exp - (Date.now() / 1000) < 24 * 60 * 60) {
  //       // DO NOTHING, DO NOT REFRESH
  //       console.log('do nothing');
  //     } else {
  //       // PROMPT USER TO RE-LOGIN,
  //       // THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
  //       console.log('re-login');
  //       commit('AUTH_LOGOUT');
  //       router.push({ name: 'login', query: { redirect: path } });
  //     }
  //   }
  // },
};

export default new Vuex.Store({
  modules: {},
  strict: debug,
  state,
  getters,
  mutations,
  actions,
});
