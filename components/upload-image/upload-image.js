Component({
  properties: {
    imageList: {
      type: Array,
      value: []
    }
  },
  data: {
    limitCount: 9,
    currentCount: 4,
    isOverLimit: false,
  },
  methods: {
    // 选择本地图片
    getLocalImage() {
      const that = this;
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          let imsList = that.data.imageList;
          let allList = imsList.concat(tempFilePaths);
          that.setData({
            imageList: allList
          })
          that.triggerEvent('imageChange',  that.data.imageList)
        }
      })
    },
    // 图片删除
    delImag(event) {
      var $this = this;
      let index = event.currentTarget.dataset.index;
      let imgList = $this.data.imageList;
      imgList.splice(index, 1);
      $this.setData({
        imageList: imgList
      });
      this.triggerEvent('imageChange',  $this.data.imageList)
    },
    // 微信API 预览图片
    toPreviewPageTest(event) {
      var reqData = {};
      reqData.current = event.currentTarget.dataset.current;
      reqData.list = this.data.imageList;
      wx.previewImage({
        current: event.currentTarget.dataset.current,
        urls: this.data.imageList
      })
    },
    // 跳转到预览图片的页面
    toPreviewPage(event) {
      var reqData = {};
      reqData.current = event.currentTarget.dataset.current;
      reqData.list = this.data.imageList;
      wx.navigateTo({
        url: '/pages/previewImage/previewImage' + '?images=' + encodeURIComponent(JSON.stringify(reqData)),
      })
    }
  }
})