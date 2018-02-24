/**
 * store配置
 * @author zml
 * @version 2017-09-15
 */

import Vue from 'vue';
import Vuex from 'vuex';
// import { AjaxPlugin } from 'vux';
import person from './person';
import pay from './pay';
import { GLOBAL } from './mutationTypes';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [],

  modules: {
    person,
    pay,
  },

  getters: {},

  state: {
    token: '', // 登录标识
    member_id: '', // 用户id
    loading: false, // 加载动画
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    [GLOBAL.TOKEN.UPDATE](state, token) { // 更新token
      state.token = token;
    },

    [GLOBAL.MEMBERID.UPDATE](state, memberid) { // 更新member_id
      state.member_id = memberid;
    },

    [GLOBAL.LOADING.SHOW](state) { // 显示加载动画
      state.loading = true;
    },

    [GLOBAL.LOADING.HIDE](state) { // 隐藏加载动画
      state.loading = false;
    },
  },
  /* eslint-enalbe */

  actions: {},

});

export default store;
