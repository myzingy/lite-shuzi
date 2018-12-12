// miniprogram/pages/me/share.js
const app = getApp()
const {regeneratorRuntime} = app
Page({

    /**
     * 页面的初始数据
     */
    data: {
      width:100,
      height:100,
      drawing: [
        {
          type: 'image',
          url: 'http://shuzi132-img.vking.wang/share.950.png',
          left: 0,
          top: 0,
          width: 950,
          height: 650
        },
        {
          type: 'image',
          url: 'http://shuzi132-img.vking.wang/sx%20%281%29.png',
          left: 23,
          top: 24,
          width: 464,
          height: 255
        },
        {
          type: 'text',
          textType: 'CN',
          content: '此处是文本信息',
          fontSize: 26,
          color: '#fefefe',
          textAlign: 'left',
          left: 550,
          top: 120,
          width: 423,
          bold:true,
        }
      ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
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