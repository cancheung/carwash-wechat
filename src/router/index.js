/**
 * 路由配置
 * @author zml
 * @version 2017-07-22
 */

import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { GLOBAL } from '@/store/mutationTypes';
import * as views from '@/views';

// 路由模块插入
import person from './person';
import pay from './pay';
import coupon from './coupon';
import spread from './spread';
import business from './business';
import transfer from './transfer';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      redirect: '/person',
    },
    {
      path: '/error/:status',
      name: 'error',
      component: views.Error,
    },
    ...person,
    ...pay,
    ...coupon,
    ...spread,
    ...business,
    ...transfer,
  ],
});

router.beforeEach((to, from, next) => {
   /**
   * 不是所有版块都需要鉴权的
   * 所以需要鉴权,我都会在路由meta添加添加一个字段needToken,设置为true的时候
   * 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
   */
  if (to.meta.needToken) {
    if (localStorage.token && localStorage.member_id) {
      next();
    } else {
      next({
        path: '/person/login',
      });
    }
  }

  // 显示数据加载动画
  store.commit(GLOBAL.LOADING.SHOW);

  // 更换页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = '巢享共享洗车';
  }

  next();
});

export default router;
