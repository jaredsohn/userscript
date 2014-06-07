// ==UserScript==
// @name auto SogouCloud IME
// @namespace http://sayson.blogbus.com/
// @description Auto load Sogou Cloud pinyin input method
// @include http://*
// ==/UserScript==

if(window.location.protocol !== "https:")
{
	var n=navigator.userAgent.toLowerCase();
	ie=n.indexOf('msie')!=-1?1:0;
	if(document.documentMode)ie=0;
	charset='';
	if(ie)charset=document.charset;
	src=ie&&charset=='utf-8'?'http://web.pinyin.sogou.com/web_ime/init2_utf8.php':'http://web.pinyin.sogou.com/web_ime/init2.php';
	element=document.createElement('script');
	element.setAttribute('src',src);
	document.body.appendChild(element);
}
