// ==UserScript==
// @name        Remove Captcha - Tny Paste
// @namespace   http://zdumb.byethost32.com/
// @author      Zdumb
// @homepage    http://zdumb.byethost32.com/
// @description Remove captcha from tny paste only
// @include     http://tny.cz/*
// @include     https://tny.cz/*
// @include     http://*.tny.cz/*
// @include     https://*.tny.cz/*
// @version     0.1
// @encoding    utf-8
// @icon        http://su.tru.io/991/web-icon.png
// @grant       none
// ==/UserScript==
(function() {
    var css = "#captcha_overlay {display: none !important;}";

	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
})();