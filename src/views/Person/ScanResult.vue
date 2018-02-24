<template>
  <div class="person-scan-result">

    <icon
      v-if="ok"
      class="person-scan-result__icon"
      type="success"
      is-msg
    ></icon>
    <icon
      v-else
      class="person-scan-result__icon"
      type="safe_warn"
      is-msg
    ></icon>

    <p>{{text}}</p>

    <x-button
      class="car-btn car-btn__yellow"
      type="primary"
      @click.native="goTo()"
    >
      {{btnText}}
    </x-button>

    <div class="person-scan-result__number">洗车桩编号：{{id}}</div>

  </div>
</template>

<script>
/**
 * 启动结果
 * @author zml
 * @version 2017-07-25
 */

import { XButton, Icon } from 'vux';

export default {

  name: 'person-scan-result',

  components: {
    XButton,
    Icon,
  },

  data() {
    return {
      ok: false,
      text: '正在处理中...',
      btnText: '返回',
      backUrl: '/person',
    };
  },

  computed: {
    id() {
      return +this.$router.currentRoute.params.id;
    },
  },

  methods: {
    // 启动洗车机
    startWash(id) {
      this.$http.post('mobileMachine!checkNumber.do', {
        machine_number: id,
      })
      .then(({ wash_record_id, new_number }) => {
        this.text = '设备启动成功~';
        this.ok = true;
        // eslint-disable-next-line
        this.backUrl = `/person?wash_record_id=${wash_record_id}&new_number=${new_number}`;
      })
      .catch((error) => {
        if (+error.State === 3) {
          this.$vux.toast.text(error.Message, 'top');
          setTimeout(() => {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5b8c01540c879485&redirect_uri=http%3a%2f%2fapp.yunlinggroup.com%2fcxcar%2f%23%2fpay&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
          }, 2000);
        } else {
          this.text = '启动失败，请重新扫码!';
          this.$vux.toast.text(error, 'top');
        }
      });
    },

    goTo() {
      if (this.ok) {
        this.$router.replace(this.backUrl);
      } else {
        history.back(-1);
      }
    },
  },

  created() {
    if (this.id) {
      this.startWash(this.id);
    } else {
      this.$vux.toast.text('没有读取到洗车机编号', 'top');
    }
  },
};

</script>

<style lang="less">
.person-scan-result {
  position: relative;
  height: 100vh;
  text-align: center;
  padding: 0 15px;

  &__icon{
    margin-top: 60px;
    color: @yellow;
  }

  p {
    margin: 30px 0;
    font-size: 18px;
    line-height: 1;
  }

  &__number {
    font-size: 14px;
    width: 200px;
    left: 50%;
    margin-left:-100px;
    position: absolute;
    color: @text-color;
    bottom: 50px;
  }
}
</style>
