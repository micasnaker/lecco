const JLTools = require("../../util/JLTools.js")
Page({
  UserInfor: {},
  /**
   * 页面的初始数据
   */
  data: {
    //海外购身份输入框显示与隐藏
    hwg: true,
    //海外购身份证
    sfz: "",
    cart_commodity: [],
    prices: 0,
    //收货地址的显示与隐藏
    ReceivingAddress: false,
    address: "", //收货地址
    invoice: "不开发票", //发票名称
    remark: ""
  },
  //留言
  remark: function(res) {
    console.log(res)
    this.setData({
      remark: res.detail.value
    })
  },
  //发票
  invoice: function() {
    wx.navigateTo({
      url: './CustomerInvoice',
    })
  },
  //输入身份证号码
  sfz: function(res) {
    this.setData({
      'cart_commodity[0].sfz': res.detail.value,
      sfz: res.detail.value,
    })
  },
  //提交订单页面
  placeOrder: function() {
    var that = this
    if (that.data.address != "") {
      if (that.data.hwg || that.data.sfz.length == 18) {
        JLTools.cart_commodity = that.data.cart_commodity
        JLTools.prices = that.data.prices
        wx.redirectTo({
          url: './CashierSettlement?remark=' + that.data.remark,
        })
      } else {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请输入正确的身份证号',
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择收货地址',
      })
    }

  },
  //计算总金额和收集要删除的PRODUCT_CART_ID
  CalculatePrice: function() {
    var that = this
    var cart_commodity = that.data.cart_commodity
    var prices = 0
    for (let i = 0, len = cart_commodity.length; i < len; i++) {
      var Subtotal = 0
      for (let j = 0, leng = cart_commodity[i].productList.length; j < leng; j++) {
        if (cart_commodity[i].productList[j].CHECK_MARK == 10) {
          console.log(Subtotal, cart_commodity[i].productList[j].PRICE, cart_commodity[i].productList[j].QUANTITY)
          Subtotal = JLTools.Add(Subtotal, JLTools.Mul(cart_commodity[i].productList[j].PRICE, cart_commodity[i].productList[j].QUANTITY))
        }
      }
      if (cart_commodity[i].KD_PRICE){
        if (Subtotal >= cart_commodity[i].MYFJE) {
          cart_commodity[i].KD_PRICE = 0
        }
        Subtotal += cart_commodity[i].KD_PRICE
      }
      cart_commodity[i].Subtotal = Subtotal
      prices += Subtotal
    }
    that.setData({
      prices: prices,
      cart_commodity: cart_commodity
    })
    console.log(that.data.cart_commodity)
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
    console.log(this.UserInfo)
    wx.showLoading({
      title: '加载中',
    })
    JLTools.invoke("shop.cart.query", {
      "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID,
      "CHECK_MARK": 10
    }, res => {
      var cart_commodity = res
      var arr = []
      console.log('已经选择的商品', res)

      // {
      //   "list": [{
      //     "JD_PRODUCT_ID": null,
      //     "PARTY_ID": "00000952",
      //     "STORE_ID": "00000703",
      //     "PRODUCT_ID": "03400940",
      //     "QUANTITY": 4,
      //     "STORE_TYPE_ENUM_ID": "dealer",
      //     "PSEUDO_ID": "572_1265",
      //     "XSSL": 4,
      //     "SPXX02": "572_1265"
      //   }],
      //   "EXTID": null
      // }


      //组装价格详情数据要用的数据arr
      for (let i = 0, len = cart_commodity.length; i < len; i++) {
        for (let j = 0, leng = cart_commodity[i].productList.length; j < leng; j++) {
          arr.push({
            'JD_PRODUCT_ID': cart_commodity[i].productList[j].JD_PRODUCT_ID,
            'PARTY_ID': cart_commodity[i].productList[j].PARTY_ID,
            'STORE_ID': cart_commodity[i].productList[j].STORE_ID,
            'PRODUCT_ID': cart_commodity[i].productList[j].PRODUCT_ID,
            'STORE_EXTID': cart_commodity[i].productList[j].STORE_EXTID,
            'STORE_TYPE_ENUM_ID': cart_commodity[i].productList[j].STORE_TYPE_ENUM_ID,
            'PSEUDO_ID': cart_commodity[i].productList[j].PSEUDO_ID,
            "QUANTITY": cart_commodity[i].productList[j].QUANTITY,
          })
        }
      }
      console.log(arr)
      JLTools.invoke("shop.toc.product.getBatchProductPrice", {
        list: arr
      }, res => {
        //将价格详情数据和原始数据进行合并
        console.log("准确的数据", res)
        for (let i = 0, len = cart_commodity.length; i < len; i++) {
          for (let j = 0, leng = cart_commodity[i].productList.length; j < leng; j++) {
            for (let k = 0, lengt = res.list.length; k < lengt; k++) {
              if (res.list[k].PSEUDO_ID == cart_commodity[i].productList[j].PSEUDO_ID) {
                cart_commodity[i].productList[j].PRICE = res.list[k].PRICE
                cart_commodity[i].productList[j].SALE_NUM = res.list[k].SALE_NUM
              }
            }
          }
        }

        //组装要获取邮费的数据ar
        var ar = []
        for (let i = 0, len = res.list.length; i < len; i++) {
          ar.push({
            "PARTY_ID": res.list[i].PARTY_ID,
            "STORE_ID": res.list[i].STORE_ID,
            "PRODUCT_LIST": [{
              "JD_PRODUCT_ID": res.list[i].JD_PRODUCT_ID || null,
              "PSEUDO_ID": res.list[i].PSEUDO_ID,
              "PRODUCT_ID": res.list[i].PRODUCT_ID,
              "NUM": 4,
              "PRICE": res.list[i].PRICE,
            }]
          })
        }
        console.log(ar)
        JLTools.invoke("shop.order.getFreight", {
          list: ar
        }, res => {
          console.log("获取的快递价格", res)
          //将商品详情和快递费用合并
          //MYJE 是指满多少包邮
          //KD_PRICE是指不包邮时候的邮费
          if (res.MSGID == "E") {
            debugger //运费没有

            // {
            //   "list": [{
            //     "PARTY_ID": "00000952",
            //     "STORE_ID": "00000703",
            //     "PRODUCT_LIST": [{
            //       "PRODUCT_ID": "03400940",
            //       "JD_PRODUCT_ID": "",
            //       "PSEUDO_ID": "572_1265",
            //       "NUM": 4,
            //       "PRICE": 0.01
            //     }]
            //   }]
            // }


          } else {
            for (let i = 0, len = cart_commodity.length; i < len; i++) {
              for (let k = 0, lengt = res.list.length; k < lengt; k++) {
                if (res.list[k].PARTY_ID == cart_commodity[i].PARTY_ID) {
                  cart_commodity[i].MYFJE = res.list[k].MYFJE
                  cart_commodity[i].KD_PRICE = res.list[k].PRICE
                  cart_commodity[i].PRODUCT_ID = res.list[k].PRODUCT_ID
                }
              }
            }
          }

          that.setData({
            cart_commodity: cart_commodity
          })
          console.log("aa", cart_commodity)
          if (cart_commodity[0].PARTY_ID == "00000952") {
            that.setData({
              hwg: false
            })
          }
          that.CalculatePrice()
        })
      })
    });
  },
  address: function() {
    var that = this
    console.log(JLTools.message)
    if (that.data.disabled) {

    } else {
      wx.navigateTo({
        url: '../address/CustomerAddressList',
      })
    }


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
    //that.data:
    var that = this
    console.log('选择的地址', JLTools.address)
    if (JLTools.address) {
      var address = JLTools.message.data[JLTools.address]
      that.setData({
        address: address,
        ReceivingAddress: true,
      })
    }
    if (JLTools.invoice) {
      if (JLTools.invoice.invoice_type_enum == 30) {
        that.setData({
          invoice: '专用发票-' + JLTools.invoice.invoice_company_name
        })
      } else if (JLTools.invoice.invoice_type_enum == 10) {
        that.setData({
          invoice: '普通发票-' + JLTools.invoice.invoice_company_name
        })
      }
    }
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

  },
})