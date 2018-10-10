
var util = require('../../../utils/util.js')
Page({


  data: {
    page: 1,
    hasMore: 1,
    bottomLoading: false
  },
  onLoad: function (options) {
    this.setData({
      curNav: options.id || 4
    })
    this.list(options.id || 4);
    this.getCategorys();
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
    this.list();
  },
  onShareAppMessage: function () { },
  //------------------------------------------------------ff
  updateCategorys:function(e){
    console.log(e);
    this.setData({
      curNav: e.currentTarget.dataset.id,
      page: 1,
      hasMore: 1,
      bottomLoading: false,
    })
    this.list(e.currentTarget.dataset.id);
    
  },
  //------------------------------------------------------ff
  list: function (id) {
    let that = this;
    util.getDataByAjax({
      url: "/api/good/rentgoods/getByCategory",
      data: {
        id: id || that.data.curNav,
        page: that.data.page,
        size: 6,
      },
      success: function (data) {

        for (let i = 0, len = data.list.length; i < len; i++) {
          data.list[i].create_time = util.releaseTimeFormat(data.list[i].create_time);
        }
        let list = [];
        if (that.data.page == 1){
          list = data.list;;
        }else{
          list = that.data.list.concat(data.list);
        }
        that.setData({
          list: list,
          hasMore: data.hasMore,
          page: ++that.data.page,
          bottomLoading: false
        })
      },
      error: function () {

      }
    });
    // let that = this;
    // util.getDataByAjax({
    //   url: "/api/good/rentgoods/getByCategory",
    //   data:{
    //     id  
    //   },
    //   success: function (res) {
    //     that.setData({
    //       rentGoods: res.rentGoods
    //     })
    //   },
    //   error: function () {

    //   }
    // });
  },
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

  //------------------------------------------------------ff

})  