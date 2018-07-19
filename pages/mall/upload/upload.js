
var util = require('../../../utils/util.js');
const Toptips = require('../../../components/toptips/index.js');
Page({


  data: {
    imgs: [],
    tempFilePaths: []
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


  //------------------------------------------------------ffx响应事件
  uploadImg: function () {
    let that = this;
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        let len1 = that.data.tempFilePaths.length;
        let len2 = res.tempFilePaths.length;
        if (len2 > 6 - len1) {
          res.tempFilePaths.length = 6 - len1;
        }
        that.setData({
          tempFilePaths: that.data.tempFilePaths.concat(res.tempFilePaths)
        })

      }
    })
  },
  preview: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: that.data.tempFilePaths[index], // 当前显示图片的http链接
      urls: that.data.tempFilePaths // 需要预览的图片http链接列表
    })
  },
  deletePic: function (e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    that.data.tempFilePaths.splice(index, 1)
    this.setData({
      tempFilePaths: that.data.tempFilePaths
    })
  },

  // 表单提交
  formSubmit: function (e) {
    let that = this;
    console.log(e.detail.value);
    let valueObj = e.detail.value;
    // if (valueObj.name.trim() == "" || valueObj.selling_price.trim() == "" || valueObj.reason.trim() == "") {
    //   Toptips("商品信息不完整");
    //   return;
    // }
    // 上传图片
    var promiseArr = [];
    for (let i = 0; i < that.data.tempFilePaths.length; i++) {
      let promise = new Promise((resolve, reject) => {
        wx.uploadFile({
          url: util.website + '/api/mall/upload/img',
          filePath: that.data.tempFilePaths[i],
          name: 'img',
          formData: {
            user_id: 22,
          },
          success: function (res) {
            console.log(res);
            var data = JSON.parse(res.data);
            that.setData({
              imgs: that.data.imgs.concat(data.data.path)
            })
            resolve();
          },
          fail: function (err) {
            Toptips({
              content: "图片上传失败",
            })
          }
        })
      })
      promiseArr.push(promise);
    }
    Promise.all(promiseArr).then(() => {
      console.log(that.data.imgs);
      that.ajaxFunc();
    });
    //结束后提交评论
  },
  // 将ajax函数拆分出来
  ajaxFunc: function () {
    let that = this;
    util.getDataByAjax({
      url: '/api/mall/upload/good',
      method: "Post",
      data: {
        user_id: 42,
        name: "棉袄2",
        price_selling: 1020,
        imgs: that.data.imgs.join(","),
        note: "不想要了不22222想要了不想要了不想要了不想要了不想要了",
      },
      success: function (data) {
      },
      error: function () {
        console.log("error");
      },
    }, "POST");
  }


  //------------------------------------------------------ff

})  