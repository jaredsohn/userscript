// ==UserScript==
// @name        Workaround for userscripts.org constant 502 & 503 errors
// @include        http://userscripts.org/*
// ==/UserScript==

if(document.getElementsByTagName('h1').length && (document.getElementsByTagName('h1')[0].innerHTML == '502 Bad Gateway' || document.getElementsByTagName('h1')[0].innerHTML == 'Error 503 Service Unavailable')){
	setTimeout( function(){ window.location.reload(true); }, 200);
}