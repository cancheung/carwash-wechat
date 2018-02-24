/**
 * 抢红包模块路由配置
 * @author zml
 * @version 2017-09-24
 */

import * as views from '@/views';

export default [
  {
    path: '/coupon',
    name: 'Coupon',
    component: views.Coupon,
    children: [
      {
        path: '/coupon/get/:id',
        name: 'CouponGet',
        component: views.CouponGet,
      },
      {
        path: '/coupon/list',
        name: 'CouponList',
        component: views.CouponList,
        meta: {
          title: '我的洗车券',
          needToken: true,
        },
      },
    ],
  },

];
