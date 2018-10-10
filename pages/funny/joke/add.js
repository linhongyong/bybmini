
var util = require('../../../utils/util.js');
const Toptips = require('../../../components/toptips/index.js');
Page({


  data: {
  },
  onLoad: function (options) {

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
  bindFormSubmit: function(e){
    let that = this;
    console.log(e);
    if (this.data.isLock){
      // Toptips({
      //   backgroundColor: "#ccc",
      //   content: "请勿频繁提交。",
      // })
      return;//重复提交
    }
    that.data.isLock = true;
    if (e.detail.value.content.trim() == "" ){
      Toptips({
        backgroundColor: "#ccc",
        content: "别着急啊，还未填写内容呢。",
      })
      return;
    }
    util.getDataByAjax({
      url: '/api/funny/joke/add',
      method: "Post",
      data: {
        user_id: wx.getStorageSync("userId"),
        content: e.detail.value.content,
      },
      success: function (data) {
        setTimeout(function(){
          that.data.isLock = false;
        },3000)
        Toptips({
          backgroundColor: "#06A940",
          content: data.message,
        })
      },
      error: function () {
        console.log("error");
      },
    });
  }


  //------------------------------------------------------ff

})  