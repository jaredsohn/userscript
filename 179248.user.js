// ==UserScript==
// @name          VietDesigner.Net theme for Facebook
// @namespace     http://userscripts.org
// @description	  VietDesigner.Net style for Facebook, easy to use
// @author        Banbaonylong
// @version       Beta 1
// @homepage      
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
(function() {
var css = "div#rightCol (display: none !important;} div#contentArea {width: 100% !important;}";

var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 
	
}


})();