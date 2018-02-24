<template>
  <div class="coupon-detail">
    <div class="coupon__item">

      <!-- 洗车券列表 -->
      <ul class="coupon-detail__list">
        <li
          v-for="(item,index) in list"
          :key="index"
          v-if="item.is_use === 0"
        >
          <div class="coupon-detail__item">
            {{item.name}}
            <div class="coupon-detail__item__price">
              <small>￥</small>{{item.discont}}
            </div>
          </div>
          <div class="coupon-detail__item">
            仅限抵扣当次洗车
            <span class="coupon-detail__item__end-time">
              {{item.end_time}}
            </span>
          </div>
        </li>
      </ul>

      <!-- 缺省信息 -->
      <div v-if="list.length === 0" class="coupon-detail__account">
        暂无可使用的洗车券！
      </div>

      <!-- 账户 -->
      <p class="coupon-detail__account">洗车券已放入账户：{{uname}}</p>

      <x-button
        type="warn"
        class="coupon__item__button"
        @click.native="useRightNow"
      >立即使用</x-button>

    </div>
  </div>
</template>

<script>
/**
 * 洗车券列表
 * @author zml
 * @version 2017-07-25
 */
import { XButton } from 'vux';

export default {

  name: 'app-coupon-list',

  components: {
    XButton,
  },


  data() {
    return {
      loading: false,
      list: [], // 我的洗车券列表
    };
  },

  computed: {
    uname() {
      return localStorage.uname;
    },
  },

  methods: {
    useRightNow() {
      this.$router.push('/person');
    },

    // 获取洗车券列表
    getMemberCouponsList() {
      this.$http.get('/mobileMember!getMemberCouponsList.do')
        .then((res) => {
          this.list = res;
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        });
    },
  },

  created() {
    this.getMemberCouponsList();
  },

};
</script>

<style lang="less">
.coupon-detail {

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;

    &>li {
      background-color: #fff;
      margin-bottom: 5px;
      padding: 0 25px;
      position: relative;

      &:last-child {
        margin-bottom: 0;
      }

      &::before,
      &::after {
        position: absolute;
        top: 32px;
        background-color: #D1E8A4;
        content: " ";
        clear: both;
        height: 14px;
        width: 14px;
        border-radius: 50%;
      }

      &::before {
        left: -7px;
      }

      &::after {
        right: -7px;
      }
    }
  }

  &__item {
    line-height: 38px;
    font-size: 12px;
    color: #747474;

    &:first-child {
      font-size: 15px;
      color: #CA3C13;
      border-bottom: 1px solid #BFBFBF;
      position: relative;
    }

    &__price {
      color: #F83018;
      font-size: 30px;
      position: absolute;
      line-height: 1;
      right: 2px;
      bottom: 3px;

      &>small {
        font-size: 18px;
      }
    }

    &__end-time {
      float: right ;
    }
  }

  &__account {
    margin-top: 15px;
    text-align: center;
    font-size: 12px;
    color: #5D5A5A;
  }
}
</style>
