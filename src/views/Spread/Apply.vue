<template>
  <div class="spread-apply">
    <group
      label-width="4em"
      label-margin-right="1em"
      label-align="right"
    >
      <group-title slot="title">
        认证信息填写
        <span style="float:right;">所有字段均必填</span>
      </group-title>

      <x-input
        title="姓名"
        v-model="form.name"
        placeholder="请填写真实姓名"
        required
      />

      <x-input
        title="身份证"
        v-model="form.card_no"
        placeholder="请填写身份证号码"
        :min="15"
        :max="18"
        required
      />

      <selector
        title="银行"
        placeholder="请选择银行"
        v-model="form.bank_id"
        :options="bankList"
        required
      ></selector>

      <x-input
        title="开户行"
        v-model="form.bank_name"
        placeholder="请填写开户行名称"
        required
      />

      <x-input
        title="银行卡号"
        v-model="form.bank_no"
        placeholder="请填写银行卡号"
        keyboard="number"
        :min="15"
        :max="19"
        required
      />

      <x-input
        title="微信号"
        v-model="form.wx_code"
        placeholder="请填写微信号"
        required
      />

      <x-input
        title="支付宝"
        v-model="form.alipay_code"
        placeholder="请填写支付宝"
        required
      />

      <x-input
        title="手机号"
        is-type="china-mobile"
        v-model="form.spread_phone"
        placeholder="输入手机号码"
        keyboard="number"
        :min="11"
        :max="11"
      />

      <x-input
        title="验证码"
        placeholder="输入验证码"
        class="weui-vcode"
        v-model="form.validate_code"
        keyboard="number"
        :min="6"
        :max="6"
      >
        <!-- 发送验证码按钮 -->
        <x-button
          mini
          slot="right"
          class="person-login__vcode"
          style="color:#fff;"
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
            ></countdown>
          </span>

          <!-- 缺省文案 -->
          <span v-if="!vcode.start && !vcode.loading">获取验证码</span>

        </x-button>
      </x-input>

    </group>

    <box gap="15px 15px">
      <!-- 提交按钮 -->
      <x-button
        class="car-btn car-btn__yellow"
        action-type="submit"
        :show-loading="formLoading"
        :disabled="formLoading"
        @click.native="submit"
      >提交认证</x-button>
    </box>

  </div>
</template>

<script>
/**
 * 推广员申请
 * @author zml
 * @version 2017-11-27
 */
import { GroupTitle, Group, Cell, XInput, XButton, Selector, Countdown, Box } from 'vux';


export default {

  name: 'app-spread-apply',

  components: {
    GroupTitle,
    Group,
    Cell,
    XInput,
    XButton,
    Selector,
    Countdown,
    Box,
  },

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

  data() {
    return {
      form: {
        name: '', // 用户名（手机号）
        card_no: '', // 身份证号码

        bank_id: '', // 银行id
        bank_name: '', // 开户行名称
        bank_no: '', // 银行卡号
        wx_code: '', // 微信号
        alipay_code: '', // 支付宝号

        spread_phone: '', // 推广员手机
        validate_code: '', // 验证码
      },

      bankList: [
        { key: 1, value: '中国工商银行' },
        { key: 2, value: '中国建设银行' },
        { key: 3, value: '中国银行' },
        { key: 4, value: '中国农业银行' },
        { key: 5, value: '交通银行' },
        { key: 6, value: '招商银行' },
        { key: 7, value: '浦东发展银行' },
        { key: 8, value: '中信银行' },
        { key: 9, value: '兴业银行' },
        { key: 10, value: '中国民生银行' },
        { key: 11, value: '中国邮政储蓄银行' },
        { key: 12, value: '中国光大银行' },
        { key: 13, value: '平安银行' },
        { key: 14, value: '农商银行' },
        { key: 15, value: '北京银行' },
        { key: 16, value: '华夏银行' },
        { key: 17, value: '广发银行' },
      ],

      vcode: {
        loading: false, // 验证码按钮loading
        start: false, // 倒计时状态
        time: 60, // 倒计时长
      },

      formLoading: false, // 提交按钮loading
    };
  },

  computed: {
    isTel() {
      const reg = /^1\d{10}$/; // 验证手机号正则
      return reg.test(this.form.spread_phone);
    },
    isVcode() {
      const reg = /^\d{6}$/; // 验证验证码格式（6位数字）
      return reg.test(this.form.validate_code);
    },
  },

  methods: {
    // 提交表单
    submit() {
      this.formLoading = true;

      this.$http.post('/mobileMember!spreadApply.do', this.form)
        .then(() => {
          this.$vux.toast.text('提交成功', 'top');
          this.$emit('updateInfo');
          this.$router.replace('/spread');
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        })
        .then(() => {
          this.formLoading = false;
        });
    },

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
          uname: this.form.spread_phone,
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

    // 初始化表单，如果已经提交过信息则填充
    setFormInfo() {
      const {
        card_no,
        bank_id,
        bank_name,
        bank_no,
        wx_code,
        alipay_code,
        spread_phone,
       } = this.info;

      this.form = {
        ...this.form,
        card_no,
        bank_id,
        bank_name,
        bank_no,
        wx_code,
        alipay_code,
        spread_phone,
      };
    },
  },

  created() {
    this.setFormInfo();
  },
};

</script>

<style lang="less">
.spread-apply {
  .weui-cell {
    font-size: 15px;
  }
}
</style>
