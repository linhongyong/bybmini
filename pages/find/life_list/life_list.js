
var util = require('../../../utils/util.js')
Page({


  data: {
    page: 1,
    hasMore: 1,
    bottomLoading:false
  },
  onLoad: function (options) {
    this.setData({
      type : options.type
    })
    this.getEssays();
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
      url: `../life_detail/life_detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //------------------------------------------------------ff

  getEssays: function () {
    let that = this;
    util.getDataByAjax({
      url: '/api/essay/essays/getByType',
      method: "Get",
      data: {
        page: that.data.page,
        size: 5,
        type: that.data.type
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

  //------------------------------------------------------ff

})  
