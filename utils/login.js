/**
 * 申请授权
 */
var util = require('util.js');
var app = getApp();

function getUserInfo() {
  var time13, userInfo, code;
  wxGetUserInfo()
    .then(res => {
      userInfo = res;
    return wxLogin();
  })
    .then(res => {
      userInfo.code = res;
      loginApi(userInfo);
  })
}
function wxGetUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({//获取用户信息
      lang: 'zh_CN',
      success: function (res) {
        wx.setStorageSync('nickname', res.userInfo.nickName);
        wx.setStorageSync('headpic', res.userInfo.avatarUrl);
        app.globalData.isAuthorize = true;
        resolve(res.userInfo);
      },
      fail: function (e) { //获取用户信息失败---
        getCurrentPages()[0].setData({
          authorize: false
        })
      }
    });
  })
}
function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({//小程序登录
      success: function (res) {
        resolve(res.code);
      }
    });
  })
}
function getTime13() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: util.website + '/api/time13',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        resolve(res.data.data);
      },
      error: function () {
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  })
}
function loginApi(userInfo) {
  console.log(userInfo);
  // var sign = util.encrypt(JSON.stringify({
  //   app_type: 'wechat-site',
  //   version: 1,
  //   time: time13 || Date.parse(new Date()),
  //   temp: Math.random() * 100
  // }));
  // var sign = encrypt(JSON.stringify({
  //   app_type: 'wechat-site',
  //   version: 1,
  //   time: time13,
  //   temp: Math.random() * 100
  // }));
  wx.request({
    url: util.website +'/api/user/login',
    data: {
      userInfo
    },
    method: 'POST',
    header: {},
    success: function (res) {
      console.log(res);
      // app.globalData.userId = res.data.data.user_id;
      // app.globalData.referenceInfo = res.data.data.user_refer;
      // wx.setStorageSync("token", res.data.data.token);
      // wx.setStorageSync("userId", res.data.data.user_id);
      // wx.setStorageSync("agentLayer", res.data.data.agent_layer);
      let pages = getCurrentPages();
      let ctx = pages[pages.length - 1];
      !!ctx.onLogin && ctx.onLogin(res);

    },
    error: function (res) {
      console.log(res);
    }
  })
}

module.exports = {
  getUserInfo: getUserInfo
};