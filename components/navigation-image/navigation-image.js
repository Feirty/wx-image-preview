const app = getApp();
Component({
  properties: {
    defaultData: {
      type: Object,
      value: {
        title: "",
      }
    }
  },
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
  },
  methods: {
    toBack() {
      wx.navigateBack({
        delta: 1
      });
    }
  }
});

