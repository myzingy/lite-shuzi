// miniprogram/pages/suzi/kousuan/132.js
const {regeneratorRuntime} = getApp()
const recorderManager = wx.getRecorderManager();
let socketTask;
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
      gameover:false,
      hasPlay:false,
      totalFail:0,
    },
    nums:[],
  total:0,
  setIntervalTime:null,
  time:0,
  totalFail:0,
  rmOpen:false,
  onSocketOpen:false,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      this.initRM();
      this.wssInit();
      wx.setKeepScreenOn({
        keepScreenOn: true
      });
      let nums=await getApp().cache('nums');
      const shuffle = items => items.sort(() => Math.random() - 0.5);
      this.nums=shuffle(nums);
      this.total=this.nums.length;
      this.getNum()
    },
  onReady(){

  },
  async wssInit(){
    if(!this.onSocketOpen) {
      socketTask = wx.connectSocket({
        url: 'wss://vking.wang:8888',
        //url: 'wss://192.168.0.118:8888',
        header:{
          'content-type': 'application/json'
        },
        protocols: ['protocol1'],
        method:"GET",
        success: (res => {
          console.log('wss.connect', res)
        }),
        fail: (res => {
          console.log('wss.connectFail', res)
        })
      });
      socketTask.onOpen(res=>{
        console.log('wss.open',res)
        this.onSocketOpen=true;
        socketTask.send({
          data:'hello'
        });
      })
      socketTask.onMessage(res=>{
        console.log('wss.msg',res.data)
      });
      socketTask.onClose(res=>{
        console.log('wss.close',res)
      });
      socketTask.onError(res=>{
        console.log('wss.error',res)
      });
    }
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
          if(!this.data.hasPlay) return;
          let obj={}
          this.time+=1;
          let min=parseInt(this.time/60);
          obj.timeStr=(min>0?(min+'分'):'')+(this.time%60)+'秒';
          this.setData(obj)
        },1000)
      }
      //this.saveScore();

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
      recorderManager.stop();
      if(this.onSocketOpen){
        socketTask.close()
      }
      wx.redirectTo({
        url:'./index'
      })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      recorderManager.stop();
      if(this.onSocketOpen){
        socketTask.close()
      }
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
  getNum(success=true){
    if(this.nums.length<1){
      return;
    }
    let num=this.nums.shift();
    if(!success){
      this.nums.push(this.data.num);
    }
    this.setData({
      num:num,
      last:this.total-this.nums.length,
      total:this.total,
    })
  },
  passFlag:false,
  pass(){
    if(this.passFlag) return true;
    console.log(Math.random())
    this.passFlag=true;
    setTimeout(()=>{
      this.passFlag=false;
    },200)
    return false;
  },
  success(){
    if(this.data.gameover) return;
    if(this.pass()) return;
    if(this.nums.length==0){//答题完毕
      clearInterval(this.setIntervalTime);
      this.setIntervalTime=null;
      this.setData({
        gameover:true,
        totalFail:this.totalFail
      })
      this.saveScore();
      return;
    }
    this.getNum();
    this.startRM();
  },
  fail(){
    if(this.data.gameover) return;
    if(this.pass()) return;
    this.totalFail++;
    this.getNum(false);
    this.startRM();
  },
  start(){
    this.setData({
      hasPlay:true,
    })
    this.startRM();
  },
  saveScore(){
    const db = wx.cloud.database()
    db.collection('shuzi132').add({
      data: {
        type:'132',
        addtime: parseInt(new Date()/1000),
        total:this.total,
        totalFail:this.totalFail,
        time:this.time,
      }
    })
  },
  back(){
    wx.navigateBack();
  },

  ///RM
  startRM(){
    if(this.rmOpen) return;
    console.log('startRM');
    recorderManager.start({
      duration:1000*600,
      format:'mp3',//acc/mp3
      sampleRate:16000,
      //encodeBitRate: 64000,
      //sampleRate: 8000,
      numberOfChannels: 1,
      frameSize:7,
    })
  },
  stopRM(res){
    console.log(res);
  },
  initRM(){
    recorderManager.onError((res) => {
      this.rmOpen=false;
      console.log('recorder onError',res)
    });
    recorderManager.onStart((res) => {
      this.rmOpen=true;
      console.log('recorder start',res)
    });
    recorderManager.onStop((res) => {
      this.rmOpen=false;
      console.log('recorder onStop',res)
    });
    recorderManager.onInterruptionEnd((res) => {
      console.log('recorder onInterruptionEnd',res)
    });
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      //const base64 = wx.arrayBufferToBase64(frameBuffer)
      if(!res.isLastFrame && this.onSocketOpen){
        // wx.cloud.callFunction({
        //   name: 'talk',
        //   data: {
        //     base64: base64,
        //   }
        // }).then(function (res) {
        //   console.log('wx.cloud.talk',res)
        // })
        socketTask.send({
          data:frameBuffer
        })
      }
      console.log('recorder onFrameRecorded',res)
      //recorderManager.stop()
    });
  }
})