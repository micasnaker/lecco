// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    //输入框内的内容
    search_field: "",
    //历史搜索内容
    search_fields: []
  },
  search_input: function (res) {
    this.setData({
      search_field: res.detail.value
    })
  },
  //点击取消时触发
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //点击完成按钮或者搜索或者历史记录时触发
  search: function (res) {
    console.log('查看返回的信息', res.currentTarget.dataset.type)
    if (res.currentTarget.dataset.type == "商品") {
      if (res.currentTarget.dataset.name) {
        this.opsearch(res.currentTarget.dataset.name, "商品")
      } else {
        this.opsearch(this.data.search_field, "商品")
      }
    } else if (res.currentTarget.dataset.type == "店铺") {
      if (res.currentTarget.dataset.name) {
        this.opsearch(res.currentTarget.dataset.name, "店铺")
      } else {
        this.opsearch(this.data.search_field, "店铺")
      }
    }
  },
  //清空历史记录
  delete: function () {
    wx.removeStorageSync('historicalSearch')
    this.setData({
      search_fields: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'historicalSearch',
      success(res) {
        console.log("看看缓存中是什么", res)
        that.setData({
          search_fields: res.data
        })
      }
    })
  },
  opsearch: function (op, type) {
    var that = this
    console.log('查看选择的是什么', op, type)
    if (op) {
      wx.getStorage({
        key: 'historicalSearch',
        success(res) {
          console.log(res.data)
          //遍历缓存内的数组，删除重复的,
          for (let i = 0, len = res.data.length; i < len; i++) {
            if (op == res.data[i].name && type == res.data[i].type) {
              res.data.splice(i, 1)
              --len
            }
          }
          //添加到第一个参数
          res.data.unshift({
            name: op,
            type: type
          })
          that.setData({
            search_fields: res.data
          })
          wx.setStorage({
            key: "historicalSearch",
            data: res.data
          })
        },
        //没有历史搜索的时候
        fail(res) {
          wx.setStorage({
            key: "historicalSearch",
            data: [{
              name: op,
              type: type
            }]
          })
        }
      })
    }
    wx.navigateTo({
      url: './CustomerProductList?name=' + op + "&type=" + type
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