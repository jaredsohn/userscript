// ==UserScript==
// @name          Notification fixer for Lisp4Facebook
// @namespace     http://userscripts.org
// @description	  Replaces facebook.com instances with lisp4.facebook.com
// @include       http://lisp4.facebook.com/*
// @include       http://www.lisp4.facebook.com/*
// ==/UserScript==
// Notes:
//   Designed by Userscripts.org user RetypePassword. For use on networks where lisp4.facebook.com is used as an alternative.

setInterval(function() {
	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].href = links[i].href.replace("http://www.facebook", "http://www.lisp4.facebook"); } }, 200);
		