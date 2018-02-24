<template>
  <div class="spread-qrcode">

    <div class="spread-qrcode__code">
      <b>邀请码：<strong>{{this.invite_code}}</strong></b>
    </div>

    <div class="spread-qrcode__img">
      <qrcode
        v-if="invite_code"
        :value="qrcodeUrl"
        type="img"
        :fg-color="fgColor"
      ></qrcode>
    </div>
    <p><b>长按识别二维码</b></p>

    <div class="spread-qrcode__name">
      <b>{{name}} 邀请您加入巢享共享洗车<br>享洗车，去巢享！</b><br>
    </div>


  </div>
</template>

<script>
/**
 * 专属二维码
 * @author zml
 * @version 2017-11-27
 */

import { wxShare, wxConfig } from '@/mixins';
import { Qrcode } from 'vux';


export default {

  name: 'app-spread-qrcode',

  mixins: [wxShare, wxConfig],

  components: {
    Qrcode,
  },

  data() {
    return {
      fgColor: '#5cbac6',
    };
  },

  computed: {
    currentHref() { // 当前页面完整url
      return window.location.href;
    },
    hostName() { // 域名
      return window.location.href.split('#')[0];
    },
    invite_code() { // url是否有邀请码字段，有的话在提交时上传
      return this.$route.query.invite_code || null;
    },
    name() { // 推广员姓名
      return this.$route.query.name || 'VIP';
    },
    qrcodeUrl() { // 二维码链接
      return `${this.hostName}#/person/login?invite_code=${this.invite_code}&name=${this.name}`;
    },
  },

  created() {
    if (this.invite_code) {
      // this.getJssdk(this.currentHref);
      this.setWxShareConfig();
    } else {
      this.$vux.toast.text('邀请码不存在，请返回重试', 'top');
    }
  },
};

</script>

<style lang="less">
.spread-qrcode {
  position: relative;
  height: 100vh;
  background-image: url('../../assets/bg.png');
  background-size: 100% auto;
  text-align: center;
  color: #fff;

  &__code{
    padding-top: 12%;
    user-select: text;

    strong {
      font-size: 20px;
    }
  }

  &__img{
    display: inline-block;
    padding: 10px;
    background-color: #fff;
    line-height: 1;
    margin-top: 15px;
  }

  &>p{
    margin-top: 8px;
  }

  &__name {
    position: absolute;
    width: 100%;
    bottom: 11%;
    font-size: 18px;
  }

}
</style>
