<template>
  <div class="person-scan">
    <div class="person-scan__btn">
      <x-button type="primary" @click.native="scanQRCode()">微信扫一扫</x-button>
      <x-button plain type="primary" @click.native="back()">返回</x-button>
    </div>
  </div>
</template>

<script>
/**
 * 扫码洗车
 * @author zml
 * @version 2017-07-25
 */

import { XButton } from 'vux';


export default {

  name: 'app-person-scan',

  components: {
    XButton,
  },

  data() {
    return {
      text: '未启动',
    };
  },

  methods: {

    // 调起微信扫一扫接口
    scanQRCode() {
      console.log('调起微信扫一扫接口');
      this.$wechat.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      });
    },

    // 返回上一页
    back() {
      history.back(-1);
    },
  },

  created() {
    this.$wechat.ready(() => {
      this.scanQRCode();
    });
  },
};

</script>

<style lang="less">
  .person-scan {
    position: relative;
    height: 100vh;
    width: 90%;
    left:5%;

    &__btn{
      position: absolute;
      width: 100%;
      top: 50%;
      margin-top: -50px;
    }

  }

</style>
