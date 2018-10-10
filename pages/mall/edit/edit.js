var util = require('../../../utils/util.js');
const Toast = require('../../../components/toast/toast.js');

Page({


  data: {
    // nodes:[{type:"view", value:""}],
    // activeNodeIndex:0,
    isPreview:false,
    // nodesContent:``,
    // imgs: [],
    
    date: '2018-01-01',
    isGuarantee: 0,
    multiIndex: [0, 0],
    multiArray: [
      ['转卖', '出租'], 
      // ['请选择', '专业课本', '代步工具', '健身器材', '生活用品', '宿舍神器', '数码产品'],
      // ['请选择', '小电驴', '年卡', '自行车']
    ],  
    categoryIndex:0,
    type:1,//默认转卖
    guaranteeDate: '2018-01-01',
    buyDate: '2018-01-01'

  },
  onLoad: function (options) {
    this.getCategorys();
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

  uploadImg: function () {
    let EditComponen = this.selectComponent("#ng-edit");
    EditComponen.uploadImg();
  },
  formSubmit:function(e){
    console.log(e);
    let obj = e.detail.value;
    let EditComponentData = this.selectComponent("#ng-edit").data;
    obj.nodes = JSON.stringify(EditComponentData.nodes);
    obj.imgs = JSON.stringify(EditComponentData.imgs);
    let url;
    //买卖二手
    if(this.data.type == 0){
      // 不能为空或者不正确
      if (!e.detail.value.name.trim() ||
        !e.detail.value.sellPrice ||
        !e.detail.value.contactWay.trim() ||
        !e.detail.value.address.trim()
      ) {
        Toast({
          type: 'fail',
          message: '填写信息不完整',
          selector: '#zan-toast',
          // timeout: -1
        });
        return;
      }
      if (e.detail.value.isGuarantee == 1 && this.data.guaranteeDate == "2018-01-01") {
        Toast({
          type: 'fail',
          message: '保修期限不正确',
          selector: '#zan-toast',
        });
        return;
      }
      obj.buyDate = this.data.buyDate;
      obj.guaranteeDate = this.data.guaranteeDate;
      obj.createTime = (new Date()).Format("yyyy-MM-dd HH:mm:ss");
      url = '/api/good/sellgood/add';
    } 
    // 租赁
    else if (this.data.type == 1){
      obj.categoryId = this.data.categoryObj2[this.data.categoryIndex].id;
      url = '/api/good/rentgood/add';
    }
    let that = this;
    util.getDataByAjax({
      url,
      method: "Post",
      data: {
        userId: wx.getStorageSync("userId"),
        obj
      },
      success: function (data) {
        wx.showToast({
          title: '发布成功',
          complete:function(){
            wx.switchTab({
              url: '../../mall/index/index',
            })
          }
        })        
      },
      error: function () {
        console.log("error");
      },
    });
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0){
      this.setData({
        type: e.detail.value
      })
    }
    this.setData({
      categoryIndex: e.detail.value
    })
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = this.data.category1;
            break;
          case 1:
            data.multiArray[1] = this.data.category2;
            break;
        }
        data.multiIndex[1] = 0;
      break;
    }
    this.setData(data);
  },

  radioChangeIs: function(e){
    if(e.detail.value == 1){
      this.setData({
        isGuarantee: 1
      })
    }else{
      this.setData({
        isGuarantee: 0
      })
    }

  },
  radioChangeIs2: function (e) {
    if (e.detail.value == 1) {
      this.setData({
        isDeposit: 1
      })
    } else {
      this.setData({
        isDeposit: 0
      })
    }

  },
  bindDateChange: function (e) {
    this.setData({
      buyDate: e.detail.value
    })
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  bindDateChangeGuarantee: function (e) {
    this.setData({
      guaranteeDate: e.detail.value
    })
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  torelease:function(){
    
  },
  topreview: function(){
    console.log("sss");
    let that = this;
    this.setData({
      isPreview: !that.data.isPreview
    })
  },
  getCategorys: function (callback) {
    let that = this;
    util.getDataByAjax({
      url: "/api/mall/index/categorys",
      data: {
      },
      success: function (res) {
        let category1 = [];
        let category2 = [];
        let categoryObj1 = [];
        let categoryObj2 = [];
        for (let i = 0; i < res.categorys.length; i++){
          if (res.categorys[i].type == 1){
            category1.push(res.categorys[i].name);
            categoryObj1.push(res.categorys[i]);
          } else if (res.categorys[i].type == 2){
            category2.push(res.categorys[i].name);
            categoryObj2.push(res.categorys[i]);
          }
        }
        that.data.multiArray.push(category1);
        that.setData({
          category1, category2, categoryObj1, categoryObj2, multiArray: that.data.multiArray
        })
        callback && callback();
      },
      error: function () {

      }
    })
  }
  //------------------------------------------------------ff
  
})  