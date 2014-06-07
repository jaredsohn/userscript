// UT San Diego Paywall Breaker
// version 0.2
// Ben Katz
// 2013-10-13
// Released to the public domain.
//
// ==UserScript==
// @name          UT San Diego Paywall Breaker
// @description   Eliminates the UT San Diego Paywall
// @include       http://*.utsandiego.com/*
// @grant         none

// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.1:
// Released: 2013-08-27
// Version 0.2:
// Released: 2013-10-13
// Description: Bug Fixes
// ==/RevisionHistory==

(function () {
    setCookie("content_meter",0,"30","/");
    setCookie("content_meter",0,"30","/news/"); 
})();


function setCookie(name,value,days,path) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path="+path;
}