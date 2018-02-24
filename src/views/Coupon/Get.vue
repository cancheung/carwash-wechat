<template>
  <div class="coupon-get">

    <div class="coupon__item">
      <group class="coupon-get__input">
        <x-input
          placeholder="请输入您的手机号"
          keyboard="number"
          :max="11"
          v-model="form.uname"
        ></x-input>
        <x-input
          placeholder="输入验证码"
          class="weui-vcode"
          v-model="form.validate_code"
          keyboard="number"
          :max="6"
        >
          <x-button
            mini
            slot="right"
            class="coupon-get__vcode"
            :disabled="vcodeActive"
            @click.native="sendValidateCode"
          >{{vcodeText}}</x-button>
        </x-input>
      </group>
      <x-button
        type="warn"
        class="coupon__item__button"
        :show-loading="active.submit"
        :disabled="active.submit"
        @click.native="beforeSubmit"
      >{{submitText}}</x-button>
    </div>

    <div class="coupon__item">
      <div class="coupon-get__title">
        <div class="coupon-get__title__text">活动规则</div>
      </div>
      <ul class="coupon-get__rules">
        <li>1、洗车券新老用户同享。</li>
        <li>2、老用户邀请新用户，各得5张洗车优惠券。</li>
        <li>3、老用户邀请老用户，不赠送洗车券。</li>
        <li>4、其他未尽事宜，请咨询客服。</li>
      </ul>
    </div>

  </div>
</template>

<script>
/**
 * 红包领取
 * @author zml
 * @version 2017-07-25
 */

import { GLOBAL } from '@/store/mutationTypes';
import { Group, XInput, XButton } from 'vux';

export default {

  name: 'app-coupon-get',

  components: {
    Group,
    XInput,
    XButton,
  },

  data() {
    return {
      form: {
        uname: '', // 手机号码
        validate_code: '', // 验证码
      },

      active: {
        submit: false, // 提交按钮
      },

      submitText: '立即领取',

      vcodeActive: false, // 验证码点击状态
      vcodeText: '获取验证码',
      vcodeTime: 60,
    };
  },

  computed: {
    id() { // 从URL 获取用户id
      return +this.$router.currentRoute.params.id;
    },
    isTel() {
      const reg = /^1\d{10}$/; // 验证手机号正则
      return reg.test(this.form.uname);
    },
    isVcode() {
      const reg = /^\d{6}$/; // 验证验证码格式（6位数字）
      return reg.test(this.form.validate_code);
    },
  },

  methods: {
     // 验证码60S倒计时
    timeReduce() {
      if (this.vcodeTime === 0) {
        this.vcodeActive = false;
        this.vcodeText = '获取验证码';
        this.vcodeTime = 60;
      } else {
        this.vcodeActive = true;
        this.vcodeText = `${this.vcodeTime} S`;
        this.vcodeTime = this.vcodeTime - 1;
        setTimeout(() => {
          this.timeReduce();
        }, 1000);
      }
    },

    // 发送验证码
    sendValidateCode() {
      if (this.isTel) {
        this.$http.post('/mobileMember!sendValidateCode.do', {
          uname: this.form.uname,
        })
          .then(() => {
            this.$vux.toast.text('发送成功', 'top');
          })
          .catch((error) => {
            this.$vux.toast.text(error, 'top');
          });

        this.timeReduce();
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
      } else if (this.isAgree === false) {
        this.$vux.toast.text('您尚未同意用户协议', 'top');
      } else {
        this.submit();
      }
    },

    // 提交表单
    submit() {
      this.active.submit = true;
      this.submitText = '立即领取';

      this.$http.post('/mobileMember!login.do', {
        ...this.form,
        recomId: this.id,
      })
        .then((res) => {
          this.active.submit = false;
          this.submitText = '正在领取中...';
          // 将token、member_id、uname写入localStorage
          localStorage.setItem('token', res.token);
          localStorage.setItem('member_id', res.member_id);
          localStorage.setItem('uname', res.uname);
          // 更新store的token、member_id
          this.$store.commit(GLOBAL.TOKEN.UPDATE, res.token);
          this.$store.commit(GLOBAL.MEMBERID.UPDATE, res.member_id);

          this.$vux.toast.text('洗车券领取成功！', 'top');

          // 跳转到洗车券列表页
          setTimeout(() => {
            this.$router.push('/coupon/list');
          }, 2000);
        })
        .catch((error) => {
          this.active.submit = false;
          this.submitText = '立即领取';
          this.$vux.toast.text(error, 'top');
        });
    },
  },

  created() {
  },

};
</script>

<style lang="less">
.coupon-get {
  color: #3C3E3A;

  &__input {
    .weui-cells {
      margin-top: 0;
      border-radius: 5px;
    }
    .weui-cell:last-child::before{
      right: 15px;
    }
  }

  &__vcode {
    width: 100px !important;
    color: #fff;
    background-color: #8EC31D ;

    &:not(.weui-btn_disabled):active {
      background-color: #8EC31D ;
      color: #fff;
    }

    &.weui-btn_disabled.weui-btn_default {
      color: rgba(0, 0, 0, 0.5);
      background-color: #D1E8A4;
      color: #fff;
    }
  }

  &__submit {
    margin-top: 15px;
  }

  &__title {
    position: relative;
    height: 26px;
    width: 100%;

    &::before {
      position: absolute;
      background-color: #BDBCBA;
      width: 100%;
      left: 0;
      top: 12px;
      content: " ";
      height: 2px;
    }

    &__text {
      position: absolute;
      width: 140px;
      left: 50%;
      margin-left: -70px;
      background-color: #D1E8A4;
      text-align: center;
      line-height: 26px;
      font-size: 16px;
    }
  }

  &__rules {
    margin: 15px 0;
    line-height: 1.75;
    list-style: none;
    font-size: 14px;
  }
}


</style>
