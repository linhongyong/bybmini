
var util = require('../../../utils/util.js')
Page({


  data: {
  },
  onLoad: function (options) {

  },
  onShow: function () {
    
    this.getGoods();
  },

  onReady: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },


  //------------------------------------------------------ff
  getGoods: function () {
    let that = this;
    util.getDataByAjax({
      url: "/api/mall/goods_mgt/goods",
      method:"GET",
      data:{
        id:17
      },
      success: function (res) {
        that.setData({
          goods: res.goods
        })
      },
      error: function () {

      }
    });
  },


  //------------------------------------------------------ff

})  