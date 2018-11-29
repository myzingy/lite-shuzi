// miniprogram/pages/suzi/kousuan/index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
      items: [
        {key: '+', label: '加法', checked: true},
        {key: '-', label: '减法', checked: true},
        {key: 'AI', label: '智能辅助判断', checked: false},
      ]
    },
    nums:[],
  hasAI:true,
  art:'+,-',
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.greateNums()
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
        return getApp().toast('加减必须选一种');
      }
      wx.navigateTo({
        url:'./132?hasAI='+(this.hasAI?1:'')+'&art='+this.art
      });
    },
  greateNums(fua=true,fus=true){
    let nums=[]
    for(let i=0;i<=10;i++){
      for(let j=0;j<=10;j++){
        if(i-j>=0 && fus){
          nums.push(i+'-'+j);
        }
        if(i+j<=10 && fua){
          nums.push(i+'+'+j);
        }
      }
    }
    this.nums=nums;
    console.log(this.nums,this.nums.length)
    getApp().cache('nums',this.nums);
  },
  checkboxChange(e){
    console.log(this.data.items);
    let val=getApp().val(e).toString();
    this.art=val;
    let fua=val.indexOf('+')>-1;
    let fus=val.indexOf('-')>-1;
    this.hasAI=val.indexOf('AI')>-1;
    this.greateNums(fua,fus)
  },
  history(){
    wx.navigateTo({
      url:'./history'
    });
  }
})