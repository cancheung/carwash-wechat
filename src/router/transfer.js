/**
 * 余额转让模块路由配置
 * @author zml
 * @version 2017-07-22
 */

import * as views from '@/views';

export default [
  {
    path: '/transfer',
    name: 'Transfer',
    component: views.Transfer,
    meta: {
      title: '余额转让',
      needToken: true,
    },
  },
  {
    path: '/transfer/:id',
    name: 'TransferRecord',
    component: views.TransferRecord,
    meta: {
      title: '转让记录',
      needToken: true,
    },
  },
];
