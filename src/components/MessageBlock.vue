<template>
  <div class="ui container grid">
    <div class="ui middle aligned center aligned sixteen wide column">
      <transition name="fade">
        <sui-message
          v-if="visible"
          header=""
          color="green"
          :content="message"
          dismissable
          @dismiss="handleDismiss"></sui-message>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBlock',
  data() {
    return {
    };
  },
  props: ['message'],
  computed: {
    visible() {
      return !!this.message;
    },
  },
  methods: {
    handleDismiss() {
      this.$emit('postMessage', '');
    },
  },
  updated() {
    setTimeout(() => {
      this.$emit('postMessage', '');
    }, 2500);
  },
};
</script>

<style media="screen" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
