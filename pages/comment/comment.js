const app = getApp();

Page({
  data: {
    recipeId: 0,
    img: "",
    orderTime: "",
    orderName: "",
    orderid: 0,
  },

  onLoad: function (options) {
    var img = "../.." + options.img;
    this.setData({
      recipeId: options.recipeId,
      img: img,
      orderTime: options.orderTime,
      orderName: options.orderName,
      orderid: options.orderid,
    });
  },

  formSubmit: function (e) {
    var comment = e.detail.value.opinion;

    if (comment.length == 0) {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
        duration: 1000
      });
    } else if (comment.length > 100) {
      wx.showToast({
        title: '评论太长',
        icon: 'none',
        duration: 1000
      })
    } else {
      // TODO: 用户未登录时行为未定义
      //       1. 用户登录才能进入系统
      //       2. 执行判断，如果未登录showToast需要先登录
      var userHead = app.globalData.userInfo.avatarUrl;
      var nickName = app.globalData.userInfo.nickName;
      var that = this;

      wx.request({
        url: 'http://62.234.183.121/sendComment',
        data: {
          'comment_include': comment,
          'comment_user_head': userHead,
          'comment_user_id': app.globalData.openid,
          'comment_user_name': nickName,
          'recipe_id': that.data.recipeId,
          'order_id': that.data.orderid,
        },
        method: 'POST',
        success: (res) => {
          var code = res.statusCode;
          if (code == 200) {
            wx.showToast({
              title: '评论成功',
              icon: 'none',
              duration: 700
            });
            app.getOrder();
            setTimeout(() => {
              wx.switchTab({
                url: '../order/order',
              });
            }, 700);
          } else {
            wx.showToast({
              title: '服务器连接超时，请稍后再试',
              icon: 'none',
              duration: 1500
            });
          }
        },
        fail: (res) => console.log("fail"),
      })
    }
  }
})