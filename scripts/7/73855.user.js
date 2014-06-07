// ==UserScript==
// @name           Computerworld.com printer friendly
// @namespace      http://userscripts.org/
// @description    Changes til the printerfriendly version of all article pages
// @include        http://www.computerworld.com/s/article/*
// ==/UserScript==

  
var url = document.location.href;
if (url.match("print") == null){
	url = url.substr(0, 39) + "print/" + url.substr(39,500);
	document.location.replace(url);
}
