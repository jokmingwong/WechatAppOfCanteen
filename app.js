//app.js
App({
  onLaunch: function () {
    this.getMenu();
    this.getRecommend();
    this.login();
    this.getOrder();
  },

  getMenu: function() {
    wx.request({
      url: 'http://62.234.183.121/getMenu',
      success: function (res) {
        console.log("success-menu");
        var app = getApp();
        
        app.globalData.foodList = res.data;
        // console.log(app.globalData.foodList)
        for (var i = 0; i < res.data.length; i++) {
          var key = res.data[i];
          if (key.sold > 500) {
            app.globalData.foodClass[1].goods.push(key.id)
          }
          for (var j = 0; j < app.globalData.foodClass.length; j++) {
            var fc = app.globalData.foodClass[j];
            if (fc.id == key.type) {
              fc.goods.push(key.id)
            }
          }
        }
      },
      fail: function () {
        console.log("fail");
      }
    });
  },

  getRecommend: function() {
    wx.request({
      url: 'http://62.234.183.121/getRecommend',
      success: res => {
        console.log("success-recommend");
        var app = getApp();
        var recommend = res.data[0].recommend;
        
        for (var i = 0; i < recommend.length; ++i) {
          app.globalData.foodClass[0].goods.push(recommend[i]);
        }
      },
      fail: () => console.log("fail"),
    });
  },

  login: function() {
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4ea0486f80c8e2d7&secret=3c5ad94f57a5b3cd210c06221945f794&js_code=' + res.code + '&grant_type=authorization_code',
          success: function (e) {
            console.log("success-getopenid");
            var app = getApp();
            app.globalData.openid = e.data.openid;
            console.log(app.globalData.openid)
          },
        })
      }
    });
  },

  getOrder: function() {
    wx.request({
      url: 'http://62.234.183.121/getOrder',
      success: function (res) {
        console.log("success-order");
        var app = getApp();
        app.globalData.allOrderList = res.data;
        console.log(res.data)
      },
      fail: function () {
        console.log("fail");
      }
    });
  },

  globalData: {
    openid : '',
    url: 'http://62.234.183.121/',
    shops:[],
    allOrderList:[],
    orderlist:[],
    foodList: [],
    foodClass: [
      {
        id: 'recommend',
        classifyName: '今日推荐',
        goods: []
      },
      {
        id: 'hot',
        classifyName: '热销',
        goods: []
      },
      {
        id: 'gf',
        classifyName: '特色盖饭',
        goods: []
      },
      {
        id: 'gg',
        classifyName: '干锅',
        goods: []
      },
      {
        id: 'jz',
        classifyName: '饺子',
        goods: []
      },
      {
        id: 'favorite',
        classifyName: '收藏',
        goods: [0]
      }
    ]
  },
})