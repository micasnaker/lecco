const JLTools = require("../util/JLTools")
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    page: {
      type: String,
      value: '',
    }
  },
  data: {
    // 这里是一些组件内部数据
    layout: {},
    tabs: {},
    component: []
  },
  ready: function () {
   // debugger;
    JLTools.invoke("shop.layout.getPageData", {
      "PAGE01": this.properties.page
    }, res => {
      let data = res;
      for (var i = 0; i < data.length; i++) {
        var row = data[i];
        row.DATA04 = JSON.parse(row.DATA04 || "{}");
        if (JLTools.isNull(this.data.layout[row.DIV01])) {
          row.COMP05 = row.COMP05.split(",");
          // if (row.PIPE03 == 1) {
          //   var pagingConfig = undefined;
          //   if (row.COMP04 > 0) {
          //     pagingConfig = new PagingConfig();
          //     pagingConfig.limit = row.COMP04;
          //   } else {
          //     pagingConfig = new PagingConfig();
          //   }
          //   await this.data.scmInterface.get({
          //     query_bean: row.PIPE04
          //   }).toPromise().then(res => {
          //     if (row.COMP04 == 0) {
          //       this.data.bean_data[row.DIV01] = res;
          //     } else {
          //       this.data.bean_data[row.DIV01] = res.slice(0, row.COMP04);
          //     }
          //     console.info(this.data.bean_data)
          //   });
          // } else if (row.PIPE03 == 0) {
          //   await this.data.scmInterface.get({
          //     interfaceId: "shop.pipe.getItem",
          //     query_data: { PIPE01: row.PIPE01 }
          //   }).toPromise().then(res => {
          //     if (row.COMP04 == 0) {
          //       this.data.bean_data[row.DIV01] = res;
          //     } else {
          //       this.data.bean_data[row.DIV01] = res.slice(0, row.COMP04);
          //     }
          //     console.info(this.data.bean_data)
          //   });
          //   await this.data.scmInterface.get({
          //     interfaceId: "shop.product.getBatchProductDetail",
          //     query_data: { list: this.data.bean_data[row.DIV01], ROLE_TYPE: _role_type }
          //   }).mergeMap(res => this.data.getBatchProductPrice(res)).toPromise().then(res => {
          //     if (res == undefined) row = undefined;
          //     else this.data.bean_data[row.DIV01] = res;
          //   });
          // }
          if (row){
            this.data.component.push(row);
          }
        }
        if (row) {
          if (!this.data.layout[row.DIV01]) {
            this.data.layout[row.DIV01] = [];
          }
          this.data.layout[row.DIV01].push(row);
          this.data.tabs[row.DIV01] = {
            selectedIndex: 0
          }
          //if(row.COMP01 == 23 && this.data.layout[row.DIV01].length == 1){
          if (row.COMP01 == 23) {
            this.data.changeTabs(row, row.DIV01, this.data.layout[row.DIV01].length - 1);
            this.data.tabs[row.DIV01].selectedIndex = 0;
          }
        }
        this.setData({
          layout: this.data.layout,
          component: this.data.component
        })
      }
    })
  },
  methods: {
    // 这里是一个自定义方法
    goToItem: function (e) {
      let ITEM = e.target.dataset.item;
      
      if (ITEM.DATA02 && (ITEM.DATA02.indexOf('http://') != -1 || ITEM.DATA02.indexOf('https://') != -1)) {
        location.href = ITEM.DATA02;
        return;
      }

      if (ITEM.DATA04) {
        ITEM = ITEM.DATA04;
      } else {
        ITEM = {};
      }
      console.info(ITEM);
      if (ITEM.PRODUCT_EXTID) {
        ITEM.PSEUDO_ID = ITEM.PRODUCT_EXTID;
      }
      let _page = 'ProductListPage';
      const USERINFO = {};
      if (!JLTools.isNull(USERINFO)) {
        const ROLETYPEID = this.storageService.read("UserInfo")['GW'][0]["ROLETYPEID"];
        if (ROLETYPEID == "role_dealer" 
            || ROLETYPEID == "role_dealerTwo" 
            || ROLETYPEID == 'role_franchisee' 
            || ROLETYPEID == 'role_guide') {
          _page = 'DistributorProductListPage';
        }
      }

      debugger;
      if (ITEM.PIPE01) {
        wx.navigateTo({ 
          url: _page, 
          data: {
            PIPE01: ITEM.PIPE01
          }
        });
      } else if (ITEM.FLID) {
        if (ITEM.FLNAME == 'Menu') { //分类
          this.navCtrl.parent.select(1);
        } else {
          wx.navigateTo({ 
            url: _page, 
            data: {
              FLID: ITEM.FLID
            }
          });
        }
      } else if (ITEM.TS_NAME) {
        var DATA = {};
        if (typeof ITEM.DATA == "string") {
          DATA.search_field = ITEM.DATA;
        } else {
          DATA = ITEM.DATA;
        }
        wx.navigateTo({ 
          url: ITEM.TS_NAME, 
          data: DATA
        });
      } else if (ITEM.PAGE01) {
        _page = "";
        if (ITEM.PAGE04 == 1) {
          _page = "StoreIndexPage";
        } else if (ITEM.PAGE04 == 2) {
          _page = "SalesPromotionPage";
        } else if (ITEM.PAGE04 == 3) {
          _page = "SceneSalesPage";
        } else if (ITEM.PAGE04 == 4) {
          _page = "CombineSalesPage";
        }
        wx.navigateTo({ 
          url: _page, 
          data: ITEM
        });
      } else if (ITEM.PAGE) {
        wx.navigateTo({ 
          url: ITEM.PAGE, 
          data: ITEM.DATA || {}
        });
      } else if (ITEM.PRODUCT_ID) {
        wx.navigateTo({ 
          url: "/pages/toc/product/CustomerProductMain", 
          data: ITEM
        });
      }
    }
  }
})