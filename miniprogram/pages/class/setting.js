// miniprogram/pages/class/setting.js
const app = getApp()
const {regeneratorRuntime} = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    us:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserSetting()
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
  async getUserSetting(){
    const db = wx.cloud.database();
    db.collection('user_setting').where({
      _openid: await app.openid()
    }).get({
      success: res => {
        this.setData({
          us: res.data[0]
        })
      },
      fail: err => {
      }
    })
  },
  form:{
    teacher:'',
    name:'',
    number:'',
  },
  inputNickname(e){
    this.form[app.attr(e,'key')]=app.val(e);
  },
  saveSetting(){
    const db = wx.cloud.database();
    if(this.data.us._id){
      db.collection('user_setting')
        .doc(this.data.us._id)
        .update({
          data: this.form,
        }).then(res=>{
        wx.navigateBack();
      })
    }else{
      db.collection('user_setting')
        .add({
          data: this.form,
        })
        .then(res=>{
          wx.navigateBack();
        })
    }
  },
})