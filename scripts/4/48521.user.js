//v0.1
// ==UserScript==
// @name		  grooveshark no banner
// @namespace	 http://t-trace.blogspot.com/
// @description   remove the ugly right banner of grooveshark. It use jquery that is already loaded on the grooveshark site.
// @include	   http://listen.grooveshark.com/*
// ==/UserScript==

$("#adBar")[0].parentNode.removeChild($("#adBar")[0]); $("#mainContentWrapper").css({"margin-right":"0px"});