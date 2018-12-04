// miniprogram/pages/class/history.js
const app = getApp()
const {regeneratorRuntime} = app
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:app.date_format(app.time(),"YYYY-MM-DD"),
    hideCalendar:true,
    rows:[],
  },
  offset:0,
  limit:30,
  hasMore:true,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    try{
      let res=await this.getUserSetting();
      this.us=res.data[0]
    }catch(e){
      wx.navigateTo({
        url:'./setting'
      });
      return;
    }


    console.log('this.us',this.us);
    if(!this.us) return;
    await this.getClassAllOpenids();
    console.log('this.openids',this.openids);
    this.getClassHistory()
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
    this.getClassHistory();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showCalendar(){
    this.setData({
      hideCalendar:false,
    })
  },
  selectDate(e){
    console.log(e.detail.date);
    let obj={
      hideCalendar:true,
    }
    let dflag=false;
    if(e.detail.date!=this.data.date){
      obj.date=e.detail.date;
      dflag=true;
    }
    this.setData(obj);
    if(dflag){
      this.getClassHistory();
    }
  },
  getClassHistory(){
    const db = wx.cloud.database()
    const _ = db.command
    let stime=app.strtotime(this.data.date+" 00:00:00")
    let etime=app.strtotime(this.data.date+" 23:59:59")
    console.log('getClassHistory',this.openids,stime,etime);
    db.collection('shuzi132')
      .where({
        _openid: _.in(this.openids),
        addtime: _.and(_.gt(stime), _.lt(etime))
      })
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
  us:'',
  async getUserSetting(){
    const db = wx.cloud.database();
    return db.collection('user_setting').where({
      _openid:await app.openid()
    }).get()
  },
  openids:[],
  childrens:[],
  async getClassAllOpenids(){
    const db = wx.cloud.database();
    try{
      let res=await db.collection('user_setting').where({
        teacher: this.us.teacher
      }).get();
      console.log('getClassAllOpenids',res);
      let openids=[];
      let childrens={};
      res.data.forEach(r=>{
        openids.push(r._openid);
        childrens[r._openid]=r;
      })
      this.openids=openids;
      this.childrens=childrens;
    }catch(e){
      console.log('getClassAllOpenids',e);
    }
  },
  formatRows(data){
    let rows=this.data.rows;
    data.forEach(r=>{
      r.dateStr=app.date_format(r.addtime,"周WW HH:II");
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
      let us=this.childrens[r._openid];
      r.us={
        number:us.number,
        name:us.name||us.nickname,
      }
      rows.push(r);
    })
    this.setData({
      rows:rows
    })
  }
})