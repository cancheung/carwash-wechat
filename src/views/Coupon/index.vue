<template>
  <div class="coupon">
    <img class="coupon__img" :src="require('@/assets/coupon-bg.png')" alt="巢享共享洗车">
    <router-view class="coupon__main"></router-view>
  </div>
</template>

<script>
/**
 * 红包主组件
 * @author zml
 * @version 2017-07-25
 */

export default {

  name: 'app-coupon',

  created() {
  },

};
</script>

<style lang="less">
.coupon {
  position: relative;
  min-height: 100vh;
  background-color: #8EC31D;

  &::after {
    display: block;
    content: " ";
    clear: both;
    height: 1px;
  }

  &__img {
    width: 100%;
  }

  &__main {
    margin: 0 10px 10px;
  }

  &__footer {
    height: 1px;
    width: 100%
  }

  &__item {
    padding: 17px 20px;
    border-radius: 8px;
    background-color:#D1E8A4;

    &:first-child {
      margin-bottom: 10px;
    }
    &:last-child {
      margin-bottom: 0;
    }

    &__button {
      margin-top: 15px;
    }
  }
}
</style>
