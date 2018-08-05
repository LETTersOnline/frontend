# to-fe

> A vue.js project powered by webpack.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



# 开发过程记录
### 用vue-cli + webpack模板包初始化
可以`vue ui`运行vue的UI配置界面给项目安装插件
```
➜ vue init webpack TO-fe

? Project name to-fe
? Project description A vue.js project powered by webpack.
? Author xujingwei <xujingwei@outlook.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Airbnb
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
```
除自动配置的依赖之外，还添加了以下依赖：

- axios: 用来调用后端的API，会自动将数据转成json格式
- vue-axios: 按标准将axios绑定到全局
- jwt-decode: 对jwt进行解码，以便获取其中的时间戳信息
- semantic-ui-vue: semantic ui和vue配合使用的插件
- semantic-ui-css: semantic的css文件
- vuex: 管理全局状态


# Some Best Practices
- [Authentication Best Practices for Vue](https://blog.sqreen.io/authentication-best-practices-vue/)
- loading...
