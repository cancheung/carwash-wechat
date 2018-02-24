// 兼容es6语法
import 'babel-polyfill';

// 全局样式
import '@/styles/global.less';
import { WechatPlugin, ToastPlugin } from 'vux';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import router from './router';
import store from './store';
import { Http } from './utils';

// 处理移动端touch响应延迟300ms
FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue
  .use(WechatPlugin) // 微信jssdk插件
  .use(ToastPlugin) // toast插件
  .use(Http); // 基于axios封装的ajax插件

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app-box');

