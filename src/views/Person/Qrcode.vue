<template>
  <div class="person-qrcode">

    <img class="person-qrcode__img" :src="require('@/assets/qrcode.jpg')">

    <p>长按二维码<br>关注“巢享共享洗车”以便于查看余额哦～</p>

  </div>
</template>

<script>
/**
 * 关注二维码
 * @author zml
 * @version 2017-07-25
 */

export default {

  name: 'app-person-qrcode',

  created() {

  },
};

</script>

<style lang="less">
  .person-qrcode {
    text-align: center;

    &__img {
      margin-top: 85px;
      width: 150px;
      height: 150px;
    }

    p {
      margin-top: 22px;
      color: #868686;
      font-size: 15px;
      line-height: 2;
    }
  }

</style>
