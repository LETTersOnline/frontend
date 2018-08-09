<template>
<div>
  <sui-grid :columns="2" class="container">
    <sui-grid-column class="five wide">
      <sui-grid-row>
        <sui-image :src="imagePath" class="centered"></sui-image>
      </sui-grid-row>
      <sui-grid-row>
        <pre v-highlightjs="code"><code></code></pre>
      </sui-grid-row>
    </sui-grid-column>
    <sui-grid-column class="nine wide">
      <h1>Oops!</h1>
      <p>We can't seem to find the page you're looking for.</p>
        <p>If this not expected,
          you can contact site admin through github or email in the bottom.</p>
      <sui-image :src="errorImagePath" class="centered"></sui-image>
    </sui-grid-column>
  </sui-grid>
  <div>
  </div>
</div>
</template>
<script>
import tmdImage from '@/assets/error/tim404.jpg';
import errorImage from '@/assets/error/error404.jpg';

export default {
  name: 'error404',
  data() {
    return {
      imagePath: tmdImage,
      errorImagePath: errorImage,
      code: '# define v putchar\n' +
'#define print(x) main()\n' +
'{v(4+v(v(52)-4));return 0;}/*\n' +
'#>+++++++4+[>++++++<-]>\n++++.----.++++.*/\n' +
'print(202*2);exit();\n' +
'#define/*>.@*/exit()\n',
    };
  },
};
</script>

<style scoped>

</style>
