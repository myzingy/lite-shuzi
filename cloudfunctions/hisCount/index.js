// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含
 * - 小程序端调用传入的 data
 * - 经过微信鉴权直接可信的用户唯一标识 openid
 *
 */
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
function date_format(ns) {
  var result='YYYYMMDD';
  var time = new Date(ns*1000);
  result=result.replace('YYYY',time.getFullYear());
  var m=time.getMonth()+1;
  result=result.replace('MM',m>9?m:"0"+m);
  var d=time.getDate();
  result=result.replace('DD',d>9?d:'0'+d);
  return result;
}
exports.main = async (event, context) => {
  var openid=event.userInfo.openId;
  var total=0,last_addtime=0,addtime=0;
  try{
    var his=await db.collection('shuzi132').field({
      addtime:true,
    }).where({
      _openid:openid
    }).orderBy('addtime', 'desc').limit(200).get();
    if(his.data.length>0){
      his.data.forEach(r=>{
        if(last_addtime==0){
          last_addtime=r.addtime;
        }
        let date1=date_format(addtime);
        let date2=date_format(r.addtime)
        console.log('date1,date2',date1,date2)
        if(date1!=date2){
          total+=1;
          addtime=r.addtime;
        }
      })
    }
  }catch (e){

  }
  return {total:total,last_addtime:last_addtime}
}
