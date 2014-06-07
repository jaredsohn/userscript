// ==UserScript==
// @name          Legend of Aurea Font Hack v0.1
// @namespace     http://userscripts.org
// @description	  All this does is increase some font sizes.
// @author        emilami
// @homepage      http://userscripts.org/users/39048
// @include       http://legendofaurea.com/*
// @include       https://legendofaurea.com/*
// @include       http://*.legendofaurea.com/*
// @include       https://*.legendofaurea.com/*
// ==/UserScript==

var css = "td { font-size: 10pt !important; } quote { font-size: 10pt !important; }";

if (typeof GM_addStyle != "undefined") 
 {
	GM_addStyle(css);
 }
else if (typeof addStyle != "undefined") 
 {
	addStyle(css);
 } 
else 
 {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) 
         {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
         }
 }