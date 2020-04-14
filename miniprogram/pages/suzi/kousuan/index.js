// miniprogram/pages/suzi/kousuan/index.js
const app = getApp()
const {regeneratorRuntime} = app
Page({

    /**
     * 页面的初始数据
     */
    data: {
      packages:[],
      items: [
        {key: '+', label: '加法', checked: true},
        {key: '-', label: '减法', checked: true},
        //{key: 'AI', label: '智能辅助判断', checked: false},
      ],
      type:'10',
      dataLength:0,
      hideMask:true,
    },
  type:'10',
  type_index:'10',
    nums:[],
  hasAI:false,
  packages:[],
  art:'+,-',
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      this.type='10';
      try{
        this.type=await app.cache('type')||10;
        this.type_index=await app.cache('type_index')||10;
        this.setData({
          type:this.type,
        })
      }catch (e){}
      app.cloudHisCount();
      app.cloudConf({key:'autoday'}).then(conf=>{
        this.packages=conf.packages
        this.setData({
          packages:conf.packages
        })
        this.greateNums();
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    start(){
      if(this.nums.length<1){
        return app.toast('加减必须选一种');
      }
      wx.navigateTo({
        url:'./132?hasAI='+(this.hasAI?1:'')+'&art='+this.art+'&type='+this.type
      });
    },
  greateNums(fua=true,fus=true){
    let pack=this.packages[this.type_index];
    console.log('pack',this.packages,this.type,this.type_index,pack)
    let nums=[]
    if(fua){
      nums=nums.concat(pack.items[0].nums);
    }
    if(fus){
      nums=nums.concat(pack.items[1].nums);
    }
    this.nums=nums;
    console.log(this.nums,this.nums.length)
    app.cache('nums',this.nums);
    this.setData({
      dataLength:this.nums.length,
      nums:this.nums,
    })
  },
  checkboxChange(e){
    console.log(this.data.items);
    let val=app.val(e).toString();
    this.art=val;
    let fua=val.indexOf('+')>-1;
    let fus=val.indexOf('-')>-1;
    //this.hasAI=val.indexOf('AI')>-1;
    this.greateNums(fua,fus)
  },
  history(){
    wx.navigateTo({
      url:'./history'
    });
  },
  switchAi(e){
    this.hasAI=app.val(e);
    console.log('this.hasAI',this.hasAI);
  },
  activePack(e){
    let type=app.attr(e,'type');
    let type_index=app.attr(e,'index');
    if(type_index!=this.type_index){
      this.type=type
      this.type_index=type_index;
      this.setData({
        type:app.attr(e,'type'),
        packages:this.packages
      })
      app.cache('type',type);
      app.cache('type_index',type_index);
    }
    this.greateNums();
  },
  triggerMask(){
    this.setData({
      hideMask:!this.data.hideMask,
    })
  }
})