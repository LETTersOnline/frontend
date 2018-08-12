<template>
  <sui-container text textAlign="center" class="grid my-container">
    <div class="ui middle aligned center aligned twelve wide column">
      <div class="column">
        <h2 class="ui image header">
            Register Your Account
        </h2>
        <form class="ui large form">
          <sui-dimmer inverted v-bind:class="form_loading">
            <sui-loader></sui-loader>
          </sui-dimmer>
          <div class="ui stacked secondary segment">
            <div class="field" v-bind:class=" username_error ? 'error' : '' ">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="username" placeholder="username"
                       v-model="username">
              </div>
            </div>
            <div class="field" v-bind:class=" email_error ? 'error' : '' ">
              <div class="ui left icon input">
                <i class="mail icon"></i>
                <input type="text" name="email" placeholder="email address"
                       v-model="email">
              </div>
            </div>
            <div class="field" v-bind:class=" password_error ? 'error' : '' ">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>
            <div class="field" v-bind:class=" confirm_password_error ? 'error' : '' ">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="confirm_password"
                       placeholder="Confirm Password" v-model="confirm_password">
              </div>
            </div>
            <div class="ui fluid large teal submit button" @click="register">Register</div>
          </div>
          <div class="ui negative message" v-if="has_error">
            <div class="header">
              Register Failed
            </div>
            <ul class="list">
              <li v-for="(err, index) in register_errors"
                  v-bind:key=index
                  v-bind:index=index>
                {{err}}
              </li>
            </ul>
          </div>
        </form>
        <div class="ui message">
          Had account?
          <router-link to="/login" tag="sui-button" class="primary">Login</router-link>
        </div>
      </div>
    </div>
  </sui-container>

</template>

<script>
import API from '@/api';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      form_loading: '',
      has_error: false,
      username_error: false,
      email_error: false,
      password_error: false,
      confirm_password_error: false,
      register_errors: [],
    };
  },
  methods: {
    register() {
      this.register_errors = [];
      this.has_error = false;
      this.username_error = false;
      this.email_error = false;
      this.password_error = false;
      this.confirm_password_error = false;
      this.form_loading = 'active';
      API.register(this.username, this.email, this.password, this.confirm_password)
        .then(() => {
          this.$emit('postMessage', 'register success');
          this.$router.push('/login');
        }).catch((err) => {
          const response = err.response;
          if (response && response.data) {
            const data = response.data;
            this.has_error = true;
            Object.keys(data).forEach((key) => {
              if (!isNaN(key)) {
                this.register_errors = this.register_errors.concat(data[key]);
              } else if (key === 'non_field_errors') {
                this.register_errors = this.register_errors.concat(data[key]);
              } else {
                data[key].forEach((item) => {
                  const keyErr = `${key}_error`;
                  this.$data[keyErr] = true;
                  this.register_errors.push(`${key}: ${item}`);
                });
              }
            });
          }
        }).finally(() => {
          this.form_loading = '';
        });
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
