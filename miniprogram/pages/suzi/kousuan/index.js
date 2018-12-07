// miniprogram/pages/suzi/kousuan/index.js
const app = getApp()
const {regeneratorRuntime} = app
const packages=[
  {
    type:'10',
    title:'10 以内加减法',
    items:[
      {key: '+', label: '加法', checked: true},
      {key: '-', label: '减法', checked: true},
    ]
  },
  {
    type:'20',
    title:'20 以内加减法',
    items:[
      {key: '+', label: '加法', checked: true},
      {key: '-', label: '减法', checked: true},
    ]
  },
];
Page({

    /**
     * 页面的初始数据
     */
    data: {
      packages:packages,
      items: [
        {key: '+', label: '加法', checked: true},
        {key: '-', label: '减法', checked: true},
        //{key: 'AI', label: '智能辅助判断', checked: false},
      ],
      type:'10',
    },
  type:'10',
    nums:[],
  hasAI:false,
  art:'+,-',
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      this.type='10';
      try{
        this.type=await app.cache('type');
        this.setData({
          type:this.type,
        })
      }catch (e){}
      this.greateNums();
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
        url:'./132?hasAI='+(this.hasAI?1:'')+'&art='+this.art
      });
    },
  greateNums(fua=true,fus=true){
    let packs={
      10:{min:0,max:10,sub_min:0,sub_max:10,sum_min:0,sum_max:10},
      20:{min:0,max:20,sub_min:11,sub_max:20,sum_min:11,sum_max:20}
    }
    let pack=packs[this.type];
    let nums=[]
    for(let i=pack.min;i<=pack.max;i++){
      for(let j=pack.min;j<=pack.max;j++){
        if(i-j>=pack.sub_min && i-j<=pack.sub_max && fus){
          nums.push(i+'-'+j);
        }
        if(i+j<=pack.sum_max && i+j>=pack.sum_min && fua){
          nums.push(i+'+'+j);
        }
      }
    }
    this.nums=nums;
    console.log(this.nums,this.nums.length)
    app.cache('nums',this.nums);
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
    if(type!=this.data.type){
      this.setData({
        type:app.attr(e,'type')
      })
      app.cache('type',type);
    }
    this.greateNums();
  }
})