// pages/toc/product/CustomerClassification.js
const JLTools = require("../../util/JLTools.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biglist: [],
    smalllist: [],
    allsmalllist: {
      "a": "",
      "b": 1
    }
  },
  bd: function () {
    wx.navigateTo({
      url: '/pages/toc/product/CustomerProductSearch'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    JLTools.invoke("shop.storecategory.queryLevelCategory", {
      "category_type": "terrace",
      "level": "1"
    }, message => {
      let data = message;
      if (data['dataType'] || data.length == 0) return;
      let default_index = 0;
      data.forEach((v, i) => {
        v["thecolor"] = false; //
      })
      this.setData({
        biglist: data
      });
      console.info(data);
      this.choosethis(this.data.biglist[default_index], default_index);
    });
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

  },

  choosethis(nav, index) {
    if (JLTools.isNull(index)) {
      let event = nav;
      nav = event.currentTarget.dataset.nav;
      index = event.currentTarget.dataset.i;
    }

    for (let v of this.data.biglist) {
      v.thecolor = v.FLID == nav.FLID;
    }

    //获取访问的二级和三级菜单
    if (this.data.allsmalllist[index]) {
      this.setData({
        biglist: this.data.biglist,
        smalllist: this.data.allsmalllist[index]
      });
      return;
    } else {
      JLTools.invoke("shop.storecategory.queryCategory", {
          "category_type": "terrace",
          "FLID": nav.FLID
        }, message => {
          let key = "allsmalllist[" + index + "]";
          this.setData({
            biglist: this.data.biglist,
            smalllist: message,
            [key]: message
          });
          console.log(message)
          //this.smalllist = message;
          //this.allsmalllist[index] = message;
        },
        error => {});
    }
  },
  push(e) {
    let nav = e.currentTarget.dataset.na;
    console.log(nav)
    nav["channelType"] = "4";
    nav["PRODUCT_CATEGORY_ID"] = nav.FLID;
    wx.navigateTo({
      url: "/pages/toc/product/CustomerProductList?name=" + nav.FLNAME,
    });

    // this.navCtrl.push('DistributorProductListPage', {
    //   "FLID": nav.FLID,
    //   'title': nav['FLNAME']
    // });
    // this.viewCtrl.dismiss();
    // 再工贸是根节点不能销毁
  }
})