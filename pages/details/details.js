/* /pages/details/details.js */
const app = getApp();

Page({
  data: {
    id: '',
    details: null,
    comments: [],
    recommend: [],
    showPop: false,
  },

  onLoad: function (options) {
    var id = options.title;
    var foods = app.globalData.foodList;
    this.setData ({
      id: id,
      details: foods[id], 
      recommend: this.getRecommend(foods)
    });

    setTimeout(() => {
      this.getComments();
      setTimeout(() => {
        setTimeout(() => {
        }, 300);
      }, 300);
    }, 50);
  },

  onShow: function(){
    this.getComments();
  },

  getComments: function() {
    var that = this;
    console.log(that.data.id);
    wx.request({
      url: 'http://62.234.183.121/getComment',
      data: {
        'recipe_id': that.data.id,
      },
   
      method: "POST",
      success: (res) => {
        console.log("success");
        that.setData({
          comments: res.data,
        });
      },
      fail: (res) => {
        console.log("fail");
      }
    });
  },

  getRecommend: function(foods) {
    // TODO: 用随机数生成推荐列表
    var recommend_id = [0, 0, 0, 0, 0, 0];
    var recommend = [];
    for (var i = 0; i < recommend_id.length; ++i) {
      recommend.push(foods[recommend_id[i]]);
    }
    return recommend;
  },

  navigatorToDetail: function(e) {
    var id = e.currentTarget.id;
    console.log(id)
    var url = "../details/details?title=" + id;
    console.log(url);
    wx.redirectTo({
      url: url,
      success: () => {
        console.log("success");
      },
      fail: () => {
        console.log("fail");
      }
    });
  },

  onClosePopup: function (e) {
    console.log('ccc')
    this.setData({
      showPop: false,
    });
  },

  onShowPopup: function (e) {
    this.setData({
      showPop: true,
    })
  }
})  