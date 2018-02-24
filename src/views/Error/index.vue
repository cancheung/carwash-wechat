<template>
  <div class="app-error">

    <div
      class="app-error__text"
      v-if="item.code === status"
      v-for="(item,index) in statusData"
      :key="index"
    >
      <h3><icon type="safe_warn" is-msg></icon></h3>
      <h2>{{item.code}}</h2>
      <h5>{{item.text}}</h5>
    </div>

  </div>
</template>

<script>
/**
 * 支付成功
 * @author zml
 * @version 2017-07-25
 */

import { XButton, Icon } from 'vux';

export default {

  name: 'app-error',

  components: {
    XButton,
    Icon,
  },

  data() {
    return {
      statusData: [
        {
          code: 500,
          text: '服务器繁忙，请稍后再试',
        },
        {
          code: 403,
          text: '用户未登录，请先登录',
        },
        {
          code: 404,
          text: 'Not Found !!!',
        },
        {
          code: 405,
          text: '该用户已在其他设备登录',
        },
      ],
    };
  },

  computed: {
    status() {
      return +this.$router.currentRoute.params.status;
    },
  },

  created() {

  },

};
</script>

<style lang="less">
.app-error {
  &__text {
    margin-top: 80px;
    text-align: center;

    & h2 , & h3 , & h5 {
      line-height: 1;
    }

    & h2 , & h3 {
      color: @yellow;
    }

    & h2{
      font-size: 60px;
      margin-bottom: 10px;
      margin-top: 60px;
    }

    & h5 {
      font-size: 14px;
      color: @text-color;
    }
  }
}
</style>
