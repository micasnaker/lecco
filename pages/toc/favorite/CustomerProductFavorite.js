const JLTools = require("../../util/JLTools.js")
Page({
  UserInfo: {},
  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    list: [],
  },
  onPullDownRefresh: function() {
    this.setData({
      list: [],
      index: 1
    })
    this.onLoad()
  },
  follow: function(res) {
    console.log(res)
    var that = this
    var list = that.data.list
    JLTools.invoke("csm.collect.insertCOLLECT", {
      "ENUM_ID": "20",
      "QUANTITY": "1",
      "VENDER_PARTY_ID": list[res.currentTarget.id].PARTY_ID,
      "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID,
      "STORE_ID": list[res.currentTarget.id].STORE_ID,
      "PRODUCT_ID": list[res.currentTarget.id].PRODUCT_ID,
      "isCollect": !list[res.currentTarget.id].follow
    }, res => {
      console.log('关注或者取消商品', res)
    });
    list[res.currentTarget.id].follow = !list[res.currentTarget.id].follow
    that.setData({
      list: list
    })
  },
  onReachBottom: function() {
    this.setData({
      index: ++this.data.index
    })
    console.log("zhixinl")
    this.loadMore()
  },
  //分页加载更多
  loadMore: function() {
    var query_data = {
      ENUM_ID: "20",
      PARTYID: this.UserInfo.PARTYID
    }
    var list = this.data.list
    var that = this
    JLTools.beanQuery({
      query_bean: "shop.common.product.QueryCollectProduct",
      query_data: query_data,
      page_size: 5,
      page_num: that.data.index
    }, res => {
      for (let i = 0, len = res.data.length; i < len; i++) {
        res.data[i].follow = true
      }
      list.push.apply(list, res.data);
      that.setData({
        list: list
      })
      console.log('分页加载更多', res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var party_id = {
      party_id: this.UserInfo.PARTYID
    }
    this.UserInfo = wx.getStorageSync("UserInfo");
    this.loadMore()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})