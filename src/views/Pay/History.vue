<template>
  <div class="pay-history">
    <!-- 洗车记录 -->
    <timeline>
      <timeline-item v-for="(item,index) in washList" :key="index">
        <div class="pay-history__item">
          <p>{{item.time}}</p>
          <p class="ellipsis">
            <svg class="svg-icon" width="15px" height="15px" viewBox="0 0 1024 1024">
              <path d="M507.657 62c-172.231 0-311.824 139.593-311.824 311.824 0 133.634 187.753 432.292 271.876 559.413 18.918 28.619 60.979 28.619 79.896 0 84.123-127.12 271.876-425.778 271.876-559.413 0-172.23-139.593-311.824-311.824-311.824v0zM507.657 488.645c-66.245 0-119.914-53.669-119.914-119.914s53.669-119.948 119.914-119.948c66.245 0 119.914 53.703 119.914 119.948 0 66.245-53.669 119.914-119.914 119.914v0z"
                fill='#c7c7c7' />
            </svg>
            {{item.address}}
          </p>
          <flexbox class="pay-history__item__info">
            <flexbox-item>
              <svg class="svg-icon" width="15px" height="15px" viewBox="0 0 1024 1024">
                <path d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM511.913993 895.677474c-211.577356 0-383.763481-172.186125-383.763481-383.763481 0-211.577356 172.014111-383.763481 383.763481-383.763481s383.763481 172.014111 383.763481 383.763481S723.491349 895.677474 511.913993 895.677474z"
                  fill='#c7c7c7'></path>
                <path d="M672.05913 511.913993l-159.973123 0L512.086007 288.123635c0-17.717453-14.277171-32.166639-31.994625-32.166639-17.717453 0-31.994625 14.449185-31.994625 32.166639l0 255.956996c0 17.717453 14.277171 31.994625 31.994625 31.994625l191.967747 0c17.717453 0 32.166639-14.277171 32.166639-31.994625C704.053754 526.191164 689.604569 511.913993 672.05913 511.913993z"
                  fill='#c7c7c7' />
              </svg>
              洗车时间：{{item.wash_time}}
            </flexbox-item>
            <flexbox-item>
              <svg class="svg-icon" width="15px" height="15px" viewBox="0 0 1024 1024">
                <path d="M512 960c-249.6 0-448-198.4-448-448 0-249.6 198.4-448 448-448 249.6 0 448 198.4 448 448C960 761.6 761.6 960 512 960zM512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z"
                  fill='#c7c7c7'></path>
                <path d="M697.6 614.4 544 614.4l0 96c0 12.8-12.8 25.6-32 25.6-19.2 0-32-12.8-32-25.6L480 614.4 326.4 614.4c-12.8 0-25.6-12.8-25.6-32 0-19.2 12.8-32 25.6-32l160 0L486.4 492.8 384 492.8c-12.8 0-25.6-12.8-25.6-32C358.4 448 371.2 435.2 384 435.2l76.8 0L371.2 332.8C358.4 326.4 364.8 313.6 384 300.8c12.8-12.8 32-19.2 38.4-6.4L512 390.4l89.6-96C608 281.6 627.2 288 640 300.8c12.8 12.8 19.2 25.6 12.8 38.4L563.2 435.2 640 435.2c12.8 0 25.6 12.8 25.6 32 0 19.2-12.8 32-25.6 32L544 499.2l0 57.6 160 0c12.8 0 25.6 12.8 25.6 32C723.2 601.6 710.4 614.4 697.6 614.4z"
                  fill='#c7c7c7' />
              </svg>
              洗车花费：{{item.price}}元
            </flexbox-item>
          </flexbox>
        </div>
      </timeline-item>
    </timeline>

    <!-- 缺省信息 -->
    <load-more
      v-if="washList.length === 0"
      :show-loading="false"
      tip="暂无洗车记录"
      background-color="#f4f5f9"
    ></load-more>

  </div>
</template>

<script>
/**
 * 历史记录
 * @author zml
 * @version 2017-07-25
 */

import { Timeline, TimelineItem, Flexbox, FlexboxItem, LoadMore } from 'vux';

export default {

  name: 'app-pay-history',

  components: {
    Timeline,
    TimelineItem,
    Flexbox,
    FlexboxItem,
    LoadMore,
  },

  data() {
    return {
      washList: [], // 洗车记录
    };
  },

  methods: {
    // 获取洗车记录
    getWashList() {
      this.$http.get('/mobileMember!getWashList.do')
        .then((res) => {
          this.washList = res;
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        });
    },
  },

  created() {
    this.getWashList();
  },

};

</script>

<style lang="less">
  .pay-history {
    .vux-timeline {
      padding: 8px 0 0 15px;
    }

    .vux-timeline-item-head,
    .vux-timeline-item-head-first,
    .vux-timeline-item-tail {
      top: 38px;
    }

    .vux-timeline-item-content {
      padding: 0 0 8px 25px;
    }

    &__item {
      border: 1px solid @border;
      background-color: #fff;
      height: 75px;
      padding: 5px 12px;

      p {
        color: @text-color;
        font-size: 13px;
        line-height: 2;
      }

      &__info {
        font-size: 12px;
        line-height: 2;
      }
    }
  }

</style>
