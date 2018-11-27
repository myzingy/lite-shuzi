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
var http = require('http');
var fs = require('fs');
var queryString = require('querystring');

function doUpload(url,filename,filesize=1024*1024){
  var boundaryKey = 'A' + new Date().getTime(); //随便加个前缀A 避免全数字作为分界符
  var parse_u=require('url').parse(url,true);
  var isHttp=parse_u.protocol=='http:';
  var options={
    host:parse_u.hostname,
    port:parse_u.port||(isHttp?80:443),
    path:parse_u.path,
    method:'POST',
    headers:{
      'Content-Type':'multipart/form-data; boundary='+boundaryKey,
      //'Content-Length':content.length
    }
  };
  //console.log('doUpload.options',options);

  return new Promise(function (success,fail) {
    var req = require(isHttp?'http':'https').request(options,function(res){
      var _data='';
      res.on('data', function(chunk){
        _data += chunk;
        //console.log('POST.data',_data);
      });
      res.on('end', function(endRes){
        //console.log('POST.end',endRes);
        //fn!=undefined && fn(_data);
        success(_data)
      });
    }).on('error', function(err){
      fail(err)
    });

    //ClientRequest writableStream 注意:文件字段的分界符
    req.write('--'+boundaryKey+'\r\nContent-Disposition:form-data; name="file"; filename="'+filename+'"\r\nContent-Type:audio/mp3');
    // 1M缓冲
    var fileStream = fs.createReadStream(filename, {bufferSize:filesize});
    fileStream.pipe(req, {end: false});

    fileStream.on('end', function(){
      // ::注意::文件字段内容和其他字段之间空2行，字段名和字段值之间空2行
      req.write('\r\n\r\n--'+boundaryKey+'\r\n'+'Content-Disposition: form-data; name="format"\r\n\r\n'+'wav');
      req.end('\r\n--'+ boundaryKey + '--'); //注意:结束时的分界符 末尾'--'
    });
  })
}
function download(url,filename){
  filename=filename.replace('.mp3','.wav')
  var parse_u=require('url').parse(url,true);
  var isHttp=parse_u.protocol=='http:';
  var options={
    host:parse_u.hostname,
    port:parse_u.port||(isHttp?80:443),
    path:parse_u.path,
  };
  console.log('download.options',options);
  return new Promise(function (success,fail) {
    var file = fs.createWriteStream(filename);
    require(isHttp?'http':'https').get(options, function(res) {
      res.on('data', function(data) {
        file.write(data);
      }).on('end', function() {
        file.end();
        success(filename)
      });
    }).on('error', function(err){
      fail(err)
    });
  })

}
function baiduApi(wavFile,cuid){
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
    //console.log(requestOptions)
    // 修改参数
    requestOptions.timeout = 5000;
    // 返回参数
    return requestOptions;
  });

  let voice = fs.readFileSync(wavFile);

  let voiceBuffer = new Buffer(voice);

  // 识别本地文件，附带参数
  return client.recognize(voiceBuffer, 'wav', 16000, {dev_pid: '1536', cuid: cuid})
}
function writeFile(fileName,dataBuffer){
  return new Promise(function(success,fail){
    fs.writeFile(fileName, dataBuffer, function(err) {
      //console.log(fileName,err)
      success(fileName);
    });
  })
}
exports.main = async (event, context) => {
  //update base64 mp3
  let dataBuffer = new Buffer(event.base64, 'base64');
  let fileName="/tmp/"+event.userInfo.openId+Math.random()+".mp3";
  fileName=await writeFile(fileName,dataBuffer);
  //let postRes=await post('http://api.rest7.com/v1/sound_convert.php',{format:'wav'})
  let postRes=await doUpload('http://api.rest7.com/v1/sound_convert.php',fileName)
  console.log('POST.res',postRes);
  if(postRes){
    postRes=JSON.parse(postRes);
  }
  let wavFile=''
  if(postRes.file){
    wavFile=await download(postRes.file,fileName)
    console.log('wavFile',wavFile);
  }
  let res={};
  if(wavFile){
    res=await baiduApi(wavFile,event.userInfo.openId);
  }
  return {wavFile:wavFile,...res}
}