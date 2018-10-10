
var util = require('../../../utils/util.js')
Page({


  data: {
  },
  onLoad: function (options) {
    this.getEssays();
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
  getEssays:function(){
    let that = this;
    util.getDataByAjax({
      url: '/api/essay/essays/getByUserId',
      method: "Get",
      data: {
        userId:wx.getStorageSync("userId"),
        size:20
      },
      success: function (data) {
        for (let i = 0, len = data.list.length; i < len; i++) {
          data.list[i].create_time = util.releaseTimeFormat(data.list[i].create_time);
        }
        let list = that.data.list && that.data.list.concat(data.list) || data.list;
        that.setData({
          list: list
        })
      },
      error: function (error) {
        console.log(error);
      },
    });
  }


  //------------------------------------------------------ff

})  