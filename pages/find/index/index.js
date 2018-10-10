
var util = require('../../../utils/util.js')
Page({


  data: {
    navs: [
      { img: "http://120.78.179.176:3001/icon/Cathedral.png", name: "校园生活", url: "../life_list/life_list?type=1" },
      { img: "http://120.78.179.176:3001/icon/Statue of Liberty.png", name: "游玩日记", url: "../life_list/life_list?type=2" },
      // { img: "http://120.78.179.176:3001/icon/Post Office.png", name: "通知公告", url: "" },
      { img: "http://120.78.179.176:3001/icon/Ferris Wheel.png", name: "新生来了", url: "../life_list/life_list?type=3" },
      // { img: "http://120.78.179.176:3001/icon/Bar.png", name: "吃喝外卖", url: "" },
      // { img: "http://120.78.179.176:3001/icon/Water Park.png", name: "吐槽爆料", url: "" },
      // { img: "http://120.78.179.176:3001/icon/Lost and Found.png", name: "内涵段子", url: "" },
      // { img: "http://120.78.179.176:3001/icon/Ticket Purchase.png", name: "答疑解惑", url: "" },
    ],
  },
  onLoad: function (options) {
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



  //------------------------------------------------------ff

})  