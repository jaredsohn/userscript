// ==UserScript==
// @name           accessible user.js
// @namespace      http://ss-o.net/
// @include        http://*
// @include        https://*
// ==/UserScript==
var us = document.querySelectorAll('a[href$=".user.js"]');
for(var i = 0;i < us.length;i++){
	var a = us[i], href = a.href;
	a.setAttribute("href", href + "#" );
	var gmlink = document.createElement("a");
	gmlink.href = href;
	gmlink.title = "Install Greasemonkey Script";
	gmlink.textContent = "[G]";
	a.parentNode.insertBefore(gmlink, a);
}
