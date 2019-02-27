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
    transparency: 0
  },
  onPageScroll: function (e) {
    this.setData({
      transparency: e.scrollTop / 300
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})