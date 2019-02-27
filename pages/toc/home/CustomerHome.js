const JLTools = require("../../util/JLTools.js")
Page({
  UserInfo: {},
  /**
   * 页面的初始数据
   */
  data: {

  },
  bd: function() {
    wx.navigateTo({
      url: '/pages/toc/product/CustomerProductSearch'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    this.UserInfo = wx.getStorageSync("UserInfo");
    if(this.UserInfo){
      JLTools.invoke("csm.yswc.selectcartsum.query", {
        "PARTYID": this.UserInfo.PARTYID,
        "CHANNEL_TYPE": null
      }, res => {
        var text = JSON.parse(res.MESSAGE)
        console.log(text)
        wx.setTabBarBadge({
          index: 2,
          text: text.data.CART_SUM + ""
        })
      })
      JLTools.invoke("csm.yswc.ParytAddress.query", {
        "PARTYID": that.UserInfo.PARTYID
      }, res => {
        var message = JSON.parse(res.MESSAGE)
        JLTools.message = message
      })
    }
   

    // wx.setStorageSync("UserInfo", { 
    //   "BYNAME": "", 
    //   "SEX": null, 
    //   "PARTYID": "00000805", 
    //   "OPENDID": "", 
    //   "PHOTO": "E", 
    //   "BIRTHDAY": null, 
    //   "USERID": "000000355", 
    //   "USERNAME": "15827235074", 
    //   "PASSWORD": "1bbd886460827015e5d605ed44252251", 
    //   "EMAIL": null, 
    //   "KH": null, 
    //   "SFZX": "0", 
    //   "MOBILE": "15827235074", 
    //   "SFYG": "0", 
    //   "GW": [{ "ROLETYPEID": "role_consumer", "NAME": "消费者（商品）" }], 
    //   "PAGE": [], 
    //   "EXTID": null, 
    //   "PARTYID_SALE": [], 
    //   "SessionID": "fe1537e3b70a4faf96e997a255221281", 
    //   "isLoggedIn": true, 
    //   "homeAddress": {}, 
    //   "deliveryAddress": { 
    //     "NAME": "B", 
    //     "MOBILE": "15388888888", 
    //     "ID": "000000000000207", 
    //     "GBCODE": null, 
    //     "STATE": "河南", 
    //     "CITY": "洛阳", 
    //     "DISTRICT_CODE": "77774846", 
    //     "DISTRICT": "老城", 
    //     "STREET": null, 
    //     "ADDRESS": "111", 
    //     "STUATS": "1", 
    //     "DQXX01": "77774846" 
    //   } 
    // });
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