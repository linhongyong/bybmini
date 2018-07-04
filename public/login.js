


function wxGetUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({//获取用户信息
      lang: 'zh_CN',
      success: function (res) {
        console.log(res);
        wx.setStorageSync('nickname', res.userInfo.nickName);
        wx.setStorageSync('headpic', res.userInfo.avatarUrl);

        app.globalData.isAuthorize = true;
        console.log("wx.getUserInfo 成功");

        resolve(res.userInfo);
      },
      fail: function (e) { //获取用户信息失败---
        console.log("fail 获取用户信息失败");
        getCurrentPages()[0].setData({
          authorize: false
        })
      }
    });
  })
}

function getUserInfo() {
  var time13, userInfo, code;
  wxGetUserInfo()
    .then(res => {

      userInfo = res;
      return wxLogin();
    })
    .then((res) => {
      code = res;
      return getTime13();
    })
    .then(res => {
      time13 = res;
      userInfo.code = code;
      userInfo.reference = app.globalData.reference
      userInfo.nickname = userInfo.nickName
      userInfo.headpic = userInfo.avatarUrl
      userInfo.sex = userInfo.gender
      console.log(userInfo);
      loginApi(time13, userInfo);
    })

}