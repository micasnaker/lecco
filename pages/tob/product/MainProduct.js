// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://121.41.79.182:8090/fs/fs05/attachments/2018-10-30/K128/99851650f36952ccfeca7bbe7a0d5ee1',
      'http://121.41.79.182:8090/fs/fs05/attachments/2018-10-30/K128/99851650f36952ccfeca7bbe7a0d5ee1',
      'http://121.41.79.182:8090/fs/fs05/attachments/2018-10-30/K128/99851650f36952ccfeca7bbe7a0d5ee1'
    ],
    transparency: 0,
    xuan: 0
  },
  onPageScroll: function(e) {
    this.setData({
      transparency: e.scrollTop / 250,
      xuan: e.scrollTop > 450 ? 1 : 0
    })

  },
  scroll: function(res) {

    if (res.currentTarget.id == 1) {
      wx.pageScrollTo({
        scrollTop: 460
      })

    } else {
      console.log(res)
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  gohome: function() {
    wx.reLaunch({
      url: '/pages/tob/home/DistributorHome'
    })
  },
  gocart:function(){
    wx.reLaunch({
      url: '/pages/tob/cart/Cart'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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