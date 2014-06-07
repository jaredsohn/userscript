// ==UserScript==
// @name       浙江省教育考试院分数查询系统兼容性改善脚本
// @namespace  http://zhjlab.sinaapp.com/
// @version    0.1
// @description  使浙江省教育考试院大多数分数查询页面兼容Chrome等现代化浏览器。注意：表单验证失效，请提交前自行核对。
// @match      http://cx.zjzs.net/*
// @copyright  2013+, James Swineson
// ==/UserScript==

(function() {
var load = function() {
var scriptTag = document.createElement('script');
scriptTag.src = '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js';
scriptTag.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(scriptTag);

load = function() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(load,100); }
   else { $ = unsafeWindow.jQuery; main(); }
  };
  return load();
}; load();

function main() {
  $("input[name='submit_query']") .removeAttr("onclick").attr("type","submit");
}
})();