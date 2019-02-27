// pages/toc/user/CustomerCheckpassword/CustomerCheckpassword.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: wx.getStorageSync('UserInfo').MOBILE,                // 用户手机号
    currentTime: 60,         //验证码倒计时时间
    showPwd: false,          //是否显示密码
    promptText: '文本内容',  // 提示文本内容
    finshPwd: '',           //修改成功后的密码
    openAlert: false,       //是否显示提示
    loadingHidden: true,    //加载状态(隐藏)
    captchaCode: '',        //验证码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(new Date().getTime() - options.time)
    this.setData({
      phone: options.phone
    })
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
    console.log(wx.getStorageSync("UserInfo"))
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

  },
  //获取验证码
  getCaptcha: function () {
    let _this = this
    this.setData({
      loadingHidden: false
    })
    wx.request({
      url: 'http://39.105.62.14:8086/scmform/trust/Inbound/invoke.do',
      data: {
        interfaceId: 'csm.login.putkey',
        data: {
          interfaceId: 'csm.login.getSMS',
          PARTYID: wx.getStorageSync("UserInfo").PARTYID,
          mobile: this.data.phone,
          json: {}
        },
        CLIENT: 'PHONE',
        SessionID: wx.getStorageSync("UserInfo").SessionID
      },
      success: res => {
        _this.setData({
          loadingHidden: true
        })
        console.log(res)
      },
      fail: error => {

      }
    })

    //验证码倒计时
    if (!this.data.intervalId) {
      let time = this.data.currentTime;
      this.data.intervalId = setInterval(() => {
        time -= 1
        this.setData({
          currentTime: time
        })
      }, 1000)
      setTimeout(() => {
        clearInterval(this.data.intervalId)
        delete this.data.intervalId
        this.setData({
          currentTime: 60
        })
      }, 59000)
    }

  },
  //显示密码
  showPassword: function () {
    this.setData({
      showPwd: !this.data.showPwd
    })
  },
  //获取修改后的密码
  passWdInput: function(e){
    this.setData({
      finshPwd: e.detail.value
    })
  },
  getCaptchaCode:function(e){
    this.setData({
      captchaCode: e.detail.value
    })
  },
  //确定修改
  onSubmit: function(){
    let val = this.data.finshPwd
    if (val === '' || val.length <= 5 || !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(val)){
      this.setData({
        promptText: '密码必须为字母+数字相结合且至少6位字符',
        openAlert: true
      })
    return;
    }
    wx.request({
      url: 'http://39.105.62.14:8086/scmform/trust/Inbound/invoke.do',
      method: 'GET',
      data:{
        interfaceId: 'csm.login.getkey',
        data: {
          "mobile": this.data.phone,
          "key": this.data.captchaCode
        },
        SessionID: wx.getStorageSync("UserInfo").SessionID,
        CLIENT: 'PHONE'
      },
      success: res => {
        console.log(res)
      },
      fail: error => {
        this.setData({
          loadingHidden: false
        })
        setTimeout(() => {
          this.setData({
            loadingHidden: true
          })
        }, 1000)
      }
    })
  },
  //关闭弹窗
  closeAlert: function(){
    this.setData({
      openAlert: false
    })
  }
})