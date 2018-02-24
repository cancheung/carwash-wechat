<template>
  <div class="transfer">

    <group
      label-width="4.5em"
      label-margin-right="1em"
      label-align="right"
    >
      <group-title slot="title">
        余额可转让
        <span class="color-yellow">{{balance.toFixed(2)}}</span>
        元，手续费 <span class="color-yellow">{{transfer_rate}}%</span>
        <br>最低转让金额 <span class="color-yellow">{{transfer_lowest}}</span> 元
      </group-title>

      <x-input
        title="转让用户"
        v-model="form.uname"
        placeholder="请输入用户手机号"
        keyboard="number"
        :min="11"
        :max="11"
      />

      <x-input
        title="转让金额"
        v-model="form.price"
        placeholder="请输入转让金额"
        keyboard="number"
      />

      <x-input
        v-if="charge !== 0"
        title="手续费"
        readonly
        v-model="charge"
      />

    </group>

    <box gap="15px 15px">
      <x-button
        class="car-btn car-btn__yellow"
        :show-loading="formLoading"
        :disabled="formLoading"
        @click.native="beforeSubmit"
      >转让</x-button>
      <x-button
        class="car-btn car-btn__blue"
        :link="`/transfer/${uname}`"
      >转让记录</x-button>
    </box>

  </div>
</template>

<script>
/**
 * 余额转让
 * @author zml
 * @version 2018-01-05
 */
import { GroupTitle, Group, Cell, XInput, XButton, Box } from 'vux';

export default {

  name: 'app-transfer',

  components: {
    GroupTitle,
    Group,
    Cell,
    XInput,
    XButton,
    Box,
  },

  data() {
    return {
      uname: '', // 用户名
      balance: 0, // 余额
      transfer_rate: 0, // 手续费收取比例
      transfer_lowest: 0, // 最低转让金额

      form: {
        uname: '', // 手机号（用户名）
        price: null, // 转账金额
      },

      formLoading: false, // 提交按钮loading
      charge: 0,
    };
  },

  computed: {
    isTel() { // 验证手机号正则
      const reg = /^1\d{10}$/;
      return reg.test(this.form.uname);
    },

    isPrice() { // 验证转账金额格式
      const price = +this.form.price;
      return price > 0 && (price + this.charge) <= this.balance && price >= this.transfer_lowest;
    },

    serviceCharge() {
      const price = +this.form.price;
      if (price > 0 && !isNaN(price)) {
        return +(price * (this.transfer_rate / 100)).toFixed(2);
      }
      return 0;
    },
  },

  watch: {
    serviceCharge(value) {
      this.charge = value;
    },
  },

  methods: {
    // 提交表单前的验证
    beforeSubmit() {
      if (!this.isTel) {
        this.$vux.toast.text('请填写正确的手机格式', 'top');
      } else if (!this.isPrice) {
        this.$vux.toast.text('请填写正确的转让金额', 'top');
      } else {
        this.submit();
      }
    },

    // 表单提交
    submit() {
      this.formLoading = true;
      this.$http.post('/mobileMember!transferBalance.do', this.form)
        .then(() => {
          this.$vux.toast.text('余额转让成功', 'top');
          this.$router.replace('/transfer/record');
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        })
        .then(() => {
          this.formLoading = false;
        });
    },

    // 获取用户信息
    getMemberDetail() {
      this.$http.get('/mobileMember!getMemberDetail.do')
        .then((res) => {
          this.uname = res.uname;
          this.balance = res.balance;
          this.transfer_rate = res.transfer_rate;
          this.transfer_lowest = +res.transfer_lowest || 0;
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        });
    },
  },

  created() {
    this.getMemberDetail();
  },
};

</script>

<style lang="less">
.transfer {

  .weui-cell {
    font-size: 15px;
  }

  &__charge {

  }
}
</style>
