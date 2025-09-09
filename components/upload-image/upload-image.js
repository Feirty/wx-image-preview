Component({
  properties: {
    imageList: {
      type: Array,
      value: []
    }
  },
  data: {
    limitCount: 9,
    isOverLimit: false,
  },
  methods: {
    // 选择本地图片
    getLocalImage() {
      const remaining = this.data.limitCount - this.data.imageList.length;
      if (remaining <= 0) return;
      wx.chooseImage({
        count: remaining,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const allList = this.data.imageList.concat(res.tempFilePaths);
          this.setData({
            imageList: allList,
            isOverLimit: allList.length >= this.data.limitCount
          });
          this.triggerEvent('imageChange', this.data.imageList);
        },
        fail: () => {
          wx.showToast({
            title: '选择图片失败',
            icon: 'none'
          });
        }
      });
    },
    // 图片删除
    delImag(event) {
      const index = event.currentTarget.dataset.index;
      const imgList = this.data.imageList.slice();
      imgList.splice(index, 1);
      this.setData({
        imageList: imgList,
        isOverLimit: imgList.length >= this.data.limitCount
      });
      this.triggerEvent('imageChange', this.data.imageList);
    },
    // 跳转到预览图片的页面
    toPreviewPage(event) {
      const reqData = {
        current: event.currentTarget.dataset.current,
        list: this.data.imageList
      };
      wx.navigateTo({
        url: '/pages/previewImage/previewImage?images=' + encodeURIComponent(JSON.stringify(reqData)),
      });
    }
  }
});