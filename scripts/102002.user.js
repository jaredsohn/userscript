// ==UserScript==
// @name           userscripts.org_autoreload
// @namespace      Jano1
// @description    If you get a 502/503/404 error on userscripts.org, the page reloads autmoatically.
// @version        1.01
// @include        http://userscripts.org/*
// ==/UserScript==

if(document.getElementsByTagName('h1')[0].innerHTML == '502 Bad Gateway'){
	window.location.reload(true);
}
if(document.getElementsByTagName('h1')[0].innerHTML == 'Error 503 Service Unavailable'){
	window.location.reload(true);
}
if(document.getElementsByTagName('h1')[0].innerHTML == '404 Not Found'){
	window.location.reload(true);
}