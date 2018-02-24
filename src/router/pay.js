/**
 * 支付模块路由配置
 * @author zml
 * @version 2017-07-22
 */

import * as views from '@/views';

export default [
  {
    path: '/pay',
    name: 'Pay',
    component: views.Pay,
    meta: {
      title: '充值',
      needToken: true,
    },
  },
  {
    path: '/pay/ok',
    name: 'PayOk',
    component: views.PayOk,
    meta: {
      title: '充值结果',
      needToken: true,
    },
  },
  {
    path: '/pay/history',
    name: 'PayHistory',
    component: views.PayHistory,
    meta: {
      title: '洗车记录',
      needToken: true,
    },
  },
];
