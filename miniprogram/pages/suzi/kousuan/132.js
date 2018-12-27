// miniprogram/pages/suzi/kousuan/132.js
const app = getApp()
const {regeneratorRuntime} = app
const recorderManager = wx.getRecorderManager();
import ho from '../../../components/honor';
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
      timeLoadStr:['·','··','···','····','·····'],
      drawing:[],
      posterLoading:true,
      hasPosterShow:true,
      vertical:'',
    },
    nums:[],
  total:0,
  setIntervalTime:null,
  time:0,
  totalFail:0,
  rmOpen:false,
  onSocketOpen:false,
  hasAI:false,
  art:'',
  type:'',
  openid:'',
  countDay:0,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      console.log('options',options)
      this.hasAI=options.hasAI;
      this.art=options.art;
      this.type=options.type;
      this.initRM();
      this.wssInit();
      wx.setKeepScreenOn({
        keepScreenOn: true
      });
      let nums=await app.cache('nums');
      const shuffle = items => items.sort(() => Math.random() - 0.5);
      this.nums=shuffle(nums);
      this.total=this.nums.length;
      this.getNum()
      this.openid=await app.openid();
    },
  onReady(){
    app.cloudConf({key:'autoday'}).then(conf=>{
      app.cloudHisCount().then(res=>{
        let img=ho.getNextImage(res);
        console.log(conf,res,img);
        let drawing=conf.share;
        drawing[1].url=img+'-thumbShare';
        this.setData({
          drawing:drawing,
          vertical:(drawing[0].height>drawing[0].width)?'-vertical':'',
        })
        this.countDay=res.total
      })
    })
  },
  async wssInit(){
    if(!this.hasAI) return;
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
          data:this.data.num
        });
      })
      socketTask.onMessage(res=>{
        if(this.data.num){
          console.log('wss.msg',res.data);
          res=JSON.parse(res.data);
          if(res.reply==this.data.num && res.numStr){
            this.success()
          }
        }
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
          obj.time=this.time
          this.setData(obj)
        },1000)
      }
      //this.saveScore();

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      if(this.nums.length==0) {//答题完毕
        if (this.setIntervalTime) {
          clearInterval(this.setIntervalTime);
        }
        this.setIntervalTime = null;
        this.time = 0;
        recorderManager.stop();
        if (this.onSocketOpen) {
          socketTask.close()
        }
      }else{
        this.setData({
          hasPlay:false,
        })
      }
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
    if(this.onSocketOpen) {
      socketTask.send({
        data: num
      });
    }
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
      let drawing=this.data.drawing;
      drawing.forEach(d=>{
        switch (d.content){
          case 'TYPE':
            d.content='题 型：'+this.type+' '+this.art
            break;
          case 'TOTAL':
            d.content='题 数：'+this.total
            break;
          case 'TOTALFAIL':
            d.content=this.totalFail>0?('出 错：'+this.totalFail):'非常棒！全部正确'
            break;
          case 'TIMESTR':
            d.content='用时'+this.data.timeStr
            break;
          case 'COUNTDAY':
            d.content='坚持口算训练\n第'+this.countDay+'天'
            break;
        }
      })
      this.setData({
        gameover:true,
        totalFail:this.totalFail,
        drawing:drawing,
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
        type:this.type,
        addtime: parseInt(new Date()/1000),
        total:this.total,
        totalFail:this.totalFail,
        time:this.time,
        art:this.art,
      }
    })
    app.cloudHisCount({},'clear');
  },
  back(){
    //console.log('this.data.posterLoading',this.data.posterLoading)
    if(!this.data.posterLoading){
      return this.setData({
        hasPosterShow:false,
        posterLoading:true,
      })
    }
    wx.navigateBack();
  },

  ///RM
  startRM(){
    if(!this.hasAI) return;
    if(this.rmOpen) return;
    console.log('startRM');
    recorderManager.start({
      duration:1000*600,
      format:'mp3',//acc/mp3
      sampleRate: 16000,
      //encodeBitRate: 16000,
      numberOfChannels: 1,
      frameSize:7,
    })
  },
  stopRM(res){
    console.log(res);
  },
  initRM(){
    if(!this.hasAI) return;
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
  },
  completed(){
    this.setData({
      posterLoading:false,
    })
  }
})