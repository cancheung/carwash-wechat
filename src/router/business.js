/**
 * 商家模块路由配置
 * @author zml
 * @version 2017-12-13
 */

import * as views from '@/views';

export default [
  {
    path: '/Business/pay/:id',
    name: 'BusinessPay',
    component: views.BusinessPay,
    meta: {
      needToken: true,
    },
  },
  {
    path: '/Business/record',
    name: 'BusinessRecord',
    component: views.BusinessRecord,
    meta: {
      title: '商家支付列表',
      needToken: true,
    },
  },

];
