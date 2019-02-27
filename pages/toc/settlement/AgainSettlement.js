const JLTools = require("../../util/JLTools.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //海外购身份输入框显示与隐藏
    hwg: true,
    //海外购身份证
    sfz: "",
    immediatePayment: {},
    prices: 0,
    address: "", //收货地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var immediatePayment = JLTools.immediatePayment[options.id]
    var PRODUCT_NAME = {
      PRICE: 0
    }
    for (let i = 0, len = immediatePayment.ITEM.length; i < len; i++) {
      if (immediatePayment.ITEM[i].PRODUCT_NAME == "运费商品") {
        PRODUCT_NAME = immediatePayment.ITEM[i]
        immediatePayment.ITEM.splice(i, 1)
        break;
      }
    }
    if (immediatePayment.order[0].STORE_NAME == "海外购") {
      that.setData({
        hwg: false
      })
    }
    console.log(immediatePayment)
    console.log(PRODUCT_NAME)
    that.setData({
      immediatePayment: immediatePayment,
      PRODUCT_NAME: PRODUCT_NAME,
      id: options.id
    })
  },
  placeOrder: function() {
    var that = this
    JLTools.prices = that.data.prices
    wx.navigateTo({
      url: './CashierSettlement?id='+that.data.id,
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