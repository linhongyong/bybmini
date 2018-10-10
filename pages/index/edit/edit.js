var util = require('../../../utils/util.js');
Page({


  data: {
    nodes:[{type:"view", value:""}],
    activeNodeIndex:0,
    isPreview:false,
    nodesContent:``,
    imgs: []

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
  torelease:function(){
    let that = this;
    util.getDataByAjax({
      url: '/api/essay/release',
      method: "Post",
      preventSubmits: true,
      data: {
        userId: wx.getStorageSync("userId"),
        title: that.data.title,
        nodes: JSON.stringify(that.data.nodes),
        imgs: JSON.stringify(that.data.imgs),
        releaseTime: (new Date()).Format("yyyy-MM-dd HH:mm:ss"),
        type:1
      },
      success: function (data) {
        wx.showToast({
          title: '发布成功',
        })
      },
      error: function () {
        console.log("error");
      },
    });
  },
  setTitle:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  deletePic: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let that = this;
    that.data.nodes.splice(index, 1);
    this.setData({
      nodes: that.data.nodes
    })
  },
  topreview: function(){
    console.log("sss");
    let that = this;
    this.setData({
      isPreview: !that.data.isPreview
    })
  },
  onfocus:function(e){
    console.log(e);
    this.setData({
      activeNodeIndex: e.currentTarget.dataset.index
    })
  },
  oninput: function(e){
    let temp = `nodes[${this.data.activeNodeIndex}].value`;
    this.setData({
      [temp]: e.detail.value
    })
    console.log(e);
  },
  onlinechange: function(e){
    console.log(e);
  },
  preview:function(){

  },
  uploadImg: function () {
    let that = this;
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // 保留第一个view
        if (that.data.nodes[that.data.nodes.length - 1].type == "view" && that.data.nodes[that.data.nodes.length - 1].value == ""){
          if (that.data.activeNodeIndex != 0){
            that.data.nodes.splice(that.data.nodes.length - 1, 1);
          }
        }
        util.uploadImgPromises(res.tempFilePaths, function(imgs){
          for (let i = 0, len = imgs.length; i < len; i++) {
            that.data.imgs.push(imgs[i]);
            that.data.nodes.push({
              type: "img",
              value: imgs[i]
            })
          } 
          that.data.nodes.push({
            type: "view",
            value: ""
          })
          that.setData({
            nodes: that.data.nodes,
            imgs: that.data.imgs,
            activeNodeIndex: that.data.nodes.length - 1
          })
        });
        
      }
    })
  },


  //------------------------------------------------------ff

})  