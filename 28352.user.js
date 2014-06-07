// ==UserScript==
// @name           Hide visited links in Reddit
// @namespace      mjb.biglaughs.org
// @author		Mark Bigelow (mjbigelow at gmail)
// @include        http://*.reddit.com/*
// ==/UserScript==

var css = ".title.loggedin:visited { display:none; } .title.loggedin:visited + span { display:none; }";

var heads = document.getElementsByTagName("body");
if (heads.length > 0) {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 
}