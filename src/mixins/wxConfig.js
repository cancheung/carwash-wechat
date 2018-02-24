/**
 * 微信初始化配置公共逻辑
 */

export default {

  data() {
    return {
      appId: '',
      timestamp: '',
      nonceStr: '',
      signature: '',
      jsapi_ticket: '',

      // 需要的JS接口列表
      jsApiList: [
        'openLocation',
        'getLocation',
        'scanQRCode',
        'chooseWXPay',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
      ],
    };
  },

  computed: {
    hostName() { // 域名
      return window.location.href.split('#')[0];
    },
  },

  methods: {
    // 获取微信jssdk
    getJssdk(myUrl) {
      this.$http.post('/mobileAppPay!getJssdk.do', {
        url: myUrl || this.hostName,
      })
      .then(({ receiveMsg }) => {
        this.appId = receiveMsg.appId;
        this.timestamp = receiveMsg.timestamp;
        this.nonceStr = receiveMsg.nonceStr;
        this.signature = receiveMsg.signature;
        this.jsapi_ticket = receiveMsg.jsapi_ticket;
        this.wxConfig();
      })
      .catch((error) => {
        this.$vux.toast.text(error, 'top');
      });
    },

    // 微信jssdk配置
    wxConfig() {
      this.$wechat.config({
        debug: false,
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.appId, // 公众号的唯一标识
        timestamp: this.timestamp, // 生成签名的时间戳
        nonceStr: this.nonceStr, // 生成签名的随机串
        signature: this.signature, // 签名
        jsApiList: this.jsApiList, // 需要使用的JS接口列表
      });
    },
  },

};
