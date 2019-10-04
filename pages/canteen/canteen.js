const app = getApp();

Page({
  data: {
    toView: 'list3',
    scrollTop: 0,
    maginleft: '18%',
    status: 3,                // 页面所在的位置 1 -> incomplet  2-> incommented  3 -> complete
    allOrderList: [],          // 所有订单
    foodList: [],
    orderlist: []
  },

  onLoad: function (e) {
    this.setData({
      foodList: app.globalData.foodList,
    });
  },

  onShow: function (e) {
    this.setData({
      allOrderList: app.globalData.allOrderList
    });
    this.setStatus(3);
  },

  setStatus: function (status) {
    switch (status) {
      case 1: this.btn1();
      case 2: this.btn2();
      case 3: this.btn3();
    }
  },

  btn1: function () {
    console.log("change to no complete!");
    var newArray = new Array();
    var list = this.data.allOrderList;
    for (var key in list) {
      if (list[key].state == 1)
        newArray.push(list[key]);
    }
    this.setData({
      status: 1,
      maginleft: '18%',
      orderlist: newArray,
    })
  },

  btn2: function () {
    console.log("change to no commit");
    var newArray = new Array();
    var list = this.data.allOrderList;
    for (var key in list) {
      if (list[key].state == 2)
        newArray.push(list[key]);
    }
    this.setData({
      maginleft: '20%',
      status: 2,
      orderlist: newArray,
    })
  },

  btn3: function () {
    console.log("change to complete!");
    var newArray = new Array();
    var list = this.data.allOrderList;
    for (var key in list) {
      newArray.push(list[key]);
    }
    this.setData({
      status: 3,
      maginleft: '70%',
      orderlist: newArray,
    })
  },

  upper: function (e) {
    //console.log(e)
  },

  lower: function (e) {
    //console.log(e)
  },

  scroll: function (e) {
    //console.log(e)
  },

  confirm: function (e) {
    const orderId = e.currentTarget.dataset.orderid;
    var that = this;

    wx.request({
      url: 'http://62.234.183.121/confirmOrder',
      method: 'POST',
      data: {
        'orderid': orderId,
      },
      success: function(res) {
        var code = res.statusCode;
        if (code == 200) {
          wx.showToast({
            title: '取餐成功',
            icon: 'none',
            duration: 1000
          });
          app.getOrder();
          setTimeout(function() {
            that.onShow();
          } , 1000);
        } else {
          wx.showToast({
            title: '服务器连接超时，请稍后再试',
            icon: 'none',
            duration: 1500
          });
        }
      },
      fail: res => {
        console.log("fail");
      }
    })
  },
})