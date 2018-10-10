
var util = require('../../../utils/util.js')
const Toast = require('../../../components/toast/toast.js');
Page({
  data: {
    nodes:[]
    
  },
  onLoad: function (options) {
    this.getDetail(options.id || 9);  
    this.getComments(options.id || 9);
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
  updateZan: function(){
    if(this.data.essay.is_zan){
      Toast({
        message: '已赞过',
        selector: '#zan-toast',
        timeout: 1000
      });
      return;
    }
    let that = this;
    util.getDataByAjax({
      url: '/api/essay/zan',
      method: "Post",
      preventSubmits: true,
      data: {
        userId: wx.getStorageSync("userId"),
        essayId: that.data.essay.id,
      },
      success: function (data) {
        // that.setData({
        //   comments: data.result,
        // })
      },
      error: function (error) {
        console.log(error);
      },
    });
  },
  setComment:function(e){
    this.setData({
      comment:e.detail.value
    })
  },
  submitComment:function(){
    if (!this.data.comment || this.data.comment && !this.data.comment.trim()) {
      Toast({
        type: 'fail',
        message: '内容不能为空',
        selector: '#zan-toast',
      });
      return;
    }
    let that = this;
    util.getDataByAjax({
      url: '/api/essay/comment/add',
      method: "Post",
      preventSubmits: true,
      data: {
        userId:wx.getStorageSync("userId"),
        essayId: that.data.essay.id,
        content: that.data.comment,
        createTime: (new Date()).Format("yyyy-MM-dd HH:mm:ss"),
      },
      success: function (data) {
        that.setData({
          comment: "",
        });
        that.getComments(that.data.essay.id);
      },
      error: function (error) {
        console.log(error);
      },
    });
  },


  //------------------------------------------------------ff
  getComments: function (id) {
    let that = this;
    util.getDataByAjax({
      url: '/api/essay/comment/get',
      method: "Get",
      data: {
        essayId:id
      },
      success: function (data) {
        that.setData({
          comments: data.list
        })
      },
      error: function (error) {
        console.log(error);
      },
    });
  },
  getDetail:function(id){
    let that = this;
    util.getDataByAjax({
      url: '/api/essay/get',
      method: "Get",
      data: {
        id
      },
      success: function (data) {
        that.setData({
          essay: data.result,
          nodes: JSON.parse(data.result.nodes)
        })
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
})  