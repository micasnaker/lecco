const JLTools = require("../../util/JLTools.js")
Page({
  UserInfo: {},
  /**
   * 页面的初始数据
   */
  

  data: {
    dd: [],
    imageurl: false
  },
  //收货地址
  ress: function() {
    if (!this.UserInfo) {
      wx.navigateTo({
        url: '../login/CustomerLogin',
      })
      return;
    }
    wx.navigateTo({
      url: '../address/CustomerAddressList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  CustomerProductFavorite: function(res) {
    if (!this.UserInfo) {
      wx.navigateTo({
        url: '../login/CustomerLogin',
      })
      return;
    }
    wx.navigateTo({
      url: '../favorite/CustomerProductFavorite',
    })
  },
  order: function(res) {
    if (!this.UserInfo) {
      wx.navigateTo({
        url: '../login/CustomerLogin',
      })
      return;
    }
    wx.navigateTo({
      url: '../order/CustomerOrderList?STATUS_ID=' + res.currentTarget.dataset.status_id,
    })
  },
  userInfo: function() {
    if (this.UserInfo) {
      wx.navigateTo({
        url: './CustomerUserInfo',
      })
    } else {
      wx.navigateTo({
        url: '../login/CustomerLogin',
      })
    }

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
    var that = this
    this.UserInfo = wx.getStorageSync("UserInfo");
    console.log(this.UserInfo)
    if (this.UserInfo) {
      that.setData({
        imageurl: true
      })
      
    }
    var party_id = {
      party_id: this.UserInfo.PARTYID
    }
    JLTools.invoke("shop.order.getOrderNum", party_id, res => {
      console.log("获取订单数量", res)
      that.setData({
        dd: res,
        UserInfo: this.UserInfo
      })
    });
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