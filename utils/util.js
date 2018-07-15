var app = getApp();
var Toptips = require('../components/toptips/toptips.js');

//项目配置ff**********************************************************************************************************
const appName = '高教园区';
var website = "https://www.easy-mock.com/mock/5b401e19f38b6529a0d57289/byb";
var website = "http://www.therethey.com:3001";
const logo = 'logo.png';

//请求函数封装ff********************************************************************************************************
/**
 * 请求封装
 * obj 请求参数封装
 * method 请求方法 如get、post
 */
function getDataByAjax(obj, method) {
  let start;
  // 判断是否授权
  if (obj.isAuthorize && !isAuthorize()) {
    return;
  }
  // 是否需要有 “加载中...提示”
  if (!!obj.isShowLaoding) {
    wx.showLoading({
      title: "加载中.."
    });
    start = Date.now();
  }
  // 使用本地的time13还是服务器的
  if (true) {//app.globalData.isValid
    var time13 = Date.now();
    wxRequest(obj, time13, start, method);
  } else {
    getTime13().then(time13 => {
      wxRequest(obj, time13, start, method);
    })
  }
}

function wxRequest(obj, time13, start, method) {
  var sign = encrypt(JSON.stringify({
    app_type: 'wechat-site',
    version: 1,
    time: time13,
    temp: Math.random() * 100
  }));
  wx.request({
    url: website + obj.url,
    data: obj.data,
    method: !!method ? method : "Get",
    header: {
      token: wx.getStorageSync("token"),
      sign,
      version: 1,
      time: time13,
      apptype: 'wechat-site',
    },
    success: function (res) {
      console.log(obj.url+"************************************");
      console.log(res.data.data);
      if (!!obj.isShowLaoding) {
        let end = Date.now();
        var time = end - start;
        if (time < 500) {//让加载中提示显示至少500毫秒
          setTimeout(function () {
            wx.hideToast();
          }, 500 - time);
        } else {
          wx.hideToast();
        }
      }
      if (res.data.status == 200 || res.statusCode == 200) {
        obj.success(res.data.data);
      } else if (res.data.status == 400) {
        wx.clearStorageSync("isAuthorize");
        console.log("重新登录");
        wx.switchTab({
          url: '../index/index',
        })
      }
      else {
        obj.error(res);
        !!isDataCommon(res.data.message) && Toptips({
          duration: 3000,
          content: res.data.message,
        });
      }
    },
    error: function (res) {
      console.log(res);
      Toptips({
        duration: 3000,
        content: "请求失败",
      });
    }
  });//wx.request
}
function getTime13() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: website + '/api/time13',
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

/**
 * 判断是否授权，没有则调用page()中的showAuthorizeDialog
 * return 是否授权
 */
function isAuthorize() {//返回true未授权
  if (!isDataCommon(wx.getStorageSync("isAuthorize"))) {
    const pages = getCurrentPages();
    const ctx = pages[pages.length - 1];
    ctx.showAuthorizeDialog();
    return false;
  }
  return true;
}

//加解密ff**********************************************************************************************************
var CryptoJS = require('aes.js');  //引用AES源码js
var key = CryptoJS.enc.Utf8.parse("czm736099435qqqq");//十六位十六进制数作为秘钥
var iv = CryptoJS.enc.Utf8.parse('1314520131452020');//十六位十六进制数作为秘钥偏移量
//解密方法
function decrypt(word) {
  var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
//加密方法
function encrypt(word) {
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}


//工具函数**********************************************************************************************************

/**
 * 判断参数是否可用
 * return 可用返回原值，不可用返回false
 * 注：data为Boolean时返回原值
 */
function isDataCommon(data) {
  if (typeof data == "number") {
    return data;
  }
  else if (typeof data == "string") {
    if (!!data.trim()) {
      return data;
    }
    else {
      return false;
    }
  }
  else if (typeof data == "object") {
    for (var p in data) {
      if (p !== undefined) {
        return data;//有参数，且有值
      }
    }
    return false;//无参数或者有但没有值
  }
  else if (typeof data == "boolean") {
    return data;
  }
  else if (typeof data == "undefined") {
    return false;
  }
  else {
    console.log("该参数基本数据类型");
  }
  console.log(data);
}

/**
 * date 应该是时间撮
 * 返回格式化的时间 如：2018/08/7 12:30:00
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 向外暴露接***************************************************************************************************

module.exports = {
  appName: appName,
  formatTime: formatTime,
  getDataByAjax: getDataByAjax,
  getDataByAjax: getDataByAjax,
  decrypt: decrypt,
  encrypt: encrypt,
  isDataCommon,//判断参数是否可用
  isAuthorize,
  website,
  logo
}
