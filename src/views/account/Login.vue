<template>
  <sui-container text textAlign="center" class="grid my-container">
    <div class="ui middle aligned center aligned twelve wide column">
      <div class="column">
        <h2 class="ui image header">
          Login In
        </h2>
        <form class="ui large form">
          <sui-dimmer inverted v-bind:class="form_loading">
            <sui-loader></sui-loader>
          </sui-dimmer>
          <div class="ui stacked secondary segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="email address or username"
                       v-model="usernameOrEmail" autocomplete="on">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model="password"
                       autocomplete="on">
              </div>
            </div>
            <div class="ui fluid large teal submit button" @click="login">Login</div>
          </div>
          <div class="ui negative message" v-if="has_error">
            <div class="header">
              Login Failed
            </div>
            <ul class="list">
              <li v-for="(err, index) in login_errors"
                  v-bind:key=index
                  v-bind:index=index>
                {{err}}
              </li>
            </ul>
          </div>
        </form>
        <div class="ui message">
          New to us?
          <router-link to="/register" tag="sui-button" class="primary">Register</router-link>
        </div>
      </div>
    </div>
  </sui-container>

</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'Login',
  data() {
    return {
      usernameOrEmail: '',
      form_loading: '',
      password: 'x970307jw',
      has_error: false,
      login_errors: [],
      visible: true,
    };
  },
  methods: {
    login() {
      this.form_loading = 'active';
      this.$store.dispatch('AUTH_REQUEST', { username: this.usernameOrEmail, password: this.password })
        .then(() => {
          this.$emit('postMessage', 'login success');
          console.log(this.$route.query.redirect);
          console.log(this.$router.currentRoute.path);
          if (this.$route.query.redirect === this.$router.currentRoute.path) {
            this.$router.push('/');
          }
          this.$router.push(this.$route.query.redirect || '/');
        }).catch((err) => {
        console.log(err);
          this.login_errors = [];
          const response = err.response;
          if (response && response.data) {
            const data = response.data;
            this.has_error = true;
            Object.keys(data).forEach((key) => {
              this.login_errors = this.login_errors.concat(data[key]);
            });
          }
        }).finally(() => {
          this.form_loading = '';
        });
    },
    handleDismiss() {
      this.visible = false;
      setTimeout(() => {
        this.visible = true;
      }, 2000);
    },
  },
};
</script>

<style scoped>
  /*.my-container {*/
    /*padding-top: 60px;*/
    /*padding-bottom: 60px;*/
  /*}*/
</style>
