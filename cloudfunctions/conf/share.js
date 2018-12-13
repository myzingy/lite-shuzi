/**
 * Created by goto9 on 2018/12/13.
 */
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
    content: '题型：',
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
    content: '题数：',
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
    content: '出错：',
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
    content: '综合得分：',
    fontSize: 40,
    color: '#fe3333',
    textAlign: 'left',
    left: 377,
    top: 230,
    width: 290,
    bold:true,
  }
];
let simple=JSON.parse(JSON.stringify(def));
simple[0].url='http://shuzi132-img.vking.wang/share-simple.950.jpg';
simple[1].left=23;
simple[1].top=131;
const share={
  def:def,
  simple:simple,
}

module.exports={
  getShare(key=''){
    if(!key){
      let ks=Object.keys(share);
      let ki=parseInt(new Date()/1000)%ks.length;
      key=ks[ki]
    }
    return share[key]||share.def;
  },
}