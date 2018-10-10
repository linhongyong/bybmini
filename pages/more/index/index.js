
var util = require('../../../utils/util.js')
Page({


  data: {
    curNav:0
  },
  onLoad: function (options) {
    this.getCategorys();
    // util.getDataByAjax({
    //   url: '/api/essay/essay',
    //   method: "Get",
    //   data: {
    //     id: options.id
    //   },
    //   success: function (data) {

    //   },
    //   error: function (error) {
    //     console.log(error);
    //   },
    // });
  },
  onShow: function () {

  },

  onReady: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },


  //------------------------------------------------------ff
  watchChange: function (e) {
    let curNav = e.detail.current;
    this.setData({
      curNav
    })
  },
  switchTopTab: function (e) {
    let curnav = e.currentTarget.dataset.curnav;
    this.setData({
      curNav: curnav,
    })
  },


  //------------------------------------------------------ff
  getCategorys: function (callback) {
    let that = this;
    util.getDataByAjax({
      url: "/api/mall/index/categorys",
      success: function (res) {
        that.setData({
          categorys: res.categorys
        })
        callback && callback();
      },
      error: function () {

      }
    });
  },
})  