 const app = getApp();

Page({
  data: {
    toView: 'list3',
    scrollTop: 0,
    maginleft: '10%',
    status: 3,                // 页面所在的位置 1 -> incomplet  2-> incommented  3 -> complete
    allOrderList:[],          // 所有订单
    foodList:[],
    orderlist: []
  },

  onLoad: function(e) {
    this.setData({
      foodList: app.globalData.foodList,
    });
  },

  onShow: function(e) {
    this.setData({
      allOrderList: app.globalData.allOrderList
    });
    this.setStatus(3);
  },

  setStatus: function(status) {
    switch (status) {
      case 1: this.btn1();
      case 2: this.btn2();
      case 3: this.btn3();
    }
  },

  btn1: function() {
    console.log("change to no complete!");
    var newArray = new Array();
    var list = this.data.allOrderList;
    for (var key in list){
      if (list[key].state == 1) 
        newArray.push(list[key]);
    }
    this.setData({
      status: 1,
      maginleft: '10%',
      orderlist: newArray,
    })
  },

  btn2: function() {
    console.log("change to no commit");
    var newArray = new Array();
    var list = this.data.allOrderList;
    for( var key in list) {
      if (list[key].state == 2) 
        newArray.push(list[key]);
    }
    this.setData({
      maginleft: '44%',
      status: 2,
      orderlist: newArray,
    })
  },

  btn3: function() {
    console.log("change to complete!");
    var newArray = new Array();
    var list = this.data.allOrderList;
    for (var key in list) {
      newArray.push(list[key]);
    }
    this.setData({
      status: 3,
      maginleft: '76%',
      orderlist: newArray,
    })
  },

  upper: function(e) {
    //console.log(e)
  },

  lower: function(e) {
    //console.log(e)
  },

  scroll: function(e) {
    //console.log(e)
  },

  jumpToCommit: function (e) {
    var recipeId = e.currentTarget.dataset.recipeid;
    var img = e.currentTarget.dataset.img;
    var orderName = e.currentTarget.dataset.ordername;
    var orderTime = e.currentTarget.dataset.ordertime;
    var orderid = e.currentTarget.dataset.orderid;
    var url = '../comment/comment?recipeId=' + recipeId + "&img=" + img + "&orderName=" + orderName + "&orderTime=" + orderTime + "&orderid=" + orderid;
    wx.navigateTo({
      url: url,
    })
  },

  onPullDownRefresh: function () {
    console.log("refresh");
    wx.showNavigationBarLoading();
    var that = this;
    app.getOrder();

    setTimeout(() => {
      that.onShow();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 500);
  }

})