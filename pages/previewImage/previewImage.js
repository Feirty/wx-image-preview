// pages/previewImage/previewImage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgData: {},
    currentNum: 1,
    totalCount: 1,
    isLoading: true,
    defaultData: {
      title: "",
    },
    isScaling: false,
    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0,
    // 最后一次单击事件点击发生时间
    lastTapTime: 0,
    // 单击事件点击后要触发的函数
    lastTapTimeoutFunc: null,
    scaleValueTmp: 0,
    defaultValue: 1,
    direction: "all",
    lastMovableScale: null,
    lastMovableScaleTime: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const data = JSON.parse(decodeURIComponent(options.images));
    const current = data.current;
    const list = data.list;
    const currentNum = list.indexOf(current);
    this.setData({
      imgData: data,
      totalCount: data.list.length,
      currentNum: currentNum + 1,
      ["defaultData.title"]: currentNum + 1 + ' / ' + list.length
    });
  },
  imageBindChange(e) {
    const current = e.detail.current + 1;
    const totalNum = this.data.totalCount;
    this.setData({
      currentNum: current,
      scaleValueTmp: 1,
      ["defaultData.title"]: current + '/' + totalNum
    });
  },
  imageLoad() {
    this.setData({
      isLoading: false
    });
  },
  movableScale(e) {
    this.lastMovableScale = e.detail;
    if (this.lastMovableScaleTime) {
      clearTimeout(this.lastMovableScaleTime);
    }
    this.lastMovableScaleTime = setTimeout(() => {
      this.setData({
        scaleValueTmp: this.lastMovableScale.scale
      });
      this.lastMovableScaleTime = null;
    }, 100);
  },
  touchStart(e) {
    this.touchStartTime = e.timeStamp;
  },
  touchEnd(e) {
    this.touchEndTime = e.timeStamp;
  },
  multipleTap(e) {
    if (this.touchEndTime - this.touchStartTime < 350) {
      const currentTime = e.timeStamp;
      const lastTapTime = this.lastTapTime;
      this.lastTapTime = currentTime;
      if (currentTime - lastTapTime < 300) {
        this.setData({
          defaultValue: 1,
          isScaling: false
        });
        clearTimeout(this.lastTapTimeoutFunc);
      } else {
        this.lastTapTimeoutFunc = setTimeout(() => {}, 300);
      }
    }
  }
})