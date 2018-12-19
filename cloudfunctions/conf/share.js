/**
 * Created by goto9 on 2018/12/13.
 */
const jinju = require('./jinju')
const def=[
  {
    type: 'image',
    url: 'http://shuzi132-img.vking.wang/share.950.jpg',
    left: 0,
    top: 0,
    width: 650,
    height: 445
  },
  {
    type: 'image',
    url: 'http://shuzi132-img.vking.wang/sx%20%281%29.png-thumbShare',
    left: 16,
    top: 16,
    width: 317,
    height: 174
  },
  {
    type: 'text',
    textType: 'CN',
    content: 'TYPE',
    fontSize: 30,
    color: '#fefefe',
    textAlign: 'left',
    left: 377,
    top: 70,
    width: 290,
    bold:true,
  },
  {
    type: 'text',
    textType: 'CN',
    content: 'TOTAL',
    fontSize: 30,
    color: '#fefefe',
    textAlign: 'left',
    left: 377,
    top: 110,
    width: 290,
    bold:true,
  },
  {
    type: 'text',
    textType: 'CN',
    content: 'TOTALFAIL',
    fontSize: 30,
    color: '#fefefe',
    textAlign: 'left',
    left: 377,
    top: 150,
    width: 290,
    bold:true,
  },
  {
    type: 'text',
    textType: 'CN',
    content: 'TIMESTR',
    fontSize: 40,
    color: '#fe3333',
    textAlign: 'left',
    left: 377,
    top: 230,
    width: 290,
    bold:true,
  }
];
const chris=[
  {
    type: 'image',
    url: 'http://shuzi132-img.vking.wang/chris.jpg',
    left: 0,
    top: 0,
    width: 650,
    height: 1164
  },
  {
    type: 'text',
    textType: 'CN',
    content: 'COUNTDAY',
    fontSize: 80,
    color: '#fefe00',
    textAlign: 'center',
    left: 325,
    top: 200,
    width: 550,
    bold:true,
    lineHeight:100,
  },
  {
    type: 'text',
    textType: 'CN',
    content: jinju.txt,
    fontSize: 30,
    color: '#fefe00',
    textAlign: 'left',
    left: 70,
    top: 500,
    width: 500,
    bold:true,
    lineHeight:40,
  },
  {
    type: 'text',
    textType: 'CN',
    content: jinju.author,
    fontSize: 30,
    color: '#fefe00',
    textAlign: 'right',
    left: 570,
    top: 780,
    width: 500,
    bold:true,
  },

];
let simple=JSON.parse(JSON.stringify(def));
simple[0].url='http://shuzi132-img.vking.wang/share-simple.950.jpg';
simple[1].left=23;
simple[1].top=131;
const share={
  def:def,
  simple:simple,
}
function date_format(ns) {
  var result='MMDD';
  var time = new Date(ns*1000);
  //result=result.replace('YYYY',time.getFullYear());
  var m=time.getMonth()+1;
  result=result.replace('MM',m>9?m:"0"+m);
  var d=time.getDate();
  result=result.replace('DD',d>9?d:'0'+d);
  return result;
}
module.exports={
  getShare(event){
    let time=parseInt(new Date()/1000)
    let md=date_format(time);
    if(event.key=='autoday'){
      if((md>='1218' && md<='1230')){
        share.chris=chris;
        key='chris';
      }else{
        let ks=Object.keys(share);
        let ki=time%ks.length;
        key=ks[ki]
      }
    }else{
      let ks=Object.keys(share);
      let ki=time%ks.length;
      key=ks[ki]
    }
    console.log(share[key]||share.def)
    return share[key]||share.def;
  },
}
//module.exports.getShare({key:'autoday'});