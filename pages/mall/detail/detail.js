
var util = require('../../../utils/util.js')
Page({


  data: {
  },
  onLoad: function (options) {
    this.getGoodDetial();
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



  //------------------------------------------------------ff
  getGoodDetial: function () {
    let that = this;
    util.getDataByAjax({
      url: "/api/mall/detail/good_detial",
      success: function (res) {
        that.setData({
          good: res.good
        })
      },
      error: function () {

      }
    });
  },
})  