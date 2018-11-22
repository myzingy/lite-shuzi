// miniprogram/pages/suzi/kousuan/132.js
const {regeneratorRuntime} = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        width:100,
        height:100,
      num:"",
      last:0,
      total:0,
    },
    nums:[],
  total:0,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      wx.setKeepScreenOn({
        keepScreenOn: true
      });
      let nums=await getApp().cache('nums');
      const shuffle = items => items.sort(() => Math.random() - 0.5);
      this.nums=shuffle(nums);
      this.total=this.nums.length;
      this.getNum()

      var plugin = requirePlugin("WechatSI")
      let manager = plugin.getRecordRecognitionManager()
      manager.onRecognize = function(res) {
        console.log("current result", res.result)
      }
      manager.onStop = function(res) {
        console.log("record file path", res.tempFilePath)
        console.log("result", res.result)
      }
      manager.onStart = function(res) {
        console.log("成功开始录音识别", res)
      }
      manager.onError = function(res) {
        console.error("error msg", res.msg)
      }
      manager.start({duration:30000, lang: "zh_CN"})
    },
    getNum(){
        let num=this.nums.pop();
        this.setData({
          //num:num,
          last:this.total-this.nums.length,
          total:this.total,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {
        let sys=wx.getSystemInfoSync();
        console.log(sys)
      this.setData({
        width:sys.windowHeight,
        height:sys.windowWidth,
      })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})