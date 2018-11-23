// miniprogram/pages/suzi/kousuan/132.js
const {regeneratorRuntime} = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        width:100,
        height:100,
      num:"",
      last:0,
      total:0,
    },
    nums:[],
  total:0,
  setIntervalTime:null,
  time:0,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      wx.setKeepScreenOn({
        keepScreenOn: true
      });
      let nums=await getApp().cache('nums');
      const shuffle = items => items.sort(() => Math.random() - 0.5);
      this.nums=shuffle(nums);
      this.total=this.nums.length;
      this.getNum()
    },
    getNum(success=true){
        let num=this.nums.shift();
      if(!success){
        this.nums.push(this.data.num);
      }
        this.setData({
          //num:num,
          last:this.total-this.nums.length,
          total:this.total,
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
    onShow: async function () {
        let sys=wx.getSystemInfoSync();
        console.log(sys)
      this.setData({
        width:sys.windowHeight,
        height:sys.windowWidth,
      })
      if(!this.setIntervalTime){
        this.setIntervalTime=setInterval(()=>{
          let gameover=false;
          if(this.nums.length==0){
            clearInterval(this.setIntervalTime);
            this.setIntervalTime=null;
            gameover=true;
          }else{
            this.time+=1;
          }
          let min=parseInt(this.time/60);
          let timeStr=(min>0?(min+'分'):'')+(this.time%60)+'秒';
          this.setData({
            timeStr:timeStr,
            gameover:gameover,
          })
        },1000)
      }

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      if(this.setIntervalTime){
        clearInterval(this.setIntervalTime);
      }
      this.setIntervalTime=null;
      this.time=0;
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
  success(){
    this.getNum();
  },
  fail(){
    this.getNum(false);
  },
})