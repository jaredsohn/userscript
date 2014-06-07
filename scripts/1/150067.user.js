// ==UserScript==
// @name			IE剪贴板兼容程序 IE clipboard
// @namespace		com.jhdxr.userscript
// @id				com.jhdxr.userscript@ie_clipboard
// @description		很多网站的自身提供的复制粘贴功能都是IE ONLY的，本脚本实现了对其的支持。
// @include			http://*
// @include			https://*
// @include			file:///*
// @run-at			document-start
// @priority		999
// @copyright		jhdxr
// @version			0.2
// @updateURL		https://userscripts.org/scripts/source/150067.meta.js
// @homepage		http://www.jhdxr.com
// @contributionURL	https://me.alipay.com/jhdxr
// @contributionAmount	￥3.21
// ==/UserScript==

(function(){
	if(unsafeWindow.clipboardData != undefined){
		GM_log('window.clipboardData is already supported!');
		return;
	}
	if(!GM_setClipboard){
		alert('you need the latest scriptish to run this script!');
		return;
	}
	
	unsafeWindow.clipboardData = function(){}
	unsafeWindow.clipboardData.clearData = function(){
		GM_setClipboard('', 'text');
	}
	unsafeWindow.clipboardData.getData = function(type){
		throw Exception('unsupported method');
	}
	unsafeWindow.clipboardData.setData = function(format, data){
		if(typeof format === "string" && format.toLowerCase() === 'url'){
			format = 'html';
			data = '<a href="'+data+'">'+data+"</a>";
		}else{
			format = 'text';
		}
		GM_setClipboard(data, format);
	}
})();
