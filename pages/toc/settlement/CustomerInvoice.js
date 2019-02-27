const JLTools = require("../../util/JLTools.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InvoiceType: true, //发票类型
    personalCompany: true, //个人或者单位
    InvoiceContents: true, //发票内容
    obj: {}, //获取到的数据
  },
  //点击发票类型时候触发
  InvoiceType: function() {
    this.setData({
      InvoiceType: !this.data.InvoiceType
    })
  },
  //点击个人或者单位时候触发
  personalCompany: function() {
    this.setData({
      personalCompany: !this.data.personalCompany
    })
  },
  //点击发票类型时候触发
  InvoiceContents: function() {
    this.setData({
      InvoiceContents: !this.data.InvoiceContents
    })
  },
  //普通发票点击确定时候触发
  ordinarySubmit: function(res) {
    console.log(res)
    var that = this
    var obj = this.data.obj
    obj = {
      "PARTY_ID": that.UserInfo.PARTYID,
      invoice_address: res.detail.value.INVOICE_ADDRESS,
      invoice_eamil: res.detail.value.INVOICE_EAMIL,
      invoice_name: res.detail.value.INVOICE_NAME,
      invoice_tel: res.detail.value.INVOICE_TEL,
      invoice_company_name: res.detail.value.INVOICE_COMPANY_NAME,
      invoice_company_tax: res.detail.value.INVOICE_COMPANY_TAX,

      invoice_company_address: that.data.obj.INVOICE_COMPANY_ADDRESS,
      invoice_company_bank_code: that.data.obj.INVOICE_COMPANY_BANK_CODE,
      invoice_company_bank_name: that.data.obj.INVOICE_COMPANY_BANK_NAME,
      invoice_company_tel: that.data.obj.INVOICE_COMPANY_TEL,
    }
    var data = {
      invoice_name: res.detail.value.INVOICE_NAME,
      invoice_tel: res.detail.value.INVOICE_TEL,
      invoice_eamil: res.detail.value.INVOICE_EAMIL,
      invoice_company_name: res.detail.value.INVOICE_COMPANY_NAME,
      
    }
    data.invoice_content_enum = that.data.InvoiceContents?10:20
    if (that.data.personalCompany){
      data.invoice_company_name="个人"
    }else{
      data.invoice_company_tax= res.detail.value.INVOICE_COMPANY_TAX
    }
    data.invoice_head_enum = that.data.personalCompany?10:20
    data.invoice_type_enum = 10
    JLTools.invoke("csm.cm.parytInvoice.save", obj, res => {
      console.log(res)
      JLTools.invoice = data
      console.log('普通的',JLTools.invoice)
      wx.navigateBack({
        delta: 1
      })
    })
  },
  //专用发票点击确定按钮
  Special_purposeSubmit: function(res) {
    console.log(res)
    var that = this
    var obj = this.data.obj
    obj = {
      "PARTY_ID": that.UserInfo.PARTYID,
      invoice_address: res.detail.value.INVOICE_ADDRESS,
      invoice_company_address: res.detail.value.INVOICE_COMPANY_ADDRESS,
      invoice_company_bank_code: res.detail.value.INVOICE_COMPANY_BANK_CODE,
      invoice_company_bank_name: res.detail.value.INVOICE_COMPANY_BANK_NAME,
      invoice_company_name: res.detail.value.INVOICE_COMPANY_NAME,
      invoice_company_tax: res.detail.value.INVOICE_COMPANY_TAX,
      invoice_company_tel: res.detail.value.INVOICE_COMPANY_TEL,
      invoice_name: res.detail.value.INVOICE_NAME,
      invoice_tel: res.detail.value.INVOICE_TEL,

      invoice_eamil: that.data.obj.INVOICE_EAMIL,
    }
    var data = {
      invoice_address: res.detail.value.INVOICE_ADDRESS,
      invoice_company_address: res.detail.value.INVOICE_COMPANY_ADDRESS,
      invoice_company_bank_code: res.detail.value.INVOICE_COMPANY_BANK_CODE,
      invoice_company_bank_name: res.detail.value.INVOICE_COMPANY_BANK_NAME,
      invoice_company_name: res.detail.value.INVOICE_COMPANY_NAME,
      invoice_company_tax: res.detail.value.INVOICE_COMPANY_TAX,
      invoice_company_tel: res.detail.value.INVOICE_COMPANY_TEL,
      invoice_name: res.detail.value.INVOICE_NAME,
      invoice_tel: res.detail.value.INVOICE_TEL,
    }
    data.invoice_content_enum = 10
    data.invoice_head_enum = 20
    data.invoice_type_enum = 30
    JLTools.invoke("csm.cm.parytInvoice.save", obj, res => {
      console.log(res)
      JLTools.invoice = data
      console.log('专用的', JLTools.invoice)
      wx.navigateBack({
        delta: 1
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.UserInfo = wx.getStorageSync("UserInfo");
    var that = this
    JLTools.invoke("csm.cm.parytInvoice.query", {
      "PARTY_ID": that.UserInfo.PARTYID
    }, res => {
      console.log(res)
      var obj = JSON.parse(res.MESSAGE);
      console.log(obj)
      that.setData({
        obj: obj.data
      })
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


    //     "INVOICE": {   最普通的
    //       "invoice_company_name": "个人",
    //       "invoice_content_enum": "10",
    //       "invoice_head_enum": "10",
    //       "invoice_type_enum": "10",
    //       "invoice_eamil": "uaoie@qq.com",
    //       "invoice_name": "发票人1",
    //       "invoice_tel": "15272580217",
    //       "invoice_address": "发票的详细地1"
    //     },

    //     "INVOICE": {    单位的
    //       "invoice_company_name": "danwei",
    //       "invoice_content_enum": "10",
    //       "invoice_head_enum": "20",  单位的为20
    //       "invoice_type_enum": "10",
    //       "invoice_company_tax": "421023199711107918",
    //       "invoice_eamil": "uaoie@qq.com",
    //       "invoice_name": "111",
    //       "invoice_tel": "15572046172",
    //       "invoice_address": "fdsafdafda"
    //     },

    //     "INVOICE": {
    //       "invoice_company_name": "个人",
    //       "invoice_content_enum": "20",  商品类别为20
    //       "invoice_head_enum": "10",
    //       "invoice_type_enum": "10",
    //       "invoice_eamil": "uaoie@qq.com",
    //       "invoice_name": "111",
    //       "invoice_tel": "15572046172",
    //       "invoice_address": "fdsafdafda"
    //     },



    //       INVOICE ":{"
    //       invoice_company_name ":"
    //       danwei ","
    //       invoice_content_enum ":"
    //       10 ","
    //       invoice_head_enum ":"
    //       20 ","
    //       invoice_type_enum ":"
    //       30 ","
    //       invoice_company_tax ":"
    //       421023199711107918 ","
    //       invoice_company_address ":"
    //       dizhi ","
    //       invoice_name ":"
    //       111 ","
    //       invoice_tel ":"
    //       15572046172 ","
    //       invoice_company_bank_name ":"
    //       yinhan ","
    //       invoice_company_bank_code ":"
    //       yinhanhaoma ","
    //       invoice_company_tel ":"
    //       15572046172 ","
    //       invoice_address ":"
    //       fdsafdafda "},"

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