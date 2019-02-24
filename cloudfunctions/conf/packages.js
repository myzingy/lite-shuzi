/**
 * Created by goto9 on 2018/12/13.
 */
const packages=[
  {
    type:'10',
    title:'10以内加减法',
    items:[
      {key: '+', label: '加法', checked: true,nums:[],roal:{
        pa:0,
        pb:10,
        min:0,
        max:10,
      }},
      {key: '-', label: '减法', checked: true,nums:[],roal:{
        pa:0,
        pb:10,
        min:0,
        max:10,
      }},
    ]
  },
  {
    type:'20进退位',
    title:'20以内进退位',
    items:[
      {key: '+', label: '加法', checked: true,nums:[],roal:{
        pa:1,
        pb:9,
        min:11,
        max:18,
      }},
      {key: '-', label: '减法', checked: true,nums:[],roal:{
        pa:1,
        pb:18,
        hasTuiwei:true,
        min:2,
        max:9,
      }},
    ]
  },
  {
    type:'20内加减9',
    title:'20内9的加减',
    items:[
      {key: '+', label: '加法', checked: true,nums:[],roal:{
        pa:0,
        pb:20,
        static:{
          pa:9,
          pb:9,
        },
        min:9,
        max:20,
      }},
      {key: '-', label: '减法', checked: true,nums:[],roal:{
        pa:0,
        pb:20,
        static:{
          pb:9,
        },
        min:0,
        max:11,
      }},
    ]
  },
  {
    type:'20以内加减法',
    title:'20以内加减法',
    items:[
      {key: '+', label: '加法', checked: true,nums:[],roal:{
        pa:1,
        pb:20,
        min:11,
        max:20,
      }},
      {key: '-', label: '减法', checked: true,nums:[],roal:{
        pa:1,
        pb:20,
        min:11,
        max:20,
      }},
    ]
  },
];

module.exports={
  greateNums(type=10,fukey='+',roal){
    let nums=[]
    for(let i=roal.pa;i<=roal.pb;i++){
      for(let j=roal.pa;j<=roal.pb;j++){
        if(roal.static){
          if(fukey=='+'){
            if(j+roal.static.pb<roal.max){
              nums.push(j+'+'+roal.static.pb);
              nums.push(roal.static.pb+'+'+j);
            }
          }else{
            if(j-roal.static.pb>=roal.min){
              nums.push(j+'-'+roal.static.pb);
            }
          }
        }else{
          if(j-i>=roal.min && j-i<=roal.max && fukey=='-'){
            if(roal.hasTuiwei){
              if(j>10 && j-10<i && i<10){
                nums.push(j+'-'+i);
              }
            }else{
              nums.push(j+'-'+i);
            }

          }
          if(i+j<=roal.max && i+j>=roal.min && fukey=='+'){
            nums.push(i+'+'+j);
          }
        }

      }
    }
    let uninums=nums.filter(function (element, index, self) {
      return self.indexOf(element) === index;
    })
    return uninums;
  },
  init(){
    let mp={};
    packages.forEach(p=>{
      p.items.forEach(item=>{
        item.nums=this.greateNums(p.type,item.key,item.roal)
      })
      mp[p.type]=p;
    })
    return mp;
  },
}