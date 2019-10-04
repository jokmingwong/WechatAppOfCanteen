const app = getApp()

Page({
  data: {
    motto: 'Hello',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  onLoad: function () {
    app.getHealthData();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {//绘制界面
    // 页面渲染完成
    app.getHealthData()
    setTimeout(()=>{
      const ctx = wx.createCanvasContext('jinDu')
      var score = Math.round(app.globalData.healthData[0]['calories']*100)//这里拿到接口传入完成率就行

      var infor = wx.getSystemInfoSync();
      /*if(infor.model[0] == 'i'){
        console.log(infor);
      }*/
      //进度圈
      ctx.beginPath()
      ctx.arc(150, 100, 85, 0, 2 * Math.PI)
      ctx.setLineWidth(5)
      ctx.setStrokeStyle('#F4F4F4')
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(150, 100, 85, 3 / 2 * Math.PI, (-1 / 2 + score / 50) * Math.PI, 0)
      ctx.setLineWidth(5)
      ctx.setStrokeStyle('#87CEFA')
      //ctx.setStrokeStyle('#756ff7')
      ctx.stroke()
      // Draw arc

      //两侧的小圆弧装饰
      ctx.beginPath()
      ctx.arc(150, 100, 115, 11 / 6 * Math.PI, 1 / 6 * Math.PI)
      ctx.setLineWidth(5)
      ctx.setGlobalAlpha(0.5)
      ctx.setStrokeStyle('#87CEFA')
      //ctx.setStrokeStyle('#756ff7')
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(150, 100, 115, 5 / 6 * Math.PI, 7 / 6 * Math.PI)
      ctx.setLineWidth(5)
      ctx.setGlobalAlpha(0.5)
      ctx.setStrokeStyle('#87CEFA')
      //ctx.setStrokeStyle('#756ff7')
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(150, 100, 145, 23 / 12 * Math.PI, 1 / 12 * Math.PI)
      ctx.setLineWidth(5)
      ctx.setGlobalAlpha(0.2)
      ctx.setStrokeStyle('#87CEFA')
      //ctx.setStrokeStyle('#756ff7')
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(150, 100, 145, 11 / 12 * Math.PI, 13 / 12 * Math.PI)
      ctx.setLineWidth(5)
      ctx.setGlobalAlpha(0.2)
      ctx.setStrokeStyle('#87CEFA');
      //ctx.setStrokeStyle('#756ff7')
      ctx.stroke()

      //圆圈中间的完成率等字样
      ctx.setFontSize(70)
      ctx.setFillStyle('black')
      ctx.setGlobalAlpha(1)
      ctx.fillText(score, 110, 115)

      ctx.setFontSize(20)
      ctx.setFillStyle('black')
      ctx.setGlobalAlpha(1)
      ctx.fillText('%', 195, 115)

      ctx.setFontSize(20)
      ctx.setFillStyle('#A6A6A6')
      ctx.setGlobalAlpha(1)
      ctx.fillText('卡路里', 120, 140)

      ctx.draw()
      ctx.closePath();

      const ctx2 = wx.createCanvasContext('classf')
      ctx2.setStrokeStyle('#F4F4F4')
      ctx2.setLineWidth(4)
      var width = wx.getSystemInfoSync().windowWidth;
      //var screenHeight = wx.getSystemInfoSync().windowHeight;
      var height = 15;
      console.log(width)
      var fromPoint = 0.04 * width;
      console.log(fromPoint)
      var disPoint = 0.29 * width;
      console.log(disPoint)
      var zihao = width > 330 ? 13 : 12;
      if (zihao != 12) {
        zihao = width > 380 ? 14 : 13;
      }
      console.log(zihao);

      //画打底线
      var words = [['蛋白质'], ['碳水化合物'], ['脂肪']];
      var classPercent = [[0], [0], [0]];//这里给出六项的进度
      classPercent[0] = app.globalData.healthData[0]['protein']
      classPercent[1] = app.globalData.healthData[0]['carbonhydrate']
      classPercent[2] = app.globalData.healthData[0]['fat']
      for (var i = 0; i < 3; i++) {
        fromPoint = 0.04 * width;
        disPoint = 0.96 * width;
        ctx2.setFontSize(zihao);
        ctx2.setFillStyle('#282828');
        ctx2.fillText(words[i]+' '+Math.round(classPercent[i]*100)+'%', fromPoint, height);
        ctx2.moveTo(fromPoint, height + 15);
        ctx2.lineTo(disPoint, height + 15);
        height += width / 7;
      }
      ctx2.stroke();

      ctx2.beginPath();
      //画进度线
      var classPerfrom = 0.04 * width;
      var classPerto = 0.96 * width;
      height = 15;
      ctx2.setStrokeStyle('#87CEFA');
      //ctx2.setStrokeStyle('#756ff7');
      ctx2.setLineWidth(4);
      for (var i = 0; i < 3; i++) {
        classPerfrom = 0.04 * width;
        classPerto = 0.96 * width;
        ctx2.moveTo(classPerfrom, height + 15);
        var perlength = (classPerto - classPerfrom) * classPercent[i];
        console.log(classPercent[i])
        ctx2.lineTo(perlength, height + 15);
        //console.log(perlength);
        height += width / 7;
      }
      ctx2.stroke();
      ctx2.draw();
    //间隔
    },300)
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    var that = this;
    app.getHealthData();

    setTimeout(() => {
      that.onShow();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 500);
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})