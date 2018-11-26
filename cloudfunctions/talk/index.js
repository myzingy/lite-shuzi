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
exports.main = (event, context) => {
  console.log(event)
  console.log(context)

  var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
  var APP_ID = "14949012";
  var API_KEY = "RbdHgqPIX0P7ZimYjZInpW7U";
  var SECRET_KEY = "Hl3cS6v53GHkSZkmx2BBO6G6vlb7b2KR";

// 新建一个对象，建议只保存一个对象调用服务接口
  var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

  var HttpClient = require("baidu-aip-sdk").HttpClient;

  HttpClient.setRequestInterceptor(function(requestOptions) {
    // 查看参数
    console.log(requestOptions)
    // 修改参数
    requestOptions.timeout = 5000;
    // 返回参数
    return requestOptions;
  });

  let fs = require('fs');
  let voice = fs.readFileSync('assets/voice/16k_test.pcm');

  let voiceBuffer = new Buffer(voice);

  // 识别本地文件，附带参数
  client.recognize(voiceBuffer, 'amr', 16000, {dev_pid: '1536', cuid: Math.random()})
    .then(function (result) {
      console.log('<recognize>: ' + JSON.stringify(result));
    }, function(err) {
      console.log(err);
    });


return {
    openid: event.userInfo.openId,
  }
}