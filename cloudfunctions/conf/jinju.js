/**
 * Created by goto9 on 2018/12/19.
 */
var fs = require('fs');
module.exports=function(){
  let text = fs.readFileSync('./jinju.txt','utf-8');

  let match=text.match(/(.*)[\r\n]+/g);
  let jinju=[];
  match.forEach((jj,i)=>{
    if(jj.indexOf('《朗读者》')>-1) return;
    jj=jj.replace(/[\r\n　]+/g,'').replace(/^[\d]+/,'');
    if(!jj) return;
    if(jj.indexOf('——')==0){
      jinju[jinju.length-1].author=jj.replace(/^——/,'——　')
    }else{
      jinju.push({txt:jj,author:''});
    }
  })
  //console.log(jinju);
  let ri=parseInt(Math.random()*jinju.length);
  console.log(jinju[ri]);
  return jinju[ri]
};
module.exports();