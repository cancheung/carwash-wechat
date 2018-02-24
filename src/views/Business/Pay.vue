<template>
  <div class="business-pay">

    <icon
      class="business-pay__icon"
      type="safe_success"
      is-msg
    ></icon>

    <div class="business-pay__price">
      <countup
        :start-val="0"
        :duration="1"
        :decimals="2"
        :end-val="qrcode_price"
      />

      <div class="business-pay__price__text">
        支付金额，单位（元）
      </div>
    </div>


    <div class="business-pay__btn">
      <x-button
        class="car-btn car-btn__yellow"
        type="primary"
        :disabled="!id"
        :show-loading="loading"
        @click.native="submit"
      >
        确认支付
      </x-button>

      <div class="business-pay__btn__text">
        商家名称：{{store_name}}
      </div>
    </div>


  </div>
</template>

<script>
/**
 * 商家扣款确认
 * @author zml
 * @version 2017-12-13
 */

import { XButton, Icon, Countup } from 'vux';

export default {
  name: 'app-business-pay',

  components: {
    Countup,
    XButton,
    Icon,
  },

  data() {
    return {
      store_name: '我是商家名称', // 商家店铺名称
      qrcode_price: 25.5, // 扣款金额

      loading: false, // 提交按钮loading
    };
  },

  computed: {
    id() { // 商家id
      return +this.$router.currentRoute.params.id;
    },
  },

  methods: {
    // 获取商家信息
    getShopInfo() {
      this.$http.post('mobileStore!getStoreSubMessage.do', {
        store_admin_id: this.id,
      })
      .then((res) => {
        this.store_name = res.store_name;
        this.qrcode_price = +res.qrcode_price;
      })
      .catch((error) => {
        this.$vux.toast.text(error, 'top');
      });
    },

    // 提交
    submit() {
      this.loading = true;
      this.$http.post('mobileStore!subPriceToStore.do', {
        store_admin_id: this.id,
      })
      .then((res) => {
        console.log(res);
        this.$vux.toast.text('支付成功！', 'top');
        this.$router.replace('/business/record');
      })
      .catch((error) => {
        if (+error.State === 3) {
          this.$vux.toast.text(error.Message, 'top');
          setTimeout(() => {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5b8c01540c879485&redirect_uri=http%3a%2f%2fapp.yunlinggroup.com%2fcxcar%2f%23%2fpay&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
          }, 2000);
        } else {
          this.$vux.toast.text(error, 'top');
        }
      })
      .then(() => {
        this.loading = false;
      });
    },
  },

  created() {
    this.getShopInfo();
  },
};
</script>

<style lang="less">
.business-pay {
  position: relative;
  height: 100vh;
  text-align: center;
  background-image: url('../../assets/bg.png');
  background-size: 100% auto;

  &__icon {
    margin-top: 60px;
    color:#fff;
  }

  &__price {
    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    margin-top: 30px;
    font-size: 50px;
    color:#fff;
    line-height: 1;

    &__text {
      margin-top: 8px;
      font-size:14px;
    }
  }

  &__btn {
    position: absolute;
    bottom:9%;
    left:20px;
    right:20px;

    &__text {
      margin-top: 10px;
      color: #fff;
      font-size: 14px;
    }
  }

}

</style>
