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
- vue-avatar: 给用户添加默认头像，如果有上传头像，按照上传头像设置

  - 应用层级的状态应该集中到单个 `store` 对象中
    
  - 提交 `mutation` 是更改状态的唯一方法，并且这个过程是同步的
    
  - 异步逻辑都应该封装到 `action` 里面

### 基础配置
build/下的不需要编辑

在config/dev.env.js文件中修改开发配置，merge会用后面的配置覆盖前面的，配置好后端的ip和端口，以及代理转发

默认将axios的`api/`请求都重定向到后端的`api/`请求

在src根目录下，根目录一些文件或者文件夹解释，[更详细的介绍](https://segmentfault.com/a/1190000010659925)
- `assets`: 静态文件目录
- `components`: 组件，如导航栏，表单等可复用组件
- `router`: 配置路由
- `store`: 配合`vuex`进行状态管理，可模块化管理，目前将用户token和用户名都保存在根目录
- `main.js`: 主入口js
- `App.vue`: 项目入口组件
- `api.js`: 配置后端的api路由，包装axios请求




# Some Best Practices
- [Authentication Best Practices for Vue](https://blog.sqreen.io/authentication-best-practices-vue/)
- [http 状态码介绍](https://blog.csdn.net/fatong3/article/details/80350731)
- loading...
