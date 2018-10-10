
var util = require('../../../utils/util.js')
Page({


  data: {
    list: [
      { img: "http://120.78.179.176:3001/icon/Cathedral.png", name: "我的发布", url: "../sellgood_manage/sellgood_manage" },
      { img: "http://120.78.179.176:3001/icon/Post Office.png", name: "我的买卖", url: "" },
      // { img: "http://120.78.179.176:3001/icon/Ferris Wheel.png", name: "数据", url: "" },
      // { img: "http://120.78.179.176:3001/icon/Scooter.png", name: "物尽其用", url: "../mall/edit/edit" },
      // { img: "http://120.78.179.176:3001/icon/Bicycle.png", name: "资源共享", url: "" },
      // { img: "http://120.78.179.176:3001/icon/Water Park.png", name: "吐槽爆料", url: "" },
      // { img: "http://120.78.179.176:3001/icon/Statue of Liberty.png", name: "内涵段子", url: "" },
      // { img: "http://120.78.179.176:3001/icon/Ticket Purchase.png", name: "答疑解惑", url: "" },


    ],
    activeJokeIndex: 0,
    jokesPage: 1,
    jokesSize: 10,
  },
  onLoad: function (options) {
    this.setData({
      headpic: wx.getStorageSync("headpic"),
      nickname: wx.getStorageSync("nickname")
    })
    this.getJokes();
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
  jokeAction: function (e) {
    let dataset = e.currentTarget.dataset;
    let that = this;
    //--浏览数
    //--下一条
    if (that.data.activeJokeIndex == that.data.jokeArray.length - 1) {
      if (that.data.jokeHasMore) {
        this.updateJokeView(dataset.id);
        console.log("dataset.id1", dataset.id);

        this.getJokes(function () {
          this.setData({
            activeJokeIndex: ++that.data.activeJokeIndex
          })
        });
      } else {
        wx.showToast({
          title: '已是最后一条',
        })
        return;
      }
    } else {
      console.log("dataset.id2", dataset.id);
      this.updateJokeView(dataset.id);
      this.setData({
        activeJokeIndex: ++that.data.activeJokeIndex
      })
    }
    //--赞
    if (dataset.type == 'zan') {
      util.getDataByAjax({
        url: '/api/funny/joke/zan',
        method: "Post",
        data: {
          id: dataset.id
        },
        success: function (data) {

        },
        error: function (error) {
          console.log(error);
        },
      });
    }
    //--踩
    else if (dataset.type == 'cai') {
      util.getDataByAjax({
        url: '/api/funny/joke/cai',
        method: "Post",
        data: {
          id: dataset.id
        },
        success: function (data) {

        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  },
  //------------------------------------------------------ff
  updateJokeView: function (id) {
    util.getDataByAjax({
      url: '/api/funny/joke/view',
      method: "Post",
      data: {
        id
      },
      success: function (data) {

      },
      error: function (error) {
        console.log(error);
      },
    });
  },
  getJokes: function (callback) {
    let that = this;
    util.getDataByAjax({
      url: '/api/funny/joke/jokes',
      method: "Get",
      data: {
        page: that.data.jokesPage,
        size: that.data.jokesSize,
      },
      success: function (data) {
        that.setData({
          jokesPage: ++that.data.jokesPage,
          jokeArray: that.data.jokeArray && that.data.jokeArray.concat(data.list) || data.list,
          jokeHasMore: data.hasMore
        })
        callback && callback();
      },
      error: function (error) {
        console.log(error);
      },
    });
  },


  //------------------------------------------------------ff

})  