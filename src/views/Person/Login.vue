<template>
  <div class="person-login">

    <!-- logo -->
    <div class="person-login__logo">
      <img :src="require('@/assets/logo.png')">
    </div>

    <group class="person-login__inputs">
      <!-- 手机号 -->
      <x-input
        placeholder="输入手机号码"
        v-model="form.uname"
        keyboard="number"
        :min="11"
        :max="11"
      />

      <!-- 验证码 -->
      <x-input
        placeholder="输入验证码"
        v-model="form.validate_code"
        keyboard="number"
        :min="6"
        :max="6"
        class="weui-vcode"
      >
        <!-- 发送验证码按钮 -->
        <x-button
          mini
          slot="right"
          class="person-login__vcode"
          :disabled="vcode.start || vcode.loading"
          @click.native="sendValidateCode"
        >
          <!-- 接口请求loading -->
          <span v-if="vcode.loading">发送中...</span>

          <!-- 倒计时 -->
          <span v-if="vcode.start">
            <countdown
              v-model="vcode.time"
              :start="vcode.start"
              @on-finish="countdownFinish"
            ></countdown> S
          </span>

          <!-- 缺省文案 -->
          <span v-if="!vcode.start && !vcode.loading">获取验证码</span>

        </x-button>
      </x-input>

      <!-- 邀请码 -->
      <x-input
        :readonly="query_invite_code"
        title="邀请码"
        placeholder="非必填"
        v-model="form.invite_code"
        :min="6"
        :max="6"
      />

    </group>

    <check-icon class="person-login__agree" :value.sync="active.agree"></check-icon>
    <span class="person-login__agree__text">
      我已阅读，并同意
      <router-link to="/person/agreement">《用户协议》</router-link>
    </span>

    <x-button
      @click.native="beforeSubmit"
      :show-loading="active.submit"
      :disabled="active.submit"
      class="person-login__submit"
    >验证手机</x-button>

  </div>
</template>

<script>
/**
 * 登陆
 * @author zml
 * @version 2017-07-25
 */

import { GLOBAL } from '@/store/mutationTypes';
import { CheckIcon, XInput, Group, XButton, Countdown } from 'vux';

export default {

  name: 'app-person-login',

  components: {
    CheckIcon,
    XInput,
    XButton,
    Group,
    Countdown,
  },

  data() {
    return {
      form: {
        uname: '', // 手机号码
        validate_code: '', // 验证码
        invite_code: '', // 邀请码
      },

      active: {
        agree: true, // 用户协议
        submit: false, // 提交按钮
      },

      vcode: {
        loading: false, // 验证码按钮loading
        start: false, // 倒计时状态
        time: 60, // 倒计时长
      },

    };
  },

  computed: {
    isTel() { // 验证手机号正则
      const reg = /^1\d{10}$/;
      return reg.test(this.form.uname);
    },
    isVcode() { // 验证验证码格式（6位数字）
      const reg = /^\d{6}$/;
      return reg.test(this.form.validate_code);
    },
    isAgree() { // 是否同意用户协议
      return this.active.agree;
    },
    isInviteCode() { // 邀请码验证格式
      return (this.form.invite_code.length === 6 || this.form.invite_code.length === 0);
    },
    query_invite_code() { // url是否有邀请码字段，有的话在提交时上传
      return this.$route.query.invite_code || null;
    },
    hostName() { // 域名
      return window.location.href.split('#')[0];
    },
    name() { // 推广员姓名
      return this.$route.query.name || null;
    },
  },

  watch: {
    query_invite_code(val) {
      this.form.invite_code = val;
    },
  },

  methods: {
    // 倒计时完成回调,重置获取验证码参数
    countdownFinish() {
      this.vcode.start = false;
      this.vcode.time = 60;
    },

    // 发送验证码
    sendValidateCode() {
      if (this.isTel) {
        this.vcode.loading = true;

        this.$http.post('/mobileMember!sendValidateCode.do', {
          uname: this.form.uname,
        })
          .then(() => {
            this.$vux.toast.text('发送成功', 'top');
            // 开始倒计时
            this.vcode.start = true;
          })
          .catch((error) => {
            this.$vux.toast.text(error, 'top');
          })
          .then(() => {
            this.vcode.loading = false;
          });
      } else {
        this.$vux.toast.text('请填写正确的手机格式', 'top');
      }
    },

    // 提交表单前的验证
    beforeSubmit() {
      if (this.isTel === false) {
        this.$vux.toast.text('请填写正确的手机格式', 'top');
      } else if (this.isVcode === false) {
        this.$vux.toast.text('请填写6位验证码', 'top');
      } else if (this.isInviteCode === false) {
        this.$vux.toast.text('请填写6位邀请码', 'top');
      } else if (this.isAgree === false) {
        this.$vux.toast.text('您尚未同意用户协议', 'top');
      } else {
        this.submit();
      }
    },

    // 提交表单
    submit() {
      this.active.submit = true;

      const data = this.form;

      this.$http.post('/mobileMember!login.do', data)
        .then((res) => {
          // 清空localStorage
          localStorage.clear();
          // 将token、member_id、uname写入localStorage
          localStorage.setItem('token', res.token);
          localStorage.setItem('member_id', res.member_id);
          localStorage.setItem('uname', res.uname);
          // 更新store的token、member_id
          this.$store.commit(GLOBAL.TOKEN.UPDATE, res.token);
          this.$store.commit(GLOBAL.MEMBERID.UPDATE, res.member_id);
          if (localStorage.token && localStorage.member_id) {
            this.$router.push('/person');
          }
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        })
        .then(() => {
          this.active.submit = false;
        });
    },
  },

  mounted() {
    this.$wechat.ready(() => {
        // 分享到朋友圈配置
      this.$wechat.onMenuShareTimeline({
        title: `${this.name}邀请您加入巢享洗车`, // 分享标题
        link: `${this.hostName}#/person/login?invite_code=${this.invite_code}&name=${this.name}`, // 分享链接
        imgUrl: 'http://app.yunlinggroup.com/cxcar/statics/cxcar_icon.png', // 分享图标
      });

        // 分享给朋友配置
      this.$wechat.onMenuShareAppMessage({
        title: `${this.name}邀请您加入巢享洗车`, // 分享标题
        link: `${this.hostName}#/person/login?invite_code=${this.invite_code}&name=${this.name}`, // 分享链接
        desc: '和我一起加入巢享共享洗车！享洗车，去巢享！为节能环保贡献一份力量，为城市增添一份色彩！', // 分享描述
        imgUrl: 'http://app.yunlinggroup.com/cxcar/statics/cxcar_icon.png', // 分享图标
      });
    });
  },

  created() {
    if (this.query_invite_code) {
      this.form.invite_code = this.query_invite_code;
    }
  },

};
</script>

<style lang="less">
.person-login {
  padding: 0 25px;

  &__logo {
    text-align: center;
    padding-top: 37px;
    margin-bottom: 53px;

    img {
      width: 89px;
      height: 62px;
    }
  }

  &__inputs {
    .weui-cells {
      margin-top: 0;
      background-color: @background;

      &:before {
        content: none;
      }
    }

    .weui-cell {
      padding: 15px 0 15px 15px;
      font-size: 14px;

      &::before {
        left: 0;
      }

      .weui-label {
        color: #5b5b5b;
      }
    }
  }

  &__vcode {
    width: 100px !important;
    background-color: @yellow;

    &:not(.weui-btn_disabled):active {
      background-color: @yellow ;
    }

    &.weui-btn_disabled.weui-btn_default {
      color: rgba(0, 0, 0, 0.5);
      background-color: rgba(254, 198, 47, 0.8);
    }
  }

  &__agree {
    margin-top: 8px;
    padding-left: 8px;

    .weui-icon-success {
      &:before {
        color: @yellow !important;
      }
    }

    &__text {
      font-size: 12px;
      color: #a9a9a9;

      a {
        color: @yellow;

        &:active,
        &:hover {
          color: @yellow;
        }
      }
    }
  }

  &__submit {
    margin-top: 40px;
    background-color: @yellow;
    font-size: 14px;
    line-height: 40px;

    &:not(.weui-btn_disabled):active {
      background-color: @yellow !important;
    }

    &.weui-btn_disabled.weui-btn_default {
      color: rgba(0, 0, 0, 0.5);
      background-color: rgba(254, 198, 47, 0.8);
    }
  }
}
</style>
