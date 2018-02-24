<template>
  <div class="person-list">

    <!-- 搜索栏 -->
    <div class="person-list__search">
      <search
        auto-scroll-to-top
        top="0px"
        position="absolute"
        v-model="searchText"
        placeholder="输入附近地址信息"
        ref="search"
        @on-submit="getMachineList"
      >
        <div slot="left" class="person-list__search__icon" @click="goTo">
           <svg class="svg-icon" width="34px" height="34px" viewBox="0 0 1025 1024">
            <path d="M582.352706 568.885667c-3.173009-1.033003-23.208068-10.067029-10.688031-48.126141l-0.173001 0c32.628096-33.602098 57.568169-87.703257 57.568169-140.945413 0-81.88124-54.45416-124.788366-117.727345-124.788366-63.311185 0-117.455344 42.908126-117.455344 124.788366 0 53.458157 24.803073 107.775316 57.627169 141.295414 12.792037 33.563098-10.08603 46.021135-14.873044 47.77614-66.271194 23.96307-144.009422 67.648198-144.009422 110.771325l0 16.157047c0 58.755172 113.910334 72.111211 219.332643 72.111211 105.578309 0 218.047639-13.356039 218.047639-72.111211l0-16.157047C730.001139 635.229861 651.87491 591.897734 582.352706 568.885667L582.352706 568.885667zM582.352706 568.885667"
              fill="#feb92f"></path>
            <path d="M511.308498 958.895809c-246.714723 0-447.417311-200.702588-447.417311-447.423311 0-246.714723 200.702588-447.417311 447.417311-447.417311 246.721723 0 447.423311 200.702588 447.423311 447.417311C958.731809 758.194221 758.029221 958.895809 511.308498 958.895809L511.308498 958.895809zM511.308498 128.259376c-211.307619 0-383.213123 171.905504-383.213123 383.213123 0 211.279619 171.905504 383.219123 383.213123 383.219123 211.279619 0 383.219123-171.939504 383.219123-383.219123C894.527621 300.165879 722.588117 128.259376 511.308498 128.259376L511.308498 128.259376zM511.308498 128.259376"
              fill='#feb92f' />
          </svg>
        </div>
      </search>
    </div>

    <!-- 洗车点列表 -->
    <div class="person-list__data-list">
      <div
        class="person-list__item"
        v-for="(item,index) in car_list"
        :key="index"
        @click="openLocation(item.machine_lat,item.machine_lng,item.machine_name,item.address)"
      >
        <flexbox :gutter="0">
          <div class="person-list__item__img">
            <img :src="item.image">
          </div>
          <flexbox-item class="person-list__item__info">
            <h4 class="ellipsis">{{item.machine_name}}</h4>
            <p class="ellipsis">
              <svg class="svg-icon" width="15px" height="15px" viewBox="0 0 1024 1024">
                <path d="M507.657 62c-172.231 0-311.824 139.593-311.824 311.824 0 133.634 187.753 432.292 271.876 559.413 18.918 28.619 60.979 28.619 79.896 0 84.123-127.12 271.876-425.778 271.876-559.413 0-172.23-139.593-311.824-311.824-311.824v0zM507.657 488.645c-66.245 0-119.914-53.669-119.914-119.914s53.669-119.948 119.914-119.948c66.245 0 119.914 53.703 119.914 119.948 0 66.245-53.669 119.914-119.914 119.914v0z"
                  fill='#c7c7c7' />
              </svg>
              {{item.address}}
            </p>
          </flexbox-item>
        </flexbox>
        <div class="person-list__item__icon">
          <svg class="svg-icon" width="17px" height="17px" viewBox="0 0 1024 1024">
            <path d="M560.49664 974.82752c-1.33632 0-2.66752-0.08704-4.0192-0.2816-12.76928-1.78688-22.82496-11.84256-24.61184-24.64256l-56.26368-401.47456L74.77248 492.07296c-12.8-1.78176-22.82496-11.83744-24.60672-24.63744-1.81248-12.8 5.09952-25.20064 16.87552-30.45376l866.44736-385.35168c10.9312-4.80256 23.70048-2.47808 32.16896 5.98528 8.46336 8.45312 10.81344 21.25312 5.97504 32.20992l-384.74752 867.80928C582.18496 968.192 571.79648 974.82752 560.49664 974.82752z"
              fill='#feb92f' />
          </svg>
          <p>{{item.distance}}km</p>
        </div>
      </div>
    </div>

    <!-- 缺省信息 -->
    <load-more
      class="person-list__no-data"
      v-if="car_list.length === 0"
      :show-loading="false"
      tip="暂无数据"
      background-color="#f4f5f9"
    ></load-more>

    <!-- 扫码按钮 -->
    <div class="person-list__scan">
      <x-button class="car-btn car-btn__yellow car-btn--radius" @click.native="scanQRCode()">
        <svg class="svg-icon" width="22px" height="22px" viewBox="0 0 1024 1024">
          <path d="M987.386104 549.682227H37.139875c-20.178575 0-36.557614-16.363689-36.557614-36.540217 0-20.159132 16.379039-36.558637 36.557614-36.558638h950.246229c20.215414 0 36.540218 16.399505 36.540218 36.558638 0.001023 20.176528-16.32378 36.540218-36.540218 36.540217zM877.768521 988.265124H676.274414c-20.215414 0-36.577057-16.32685-36.577057-36.539194 0-20.215414 16.360619-36.577057 36.577057-36.577057h201.49513c20.179598 0 36.502355-16.361643 36.502356-36.539194V695.876867c0-20.215414 16.361643-36.539194 36.577056-36.539194 20.217461 0 36.539194 16.322757 36.539195 36.539194v182.733835c-0.002047 60.462047-49.192376 109.654422-109.61963 109.654422z m-522.788717 0h-208.201879c-60.464093 0-109.636003-49.192376-109.636003-109.654422V695.876867c0-20.215414 16.379039-36.539194 36.55659-36.539194 20.179598 0 36.522822 16.322757 36.522822 36.539194v182.733835c0 20.179598 16.413831 36.539194 36.557614 36.539194h208.201879c20.215414 0 36.57808 16.361643 36.57808 36.577057-0.002047 20.212344-16.364713 36.538171-36.579103 36.538171zM73.698512 366.946346c-20.177552 0-36.556591-16.379039-36.55659-36.558637V147.654898c0-60.462047 49.173956-109.637026 109.636003-109.637026h208.201879c20.215414 0 36.57808 16.379039 36.57808 36.557614 0 20.142759-16.362666 36.521798-36.57808 36.521798h-208.201879c-20.142759 0-36.557614 16.415878-36.557614 36.557614V330.387709c0 20.179598-16.344247 36.558637-36.521799 36.558637z m877.149421 0c-20.215414 0-36.577057-16.379039-36.577057-36.558637V147.654898c0-20.141736-16.322757-36.557614-36.502355-36.557614H676.274414c-20.215414 0-36.577057-16.379039-36.577057-36.521798 0-20.177552 16.360619-36.557614 36.577057-36.557614h201.49513c60.426231 0 109.618607 49.173956 109.618607 109.637026V330.387709c-0.002047 20.179598-16.322757 36.558637-36.540218 36.558637z"
            fill='#fff' />
        </svg>
        扫码洗车
      </x-button>
    </div>

  </div>
</template>

<script>
/**
 * 洗车点
 * @author zml
 * @version 2017-07-25
 */

import { XButton, XHeader, Flexbox, FlexboxItem, XInput, Search, LoadMore } from 'vux';

export default {

  name: 'app-person-List',

  components: {
    XButton,
    XHeader,
    Flexbox,
    FlexboxItem,
    XInput,
    Search,
    LoadMore,
  },

  data() {
    return {
      searchText: '', // 搜索字段
      car_list: [], // 洗车点列表
    };
  },

  computed: {
    lat() {
      return this.$route.query.lat || 24.46;
    },
    lng() {
      return this.$route.query.lng || 118.1;
    },
  },

  watch: {
    /**
     * 监听搜索栏
     * 当搜索栏的值从有变为无时
     * 重新请求列表
     */
    searchText(val) {
      if (val === '') {
        this.getMachineList();
      }
    },

    lng() {
      this.getMachineList();
    },
  },

  methods: {
    // 使用微信内置地图查看位置接口
    // eslint-disable-next-line
    openLocation(lat, lng, name, address) {
      console.log(`${lat};${lng};${name};${address};`);

      this.$wechat.openLocation({
        latitude: lat,
        longitude: lng,
        name,
        address,
        scale: 14,
        infoUrl: 'http://weixin.qq.com',
      });

      this.$wechat.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success(res) {
          const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          console.log(latitude);
          console.log(longitude);
        },
      });
    },

    goTo() {
      this.$router.push('/person');
    },

    // 获取洗车点列表
    getMachineList() {
      console.log(`当前经度：${this.lng},当前纬度：${this.lat}`);
      this.$http.post('/mobileMachine!getMachineList.do', {
        addr_lng: this.lng,
        addr_lat: this.lat,
        search_address: this.searchText,
        city_name: '厦门',
      })
        .then((res) => {
          this.car_list = res.car_list;
        })
        .catch((error) => {
          this.$vux.toast.text(error, 'top');
        });
    },

    // 调用微信内置获取地理位置接口
    getLocation() {
      this.$wechat.ready(() => {
        this.$wechat.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success(res) {
            console.log(res);
            console.log(`jssdk获取到经度：${res.longitude};纬度：${res.latitude}`);
            window.location.href = `${window.location.href}?lng=${res.longitude}&lat=${res.latitude}`;
          },
        });
      });
    },

    // 调起微信扫一扫接口
    scanQRCode() {
      console.log('调起微信扫一扫接口');
      this.$wechat.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      });
    },
  },

  created() {
    this.$router.push('/person/list');
    this.getLocation();
    // this.getMachineList();
  },
};

</script>

<style lang="less">

  .person-list {

    &__search {
      position: fixed;
      width: 100%;
      z-index: 5;
      top: 0;
      left: 0;
      right: 0;

      &__icon {
        padding-right: 8px;
      }

      .weui-search-bar__box .weui-search-bar__input {
        line-height: 26px;
        height: 26px;
      }

      .weui-search-bar__box .weui-icon-search {
        line-height: 34px;
      }

      .weui-search-bar__cancel-btn {
        line-height: 34px;
      }

      .weui-search-bar {
        padding: 8px 10px;
      }
    }

    &__data-list {
      margin-top: 50px;
    }

    &__no-data.weui-loadmore_line {
      margin-top: 100px;
    }

    &__item {
      padding: 10px;
      position: relative;
      border-top: 1px solid @border;
      border-bottom: 1px solid @border;
      background-color: #fff;
      margin-bottom: 10px;

      &:first-child {
        border-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &__icon {
        text-align: center;
        position: absolute;
        right: 15px;
        top: 10px;
        line-height: 1;
        text-align: right;

        p {
          margin-top: 4px;
          font-size: 15px;
          color: @yellow;
        }
      }

      &__img {
        width: 80px;
        height: 80px;
        margin-right: 10px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-color: @background;
        }
      }

      &__info {
        h4 {
          font-size: 15px;
          font-weight: normal;
          padding-right: 60px;
          padding-left: 3px;
        }
        p {
          font-size: 12px;
          margin-top: 6px;
          color: @text-color;
        }
      }
    }

    &__scan {
      position: fixed;
      bottom: 60px;
      width: 160px;
      left: 50%;
      margin-left: -80px;

      .car-btn {
        box-shadow: 2px 3px 4px rgba(184, 184, 184, 0.75);
      }
    }
  }

</style>
