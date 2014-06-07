// ==UserScript==
// @name           Google Edit For Chrome
// @version        1.0
// @namespace      http://userscripts.org
// @creator        Aytaç Yıldız
// @description    Eklenti chrome için yapılmıştır
// @tags           chrome google css hide edit
// @include        http://www.google.com.tr/*
// @include        http://*.google.com/*
// ==/UserScript==

var css = "#footer{display:none;}";
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 
}