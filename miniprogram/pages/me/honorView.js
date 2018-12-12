// miniprogram/pages/me/honorView.js
const app = getApp()
const {regeneratorRuntime} = app
import ho from '../../components/honor';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      honor:[],
      honorNum:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let honor=ho.getHonorItems(options.icon);
      app.cloudHisCount().then(res=>{
        let honorNum=ho.formatNum(res.total);
        this.setData({
          honor:honor,
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
    },
  viewImage(e){
    let index=app.attr(e,'index');
    let items=this.data.honor.items;
    let urls=items.slice(0,this.data.honorNum[this.data.honor.icon])
    if(urls.length<1 || urls.length-1<index) return;
    console.log(urls);
    wx.previewImage({
      current: urls[index],
      urls: urls
    })
  }
})