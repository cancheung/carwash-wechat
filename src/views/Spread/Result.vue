<template>
  <div class="spread-result">

    <!-- 未通过 -->
    <div v-if="info.spread_status === 3">
      <icon class="spread-result__icon" type="warn" is-msg></icon>

      <p>认证未通过</p>

      <h5>对不起，您的个人认证审核未通过，请完善资料</h5>

      <x-button
        class="car-btn car-btn__yellow"
        link="/spread/apply"
      >完善资料</x-button>
    </div>

    <!-- 审核中 -->
    <div v-else="info.spread_status === 1">

      <icon class="spread-result__icon" type="safe_warn" is-msg></icon>

      <p>个人认证已经提交成功</p>

      <h5>
        提现资格正在审核中,请耐心等待！<br>
        详情请拨打 <a :href="`tel:${tel}`"><b>{{tel}}</b></a> 联系客服人员
      </h5>
    </div>

  </div>
</template>

<script>
/**
 * 申请结果页
 * @author zml
 * @version 2017-11-27
 */
import { XButton, Icon } from 'vux';

export default {

  name: 'app-spread-result',

  props: {
    tel: {
      type: String,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
  },

  components: {
    XButton,
    Icon,
  },

  methods: {
  },

  created() {
  },
};

</script>


<style lang="less">
.spread-result {
  text-align: center;
  padding: 0 15px;

  &__icon{
    margin-top: 60px;
  }

  p {
    margin: 30px 0;
    font-size: 18px;
    line-height: 1.5;
  }

  h5 {
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.75;

    a {
      color:@yellow;
    }
  }
}
</style>
