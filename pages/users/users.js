const app = getApp()

Page({
  data: {
    motto: 'Hello',
    userInfo: {},
    userInfo2: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageBackgroundColor1: 'white',
    pageBackgroundColor2: 'white',
    pageBackgroundColor3: 'white',
    pageBackgroundColor4: 'white',
    pageBackgroundColor5: 'white',
    pageBackgroundColor6: 'white'
  },
  //事件处理函数
  onLoad: function () {
    /*if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userInfo2: app.globalData.encryptedData,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          userInfo2: res.encryptedData,
          hasUserInfo: true
        })
      }
    } else {*/
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            userInfo2: res.encryptedData,
            hasUserInfo: true
          })
        }
      })
    //}
  },//这里先暴力解决一下点按变色问题 回头再重构
  jumpToHealthy: function(e){
    wx.navigateTo({
      url: '../users/healthy/healthy',
    })
  },
  jumpToAboutUs:function(e){
    wx.navigateTo({
      url: '../users/aboutUs/aboutUs',
    })
  },
  jumpToCanteen: function (e) {
    wx.navigateTo({
      url: '../canteen/canteen',
    })
  },
  jumpToMyFavorites: function (e) {
    wx.navigateTo({
      url: '../users/myFavorites/myFavorites',
    })
  },
  jumpToFeedback:function(e){
    wx.navigateTo({
      url: '../users/Feedback/Feedback',
    })
  },
  //
  decode: function () {
    var WXBizDataCrypt = require('./WXBizDataCrypt')

    var appId = 'wx4f4bc4dec97d474b'
    var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
    var encryptedData = userInfo2
    var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

    var pc = new WXBizDataCrypt(appId, sessionKey)

    var data = pc.decryptData(encryptedData, iv)

    console.log('解密后 data: ', data)
  },
  //
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      userInfo2: e.detail.encryptedData,
      hasUserInfo: true
    })
  },
})
