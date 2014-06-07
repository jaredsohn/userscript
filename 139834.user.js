// ==UserScript==
// @name          Save 115 resources to my 115 disk
// @author        tobewind
// @namespace     http://userscripts.org
// @version       0.0.1
// @description   将115禁止分享的未绑定手机用户资源转存到“我的网盘”
// @published     2012-08-02
// @include       http://115.com/*
// @include       http://www.115.com/*
// ==/UserScript==

var SaveButton;
SaveButton=document.createElement("div");
SaveButton.innerHTML = '<div style="margin: 0 225px 0 400px; ' +
	'border: 1px solid #000000; margin-bottom: 1px; ' +
	'font-size: 200%; background-color: #FFFF99; ' +
	'color: #000000;"><a align = "center" '+ 
  'href = "javascript:MoveMyFile.Show()" > ' +	'转存到我的网盘' +
	'</a></div>';

var Pos;
Pos = document.getElementById('js_user_info_box');
Pos.parentNode.insertBefore(SaveButton, Pos);
