import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home';
import Login from '@/views/account/Login';
import Register from '@/views/account/Register';
import Profile from '@/views/account/Profile';
import store from '@/store';
import error404 from '@/views/error404';
import error403 from '@/views/error403';

Vue.use(Router);


const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/user/:id',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/forbid',
      name: 'forbid',
      component: error403,
    },
    {
      path: '*',
      name: 'notFound',
      component: error404,
    },
  ],
  // linkExactActiveClass: 'active',
});
