<template>
  <div class="spread-reflect">
    <group
      label-width="5em"
      label-margin-right="1em"
      label-align="right"
    >
      <group-title slot="title">
        奖励金额本次可提现 {{info.award_amount.toFixed(2)}} 元
      </group-title>

      <x-input
        title="提现金额"
        v-model="reflect_price"
        placeholder="输入提现金额"
        keyboard="number"
      />
    </group>

    <box gap="15px 15px">
      <x-button
        class="car-btn car-btn__yellow"
        action-type="submit"
        :show-loading="formLoading"
        :disabled="formLoading"
        @click.native="beforeSubmit"
      >提现</x-button>
    </box>

    <ol class="spread-reflect__tips">
      <strong>请注意：</strong>
      <li>用户累计充值 <a>200元</a> 以上，申请提现方可成功。</li>
      <li>奖励金额 <a>100元</a> 以上，含 <a>100元</a> 可发起提现。</li>
      <li>每次提现会自动扣除税费 <a>6%</a>，可联系客服开具发票。</li>
      <li>详情请拨打客服热线： <a :href="`tel:${tel}`">{{tel}}</a> 咨询，谢谢。</li>
    </ol>

  </div>
</template>

<script>
/**
 * 提现
 * @author zml
 * @version 2017-11-27
 */
import { GroupTitle, Group, Cell, XInput, XButton, Box } from 'vux';

export default {

  name: 'app-spread-reflect',

  components: {
    GroupTitle,
    Group,
    Cell,
    XInput,
    XButton,
    Box,
  },

  props: {
    info: {
      type: Object,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      reflect_price: this.info.award_amount,
      formLoading: false,
    };
  },

  methods: {
    // 提交前校验
    beforeSubmit() {
      const price = +this.reflect_price;
      if (price < 100 || price > this.info.award_amount) {
        this.$vux.toast.text('金额格式不正确', 'top');
      } else {
        this.submit();
      }
    },

    // 提交
    submit() {
      this.formLoading = true;

      this.$http.post('/mobileMember!reflectAward.do', {
        reflect_price: this.reflect_price,
      })
        .then(() => {
          this.$vux.toast.text('提现发起成功', 'top');
          this.$emit('updateInfo');
          this.$router.push('/spread/detail');
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        })
        .then(() => {
          this.formLoading = false;
        });
    },
  },

  created() {
  },
};

</script>

<style lang="less">
.spread-reflect {

  .weui-cell {
    font-size: 15px;
  }

  &__tips {
    padding-left: 30px;
    margin-top: 50px;
    font-size: 14px;
    line-height: 2;

    strong {
      font-size: 15px;
      margin-left: -15px;
    }

    a {
      color:@yellow;
      font-weight: bold;
    }
  }

}
</style>
