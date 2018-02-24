/**
 * 分销模块路由配置
 * @author zml
 * @version 2017-11-27
 */

import * as views from '@/views';

export default [
  {
    path: '/spread',
    name: 'Spread',
    component: views.Spread,
    meta: {
      needToken: true,
    },
    children: [
      {
        path: '/spread/apply',
        name: 'SpreadApply',
        component: views.SpreadApply,
        meta: {
          title: '个人认证',
          needToken: true,
        },
      },
      {
        path: '/spread/detail',
        name: 'SpreadDetail',
        component: views.SpreadDetail,
        meta: {
          title: '推荐中心',
          needToken: true,
        },
      },
      {
        path: '/spread/result',
        name: 'SpreadResult',
        component: views.SpreadResult,
        meta: {
          title: '认证结果',
          needToken: true,
        },
      },
      {
        path: '/spread/record',
        name: 'SpreadRecord',
        component: views.SpreadRecord,
        meta: {
          title: '交易记录',
          needToken: true,
        },
      },
      {
        path: '/spread/reflect',
        name: 'SpreadReflect',
        component: views.SpreadReflect,
        meta: {
          title: '提现',
          needToken: true,
        },
      },
    ],
  },
  {
    path: '/spread/qrcode',
    name: 'SpreadQrcode',
    component: views.SpreadQrcode,
  },
  {
    path: '/spread/agreement',
    name: 'SpreadAgreement',
    component: views.SpreadAgreement,
  },
];
