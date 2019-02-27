const JLTools = require("../../util/JLTools.js")
Page({
  UserInfo: {},
  /**
   * 页面的初始数据
   */
  data: {
    aa: [1, 2, 3, 4, 5, 6, 7],
    message: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  sh: function(res) {
    wx.navigateTo({
      url: './CustomerAddressMain?id=' + res.currentTarget.id,
    })
  },
  fh:function(res){
    console.log(res)
    JLTools.address=res.currentTarget.id
    wx.navigateBack({
      delta: 1
    })
  },
  deleteAddress: function(op) {
    console.log(op)
    var that=this
    wx.showModal({
      title: '提示',
      content: '是否删除',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          JLTools.invoke("csm.yswc.ParytAddress.delete", {
            "ID": op.currentTarget.id,
            "PARTYID": that.UserInfo.PARTYID
          }, res => {
           console.log("删除成功")
           that.onShow()
          });
        }
      }
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
    var that = this
    this.UserInfo = wx.getStorageSync("UserInfo");
    JLTools.invoke("csm.yswc.ParytAddress.query", {
      "PARTYID": that.UserInfo.PARTYID
    }, res => {
      var message = JSON.parse(res.MESSAGE)
      that.setData({
        message: message
      })
      JLTools.message = message
      console.log(that.data.message)
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