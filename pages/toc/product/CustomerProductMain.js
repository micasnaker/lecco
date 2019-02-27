const JLTools = require("../../util/JLTools.js")
Page({
  UserInfor: {},
  /**
   * 页面的初始数据
   */
  data: {
    //评论
    comment: [],
    //弹窗的显示与隐藏
    hidePopup: true,
    //选择的数量
    sl: 1,
    follow: false,
    imgUrls: [],
    transparency: 0,
    xuan: 0,
    commodity: [],
    ProductPrice: '', //准确的价格和库存
    id: "", //判断选择的购买商品还是加入购物车
    text: 0 //购车商品总数 
  },
  //立即购买
  // ImmediatePurchase: function(res) {
  //   var that = this
  //   if (!this.UserInfo) {
  //     wx.navigateTo({
  //       url: '../login/CustomerLogin',
  //     })
  //     return;
  //   }
  //   that.setData({
  //     hidePopup: false,
  //     id: res.currentTarget.id
  //   })
  //   JLTools.invoke("shop.toc.product.getBatchProductPrice", {
  //     "list": [{
  //       "PRODUCT_ID": that.data.commodity.PRODUCT_ID,
  //       "STORE_ID": that.data.commodity.STORE_ID,
  //       "PSEUDO_ID": that.data.commodity.PSEUDO_ID,
  //       "PARTY_ID": that.data.commodity.PARTY_ID
  //     }],
  //     "addressCode": null,
  //     "outSideCode": null
  //   }, res => {
  //     console.info("333333333333", res)
  //     that.setData({
  //       ProductPrice: res.list[0]
  //     })
  //   });
  // },
  //隐藏模板
  hiddenTemplate: function() {
    this.setData({
      hidePopup: true
    })
  },
  //点击确定
  black: function() {
    var that = this
    var sl = that.data.sl
    var commodity = that.data.commodity
    if (sl > that.data.ProductPrice.STOCK_NUM ) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '库存不足了',
      })
      return;
    }
    var data = {
      "PRODUCT_ID": commodity.PRODUCT_ID,
      "STORE_ID": commodity.STORE_ID,
      "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID,
      "QUANTITYLB": sl,
      "CHECK_MARK": "10",
      "VENDER_PARTY_ID": commodity.PARTY_ID,
      "CHANNEL_TYPE": null
    }
    if (that.data.id == "1") {
      JLTools.invoke("csm.cart.updatecartcheckmark.update", data, res => {
        JLTools.invoke("csm.cart.insertProductCart.insert", data, res => {
          console.info("增加或者删减成功", res)
          wx.navigateTo({
            url: '/pages/toc/settlement/CustomerSettlement'
          })
        });
      });
    } else if (that.data.id == "0") {
      JLTools.invoke("csm.cart.insertProductCart.insert", data, res => {
        console.info("增加或者删减成功", res)
        wx.reLaunch({
          url: '/pages/toc/cart/CustomerCart'
        })
      });
    }

  },
  //增加或者删减商品
  cut_plus(res) {
    var that = this
    console.log(res)
    var sl = that.data.sl
    var ProductPrice = that.data.ProductPrice
    if (sl >= ProductPrice.STOCK_NUM) {
      if (res.currentTarget.id == "0") {
        if (sl == 1) {
          return;
        } else {
          that.setData({
            sl: --sl
          })
        }
      }
      return;
    }
    if (res.currentTarget.id == "0") {
      if (sl == 1) {
        return;
      } else {
        that.setData({
          sl: --sl
        })
      }
    } else if (res.currentTarget.id == "1") {
      that.setData({
        sl: ++sl
      })
    }
  },

  //关注商品按钮
  follow: function() {
    var that = this
    if (!this.UserInfo) {
      wx.navigateTo({
        url: '../login/CustomerLogin',
      })
      return;
    }
    JLTools.invoke("csm.collect.insertCOLLECT", {
      "ENUM_ID": "20",
      "QUANTITY": "1",
      "VENDER_PARTY_ID": that.data.commodity.PARTY_ID,
      "CUSTOMER_PARTY_ID": that.UserInfo.PARTYID,
      "STORE_ID": that.data.commodity.STORE_ID,
      "PRODUCT_ID": that.data.commodity.PRODUCT_ID,
      "isCollect": !that.data.follow
    }, res => {
      console.log('关注或者取消商品', res)
      that.setData({
        follow: !that.data.follow
      })
    });
  },
  //加入购物车   //立即购买
  joincart: function(res) {
    var that = this
    if (!this.UserInfo) {
      wx.navigateTo({
        url: '../login/CustomerLogin',
      })
      return;
    }
    if (that.data.ProductPrice.STOCK_NUM == null) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '库存不足了',
      })
      return;
    }
    that.setData({
      hidePopup: false,
      id: res.currentTarget.id
    })
    JLTools.invoke("shop.toc.product.getBatchProductPrice", {
      "list": [{
        "PRODUCT_ID": that.data.commodity.PRODUCT_ID,
        "STORE_ID": that.data.commodity.STORE_ID,
        "PSEUDO_ID": that.data.commodity.PSEUDO_ID,
        "PARTY_ID": that.data.commodity.PARTY_ID
      }],
      "addressCode": null,
      "outSideCode": null
    }, res => {
      console.info("333333333333", res)
      that.setData({
        ProductPrice: res.list[0]
      })
    });

  },
  onPageScroll: function(e) {
    this.setData({
      transparency: e.scrollTop / 250,
      xuan: e.scrollTop > 450 ? 1 : 0
    })

  },
  scroll: function(res) {

    if (res.currentTarget.id == 1) {
      wx.pageScrollTo({
        scrollTop: 460
      })

    } else {
      console.log(res)
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  gohome: function() {
    wx.reLaunch({
      url: '/pages/toc/home/CustomerHome'
    })
  },
  gocart: function() {
    wx.reLaunch({
      url: '/pages/toc/cart/CustomerCart'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.UserInfo = wx.getStorageSync("UserInfo");
    console.log('传的什么啊', options)
    if (this.UserInfo) {
      //获取购物车里面的数量
      JLTools.invoke("csm.yswc.selectcartsum.query", {
        "PARTYID": this.UserInfo.PARTYID,
        "CHANNEL_TYPE": null
      }, res => {
        var text = JSON.parse(res.MESSAGE)
        that.setData({
          text: text.data.CART_SUM
        })
      })
    }
    //获取商品详情 
    JLTools.invoke("shop.product.getProductDetail", {
      "PRODUCT_ID": options.product_id,
      "STORE_ID": options.store_id
    }, res => {
      console.log('11111', res)
      that.setData({
        commodity: res,
        'imgUrls[0]': res.PRODUCT_IMG
      })
    })
    //获取商品评论

    JLTools.beanQuery({
      query_bean: "shop.common.review.Queryreview",
      query_data: {
        "PRODUCT_ID": options.product_id,
      },
    }, res => {
      console.log('评价', res)
      var arrs = []
      for (let i = 0, len = res.data.length; i < len; i++) {
        if (res.data[i].PRODUCT_REVIEW_IMG != null) {
          var line = res.data[i].PRODUCT_REVIEW_IMG
          arrs = line.split(",")
        }
        res.data[i].arrs = arrs
        arrs = []
      }
      that.setData({
        comment: res.data
      })
    })


    //评论老接口
    // JLTools.invoke("csm.order.product_review.select", {
    //   "PRODUCT_ID": options.product_id,
    // }, et => {
    //   console.log(options.product_id, )
    //   console.log(et)
    //   var obj = JSON.parse(et.MESSAGE);
    //   console.log(obj)
    //   var arrs = []
    //   for (let i = 0, len = obj.data.length; i < len; i++) {
    //     if (obj.data[i].PRODUCT_REVIEW_IMG != null) {
    //       var line = obj.data[i].PRODUCT_REVIEW_IMG
    //       arrs = line.split(",")
    //     }
    //     obj.data[i].arrs = arrs
    //     arrs = []
    //   }
    //   that.setData({
    //     comment: obj.data
    //   })
    // })


    //获取该商品是否有被关注
    if (this.UserInfo) {
      JLTools.invoke("csm.collect.selectProductCollect", {
        "store_id": options.store_id,
        "product_id": options.product_id,
        "customer_party_id": this.UserInfo.PARTYID,
      }, res => {
        console.log(res)
        var text = JSON.parse(res.MESSAGE)
        that.setData({
          follow: text.num
        })
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