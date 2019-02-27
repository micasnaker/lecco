const updateManager = wx.getUpdateManager()

updateManager.onUpdateReady(function() {

  updateManager.applyUpdate()
})
//app.js
App({
  onLaunch: function() {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              console.info(res);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    subDomain:"https://api.it120.cc/mataro333"
  },
  JLTools: {
    url: "http://cyjdzs.dqfwy.com/scmform",
    UserInfo: {},
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
      let a = 1;

      wx.request({
        url: this.url + '/Inbound/invoke.do',
        data: {
          interfaceId: interfaceId,
          data: data
        },
        success: function(res) {
          success(res.data);

        }
      });
    },
    beanQuery: function(query_bean, query_data, config) {
      let data = {
        SessionID: this.UserInfo.SessionID,
        response_compression: 'gzip',
        query_extend_access: true,
        query_datasource: 'scm',
        response_data_format: 'json',
        response_page_size: config.page_size || 99999999,
        response_speed_priority: true,
        response_page_num: config.page_num || 1,
        query_bean: query_bean,
        query_inputdata: query_data,
        query_data: query_data
      }
      wx.request({
        url: this.url + '/query/api.do',
        data: {
          interfaceId: interfaceId,
          data: data
        },
        success: function(res) {
          config.success(res.data);

        }
      });
    }
  }
})