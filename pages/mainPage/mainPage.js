const app = getApp();

Page({
  data: {
    goods: [],
    goodsList: [],
    cart: {},
    showCartDetail: false,
    timeset: "1",
    timeset2:"1"
  },

  onLoad: function (e) {
    this.setData({
      goods: app.globalData.foodList,//从服务器读到的存在foodList
      goodsList: app.globalData.foodClass,
      cart: {
        count: 0,
        total: 0,
        list: {}
      }
    })
    
  },

  onShow: function () {//默认热销
    console.log(this.data.goods);
    console.log(this.data.goodsList);
    this.setData({
      classifySeleted: this.data.goodsList[0].id
    });
  },

  tapDetail: function (e) {
    console.log(e);
    e.currenTarget.id=
    wx.navigateTo({
      url: '../details/details?title=1',
    })
  },

  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id);
  },

  tapReduceCart: function (e) {
    console.log(e);
    this.reduceCart(e.target.dataset.id);
  },

  addCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    this.data.cart.list[id] = num + 1;
    this.countCart();
  },

  reduceCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },

  countCart: function () {
    var count = 0,
      total = 0;
    for (var id in this.data.cart.list) {
      var goods = this.data.goods[id];
      count += this.data.cart.list[id];
      total += goods.price * this.data.cart.list[id];
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart
    });
  },

  follow: function () {
    this.setData({
      followed: !this.data.followed
    });
  },

  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }

    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function (classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },

  tapClassify: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },

  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },

  navigateToOrder:function(e){
   
    wx.switchTab({
      url: "../order/order",
    })
  },
  navigateToPay: function (e) {
    wx.navigateTo({
      url: '../pay/pay',
    })
  },
  onChange: function(e){
    
    this.setData({ timeset: e.detail });
  },
  onChange2: function (e) {

    this.setData({ timeset2: e.detail });
  },


  formSubmit: function (e) {
   
    
      // TODO: 用户未登录时行为未定义
      //       1. 用户登录才能进入系统
      //       2. 执行判断，如果未登录showToast需要先登录
      var userHead = app.globalData.userInfo.avatarUrl;
      var nickName = app.globalData.userInfo.nickName;
      var that = this;
    for (var id in this.data.cart.list) {
      console.log(this.data.goods);
      wx.request({
        url: 'http://62.234.183.121/sendOrder',
        data: {
          "userid": app.globalData.openid,
          "username": nickName,
          "recipeid": this.data.goods[id].id,
          "recipename": this.data.goods[id].name,
          "amount": this.data.cart.list[id],
          "price": this.data.goods[id].price,
          "state": 1,
          "dinnertime":this.data.timeset,
          "type":this.data.timeset2
          
        },
       
        method: 'POST',
        success: (res) => {
          var code = res.statusCode;
          if (code == 200) {
            wx.showToast({
              title: '下单成功',
              icon: 'none',
              duration: 700
            });
            console.log(code);
            app.getOrder();
            setTimeout(() => {
              wx.switchTab({
                url: '../mainPage/mainPage',
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
    
  },

    /*server.sendTemplate(e.detail.formId, null, function (res) {
      if (res.data.errorcode == 0) {
        wx.showModal({
          showCancel: false,
          title: '恭喜',
          content: '订单发送成功!',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack();
            }
          }
        })
      }
    }, function (res) {
      console.log(res)
    });*/
  

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    wx.request({
      url: 'http://62.234.183.121/getMenu',
      success: function (res) {
        console.log("success");
        var app = getApp();
        app.globalData.foodList = res.data;
        console.log(app.globalData.foodList)
        //app.globalData.isLoad = true;
      },
      fail: function () {
        console.log("fail");
      }
    });
    this.onLoad()
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 500);
  }

})


