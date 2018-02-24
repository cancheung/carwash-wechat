/**
 * 个人模块路由配置
 * @author zml
 * @version 2017-07-22
 */

import * as views from '@/views';

export default [
  {
    path: '/person',
    name: 'Person',
    component: views.Person,
    meta: {
      needToken: true,
    },
  },
  {
    path: '/person/login',
    name: 'PersonLogin',
    component: views.PersonLogin,
  },
  {
    path: '/person/list',
    name: 'PersonList',
    component: views.PersonList,
    meta: {
      title: '附近洗车点',
    },
  },
  {
    path: '/person/qrcode',
    name: 'PersonQrcode',
    component: views.PersonQrcode,
    meta: {
      title: '关注二维码',
    },
  },
  {
    path: '/person/scan',
    name: 'PersonScan',
    component: views.PersonScan,
    meta: {
      title: '扫码洗车',
      needToken: true,
    },
  },
  {
    path: '/person/scan/:id',
    name: 'PersonScanResult',
    component: views.PersonScanResult,
    meta: {
      title: '启动洗车机',
      needToken: true,
    },
  },
  {
    path: '/person/pull',
    name: 'PersonPull',
    component: views.PersonPull,
  },
  {
    path: '/person/agreement',
    name: 'PersonAgreement',
    component: views.Agreement,
  },
];
