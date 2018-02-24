<template>
  <div class="business-record">

    <!-- 缺省信息 -->
    <load-more
      v-if="list.length === 0"
      :show-loading="false"
      tip="暂无专员洗车记录"
      background-color="#f4f5f9"
    ></load-more>

    <!-- 不使用滚动加载的情况 -->
    <group
      v-if="list.length<10"
      class="business-record__group"
      gutter="0"
    >
      <cell
        v-for="(item,index) in list"
        :title="item.store_name"
        :key="index"
        :inline-desc="item.create_time"
      >
        <span>{{filterPrice(item.price)}}</span>
      </cell>
    </group>

    <!-- 使用滚动加载的情况 -->
    <scroller
      v-else
      lock-x
      scrollbar-y
      use-pullup
      :pullup-config="pullupConfig"
      @on-pullup-loading="getRecord"
      v-model="status"
    >
      <group class="business-record__group" gutter="0">
        <cell
          v-for="(item,index) in list"
          :title="item.store_name"
          :key="index"
          :inline-desc="item.create_time"
        >
          <span>{{filterPrice(item.price)}}</span>
        </cell>
      </group>
    </scroller>
  </div>
</template>

<script>
/**
 * 交易记录
 * @author zml
 * @version 2017-11-27
 */
import { Group, Cell, Scroller, Spinner, LoadMore } from 'vux';

export default {
  name: 'app-business-record',

  components: {
    Group,
    Cell,
    Scroller,
    Spinner,
    LoadMore,
  },

  data() {
    return {
      page: 1, // 页数列表

      list: [],

      hasMore: true, // 是否还有下一页

      // 上拉加载配置
      pullupConfig: {
        content: '上拉加载更多',
        height: 40,
        autoRefresh: true,
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-',
      },

      // 上拉加载状态
      status: {
        pullupStatus: 'default',
      },
    };
  },

  methods: {
    // 获取交易记录数据
    getRecord() {
      this.$http.get(`/mobileStore!getStorePayList.do?page_no=${this.page}`)
        .then((res) => {
          this.list = [...this.list, ...res];
          this.page = this.page + 1;
          if (res.length < 10) {
            this.status.pullupStatus = 'disabled';
          } else {
            this.status.pullupStatus = 'default';
          }
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        });
    },

    filterPrice(value) {
      return `- ${value.toFixed(2)}`;
    },

  },

  created() {
    this.getRecord();
  },
};
</script>

<style lang="less">
.business-record {

  .vux-label {
    font-size: 16px;
  }
  .weui-cell__ft {
    font-weight: bold;
    color: @yellow;
  }
}
</style>
