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
    wx.cloud.callFunction({
      name: 'login',
      data: {},
    }).then(res=>{
      this.globalData.openid = res.result.openid
    })
  },
  onShow:function() {
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
  }
})
