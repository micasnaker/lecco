const pubJson = require("./pubJson.js");
module.exports = {
  isNull(...objs) {
    let bol = false,
      fn = function(obj) {
        if (typeof obj == "undefined") {
          return true;
        } else if (obj == null) {
          return true;
        } else if (typeof obj == "string" && (obj.trim() === "" || obj === "undefined" || obj === "null")) {
          return true;
        } else if (typeof obj == "object" && Array.isArray(obj) && obj.length == 0) {
          return true;
        } else if (typeof obj == "object" && !Array.isArray(obj) && Object.keys(obj).length == 0) {
          return true;
        } else {
          return false;
        }
      }
    bol = objs.some(obj => {
      return fn(obj);
    });
    return bol;
  },
  invoke: function(interfaceId, data, success) {
    let UserInfo = wx.getStorageSync("UserInfo");
    wx.request({
      url: pubJson.url + '/Inbound/invoke.do',
      //method:method||'get',
      data: {
        interfaceId: interfaceId,
        data: data,
        SessionID: UserInfo.SessionID
      },
      success: function(res) {
        success(res.data);
      }
    });
  },
  beanQuery: function(config, success) {
    let UserInfo = wx.getStorageSync("UserInfo");
    let data = {
      response_compression: 'gzip',
      query_extend_access: true,
      query_datasource: 'scm',
      response_data_format: 'json',
      response_page_size: config.page_size || 99999999,
      response_speed_priority: true,
      response_page_num: config.page_num || 1,
      query_bean: config.query_bean,
      query_inputdata: config.query_data,
      query_data: config.query_data,
      SessionID: UserInfo.SessionID
    }
    wx.request({
      url: pubJson.url + '/query/api.do',
      data: data,
      success: function(res) {
        res.data.pop()
        success({
          data: res.data,
          data: res.data,
          page_config: {}
        });
      }
    });
  },
  PictureUpload: function (tempFilePaths,success){
    wx.uploadFile({
      url: pubJson.url + '/FormUpload/multiUpload.do', //仅为示例，非真实的接口地址
      filePath: tempFilePaths,
      name: 'file',
      success: function (res) {
        success(res.data);
      }
    })
  },
  //精确相加
  Add: function(arg1, arg2) {
    arg1 = arg1.toString(), arg2 = arg2.toString();
    var arg1Arr = arg1.split("."),
      arg2Arr = arg2.split("."),
      d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
      d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
    var maxLen = Math.max(d1.length, d2.length);
    var m = Math.pow(10, maxLen);
    var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
    var d = arguments[2];
    return typeof d === "number" ? Number((result).toFixed(d)) : result;
  },
  //精确相减
  Sub: function(arg1, arg2) {
    return this.Add(arg1, -Number(arg2), arguments[2]);
  },
  //精准相乘
  Mul: function(arg1, arg2) {
    var r1 = arg1.toString(),
      r2 = arg2.toString(),
      m, resultVal, d = arguments[2];
    m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
  },
  //需要全局的收货地址
  message: [],
  //选择的收货地址
  address: "",
  //将要生成订单号的商品信息
  cart_commodity: {},
  //将要生成的订单号总价格
  prices: 0,
  //我的订单页面重新立即支付功能的数据
  immediatePayment: {},
  //筛选的标签编码
  screen: "bm",
  Levescreen:null,
}