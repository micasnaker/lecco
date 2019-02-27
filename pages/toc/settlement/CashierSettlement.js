const JLTools = require("../../util/JLTools.js")
Page({
  UserInfo: {},
  /**
   * 页面的初始数据
   */
  data: {
    cart_commodity: [],
    MESSAGE: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.UserInfo = wx.getStorageSync("UserInfo");
    var that = this
    console.log(this.UserInfo)
    
    if (options.id!=undefined){   //从别地进来的
      var immediatePayment = JLTools.immediatePayment[options.id]
      var MESSAGE={
        GRAND_TOTAL: immediatePayment.order[0].PART_TOTAL,
        ORDER_ID: immediatePayment.ORDER_PART_SEQ_ID,
      }
      that.setData({
        immediatePayment:immediatePayment,
        MESSAGE: MESSAGE
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
      return;
    }
    var message = JLTools.message.data
    var address = JLTools.address
    var cart_commodity = JLTools.cart_commodity
    var prices = JLTools.prices
    console.log(message, address, cart_commodity, prices)
    var ADDRESS = {
      "id": message[address].ID,
      "userName": message[address].NAME,
      "tel": message[address].MOBILE,
      "addressDetails": message[address].ADDRESS,
      "NAME": message[address].NAME,
      "MOBILE": message[address].MOBILE,
      "STUATS": null,
      "ID": message[address].ID,
      "STATE_CODE": message[address].STATE_CODE,
      "CITY_CODE": message[address].CITY_CODE,
      "DISTRICT_CODE": message[address].DISTRICT_CODE,
      "STATE": message[address].STATE,
      "CITY": message[address].CITY,
      "DISTRICT": message[address].DISTRICT,
      "ADDRESS": message[address].ADDRESS,
      "GBCODE": null
    }
    var data = {
      "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID,
      "ORDER_PART": []
    }
    if (cart_commodity[0].sfz) {
      for (let i = 0, len = cart_commodity.length; i < len; i++) {
        data.ORDER_PART.push({
          "ORDER_ITEM": [],
          "DELIVERY_ENUM_ID": "SEND",
          "ADDRESS": ADDRESS,
          "INVOICE": null,
          "LOGISTICS_MONEY": 0,
          "DISCOUNT_MONEY": 0,
          "COUPON_MONEY": 0,
          "ID_CARD": cart_commodity[0].sfz,
          "VENDER_PARTY_ID": cart_commodity[0].productList[0].VENDER_PARTY_ID,
          "STORE_ID": cart_commodity[0].STORE_ID
        })
      }
    } else {
      for (let i = 0, len = cart_commodity.length; i < len; i++) {
        data.ORDER_PART.push({
          "ORDER_ITEM": [],
          "DELIVERY_ENUM_ID": "SEND",
          "ADDRESS": ADDRESS,
          "INVOICE": null,
          "LOGISTICS_MONEY": 0,
          "DISCOUNT_MONEY": 0,
          "COUPON_MONEY": 0,
          "VENDER_PARTY_ID": cart_commodity[0].productList[0].VENDER_PARTY_ID,
          "STORE_ID": cart_commodity[0].STORE_ID
        })
      }
    }
    for (let i = 0, len = cart_commodity.length; i < len; i++) {
      for (let j = 0, leng = cart_commodity[i].productList.length; j < leng; j++) {
        data.ORDER_PART[i].ORDER_ITEM.push({
          PRODUCT_ID: cart_commodity[i].productList[j].PRODUCT_ID,
          LOGISTICS: cart_commodity[i].productList[j].LOGISTICS,
          QUANTITY: cart_commodity[i].productList[j].QUANTITY,
          AMOUNT_UOM_ID: "个",
          PRODUCT_CART_ID: cart_commodity[i].productList[j].PRODUCT_CART_ID,
          PRICE: cart_commodity[i].productList[j].PRICE,
          STORE_ID: cart_commodity[i].productList[j].STORE_ID,
          WAREHOUSE: message[address].ID
        })
      }
    }
    for (let i = 0, len = cart_commodity.length; i < len; i++) {
      if (cart_commodity[i].KD_PRICE) {
        data.ORDER_PART[i].ORDER_ITEM.push({
          "PRODUCT_ID": cart_commodity[i].PRODUCT_ID,
          "STORE_ID": cart_commodity[i].STORE_ID,
          "LOGISTICS": "1",
          "PRODUCT_NAME": "运费(勿动)",
          "QUANTITY": "1",
          "AMOUNT_UOM_ID": "个",
          "PRICE": cart_commodity[i].KD_PRICE
        })
      }
      if (JLTools.invoice){
        data.ORDER_PART[i].INVOICE = JLTools.invoice
      }
      data.ORDER_PART[i].REMARK = options.remark
    }
    console.log('最终数据：', data)
    JLTools.invoke("shop.toc.order.createOrder", data, res => {
      console.log(res)
      //此页面最后一次安全保障
      if (res.GRAND_TOTAL != JLTools.prices) {
        wx.reLaunch({
          url: '../cart/CustomerCart'
        })
      }
      that.setData({
        MESSAGE: res
      })
      setTimeout(function() {
        wx.hideLoading()
      }, 1000)
    })


  },
  payment: function() {
    console.log("字符付款")
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