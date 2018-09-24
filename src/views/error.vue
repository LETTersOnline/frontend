<template>
  <div>
    <sui-grid :columns="2" class="container">
      <sui-grid-column class="sixteen wide">
        <h1>Oops!</h1>
        <h1>{{ error.status }} {{ error.statusText }}</h1>
        <p>An unexpected error seems to have occurred: </p>
        <div class="ui big error message">
          {{ error.data }}
        </div>
        <p>Why not try refresh you page?</p>
        <p>Or you can contact us if the problem persists.</p>
        <!--<sui-image :src="errorImagePath" class="centered"></sui-image>-->
      </sui-grid-column>
    </sui-grid>
    <div>
    </div>
  </div>
</template>

<script>
  import errorImage from '@/assets/error/wtf.png';

  export default {
  name: 'error',
    props: ['error'],
    data() {
      return {
        imagePath: errorImage,
        errorImagePath: errorImage,
      };
    },
};
</script>

<style scoped>

</style>
