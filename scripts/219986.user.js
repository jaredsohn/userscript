// ==UserScript==
// @name       add yinote to mail.189.cn
// @namespace  http://www.yinote.com/
// @version    0.1
// @description  add yinote to mail.189.cn
// @include		http://webmail*.189.cn/webmail/navigator.do
// @require		http://libs.baidu.com/jquery/1.9.1/jquery.min.js
// @copyright  2012+, anda
// ==/UserScript==
console.log("sdsd");
$(function() {
    console.log("invoke here");
	$(".mailInto").append('<span class="yinote ico" onclick="window.open(\'http://api.anda.io/unifyaccounts/webnote/login/normal\');return false;" title="翼笔记"><a class="colorC" style="text-decoration:none;" href="http://api.anda.io/unifyaccounts/webnote/login/normal">翼笔记</a></span>');
    $(".mailInto").css("height", "165px");
    $(".mailInto").css("background", "url('http://psa.anda.io/image/navMailInto.gif') 0px 0px no-repeat");
    $("span.yinote").css("background", "url('http://psa.anda.io/image/yinoteicon.png') no-repeat 10px 3px");
});
