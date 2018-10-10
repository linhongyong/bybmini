var util = require('../../../utils/util.js');
const Toast = require('../../../components/toast/toast.js');
Page({


  data: {
    isPreview:false,
    categorys: ['校园趣事', '游玩日记', '新生来了',],
    categorysIndex: 0,
  },
  onLoad: function (options) {},
  onShow: function () {},
  onReady: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
  //------------------------------------------------------ff
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      categorysIndex: e.detail.value
    })
  },
  uploadImg:function(){
    let EditComponen = this.selectComponent("#ng-edit");
    EditComponen.uploadImg();
  },
  formSubmit:function(e){
    let obj = e.detail.value;
    let EditComponentData = this.selectComponent("#ng-edit").data;
    obj.nodes = JSON.stringify(EditComponentData.nodes);
    obj.imgs = JSON.stringify(EditComponentData.imgs);
    obj.createTime = (new Date()).Format("yyyy-MM-dd HH:mm:ss");
    obj.type = this.data.categorysIndex;
    // 表单验证
    if (obj.title.trim() == ""){
      Toast({
        type: 'fail',
        message: '提交内容不完整',
        selector: '#zan-toast',
      });
      return;
    }
    
    let that = this;
    util.getDataByAjax({
      url: '/api/essay/add',
      method: "Post",
      preventSubmits: true,
      data: {
        userId: wx.getStorageSync("userId"),
        obj
      },
      success: function (data) {
        wx.showToast({
          title: '发布成功',
          success:function(){
            wx.switchTab({
              url: '../../index/index/index',
            })
          }
        })
        
      },
      error: function () {
        console.log("error");
      },
    });
  },
  topreview: function(){
    console.log("sss");
    let that = this;
    this.setData({
      isPreview: !that.data.isPreview
    })
  },
  //------------------------------------------------------ff

})  