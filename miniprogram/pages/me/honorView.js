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
  openid:'',
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      let honor=ho.getHonorItems(options.icon);
      app.cloudHisCount().then(res=>{
        let honorNum=ho.formatNum(res.total);
        this.setData({
          honor:honor,
          honorNum:honorNum,
        })
      })
      this.openid=await app.openid();
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
    onShareAppMessage: function () {
      return {
        title: '口算132 小学口算训练卡',
        path: '/pages/suzi/kousuan/index?fromid='+this.openid||'',
        imageUrl:'http://shuzi132-img.vking.wang/share-msg.jpg',
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
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