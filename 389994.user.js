// ==UserScript==
// @name        Taobao/Ali URL Cleanner
// @namespace   http://userscripts.org/users/orzfly
// @description 清理链接中的 spm 参数。
// @include     http://taobao.com
// @include     http://taobao.com/*
// @include     http://*.taobao.com
// @include     http://*.taobao.com/*
// @include     https://taobao.com
// @include     https://taobao.com/*
// @include     https://*.taobao.com
// @include     https://*.taobao.com/*
// @include     http://tmall.com
// @include     http://tmall.com/*
// @include     http://*.tmall.com
// @include     http://*.tmall.com/*
// @include     https://tmall.com
// @include     https://tmall.com/*
// @include     https://*.tmall.com
// @include     https://*.tmall.com/*
// @include     http://alipay.com
// @include     http://alipay.com/*
// @include     http://*.alipay.com
// @include     http://*.alipay.com/*
// @include     https://alipay.com
// @include     https://alipay.com/*
// @include     https://*.alipay.com
// @include     https://*.alipay.com/*
// @include     http://xiami.com
// @include     http://xiami.com/*
// @include     http://*.xiami.com
// @include     http://*.xiami.com/*
// @include     https://xiami.com
// @include     https://xiami.com/*
// @include     https://*.xiami.com
// @include     https://*.xiami.com/*
// @run-at         document-start
// ==/UserScript==

(function (){
	var cutEvent = function() {
		var x = document.getElementsByTagName("a")
		for(var i = 0; i < x.length; ++i){
			var anchor = x[i];
			anchor.href = anchor.href.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "");
		}
		return true;
	}
	if(window.addEventListener){
		document.addEventListener("keydown",cutEvent,false);
		document.addEventListener("mousedown",cutEvent,false);
	}
	else if(document.attachEvent){
		document.attachEvent("onkeydown",cutEvent);
		document.attachEvent("onmousedown",cutEvent);
	}
	cutEvent();
})()