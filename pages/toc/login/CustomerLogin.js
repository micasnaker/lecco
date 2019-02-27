const JLTools = require("../../util/JLTools.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    PhoneNumber: "",
    password: ""
  },
  login: function() {
    var that = this
    JLTools.invoke("csm.login.query", {
      "IDVALUE": that.data.PhoneNumber,
      "PASSWORD": that.data.password
    }, message => {
      console.log(message)
      if (message.MSGID == "E") {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '密码错误',
        })
      } else if (message.MSGID == "S") {
        
        wx.setStorageSync("UserInfo", JSON.parse(message.MESSAGE).USER )
        wx.switchTab({
          url: '/pages/toc/home/CustomerHome'
        })
      }
    })
  },
  //注册
  zc: function() {
    wx.navigateTo({
      url: './RegisterLogin',
    })
  },
  yz: function() {
    var p = /^(?![^a-zA-Z]+$)(?!\D+$)/;
    var b = p.test(this.data.password);
    var b= true   //以后加上验证就去了
    if (this.data.PhoneNumber.length == 11 && b && this.data.password.length > 6) {
      console.log("zhixinl")
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  PhoneNumber: function(res) {
    console.log(res)
    this.setData({
      PhoneNumber: res.detail.value
    })
    this.yz()
  },
  password: function(res) {
    console.log(res)
    this.setData({
      password: res.detail.value
    })
    this.yz()
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