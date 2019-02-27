const JLTools = require("../../util/JLTools.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    PRODUCT_NAME: {}
  },
  tz: function(res) {
    console.log(res)
    var product_id = this.data.list.ITEM[res.currentTarget.id].PRODUCT_ID
    var store_id = this.data.list.ITEM[res.currentTarget.id].STORE_ID

    wx.navigateTo({
      url: '../product/CustomerProductMain?product_id=' + product_id + "&store_id=" + store_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var list = JLTools.immediatePayment[options.id]
    var PRODUCT_NAME = {
      PRICE: 0
    }
    console.log(list)
    for (let i = 0, len = list.ITEM.length; i < len; i++) {
      if (list.ITEM[i].PRODUCT_NAME == "运费商品") {
        PRODUCT_NAME = list.ITEM[i]
        list.ITEM.splice(i, 1)
        break;
      }
    }
    console.log(list)
    that.setData({
      list: list,
      PRODUCT_NAME: PRODUCT_NAME
    })
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