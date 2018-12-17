// miniprogram/pages/suzi/kousuan/history.js
const app = getApp()
const {regeneratorRuntime} = app
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rows:[],
    },
  offset:0,
  limit:30,
  hasMore:true,
  openid:'',
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.getHistory();
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(!this.hasMore){
            return app.toast('没有数据了');
        }
        this.offset+=this.limit;
        this.getHistory();
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
    async getHistory(){
      const db = wx.cloud.database()
      db.collection('shuzi132')
        .where({_openid:await app.openid()})
        .orderBy('addtime', 'desc')
        .skip(this.offset)
        .limit(this.limit)
        .get()
        .then(res=>{
          console.log(res);
          if(res.data.length<this.limit){
              this.hasMore=false;
          }
          if(res.data.length>0){
            this.formatRows(res.data);
          }
        })
    },
  formatRows(data){
    let rows=this.data.rows;
    data.forEach(r=>{
      r.dateStr=app.date_format(r.addtime,"`DAY||MM-DD` 周WW HH:II");
      let min=parseInt(r.time/60);
      r.timeStr=(min>0?(min+'分'):'')+(r.time%60)+'秒';
      r.oklv=(((r.total-r.totalFail)/r.total)*100).toFixed(2)+'%'
      r.sulv=(r.time/r.total).toFixed(2);
      r.result='B';
      if(r.total==132 && r.time<420){
        r.result='A';
      }
      if(r.total==66 && r.time<210){
        r.result='A';
      }
      if(r.totalFail==0){
        if(r.sulv<2 ){
          r.result='A+';
        }
        if(r.sulv<1.36){
          r.result='A++';
        }

      }
      if(r.totalFail>=5){
        r.result='B';
      }
      rows.push(r);
    })
    this.setData({
      rows:rows
    })
  }
})