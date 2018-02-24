<template>
  <div id="app">
    <!-- 滚动区域 - 页面主体 -->
    <view-box
      ref="viewBox"
      body-padding-bottom="0"
      body-padding-top="0"
    >
      <!-- 路由 -->
      <router-view
        @getJssdk="getJssdk"
      ></router-view>

    </view-box>
  </div>
</template>

<script>

import { ViewBox } from 'vux';
import { wxConfig } from '@/mixins';

export default {
  name: 'app',

  mixins: [wxConfig],

  components: {
    ViewBox,
  },

  created() {
    this.getJssdk();
  },
};

</script>

<style lang="less">

html,body {
  background-color: @background;
  user-select: none; // 禁止复制
  width: 100%;
  height:100vh;
  overflow-x: hidden;
}
</style>
