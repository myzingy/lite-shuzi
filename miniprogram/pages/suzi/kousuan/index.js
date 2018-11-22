// miniprogram/pages/suzi/kousuan/index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    nums:[],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        for(let i=0;i<=10;i++){
          for(let j=0;j<=10;j++){
            if(i-j>=0){
              this.nums.push(i+'-'+j);
            }
            if(i+j<=10){
              this.nums.push(i+'+'+j);
            }
          }
        }
        console.log(this.nums,this.nums.length)
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

    },
    start(){
        getApp().cache('nums',this.nums);
      wx.navigateTo({
        url:'./132'
      });
    },
})