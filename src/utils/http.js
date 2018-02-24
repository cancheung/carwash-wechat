// 对axios的封装
import axios from 'axios';
import qs from 'qs';
import router from '../router';

const Axios = axios.create({
  baseURL: '/cxcar/shop', // 因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => ({
    ...config,
    // 序列化
    data: config.data ? qs.stringify(config.data) : config.data,
    headers: {
      ...config.headers,
       // 若是有token , 就给头部带上token
      ...(localStorage.token ? { token: localStorage.token } : {}),
       // 若是有用户ID，就给头部带上member_id
      ...(localStorage.member_id ? { member_id: localStorage.member_id } : {}),
    },
  }),
  error => Promise.reject(error),
);


// 返回状态判断(添加响应拦截器)
/* eslint-disable no-throw-literal */
Axios.interceptors.response.use(
  ({ data }) => {
    if (data.State === '2') {
      // 如果是403则清空localstorage，并跳转到登录页
      if (data.Code === '403' || data.Code === '405') {
        localStorage.clear();
        router.push({
          path: '/person/login',
        });
        throw '用户未登录';
      } else if (data.Message) {
        throw data.Message;
      } else {
        throw '错误';
      }
    } else if (data.State === '3') {
      if (data.Message) {
        throw data;
      } else {
        throw '错误';
      }
    } else {
      return data.Data;
    }
  },
  () => {
    throw '接口请求错误';
  },
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios });
  },
};
