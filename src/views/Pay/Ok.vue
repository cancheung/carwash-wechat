<template>
  <div class="pay-ok">

    <icon class="pay-ok__icon" type="success" is-msg></icon>

    <p>充值成功</p>

    <x-button type="primary" link="/person">确定</x-button>

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

  name: 'app-pay-ok',

  components: {
    XButton,
    Icon,
  },

  created() {

  },

};
</script>

<style lang="less">
.pay-ok {
  text-align: center;
  padding: 0 15px;

  &__icon{
    margin-top: 60px;
  }

  p {
    margin: 30px 0;
    font-size: 18px;
    line-height: 1;
  }
}
</style>
