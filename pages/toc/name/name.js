var app = getApp();

Page({

  updataInfo : function(){
    this.data.UserInfo.USERNAME = this.data.name
    wx.setStorage({
      key: 'UserInfo',
      data: this.data.UserInfo,
    })
    wx.navigateBack()
    
  },
  changeStatus:function(e){
    this.data.name = e.detail.value
  },

  btn_primary: function () {
    wx.navigateTo({
      url: '../user/CustomerUserInfo',
   })
  },
  /**
   * 页面的初始数据
   */
  data: {
    UserInfo: wx.getStorageSync("UserInfo"),
    index:"",
    name: ''
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