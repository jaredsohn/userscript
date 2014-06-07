// ==UserScript==
// @name        12306-decaptcha
// @namespace   whosemind.net
// @description 识别 12306.cn 的登录验证码
// @include     https://dynamic.12306.cn/otsweb/loginAction.do*
// @require      https://raw.github.com/justan/12306-decaptcha/master/lib/decaptcha12306.js
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// @version     0.0.2
// ==/UserScript==

var $ = unsafeWindow.$
 , input = document.getElementById('randCode')
 , log = function(str){
  GM_log(str);
  if(input && input.tagName == 'INPUT')  input.value = str;
 }
 , xhr = GM_xmlhttpRequest;

var imgsetUrl = 'https://raw.github.com/justan/12306-decaptcha/master/imageset.json'
 , ranId = 'img_rrand_code';


log('init..');
(function onload(){
  log('loading imageset..');
  GM_xmlhttpRequest({
    method: 'GET',
    //headers: {},
    url: imgsetUrl,
    onload: function(data){
      var imgset = JSON.parse(data.responseText);
      var img = document.getElementById(ranId);
      img.onload = function(){
        dosth(img, imgset);
      };
      dosth(img, imgset);
    },
    onerror: function(e){
      log('xhr error: ' + JSON.stringify(e));
    }
  });
})()

function dosth(img, imgset){
  var result = decaptcha.recognizer(img, imgset).result.join('');
  var title;
  
  log(result);
  if(result.length !== 4){
    setTimeout(function(){
      img.src = img.src.replace(/(&[\d\.]*)?$/, '&' + Math.random());
    }, 1000);
    title = '识别错误, 重试中'
  }else{
    title = '识别结果: ' + result + ' 点击验证码重试';
  }
  input.title = img.title = title;
}
