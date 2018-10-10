
var util = require('../../../utils/util.js');
var login = require('../../../utils/login.js');
const Dialog = require('../../../components/dialog/dialog');
const Toptips = require('../../../components/toptips/index.js');
Page({


  data: {
    navs: [
      { img: "http://120.78.179.176:3001/icon/Cathedral.png", name: "校园生活", url: "../index/edit/edit" },
      { img: "http://120.78.179.176:3001/icon/Statue of Liberty.png", name: "新生那事", url: "../mall/edit/edit" },
      { img: "http://120.78.179.176:3001/icon/Post Office.png", name: "通知公告", url: "" },
      { img: "http://120.78.179.176:3001/icon/Ferris Wheel.png", name: "活动节目", url: "" },
      { img: "http://120.78.179.176:3001/icon/Bar.png", name: "吃喝外卖", url: "" },
      { img: "http://120.78.179.176:3001/icon/Water Park.png", name: "吐槽爆料", url: "" },
      { img: "http://120.78.179.176:3001/icon/Lost and Found.png", name: "内涵段子", url: "" },
      { img: "http://120.78.179.176:3001/icon/Ticket Purchase.png", name: "答疑解惑", url: "" },
    ],
    page: 1,
    hasMore: 1,
    bottomLoading: false
  },
  onLoad: function (options) {
    if (!util.isAuthorize()) {
      return;
    } else {
      console.log("重新登录");
      login.getUserInfo();
    }
    this.getEssays();
    this.getBanners(this.getEssays());//this.getCategorys(this.getGoods())
  },
  onShow: function () {
   
  },

  onReady: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () {
    var that = this;
    console.log(this.data.hasMore == 0, !!this.data.bottomLoading, this.data.page);
    //没有了、还在请求、第一页
    if (!!(this.data.hasMore == 0 || this.data.bottomLoading || this.data.page == 1)) {
      return;
    }
    this.setData({
      bottomLoading: true,
    })
    this.getEssays();
  },
  onShareAppMessage: function () { },


  //------------------------------------------------------ff
  toEssayDetail: function (e) {
    wx.navigateTo({
      url: `../essay/essay?id=${e.currentTarget.dataset.id}`,
    })
  },
  
  
  //------------------------------------------------------ff
  getBanners: function (callback) {
    let that = this;
    util.getDataByAjax({
      url: "/api/mall/index/banners",
      success: function (res) {
        that.setData({
          banners: res.banners
        })
        callback && callback();
      },
      error: function () {

      }
    });
  },
  
  getEssays: function () {
    let that = this;
    util.getDataByAjax({
      url: '/api/essay/essays/get',
      method: "Get",
      data: {
        page: that.data.page,
        size: 5,
      },
      success: function (data) {
        for (let i = 0, len = data.list.length; i < len; i++) {
          data.list[i].create_time = util.releaseTimeFormat(data.list[i].create_time);
        }
        let list = that.data.list && that.data.list.concat(data.list) || data.list;
        that.setData({
          list: list,
          hasMore: data.hasMore,
          page: ++that.data.page,
          bottomLoading: false
        })
      },
      error: function (error) {
        console.log(error);
      },
    });
  },


  //------------------------------------------------------ff3
  getPageContentData: function () {//登录后才能获取的数据写在这里

  },
  // util调用
  showAuthorizeDialog: function () {//未授权点击其他调用
    var that = this;
    Dialog({
      logo: "../../res/" + util.logo,
      title: util.appName,
      message: '授权登录后才能正常使用!',
      selector: '#zan-button-dialog',
      buttons: [{
        text: '以后再说',
        color: 'red',
        type: 'cancel'
      },
      {
        text: '授权登录',
        openType: "getUserInfo",
        color: '#3CC51F',
        type: 'confirm',

      }]
    }).then(({ type }) => {
      // console.log(type);
    });
  },
  getuserinfo: function (e) {//手动授权
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorageSync("isAuthorize", true);
      login.getUserInfo();
    }
    else {
      wx.setStorageSync("isAuthorize", false);
    }
  },
  onLogin: function (res) {//监听登录
    // Toptips({
    //   duration: 2000,
    //   content: "授权成功，欢迎选购",
    //   backgroundColor: "#06A940"
    // });
    this.getPageContentData();
  }
})  
