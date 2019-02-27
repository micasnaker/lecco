const JLTools = require("../../util/JLTools.js")
Page({
  UserInfo: {},
  /**
   * 页面的初始数据
   */
  data: {
    checked: false, //是否匿名评价
    score: [
      true, true, true, true, true
    ],
    DescriptionCoincidence: [
      true, true, true, true, true
    ],
    LogisticsSpeed: [
      true, true, true, true, true
    ],
    ServiceAttitude: [
      true, true, true, true, true
    ],
    evaluateText: "", ///评价内容
    tempFilePaths: []
  },
  //点击是否匿名评价时候发生
  checked: function(res) {
    console.log(res)
    this.setData({
      checked: !this.data.checked
    })
  },
  score: function(res) {
    console.log(res)
    var arr = []
    for (let i = 0, len = this.data.score.length; i < len; i++) {
      arr.push(res.currentTarget.id >= i)
    }
    this.setData({
      score: arr
    })
  },
  DescriptionCoincidence: function(res) {
    console.log(res)
    var arr = []
    for (let i = 0, len = this.data.DescriptionCoincidence.length; i < len; i++) {
      arr.push(res.currentTarget.id >= i)
    }
    this.setData({
      DescriptionCoincidence: arr
    })
  },
  LogisticsSpeed: function(res) {
    console.log(res)
    var arr = []
    for (let i = 0, len = this.data.LogisticsSpeed.length; i < len; i++) {
      arr.push(res.currentTarget.id >= i)
    }
    this.setData({
      LogisticsSpeed: arr
    })
  },
  ServiceAttitude: function(res) {
    console.log(res)
    var arr = []
    for (let i = 0, len = this.data.ServiceAttitude.length; i < len; i++) {
      arr.push(res.currentTarget.id >= i)
    }
    this.setData({
      ServiceAttitude: arr
    })
  },
  scimage: function() {
    var that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: tempFilePaths
        })
      }
    })
  },
  //输入评价是触发
  evaluateText: function(res) {
    console.log(res)
    this.setData({
      evaluateText: res.detail.value
    })
  },
  //点击提价时候触发的
  Submission: function() {
    var that = this
    var currentTarget = that.data.currentTarget
    var list = []
    var AcquisitionTest = function(res, index) {
      for (let i of res) {
        i && index++
      }
      return index;
    }
    var score = AcquisitionTest(that.data.score)
    //暂时没有用
    //   var DescriptionCoincidence = AcquisitionTest(that.data.DescriptionCoincidence)
    //    var LogisticsSpeed = AcquisitionTest(that.data.LogisticsSpeed)
    //   var ServiceAttitude = AcquisitionTest(that.data.ServiceAttitude)
    list.push({
      "PRODUCT_RATING": score,
      "PRODUCT_REVIEW": that.data.evaluateText,
      "USER_ID": that.UserInfo.USERID,
      "PARTY_ID": that.UserInfo.PARTYID,
      "PRODUCT_STORE_ID": currentTarget.ITEM[0].PRODUCT_STORE_ID,
      "PRODUCT_ID": currentTarget.ITEM[0].PRODUCT_ID,
      "STATUS_ID": currentTarget.ITEM[0].STATUS_ID,
      "POSTED_ANONYMOUS": that.data.checked,
      "ENUM_ID": 10,
      "ORDER_ITEM_SEQ_ID": currentTarget.ITEM[0].ORDER_ITEM_SEQ_ID,
      "EXTERNAL_ID": currentTarget.ORDER_PART_SEQ_ID
    })
    console.log(list)
    // JLTools.invoke("shop.review.review.insert", {
    //   "list": list
    // }, res => {
    //   console.log(res)
    // })

    function PaymentCall(imageUrl) {
      console.log('最终数据',imageUrl)
      list[0].PRODUCT_REVIEW_IMG= imageUrl
      console.log(list)
      JLTools.invoke("shop.review.review.insert", {
        "list": list
      }, res => {
        console.log(res)
        if(res.MSGID=='E'){
          wx.showModal({
            title: '提示',
            content: '图片太大了兄弟',
            showCancel:false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }else{
          wx.navigateBack({
            delta: 1
          })
        }
        
      })
    }

    if (this.data.tempFilePaths == 0) {
      PaymentCall()

    } else {
      var imageUrl = []
      for (let i = 0, len = this.data.tempFilePaths.length; i < len; i++) {
        JLTools.PictureUpload(that.data.tempFilePaths[i], res => {
          var data = JSON.parse(res)
          console.log(data)
          imageUrl.push(data.data.resultData[0].FILE_URL)
          if (i == len-1) {
            PaymentCall(imageUrl)
          }
        })
      }
    }





  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.UserInfo = wx.getStorageSync("UserInfo");
    var currentTarget = JLTools.immediatePayment[options.id]
    for (let i = 0, len = currentTarget.ITEM.length; i < len; i++) {
      if (currentTarget.ITEM[i].PRODUCT_NAME == "运费商品") {
        currentTarget.ITEM.splice(i, 1)
        break;
      }
    }
    this.setData({
      currentTarget: currentTarget
    })
    console.log(options)
    console.log(JLTools.immediatePayment)
    console.log(this.UserInfo)
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