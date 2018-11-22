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
    },
    nums:[],
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
      this.getNum()
    },
    getNum(){
        let num=this.nums.pop();
        this.setData({
          num:num,
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