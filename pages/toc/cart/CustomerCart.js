// pages/tob/cart/DistributorCart.js
const JLTools = require("../../util/JLTools.js")
Page({
  UserInfo: {},
  list: [],
  /**
   * 页面的初始数据11
   */
  data: {
    qxuan: false, //全选变量
    hide: false, //删除和结算按钮的显示与隐藏
    cart_commodity: [], //所有商品列表
    delete_list: [], //要删除的商品id
    prices: 0, //总价格
  },
  //初始化数据
  // empty: function() {
  //   this.setData({
  //     delete_list: [], //要删除的商品id
  //     prices: 0, //总价格
  //   })
  // },
  //计算总金额和收集要删除的PRODUCT_CART_ID
  CalculatePrice: function() {
    console.log("zhixinl")
    var that = this
    var cart_commodity = that.data.cart_commodity
    var delete_list = []
    var prices = 0
    var MediumLength = 0 //总长度
    for (let i = 0, len = cart_commodity.length; i < len; i++) {
      MediumLength += cart_commodity[i].productList.length
      for (let j = 0, leng = cart_commodity[i].productList.length; j < leng; j++) {
        if (cart_commodity[i].productList[j].CHECK_MARK == 10) {
          MediumLength--
          prices = JLTools.Add(prices, JLTools.Mul(cart_commodity[i].productList[j].PRICE, cart_commodity[i].productList[j].QUANTITY))
          delete_list.push({
            PRODUCT_CART_ID: cart_commodity[i].productList[j].PRODUCT_CART_ID
          })
        }
      }
    }
    that.setData({
      prices: prices,
      delete_list: delete_list,
      qxuan: !MediumLength
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1000)
  },
  //点击单个按钮时执行的事件
  radio_product: function(res) {
    console.log(res)
    var that = this
    var cart_commodity = that.data.cart_commodity
    var store_index = res.currentTarget.dataset.store_index
    var product_index = res.currentTarget.dataset.product_index
    if (!cart_commodity[store_index].productList[product_index].STOCK_NUM) {
      wx.showModal({
        title: '提示',
        content: '库存不足',
        showCancel:false,
      })
      return;
    }
    var CHECK_MARK = cart_commodity[store_index].productList[product_index].CHECK_MARK == 10 ? 20 : 10
    JLTools.invoke("csm.cart.insertProductCart.insert", {
      "STORE_ID": cart_commodity[store_index].STORE_ID,
      "PRODUCT_CART_ID": cart_commodity[store_index].productList[product_index].PRODUCT_CART_ID,
      "PRODUCT_ID": cart_commodity[store_index].productList[product_index].PRODUCT_ID,
      "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID,
      "QUANTITY": cart_commodity[store_index].productList[product_index].QUANTITY,
      "CHECK_MARK": CHECK_MARK
    }, res => {
      console.log(res)
      that.onShow()
    });
  },
  //点击全选按钮的触发事件 
  asynchronous: function(i, j, CHECK_MARK) {
    var that = this
    JLTools.invoke("csm.cart.insertProductCart.insert", {
      "STORE_ID": that.data.cart_commodity[i].productList[j].STORE_ID,
      "PRODUCT_CART_ID": that.data.cart_commodity[i].productList[j].PRODUCT_CART_ID,
      "PRODUCT_ID": that.data.cart_commodity[i].productList[j].PRODUCT_ID,
      "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID,
      "QUANTITY": that.data.cart_commodity[i].productList[j].QUANTITY,
      "CHECK_MARK": CHECK_MARK
    }, e => {});
  },
  qxuan: function() {
    var that = this
    this.setData({
      qxuan: !this.data.qxuan
    })
    var CHECK_MARK = this.data.qxuan ? 10 : 20
    var cart_commodity = that.data.cart_commodity
    var list = []
    for (var i = 0, len = cart_commodity.length; i < len; i++) {
      for (var j = 0, lengt = cart_commodity[i].productList.length; j < lengt; j++) {
        that.asynchronous(i, j, CHECK_MARK)
        console.log(i, j)
      }
    }
    that.onShow()


    // var prices = 0
    // var delete_list = []
    // if (this.data.qxuan) {
    //   for (let i = 0, len = cart_commodity.length; i < len; i++) {
    //     for (let j = 0, leng = cart_commodity[i].productList.length; j < leng; j++) {
    //       cart_commodity[i].productList[j].xuan = "xuan"
    //       prices = that.Add(prices, cart_commodity[i].productList[j].PRICE * cart_commodity[i].productList[j].QUANTITY)
    //       delete_list.push({
    //         PRODUCT_CART_ID: cart_commodity[i].productList[j].PRODUCT_CART_ID
    //       })
    //     }
    //   }
    // } else {
    //   for (let i = 0, len = cart_commodity.length; i < len; i++) {
    //     for (let j = 0, leng = cart_commodity[i].productList.length; j < leng; j++) {
    //       cart_commodity[i].productList[j].xuan = ""
    //     }
    //   }
    // }
    // that.setData({
    //   delete_list: delete_list,
    //   cart_commodity: cart_commodity,
    //   prices: prices
    // })
    // console.log(delete_list)
  },
  //点击编辑商品的触发事件
  dex_edit: function() {
    this.setData({
      hide: !this.data.hide
    })
  },
  //点击结算按钮或者删除按钮的触发事件
  js: function(res) {
    var that = this
    if (that.data.prices == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择商品',
      })
      return;
    }
    console.log(that.data.delete_list)
    if (res.currentTarget.id == "1") {
      JLTools.invoke("shop.cart.verifivation", {
        "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID
      }, res => {
        console.log("新加的接口数据", res)
        if (res.MSGID == "E") {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '海外购商品请与其他商品分开付款',
          })
          return;
        } else if (res.MSGID == "S") {
          wx.navigateTo({
            url: '../settlement/CustomerSettlement',
          })
        }
      })

    } else if (res.currentTarget.id == "0") {
      JLTools.invoke("csm.cart.deleteProductCart.delete", that.data.delete_list, res => {
        console.log(res)
        that.onShow()
      });
    }

  },
  //点击增加删减数量按钮
  cut_plus(res) {
    console.log(res)
    var that = this
    var cart_commodity = that.data.cart_commodity
    var store_index = res.currentTarget.dataset.store_index
    var product_index = res.currentTarget.dataset.product_index
    var QUANTITY = cart_commodity[store_index].productList[product_index].QUANTITY
    var STOCK_NUM = cart_commodity[store_index].productList[product_index].STOCK_NUM
    if (res.currentTarget.id == "1") {
      QUANTITY++
    } else if (res.currentTarget.id == "0") {
      QUANTITY--
    } else if (res.currentTarget.id == "2") {
      QUANTITY = res.detail.value
    }
    if (QUANTITY <= 0 || QUANTITY > STOCK_NUM) {
      that.setData({
        cart_commodity: cart_commodity
      })
      return;
    }
    JLTools.invoke("csm.cart.insertProductCart.insert", {
      "STORE_ID": cart_commodity[store_index].STORE_ID,
      "PRODUCT_CART_ID": cart_commodity[store_index].productList[product_index].PRODUCT_CART_ID,
      "PRODUCT_ID": cart_commodity[store_index].productList[product_index].PRODUCT_ID,
      "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID,
      "QUANTITY": QUANTITY,
      "CHECK_MARK": cart_commodity[store_index].productList[product_index].CHECK_MARK
    }, res => {
      console.log(res)
      that.onShow()
    });
  },
  /**
   * 生命周期函数--监听页面加载e
   */
  onLoad: function(options) {
    this.UserInfo = wx.getStorageSync("UserInfo");
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    // that.empty()
    JLTools.invoke("shop.cart.query", {
      CUSTOMER_PARTY_ID: this.UserInfo.PARTYID
    }, res => {
      console.log("购物车里面的原始数据", res)
      var cart_commodity = res
      var arr = []
      for (let i = 0, len = cart_commodity.length; i < len; i++) {
        for (let j = 0, leng = cart_commodity[i].productList.length; j < leng; j++) {
          arr.push({
            'JD_PRODUCT_ID': cart_commodity[i].productList[j].JD_PRODUCT_ID,
            'PARTY_ID': cart_commodity[i].productList[j].PARTY_ID,
            'STORE_ID': cart_commodity[i].productList[j].STORE_ID,
            'PRODUCT_ID': cart_commodity[i].productList[j].PRODUCT_ID,
            'STORE_EXTID': cart_commodity[i].productList[j].STORE_EXTID,
            'STORE_TYPE_ENUM_ID': cart_commodity[i].productList[j].STORE_TYPE_ENUM_ID,
            'PSEUDO_ID': cart_commodity[i].productList[j].PSEUDO_ID
          })
        }
      }
      console.log(this.data.cart_commodity)
      JLTools.invoke("shop.toc.product.getBatchProductPrice", {
        list: arr
      }, res => {
        console.log("准确数据", res)
        var text = 0
        for (let i = 0, len = cart_commodity.length; i < len; i++) {
          for (let j = 0, leng = cart_commodity[i].productList.length; j < leng; j++, text++) {
            for (let k = 0, lengt = res.list.length; k < lengt; k++) {
              if (res.list[k].PRODUCT_ID == cart_commodity[i].productList[j].PRODUCT_ID) {
                cart_commodity[i].productList[j].PRICE = res.list[k].PRICE
                cart_commodity[i].productList[j].STOCK_NUM = res.list[k].STOCK_NUM
                console.log(res.list[k].STOCK_NUM)
              }
            }

          }
        }
        wx.setTabBarBadge({
          index: 2,
          text: text + ""
        })
        that.setData({
          cart_commodity: cart_commodity
        })
        console.log(cart_commodity)
        that.CalculatePrice()
      });
    });


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