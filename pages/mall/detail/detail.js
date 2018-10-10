
var util = require('../../../utils/util.js');
const Toast = require('../../../components/toast/toast.js');
Page({


  data: {
    page: 1,
    hasMore: 1,
    bottomLoading: false,
  },
  onLoad: function (options) {
    this.getGoodDetial(options.id || 14);
    this.getList(options.id || 14);
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
    this.getList();
  },
  onShareAppMessage: function () { },


  //------------------------------------------------------ff
  updateZan: function () {
    if (this.data.good.is_zan) {
      Toast({
        message: '已赞过',
        selector: '#zan-toast',
        timeout: 1000
      });
      return;
    }
    let that = this;
    util.getDataByAjax({
      url: '/api/good/sellgood/zan',
      method: "Post",
      preventSubmits: true,
      data: {
        userId: wx.getStorageSync("userId"),
        sellgoodId: that.data.good.id,
      },
      success: function (data) {
        let temp = "good.is_zan";
        let temp2 = "good.zan"
        that.setData({
          [temp]: true,
          [temp2]:++that.data.good.zan
        })
      },
      error: function (error) {
        console.log(error);
      },
    });
  },
  setComment: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },
  submitComment: function () {
    if (!this.data.comment || this.data.comment && !this.data.comment.trim()){
      Toast({
        type: 'fail',
        message: '内容不能为空',
        selector: '#zan-toast',
      });
      return;
    }
    let that = this;
    util.getDataByAjax({
      url: '/api/good/sellgood/comment/add',
      method: "Post",
      preventSubmits: true,
      data: {
        userId: wx.getStorageSync("userId"),
        sellgoodId: that.data.good.id,
        content: that.data.comment,
        createTime: (new Date()).Format("yyyy-MM-dd HH:mm:ss"),
      },
      success: function (data) {
        that.setData({
          comment: "",
        });
        data.result.create_time = util.releaseTimeFormat(data.result.create_time);
        that.data.list.unshift(data.result);
        that.setData({
          list: that.data.list
        })
      },
      error: function (error) {
        console.log(error);
      },
    });
  },


  //------------------------------------------------------ff
  getList: function (id) {
    let that = this;
    util.getDataByAjax({
      url: '/api/good/sellgood/comment/get',
      method: "Get",
      data: {
        id: id || that.data.good.id,
        page: that.data.page,
        size: 10,
      },
      success: function (data) {
        for (let i = 0, len = data.list.length; i < len; i++) {
          data.list[i].create_time = util.releaseTimeFormat(data.list[i].create_time);
        }
        let list = that.data.list && that.data.list.concat(data.list) || data.list;
        that.setData({
          list,
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
  getGoodDetial: function (id) {
    let that = this;
    util.getDataByAjax({
      url: "/api/good/sellgood/get",
      method:"Get",
      data:{
        id,
        userId:wx.getStorageSync("userId")
      },
      success: function (data) {
        console.log(data.result.create_time);
        data.result.create_time = util.releaseTimeFormat(data.result.create_time);
        data.result.buy_date = data.result.buy_date.split('T')[0]; 
        data.result.guarantee_date = data.result.guarantee_date.split('T')[0]; 
        that.setData({
          good: data.result,
          nodes: JSON.parse(data.result.nodes)
        })
      },
      error: function () {

      }
    });
  },
})  