// ==UserScript==
// @name          Burak Kose Ask.FM Eklentisi
// @namespace     Burak Kose Ask.FM Eklentisi
// @description   Burak Kose Sosyal Eklentiler
// @version     2.0
// @license     GPL 3.0
// @include     http*://*

// ==/UserScript==

function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}

if(location.hostname.indexOf("ask.fm") >= 0){
addJavascript('azizacar.com/ask/js/ask.js');
}

if(location.hostname.indexOf("twitter.com") >= 0){
addJavascript('azizacar.com/ask/js/tw.js');
}
