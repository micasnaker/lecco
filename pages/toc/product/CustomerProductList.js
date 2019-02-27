const JLTools = require("../../util/JLTools.js")
var scrollTop = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screen: '',
    name: "", //输入框的内容
    sort: true, //控制排序的小图标
    xuan: 0, //选中的项目
    scroll: true, //微信小程序监听页面滚动
    hide_list: 'showlist', //控制上导航条的显示与隐藏
    price: "asc", //价格下
    saleNum: "asc", //销量下
    product_list: [],
    page_config: {
      page_size: 5,
      page_num: 1,
      islast: false //false代表没有到底，false代表到底了
    }
  },
  //
  screen: function() {
    wx.navigateTo({
      url: './CustomerScreen',
    })
  },
  //往输入框里面再次输入内容
  calc: function(res) {
    console.log(res)
    this.setData({
      name: res.detail.value
    })
  },
  //再次搜索商品的时候函数
  search: function() {
    this.setData({
      product_list: [],
      page_config: {
        page_size: 5,
        page_num: 1,
        islast: false //false代表没有到底，false代表到底了
      }
    })
    var options = {
      name: this.data.name
    }
    this.onLoad(options)
    this.loading()
  },
  //点击商品时候的点击函数
  main: function(res) {
    console.log(res)
    var product_list = this.data.product_list
    var index = res.currentTarget.id
    wx.navigateTo({
      url: '/pages/toc/product/CustomerProductMain?product_id=' + product_list[index].PRODUCT_ID + "&store_id=" + product_list[index].STORE_ID
    })
  },
  //弹窗加载动画
  loading: function() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    console.log('zhixinl', that.data.page_config)
    this.setData({
      name: options.name
    })
    if (this.data.page_config.page_num == 1) {
      this.setData({
        product_list: []
      });
    }
    JLTools.beanQuery({
      query_bean: "shop.common.product.QueryStoreProduct",
      query_data: {
        "sort": {
          "price": that.data.price,
          "saleNum": that.data.saleNum
        },
        "condition": options.name,
        "PRODUCT_CATEGORY_ID": that.data.screen
      },
      page_size: that.data.page_config.page_size,
      page_num: that.data.page_config.page_num
    }, res => {
      console.log("获取列表数据", res)
      let arr = [];
      let product_list = res.data;
      for (let product of product_list) {
        arr.push({
          'JD_PRODUCT_ID': product.JD_PRODUCT_ID,
          'PARTY_ID': product.PARTY_ID,
          'STORE_ID': product.STORE_ID,
          'PRODUCT_ID': product.PRODUCT_ID,
          'STORE_EXTID': product.STORE_EXTID,
          'STORE_TYPE_ENUM_ID': product.STORE_TYPE_ENUM_ID,
          'PSEUDO_ID': product.PSEUDO_ID
        })
      }

      JLTools.invoke("shop.toc.product.getBatchProductPrice", {
        list: arr
      }, res => {
        console.log('获取到的商品准确信息', res)
        for (let product of product_list) {
          for (let row of res.list) {
            if (row.PRODUCT_ID == product.PRODUCT_ID &&
              row.STORE_ID == product.STORE_ID) {
              Object.assign(product, row);
            }
          }
        }
        that.setData({
          product_list: that.data.product_list.concat(product_list)
        });
        console.log(product_list.length, that.data.page_config.page_size)
        if (product_list.length < that.data.page_config.page_size) {
          that.setData({
            'page_config.islast': true
          })
        }
        wx.hideLoading()
      });
    });

  },
  //点击上列表时候的排序
  sort: function(res) {
    var that = this
    console.log(res)
    this.setData({
      sort: !this.data.sort,
      xuan: res.currentTarget.id,
      product_list: []
    })
    if (that.data.xuan == '0') {
      that.setData({
        price: that.data.sort ? 'asc' : 'desc',
        saleNum: that.data.sort ? 'asc' : 'desc',
      })
    } else if (that.data.xuan == '1') {
      that.setData({
        price: '',
        saleNum: that.data.sort ? 'asc' : 'desc',
      })
    } else if (that.data.xuan == '2') {
      that.setData({
        price: that.data.sort ? 'asc' : 'desc',
        saleNum: '',
      })
    }
    var options = {
      name: that.data.name
    }
    this.onLoad(options)
    this.loading()
  },
  home: function() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
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
    if (JLTools.screen == "bm") {
      return;
    }
    console.log("nidaodishishenm", JLTools.screen)
    this.setData({
      screen: JLTools.screen
    })
    var options = {
      name: this.data.name
    }
    this.onLoad(options);
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
    JLTools.screen = "bm"
    JLTools.Levescreen = null
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    console.log(that.data.page_config)
    var page_num = that.data.page_config.page_num
    if (!that.data.page_config.islast) {
      that.setData({
        'page_config.page_num': ++page_num
      })
      var options = {
        name: that.data.name
      }
      this.onLoad(options);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})