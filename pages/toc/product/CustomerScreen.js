const JLTools = require("../../util/JLTools.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LevelList: [],
    ProductList: [],
    Levescreen: null,
  },
  //重置
  Reset: function() {
    this.setData({
      Levescreen: null
    })
  },
  //确定
  Sure: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  //点击选择标签
  Levescreen: function(res) {
    console.log(res)
    this.setData({
      Levescreen: res.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var Levescreen = JLTools.Levescreen
    JLTools.invoke("csm.yswc.getProductBrand.query", {}, res => {
      console.info(res)
      that.setData({
        ProductList: res
      })
    });
    JLTools.invoke("csm.yswc.getLevelCategory.query", {
      "level": 1,
      "category_type": "terrace"
    }, res => {
      console.info(res)
      that.setData({
        LevelList: res,
        Levescreen: Levescreen
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.Levescreen == null) {
      JLTools.screen = null
      JLTools.Levescreen = null
    } else {
      JLTools.screen = this.data.LevelList[this.data.Levescreen].FLID
      JLTools.Levescreen = this.data.Levescreen
    }

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})