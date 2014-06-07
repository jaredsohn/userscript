// ==UserScript==
// @name          Gmail MeiryoKe_Gothic Font
// @description	  Use a MeiryoKe_Gothic font in message bodies and textarea for GMail.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

(function () {
	var styles = "body#:10i { font-family: MeiryoKe_Gothic !important; font-size: 14px !important; }";
	var styles = "div.ii, textarea.dV, textarea.Ak { font-family: MeiryoKe_Gothic !important; font-size: 14px !important; }";
	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();
