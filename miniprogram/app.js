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
  onHide(){
    this.cache_clear()
  }
})
