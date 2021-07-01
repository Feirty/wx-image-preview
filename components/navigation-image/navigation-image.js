const app = getApp()
Component({
    properties: {
        defaultData: {
            type: Object,
            value: {
                title: ""
            },
            observer: function (newVal, oldVal) {}
        }
    },
    data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight,
        menuBotton: app.globalData.menuBotton,
        menuHeight: app.globalData.menuHeight,
    },
    attached: function () {

    },
    methods: {
        toBack: function () {
            wx.navigateBack({
                delta: 1
            })
        }
    }
})