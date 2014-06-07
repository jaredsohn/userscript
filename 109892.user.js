// ==UserScript==
// @name          Hootsuite Meiryo Font
// @description	  Use a Meiryo font in Hootsuite.
// @include       http://hootsuite.com/*
// @include       http://www.hootsuite.com/*
// @include       https://hootsuite.com/*
// @include       https://www.hootsuite.com/*
// ==/UserScript==

(function () {
	var styles = "html { font-family: Meiryo,メイリオ !important;}";
	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();