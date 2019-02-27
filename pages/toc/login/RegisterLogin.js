const JLTools = require("../../util/JLTools.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yzm: "获取验证码",
    PhoneNumber: "",
    VerificationCode: "",
    password: ""
  },
  //zhuce
  register: function() {
    var that = this
    var p = /^(?![^a-zA-Z]+$)(?!\D+$)/;
    var b = p.test(that.data.password);
    console.log(b)
    if (this.data.PhoneNumber.length == 11 && b && that.data.password.length > 6) {
      JLTools.invoke("csm.wbjk.yswc.gmjd.login", {
        "mobile": that.data.PhoneNumber,
        "key": that.data.VerificationCode,
        "password": that.data.password,
        "register": "1"
      }, message => {
        console.log(message)
        if (message.MSGID == "E") {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: "验证码错误",
          })
        } else if (message.MSGID == "S"){
          wx.showModal({
            title: '',
            showCancel: false,
            content: "注册成功，去登录",
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "密码6-20位，且必须包含数字和字母",
      })
    }
  },
  //输入手机号
  PhoneNumber: function(res) {
    console.log(res)
    this.setData({
      PhoneNumber: res.detail.value
    })
  },
  test: function() {
    var that = this
    this.setData({
      yzm: --that.data.yzm
    })
    console.log("zhixinl")
    if (that.data.yzm == 0) {
      clearInterval(this.tt);
      that.setData({
        yzm: "获取验证码",
      })
    }
  },
  yzm: function(res) {
    this.setData({
      VerificationCode: res.detail.value
    })
  },
  password: function(res) {
    this.setData({
      password: res.detail.value
    })
  },
  //点击验证码
  VerificationCode: function() {
    var that = this
    if (typeof that.data.yzm == 'number') {
      return;
    }
    console.log(this.data.PhoneNumber.length)
    if (this.data.PhoneNumber.length == 11) {
      JLTools.invoke("csm.login.query", {
        "IDVALUE": that.data.PhoneNumber,
        "PASSWORD": "1"
      }, message => {
        console.log(message)
        if (message.MSGID == "E") {
          JLTools.invoke("csm.login.putkey", {
            "mobile": that.data.PhoneNumber,
          }, message => {
            console.log(message)
            if (message.MSGID == "S") {
              that.setData({
                yzm: 240
              })
              that.tt = setInterval(that.test, 1000);
            } else if (message.MSGID == "E") {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '发送验证码失败',
              })
            }
          })
        } else if (message.MSGID == "S") {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '手机号已存在',
          })
        }

      });

    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确格式的手机号',
      })
    }
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
    clearInterval(this.tt);
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