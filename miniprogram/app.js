//app.js
import {vk,regeneratorRuntime} from 'vktool'
App({
  ...vk,
  regeneratorRuntime:regeneratorRuntime,
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {}
    this.login()

  },
  onShow:async function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log('onCheckForUpdate', res)
      })
      updateManager.onUpdateReady(function (res) {
        console.log('onUpdateReady', res)
        updateManager.applyUpdate();
      })
      updateManager.onUpdateFailed(function (res) {
        // 新的版本下载失败
        console.log('onUpdateFailed', res)
      })
    }
  },
  onHide(){
    this.cache_clear()
  },
  async login(){
    try{
      let openid=await this.cache('openid');
      if(openid){
        return this.globalData.openid=openid;
      }
    }catch(e){}
    return new Promise((success,fail)=>{
      wx.cloud.callFunction({
        name: 'login',
        data: {},
      }).then(res=>{
        console.log('login.success',res)
        this.globalData.openid=res.result.openid
        this.cache('openid',this.globalData.openid);
        success(res.result.openid);
      }).catch((e)=>{
        console.log('login.fail',e)
        return this.login()
      })
    })
  },
  async openid(){
    return new Promise(async (success,fail)=>{
      if(this.globalData.openid){
        return success(this.globalData.openid);
      }else{
        try{
          this.globalData.openid=await this.cache('openid');
          if(this.globalData.openid){
            return success(this.globalData.openid)
          }
        }catch(e){}
      }
    })
  },
})
