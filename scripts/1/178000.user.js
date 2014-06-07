// ==UserScript==
// @name         HTTPS-to-HTTP by Mandy
// @namespace    http://userscripts.org/users/522904
// @description  Redirect HTTPS to HTTP
// @include        http://*
// @include        https://*
// @grant        none
// @run-at       document-start

// @version      1.0.0

// ==/UserScript==

(function(){
	if(document.location.href.indexOf("https://")==0)
		document.location.href=document.location.href.replace('https://','http://');
})();