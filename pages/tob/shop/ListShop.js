var scrollTop = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      imageurl: "http://121.41.79.182:8090/fs/fs05/attachments/2018-10-15/K128/deef7d36711f7f08d400e4c5004304cd",
      name: "40R6亮香槟 画质好、高度清晰、大耳朵电视，双十一大促销大耳朵电视，双十一大促销",
      stock: "200", //库存
      select: "0", //选中
      sold: "100", //已售
      moneyInteger: "99999", //价格整数部分
      moneydecimal: "88", //价钱小数部分
      profit: "200", //运营收益
      notes: "优惠商品，预计3-5天内发货", //注释
      storeName: "暴风TV官方自营", //店名
    }, {
      imageurl: "http://121.41.79.182:8090/fs/fs05/attachments/2018-10-30/K512/a0273ee0b23ef3310b74da11ff24f19a",
      name: "40R6亮香槟 画质好、高度清晰、大耳朵电视，双十一大促销大耳朵电视，双十一大促销",
      stock: "200", //库存
      select: "0", //选中
      sold: "100", //已售
      moneyInteger: "99999", //价格整数部分
      moneydecimal: "88", //价钱小数部分
      profit: "200", //运营收益
      notes: "优惠商品，预计3-5天内发货", //注释
      storeName: "暴风TV官方自营", //店名
    }, {
      imageurl: "http://121.41.79.182:8090/fs/fs05/attachments/2018-10-15/K128/deef7d36711f7f08d400e4c5004304cd",
      name: "40R6亮香槟 画质好、高度清晰、大耳朵电视，双十一大促销大耳朵电视，双十一大促销",
      stock: "200", //库存
      select: "0", //选中
      sold: "100", //已售
      moneyInteger: "99999", //价格整数部分
      moneydecimal: "88", //价钱小数部分
      profit: "200", //运营收益
      notes: "优惠商品，预计3-5天内发货", //注释
      storeName: "暴风TV官方自营", //店名
    }, {
      imageurl: "http://121.41.79.182:8090/fs/fs05/attachments/2018-10-17/K032/e8a91dae064913f35ae77bca50503ffb",
      name: "40R6亮香槟 画质好、高度清晰、大耳朵电视，双十一大促销大耳朵电视，双十一大促销",
      stock: "200", //库存
      select: "0", //选中
      sold: "100", //已售
      moneyInteger: "99999", //价格整数部分
      moneydecimal: "88", //价钱小数部分
      profit: "200", //运营收益
      notes: "优惠商品，预计3-5天内发货", //注释
      storeName: "暴风TV官方自营", //店名
    }, {
      imageurl: "http://121.41.79.182:8090/fs/fs05/attachments/2018-10-17/K032/e8a91dae064913f35ae77bca50503ffb",
      name: "40R6亮香槟 画质好、高度清晰、大耳朵电视，双十一大促销大耳朵电视，双十一大促销",
      stock: "200", //库存
      select: "0", //选中
      sold: "100", //已售
      moneyInteger: "99999", //价格整数部分
      moneydecimal: "88", //价钱小数部分
      profit: "200", //运营收益
      notes: "优惠商品，预计3-5天内发货", //注释
      storeName: "暴风TV官方自营", //店名
    }, {
      imageurl: "http://121.41.79.182:8090/fs/fs05/attachments/2018-10-17/K032/e8a91dae064913f35ae77bca50503ffb",
      name: "40R6亮香槟 画质好、高度清晰、大耳朵电视，双十一大促销大耳朵电视，双十一大促销",
      stock: "200", //库存
      select: "0", //选中
      sold: "100", //已售
      moneyInteger: "99999", //价格整数部分
      moneydecimal: "88", //价钱小数部分
      profit: "200", //运营收益
      notes: "优惠商品，预计3-5天内发货", //注释
      storeName: "暴风TV官方自营", //店名
    }, {
      imageurl: "http://121.41.79.182:8090/fs/fs05/attachments/2018-10-17/K032/e8a91dae064913f35ae77bca50503ffb",
      name: "40R6亮香槟 画质好、高度清晰、大耳朵电视，双十一大促销大耳朵电视，双十一大促销",
      stock: "200", //库存
      select: "0", //选中
      sold: "100", //已售
      moneyInteger: "99999", //价格整数部分
      moneydecimal: "88", //价钱小数部分
      profit: "200", //运营收益
      notes: "优惠商品，预计3-5天内发货", //注释
      storeName: "暴风TV官方自营", //店名
    }, {
      imageurl: "http://121.41.79.182:8090/fs/fs05/attachments/2018-10-17/K032/e8a91dae064913f35ae77bca50503ffb",
      name: "40R6亮香槟 画质好、高度清晰、大耳朵电视，双十一大促销大耳朵电视，双十一大促销",
      stock: "200", //库存
      select: "0", //选中
      sold: "100", //已售
      moneyInteger: "99999", //价格整数部分
      moneydecimal: "88", //价钱小数部分
      profit: "200", //运营收益
      notes: "优惠商品，预计3-5天内发货", //注释
      storeName: "暴风TV官方自营", //店名
    }, {
      imageurl: "http://121.41.79.182:8090/fs/fs05/attachments/2018-10-17/K032/e8a91dae064913f35ae77bca50503ffb",
      name: "40R6亮香槟 画质好、高度清晰、大耳朵电视，双十一大促销大耳朵电视，双十一大促销",
      stock: "200", //库存
      select: "0", //选中
      sold: "100", //已售
      moneyInteger: "99999", //价格整数部分
      moneydecimal: "88", //价钱小数部分
      profit: "200", //运营收益
      notes: "优惠商品，预计3-5天内发货", //注释
      storeName: "暴风TV官方自营", //店名
    },],
    sort: true, //控制排序的小图标
    xuan: 0, //选中的项目
    scroll: true, //微信小程序监听页面滚动
    hide_list: 'showlist',      //
  },
  main: function () {
    wx.navigateTo({
      url: '/pages/tob/product/MainProduct'
    })
  },
  loading: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.loading()
  },
  //点击上列表时候的排序
  sort: function (res) {
    console.log(res)
    this.setData({
      sort: !this.data.sort,
      xuan: res.currentTarget.id,
    })
    this.loading()
  },
  home: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
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
    this.onLoad()
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onLoad()
  },
  onPageScroll: function (e) {
    var that = this
    if (e.scrollTop > this.scrollTop && e.scrollTop > 100) {
      this.setData({
        scroll: false,
        hide_list: 'hidelist'
      })
    } else if (e.scrollTop < 100 || e.scrollTop < this.scrollTop) {
      this.setData({
        scroll: true,
        hide_list: 'showlist'
      })
    }

    setTimeout(funcName, 200);

    function funcName() {
      that.scrollTop = e.scrollTop
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})