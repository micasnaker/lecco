const JLTools = require("../../util/JLTools.js")
Page({
  UserInfo: {},

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    dd: [],
    lists: [],
    STATUS_ID: ""
  },
  //初始化数据
  empty: function() {
    this.setData({
      index: 1,
      dd: [],
      lists: [],
    })
  },
  //多功能按钮
  bind: function(e) {
    var that = this
    JLTools.immediatePayment = this.data.lists
    console.log(e)
    //return;
    if (e.currentTarget.id=='0') {
      if (that.data.lists[e.currentTarget.dataset.index].order[0].STATUS_ID == 'OrderOpen') {
        //立即支付
        wx.navigateTo({
          url: '../settlement/AgainSettlement?id=' + e.currentTarget.dataset.index,
        })
      } else if (that.data.lists[e.currentTarget.dataset.index].order[0].STATUS_ID == 'OrderDeliver') {
        //查看物流 
        wx.navigateTo({
          url: './CustomerLogistics?id=' + e.currentTarget.dataset.index,
        })
      } else if (that.data.lists[e.currentTarget.dataset.index].order[0].STATUS_ID == 'OrderCompleted') {
        //申请退货
      }
    } else if (e.currentTarget.id == '1') {
      if (that.data.lists[e.currentTarget.dataset.index].order[0].STATUS_ID == 'OrderOpen') {
        //取消订单
        wx.showModal({
          title: '提示',
          content: '确认取消吗？',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定', e.currentTarget.dataset.orderpartseqid)
              JLTools.invoke("csm.orderDock.OrderCancelled", {
                "orderPartSeqId": e.currentTarget.dataset.orderpartseqid
              }, res => {
                console.log(res)
                if (res.MSGID == "S") {
                  that.empty()
                  var options = {
                    STATUS_ID: that.data.STATUS_ID
                  }
                  that.onLoad(options)
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '发生错误了',
                    showCancel: false
                  })
                }

              });
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else if (that.data.lists[e.currentTarget.dataset.index].order[0].STATUS_ID == 'OrderDeliver') {
        //确认收货 
        wx.showModal({
          title: '提示',
          content: '确定收货',
          success(res) {
            if (res.confirm) {
              JLTools.invoke("csm.orderDock.OrderCompleted", {
                "orderPartSeqId": that.data.lists[e.currentTarget.dataset.index].ORDER_PART_SEQ_ID,
                "partyId": that.UserInfo.PARTYID
              }, res => {
                var options = {
                  STATUS_ID: that.data.STATUS_ID
                }
                that.empty()
                that.onLoad(options)
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              return;
            }
          }
        })
      } else if (that.data.lists[e.currentTarget.dataset.index].order[0].STATUS_ID == 'OrderCompleted') {
        //立即评价 
        wx.navigateTo({
          url: './CustomerEvaluate?id=' + e.currentTarget.dataset.index,
        })
      }
    }


  },
  hb: function() {
    var that = this
    var lists = that.data.lists
    var prices = 0
    for (let i = 0, len = lists.length; i < len; i++) {
      for (let j = 0, leng = lists[i].ITEM.length; j < leng; j++) {
        prices += lists[i].ITEM[j].PRICE * lists[i].ITEM[j].QUANTITY
      }
      lists[i].prices = prices
      prices = 0
    }
    that.setData({
      lists: lists
    })
  },
  button: function(res) {
    console.log(res)
    var that = this
    that.setData({
      index: 1,
      lists: [],
      STATUS_ID: res.currentTarget.dataset.status_id
    })
    that.getdata(that.data.index, that.data.STATUS_ID)
  },
  onReachBottom: function() {
    console.log(this.data.STATUS_ID)
    var that = this
    var z = 0
    switch (that.data.STATUS_ID) {
      case '':
        z = that.data.dd.qb
        break;
      case 'OrderOpen':
        z = that.data.dd.DFK
        break;
      case 'DFH':
        z = that.data.dd.YFK
        break;
      case 'DSH':
        z = that.data.dd.YFH
        break;
      case 'DPJ':
        z = that.data.dd.DPJ
        break;
    }
    if (that.data.index * 5 > z) {
      return;
    }

    that.setData({
      index: ++that.data.index
    })
    that.getdata(that.data.index, that.data.STATUS_ID)
  },
  //加载分页
  getdata: function(index, STATUS_ID) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var data = {
      "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID,
      "STATUS_ID": STATUS_ID
    }
    var lists = that.data.lists
    var list = []
    JLTools.beanQuery({
      query_bean: "shop.common.order.QueryOrder",
      query_data: data,
      page_num: index,
      page_size: 5,
    }, res => {
      console.log('分页加载更多', res)
      for (let i = 0, len = res.data.length; i < len; i++) {
        list.push({
          ORDER_PART_SEQ_ID: res.data[i].ORDER_PART_SEQ_ID
        })
      }
      console.log(list)
      JLTools.invoke("shop.order.getBatchOrderItem", {
        list
      }, e => {
        console.log('获取订单详情', e)
        for (let i = 0, len = e.length; i < len; i++) {
          e[i].order = []
          for (let j = 0, leng = res.data.length; j < leng; j++) {
            if (e[i].ORDER_PART_SEQ_ID == res.data[j].ORDER_PART_SEQ_ID) {
              e[i].order.push(res.data[j])

            }
          }
        }
        lists.push.apply(lists, e);
        that.setData({
          lists: lists
        })
        console.log(lists)
        that.hb()
      });
    })

    console.log("测试", this.data.lists)
    setTimeout(function() {
      wx.hideLoading()
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.UserInfo = wx.getStorageSync("UserInfo");
    var party_id = {
      party_id: this.UserInfo.PARTYID
    }
    that.setData({
      STATUS_ID: options.STATUS_ID
    })
    JLTools.invoke("shop.order.getOrderNum", party_id, res => {
      console.log("获取订单数量", res)
      res.qb = res.DDYC + res.DFK + res.DPJ + res.YFH + res.YFK + res.YPJ + res.YQX + res.YWC
      that.setData({
        dd: res
      })
    });
    that.getdata(that.data.index, that.data.STATUS_ID)
  },
  //详情订单页面
  order: function(res) {
    console.log(res)
    JLTools.immediatePayment = this.data.lists
    wx.navigateTo({
      url: './CustomerOrderMain?id=' + res.currentTarget.id
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
  onHide: function() {},

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})