// ==UserScript==
// Copyleft 2013,网络孤独行客
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// @name        贴吧二维码
// @description 贴吧二维码
// @updateURL      https://userscripts.org/scripts/source/157982.meta.js
// @downloadURL    https://userscripts.org/scripts/source/157982.user.js
// @namespace   http://winbaike.com/qr
// @include     http://tieba.baidu.com/*
// @grant none;
// @version     0.01 Beta
// ==/UserScript==

function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; qr(); }
}
GM_wait();
function qr(){
	$(".editor_users").prepend("<input style='width:200px;height:25px;float:left;margin-right:10px;' placeholder='请在这里输入要转换成二维码的网址' id='code' type='text'/><input id='getCode' class='subbtn_bg' type='button' value='二维码'/>");
	$("#getCode").click(function(){
			var theCode=$("#code").val();
			var creadCode="http://chart.googleapis.com/chart?cht=qr&chs=250x250&choe=UTF-8&chld=L|4&chl=";
			var objCode=creadCode+theCode;
			var img='<img src="'+objCode+'&1.jpg'+'"class="BDE_Image" pic_type="1">';
			var bck=$(".tb-editor-editarea").html();
			$(".tb-editor-editarea").html(img+bck);
		}
	)
}