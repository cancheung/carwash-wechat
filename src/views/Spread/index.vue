<template>
  <div>
    <!-- 推广员中心主组件 -->
    <router-view
      :info="info"
      :tel="tel"
      @updateInfo="getSpreadDetail"
    ></router-view>
  </div>
</template>

<script>
/**
 * 推广员中心主组件
 * @author zml
 * @version 2017-11-27
 */

export default {

  name: 'app-spread',

  data() {
    return {
      info: {
        /** vip信息 */
        award_amount: 0, // 奖励金额
        invite_code: null, // 邀请码
        spread_num: 0, // 推荐人数
        recharge_num: 0, // 充值人数
        recharge_amount: 0, // 推荐人总充值金额

        /** 用户申请状态 */
        spread_status: 0, // 申请状态（0：未申请 1：审核中 2：通过 3：未通过）

        /** 用户信息 */
        name: '', // 用户名 名称
        card_no: '', // 身份证号码
        bank_id: '', // 银行id
        bank_name: '', // 开户行名称
        bank_no: '', // 银行卡号
        wx_code: '', // 微信号
        alipay_code: '', // 支付宝号
        spread_phone: '', // 推广员手机
      },

      tel: '0592-5211806', // 客服联系电话
    };
  },

  computed: {
    hostName() { // 域名
      return window.location.href.split('#')[0];
    },
  },

  methods: {
    // 获取推广员信息
    getSpreadDetail() {
      this.$http.get('/mobileMember!spreadDetail.do')
        .then((res) => {
          // 覆盖初始值
          this.info = {
            ...this.info,
            ...res,
          };
          // 跳转到vip中心页面
          this.$router.replace('/spread/detail');
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        });
    },
  },

  created() {
    this.getSpreadDetail();
  },
};

</script>

<style lang="less">
</style>
