//index.js
const app = getApp()
const {regeneratorRuntime} = getApp()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,

    hasEdit:false,
    us:{},
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    this.getUserSetting();
    // 获取用户信息
    app.promise('wx.getSetting',{}).then(res=>{
      console.log('wx.getSetting',res);
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            console.log('wx.getUserInfo',res);
            this.setData({
              avatarUrl: res.userInfo.avatarUrl,
              userInfo: res.userInfo
            })
          }
        })
      }
    })
  },
  onShow(){

  },
  onGetUserInfo: function(e) {
    console.log('onGetUserInfo',e);
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  getUserSetting(){
    const db = wx.cloud.database();
    db.collection('user_setting').where({
      _openid: this.data.openid
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
  nickname:'',
  inputNickname(e){
    this.nickname=app.val(e);
  },
  saveNick(){
    let val= this.nickname
    if(val){
      const db = wx.cloud.database();
      if(this.data.us._id){
        db.collection('user_setting')
          .doc(this.data.us._id)
          .update({
          data: {
            nickname: val
          },
        })
      }else{
        db.collection('user_setting')
          .add({
            data: {
              nickname: val
            },
          })
          .then(res=>{
            console.log(res);
            this.setData({
              us:{
                _id:res._id,
                nickname:this.nickname,
              }
            })
          })
      }
    }
  },
  editNickname(e){
    console.log(e);
    if(app.attr(e,'type')=='input'){
      if(this.data.hasEdit)return;
      this.setData({
        hasEdit:true
      })
      return;
    }
    if(this.data.hasEdit){//保存
      this.saveNick();
    }
    this.setData({
      hasEdit:!this.data.hasEdit
    })

  },
})
