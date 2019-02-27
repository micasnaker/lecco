const JLTools = require("../../util/JLTools.js")
Page({
  UserInfoL: {},
  /**
   * 页面的初始数据
   */
  data: {
    id: false, //根据判断的id去确认是编辑地址还是新建地址
    //已经选择的地理位置
    customItem: '全部',
    Customer: '', //编辑人的信息
    multiIndex: [0, 0, 0],
    message: [], //斩获的是原始数据
    multiArray: [], //筛选之后的数据
    name: "",
    phone: "",
    address: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("看看我传的什么参数过来的", options)
    var that = this
    this.UserInfo = wx.getStorageSync("UserInfo");
    JLTools.invoke("csm.yswc.ParytAddress.jiedao", {}, res => {
      var message = JSON.parse(res.MESSAGE).data
      console.log(message)
      if (options.id) {
        JLTools.invoke("csm.yswc.ParytAddress.query", {
          "PARTYID": that.UserInfo.PARTYID
        }, res => {
          var onecurrent = 0,
            twocurrent = 0,
            threecurrent = 0;
          var Customer = JSON.parse(res.MESSAGE).data
          for (let i = 0, len = Customer.length; i < len; i++) {
            console.log(Customer[i].ID, options.id)
            if (Customer[i].ID == options.id) {
              that.setData({
                Customer: Customer[i]
              })
            }
          }
          Customer = that.data.Customer
          var one = message[0].List
          var two = []
          var three = []
          var multiArray = []
          for (let i = 0, len = message[0].List.length; i < len; i++) {
            if (Customer.STATE_CODE == message[0].List[i].VALUE) {
              onecurrent = i
            }
          }
          var oneid = one[onecurrent].VALUE
          for (let i = 0, len = message[1].List.length; i < len; i++) {
            if (oneid == message[1].List[i].PARENTVAL) {
              two.push(message[1].List[i])
            }
          }
          for (let i = 0, len = two.length; i < len; i++) {
            if (Customer.CITY_CODE == two[i].VALUE) {
              twocurrent = i
            }
          }
          var twoid = two[twocurrent].VALUE
          for (let i = 0, len = message[2].List.length; i < len; i++) {
            if (twoid == message[2].List[i].PARENTVAL) {
              three.push(message[2].List[i])
            }
          }
          for (let i = 0, len = three.length; i < len; i++) {
            if (Customer.DISTRICT_CODE == three[i].VALUE) {
              threecurrent = i
            }
          }
          console.log(onecurrent, twocurrent, threecurrent)
          multiArray = [one, two, three]
          console.log(one)
          console.log(two)
          console.log(three)
          that.setData({
            message: message,
            multiArray: multiArray,
            multiIndex: [onecurrent, twocurrent, threecurrent],
            id: options.id,
            name: Customer.NAME,
            phone: Customer.MOBILE,
            address: Customer.ADDRESS
          })
        });
      } else {
        var one = message[0].List
        var two = []
        var three = []
        var multiArray = []
        var oneid = one[0].VALUE
        for (let i = 0, len = message[1].List.length; i < len; i++) {
          if (oneid == message[1].List[i].PARENTVAL) {
            two.push(message[1].List[i])
          }
        }
        var twoid = two[0].VALUE
        for (let i = 0, len = message[2].List.length; i < len; i++) {
          if (twoid == message[2].List[i].PARENTVAL) {
            three.push(message[2].List[i])
          }
        }
        multiArray = [one, two, three]
        that.setData({
          message: message,
          multiArray: multiArray
        })
      }
    })
  },

  bindMultiPickerColumnChange: function(res) {
    var that = this
    console.log(res)
    if (res.detail.column == 0) {
      var message = that.data.message
      var one = message[0].List
      var two = []
      var three = []
      var oneid = one[res.detail.value].VALUE
      var multiArray = []
      for (let i = 0, len = message[1].List.length; i < len; i++) {
        if (oneid == message[1].List[i].PARENTVAL) {
          two.push(message[1].List[i])
        }
      }
      var twoid = two[0].VALUE
      for (let i = 0, len = message[2].List.length; i < len; i++) {
        if (twoid == message[2].List[i].PARENTVAL) {
          three.push(message[2].List[i])
        }
      }
      multiArray = [one, two, three]
      var multiIndex = [res.detail.value, 0, 0]
      that.setData({
        multiArray: multiArray,
        multiIndex: multiIndex
      })
    } else if (res.detail.column == 1) {
      var message = that.data.message
      var one = message[0].List
      var two = that.data.multiArray[1]
      var three = []
      var twoid = two[res.detail.value].VALUE
      for (let i = 0, len = message[2].List.length; i < len; i++) {
        if (twoid == message[2].List[i].PARENTVAL) {
          three.push(message[2].List[i])
        }
      }
      multiArray = [one, two, three]
      var multiIndex = [that.data.multiIndex[0], res.detail.value, 0]
      that.setData({
        multiArray: multiArray,
        multiIndex: multiIndex
      })
    } else if (res.detail.column == 2) {
      var multiIndex = [that.data.multiIndex[0], that.data.multiIndex[1], res.detail.value]
      that.setData({
        multiIndex: multiIndex
      })
    }
  },
  newlyBuild: function() {
    var that=this
    JLTools.invoke("csm.yswc.ParytAddress.insert", {
      "id": that.data.id,
      "address": that.data.address,
      "mobile": that.data.phone,
      "name": that.data.name,
      "partyId": that.UserInfo.PARTYID,
      "state": that.data.multiArray[0][that.data.multiIndex[0]].VALUE,
      "city": that.data.multiArray[1][that.data.multiIndex[1]].VALUE,
      "district": that.data.multiArray[2][that.data.multiIndex[2]].VALUE,
      "stuats": null
    }, res => {
      console.log("最后一道手续",res)
      wx.navigateBack({
        delta: 1
      })
    })
  },
  edit: function() {
    var that=this
    JLTools.invoke("csm.yswc.ParytAddress.insert", {
      "address": that.data.address,
      "mobile": that.data.phone,
      "name": that.data.name,
      "partyId": that.UserInfo.PARTYID,
      "state": that.data.multiArray[0][that.data.multiIndex[0]].VALUE,
      "city": that.data.multiArray[1][that.data.multiIndex[1]].VALUE,
      "district": that.data.multiArray[2][that.data.multiIndex[2]].VALUE,
    }, res => {
      console.log("最后一道手续", res)
      wx.navigateBack({
        delta: 1
      })
    })
  },
  bc: function() {
    var that = this
    if (that.data.name != "") {
      if (that.data.phone != "" && that.data.phone.length == 11) {
        if (that.data.address != "") {
          if (that.data.id) {
            that.newlyBuild()
          } else {
            that.edit()
          }
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '请输入详细地址',
          })
        }
      } else {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请输入正确的手机号',
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写收货人的姓名',
      })
    }


  },
  name: function(res) {
    console.log(res)
    this.setData({
      name: res.detail.value
    })
  },
  phone: function(res) {
    console.log(res)
    this.setData({
      phone: res.detail.value
    })
  },
  address: function(res) {
    console.log(res)
    this.setData({
      address: res.detail.value
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