<template>
  <div>

     这两行字用来<br>占位50px

    <scroller
      height="-50"

      lock-x
      scrollbar-y

      use-pullup
      use-pulldown

      :pullup-config="pullupConfig"
      :pulldown-config="pulldownConfig"

      @on-pullup-loading="loadMore2"
      @on-pulldown-loading="refresh2"

      v-model="status"
      ref="demo"
    >
      <group class="thisgroup">
        <cell v-for="(i,index) in n" :title="`占位${i}`" key="index"></cell>
      </group>
    </scroller>

  </div>
</template>

<script>
import { Group, Cell, Scroller, Spinner } from 'vux';

export default {
  data() {
    return {
      // 上拉加载配置
      pullupConfig: {
        content: '上拉加载更多',
        height: 40,
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...',
      },
      // 下拉刷新配置
      pulldownConfig: {
        content: '下拉刷新',
        height: 60,
        downContent: '下拉刷新',
        upContent: '释放刷新',
        loadingContent: '刷新中...',
      },

      status: {
        // 设置为''等于'default'
        pullupStatus: 'default',
        pulldownStatus: 'default',
      },

      n: 20,

    };
  },

  components: {
    Group,
    Cell,
    Scroller,
    Spinner,
  },

  methods: {
    // 上拉加载
    loadMore1() {
      setTimeout(() => {
        this.n += 10;
        setTimeout(() => {
          this.$refs.demo.donePullup();
        }, 100);
        if (this.n === 50) {
          setTimeout(() => {
            // 禁用上拉加载
            this.$refs.demo.disablePullup();
          }, 100);
        }
      }, 2000);
    },

    // 上拉加载（使用v-model改变pullup状态）
    loadMore2() {
      setTimeout(() => {
        this.n += 10;
        setTimeout(() => {
          this.status.pullupStatus = 'default';
        }, 100);
        if (this.n === 50) {
          setTimeout(() => {
             // 禁用上拉加载
            this.status.pullupStatus = 'disabled';
          }, 100);
        }
      }, 2000);
    },

    // 下拉刷新
    refresh1() {
      setTimeout(() => {
        this.n = 20;
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.demo.donePulldown();
            this.$refs.demo.enablePullup();
          }, 10);
        });
      }, 2000);
    },

    // 下拉刷新（使用v-model改变pulldown状态）
    refresh2() {
      setTimeout(() => {
        this.n = 20;
        this.$nextTick(() => {
          setTimeout(() => {
            this.status.pulldownStatus = 'default';
            // 启用上拉加载
            this.status.pullupStatus = 'enabled';
          }, 10);
        });
      }, 2000);
    },
  },

};
</script>

<style lang="less">
.thisgroup {
  .weui-cells {
    margin-top: 0;
  }
}
</style>
