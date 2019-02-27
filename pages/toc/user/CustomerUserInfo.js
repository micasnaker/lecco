const JLTools = require("../../util/JLTools.js");
const pubJson = require("../../util/pubJson.js");
Page({
  /**
     * 页面的初始数据
     */
  data: {
    UserInfo: wx.getStorageSync("UserInfo"),
    date: wx.getStorageSync("UserInfo").BIRTHDAY,
    array: ['', '女', '男'],
    index: 0
  },
  nametap: function() {
    wx.navigateTo({
      url: '../name/name',
    })
  },
  
  Logout: function(res) {
    wx.showModal({
      title: '提示',
      content: '确定退出吗？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('UserInfo')
          wx.redirectTo({
            url: '../login/CustomerLogin'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      index: this.data.UserInfo.SEX
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

    //csm.search.userInfo.updateGRXX
    ,
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
    this.data.UserInfo.BIRTHDAY = this.data.date
    wx.setStorage({
      key: 'UserInfo',
      data: this.data.UserInfo,
    })
    console.log(this.data.UserInfo)
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
    
    this.data.UserInfo.SEX = e.detail.value 
    wx.setStorage({
      key: 'UserInfo',
      data: this.data.UserInfo,
    })
  console.log(this.data.UserInfo)
  },
  saveUserInfo: function(e) {
    var that = this;
    JLTools.invoke('csm.search.userInfo.updateGRXX', {
      "BYNAME": that.data.UserInfo.USERNAME,
      "SEX": that.data.index,
      "PARTYID": that.data.UserInfo.PARTYID,
      "BIRTHDAY": that.data.date || '',
      "PHOTO": that.data.UserInfo.PHOTO || '',
    }, res => {
      console.log(res)

    })

  },
  gotoCheckPwd: function() {

    wx.navigateTo({
      url: 'CustomerCheckpassword/CustomerCheckpassword?phone=' + this.data.UserInfo.MOBILE + '&time=' + new Date().getTime(),
    })
  },
  //选择图片与上传
  upload: function(e) {

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(res),
          console.log("结束"),
          wx.uploadFile({
            url: pubJson.url + "/FormUpload/upload.do",
            filePath: tempFilePaths[0],
            name: 'file',
            success: function(res) {
              var data = res.data
              console.log(data)
              console.log("开始了么")
            }
          })
      }
    })
  },



})