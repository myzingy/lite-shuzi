/**
 * Created by goto9 on 2018/12/13.
 */
const def=[
  {
    type: 'image',
    url: 'http://shuzi132-img.vking.wang/share.950.png',
    left: 0,
    top: 0,
    width: 950,
    height: 650
  },
  {
    type: 'image',
    url: 'http://shuzi132-img.vking.wang/sx%20%281%29.png-thumbShare',
    left: 23,
    top: 24,
    width: 464,
    height: 255
  },
  {
    type: 'text',
    textType: 'CN',
    content: '题型：',
    fontSize: 30,
    color: '#fefefe',
    textAlign: 'left',
    left: 550,
    top: 120,
    width: 423,
    bold:true,
  },
  {
    type: 'text',
    textType: 'CN',
    content: '题数：',
    fontSize: 30,
    color: '#fefefe',
    textAlign: 'left',
    left: 550,
    top: 170,
    width: 423,
    bold:true,
  },
  {
    type: 'text',
    textType: 'CN',
    content: '出错：',
    fontSize: 30,
    color: '#fefefe',
    textAlign: 'left',
    left: 550,
    top: 220,
    width: 423,
    bold:true,
  },
  {
    type: 'text',
    textType: 'CN',
    content: '综合得分：',
    fontSize: 50,
    color: '#fe3333',
    textAlign: 'left',
    left: 580,
    top: 350,
    width: 423,
    bold:true,
  }
];
const share={def:def}

module.exports={
  getShare(key='def'){
    return share[key]||share.def;
  },
}