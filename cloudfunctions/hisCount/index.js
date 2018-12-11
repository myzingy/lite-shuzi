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
        if(addtime-43200>r.addtime || addtime==0){
          total+=1;
          addtime=r.addtime;
        }
      })
    }
  }catch (e){

  }
  return {total:total,last_addtime:last_addtime}
}
