// miniprogram/pages/me/honor.js
const app = getApp()
const {regeneratorRuntime} = app
import ho from '../../components/honor';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      honor:ho.honor,
      honorNum:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      app.cloudHisCount().then(res=>{
          let honorNum=ho.formatNum(res.total);
          this.setData({
            honorNum:honorNum,
          })
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
     * 用户点击右上角分享
     */
    onShareAppMessage: async function () {
      return {
        title: '口算132',
        path: '/pages/suzi/kousuan/index?fromid='+await app.openid(),
        //imageUrl:'',
      }
    }
})