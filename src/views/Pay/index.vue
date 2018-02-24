<template>
  <div class="pay-index">
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item
        v-for="(item,index) in charge_list"
        :key="index"
        :span="1/3"
      >
        <div
          class="pay-index__btn"
          :class="{ 'pay-index__btn--active': item.id === id }"
          @click="choseRechargePrice(item.charge_price,item.id)"
        >
          <h3>{{item.charge_price}}</h3>
          <h5>{{item.get_price}}</h5>
        </div>
      </flexbox-item>
    </flexbox>

    <x-button
      class="pay-index__btn__pay"
      action-type='button'
      @click.native="beforeWxRecharge()"
      :disabled='loading'
      :show-loading="loading"
    >
      {{loadingText}}
    </x-button>

    <!-- <small>code:{{code}}</small> -->

  </div>
</template>

<script>
/**
 * 充值
 * @author zml
 * @version 2017-07-25
 */

import { XButton, Flexbox, FlexboxItem } from 'vux';

export default {

  name: 'app-pay-index',

  data() {
    return {
      charge_list: [], // 充值金额列表
      id: null, // 充值金额id
      loading: false, // 充值按钮loading
      loadingText: '确认充值',

      appId: '', // appId唯一标识
      timeStamp: '', // 支付签名时间戳
      nonceStr: '', // 支付签名随机串
      package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      paySign: '', // 支付签名
    };
  },

  components: {
    XButton,
    Flexbox,
    FlexboxItem,
  },

  computed: {
    code() {
      // eslint-disable-next-line
      return decodeURIComponent((new RegExp('[?|&]code=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;

      // return this.$route.query.code || null;
    },
  },

  methods: {
    // 选择充值金额
    choseRechargePrice(price, id) {
      this.id = id;
      this.$vux.toast.text(`您选择了${price}`, 'middle');
    },

    // 充值前校验
    beforeWxRecharge() {
      if (this.id) {
        this.getWxpayParam();
      } else {
        this.$vux.toast.text('请先选择充值金额', 'top');
      }
    },

    // 获取微信交易信息
    getWxpayParam() {
      this.loading = true;
      this.loadingText = '正在处理中...';

      this.$http.post('/mobileAppPay!getMppayParam.do', {
        type: 1,
        sign_id: this.id,
        code: this.code,
      })
        .then(({ pay_message }) => {
          this.loading = false;
          this.loadingText = '确认充值';

          this.appId = pay_message.appId;
          this.timeStamp = pay_message.timeStamp;
          this.nonceStr = pay_message.nonceStr;
          this.package = pay_message.package;
          this.paySign = pay_message.paySign;
          this.signType = pay_message.signType;

          this.wxOnBridge();
          // this.chooseWXPay();
        })
        .catch((error) => {
          this.loading = false;
          this.loadingText = '确认充值';
          this.$vux.toast.text(error, 'top');
        });
    },

    // 调用jssdk微信支付功能
    chooseWXPay() {
      this.$wechat.chooseWXPay({
        appId: this.appId,  // 公众号名称，由商户传入
          // 支付签名时间戳，微信jssdk中的所有使用timestamp字段均为小写。最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        timeStamp: `${this.timeStamp}`,
        nonceStr: this.nonceStr, // 随机串
        package: this.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: this.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: this.paySign, // 微信签名

        // 支付成功后的回调函数
        success(res) {
          console.log(res);
          this.$router.push('/pay/ok');
        },
      });
    },

    wxOnBridge() {
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
        }
      } else {
        this.onBridgeReady();
      }
    },

    onBridgeReady() {
      // console.log('有进入onBridgeReady');
      // const time = (Date.now().toString() / 1000).toFixed();
      // console.log(`时间戳${time}`);
      // eslint-disable-next-line
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          appId: this.appId,  // 公众号名称，由商户传入
          // 支付签名时间戳，微信jssdk中的所有使用timestamp字段均为小写。最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          timeStamp: this.timeStamp.toString(),
          nonceStr: this.nonceStr, // 随机串
          package: this.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: this.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: this.paySign, // 微信签名
        },
        (res) => {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            console.log(res.err_msg);
            this.$vux.toast.text('支付成功了', 'top');
            this.$router.push('/pay/ok');
          }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        },
      );
    },

    // 获取充值金额列表
    getRechargeList() {
      this.$http.get('/mobileEntiretySystem!getRechargeList.do')
        .then((res) => {
          this.charge_list = res.charge_list;
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        });
    },
  },

  created() {
    this.getRechargeList();
  },

};
</script>

<style lang="less">
.pay-index {
  padding: 25px;

  &__btn {
    height: 65px;
    text-align: center;
    margin-right: 16px;
    margin-bottom: 16px;
    color: @yellow;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid @border;

    &--active {
      color: #fff;
      background-color: @yellow;
      border: 1px solid @yellow;
    }

    h3 {
      line-height: 1;
      padding-top: 12px;
      font-weight: normal;
    }

    h5 {
      line-height: 1;
      padding-top: 10px;
      font-weight: normal;
    }

    &:nth-child(n+3) {
      margin-right: 0;
    }

    &__pay {
      margin-top: 35px;
      background-color: @yellow;
      color: #fff;
      border-radius: 20px;
      line-height: 42px;
      font-size: 16px;

      &.weui-btn:after {
        border: 0;
      }

      &:not(.weui-btn_disabled):active {
        background-color: @yellow;
        color: #fff;
      }

      &.weui-btn_disabled.weui-btn_default {
        color: #fff;
        background-color: rgba(254, 198, 47, 0.8);
      }
    }
  }
}
</style>
