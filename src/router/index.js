/* eslint-disable no-trailing-spaces,no-console */
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home';
import Login from '@/views/account/Login';
import Register from '@/views/account/Register';
import Profile from '@/views/account/Profile';
import ProfileEdit from '@/views/account/ProfileEdit';
import store from '@/store';
import error404 from '@/views/error404';
import error403 from '@/views/error403';
import error from '@/views/error';

Vue.use(Router);


const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  // console.log(to);
  // console.log(from);
  // console.log(next);
  // TODO: 考虑改成用verify接口检查
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
      meta: {
        title: 'LETTers Online',
      },
      // beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login',
      },
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Register',
      },
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/user/:id',
      name: 'profile',
      component: Profile,
      meta: {
        title: 'User Profile',
      },
    },
    {
      path: '/user/:id/edit',
      name: 'profileEdit',
      component: ProfileEdit,
      meta: {
        title: 'Edit Profile',
      },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/forbid',
      name: 'forbid',
      component: error403,
      meta: {
        title: '403 forbidden',
      },
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: error404,
      meta: {
        title: '404 not found',
      },
    },
    {
      path: '/error',
      name: 'error',
      component: error,
      props: true,
      meta: {
        title: 'error occurred',
      },
    },
  ],
  // linkExactActiveClass: 'active',
});
