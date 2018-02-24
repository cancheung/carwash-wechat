/**
 * 微信分享公共逻辑
 */

export default {

  computed: {
    hostName() { // 域名
      return window.location.href.split('#')[0];
    },
  },

  methods: {
    // 微信分享配置
    setWxShareConfig() {
      console.log('配置微信分享jssdk');

      const hostName = this.hostName;
      const inviteName = this.name ? this.name : this.info.name;
      const inviteCode = this.invite_code ? this.invite_cod : this.info.invite_code;

      this.$wechat.ready(() => {
        // 分享到朋友圈配置
        this.$wechat.onMenuShareTimeline({
          title: `${inviteName}邀请您加入巢享洗车`, // 分享标题
          link: `${hostName}#/spread/qrcode?invite_code=${inviteCode}&name=${inviteName}`, // 分享链接
          imgUrl: 'http://app.yunlinggroup.com/cxcar/statics/cxcar_icon.png', // 分享图标
        });

        // 分享给朋友配置
        this.$wechat.onMenuShareAppMessage({
          title: `${inviteName}邀请您加入巢享洗车`, // 分享标题
          link: `${hostName}#/spread/qrcode?invite_code=${inviteCode}&name=${inviteName}`, // 分享链接
          desc: '和我一起加入巢享共享洗车！享洗车，去巢享！为节能环保贡献一份力量，为城市增添一份色彩！', // 分享描述
          imgUrl: 'http://app.yunlinggroup.com/cxcar/statics/cxcar_icon.png', // 分享图标
        });
      });
    },
  },

};
