// ==UserScript==
// @name          Gmail MonoSpace Font
// @namespace     http://creazy.net/
// @description	  Use the Monospaced(Fixed) font for all mail bodies and new mail form in GMail.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @version       2.0.1
// ==/UserScript==

(function () {
	var styles
        = '.ii ,'
        + '.Ak ,'
        + '.LW-avf ,'
        + 'table.message tbody tr td font {'
        + '    font: normal 13px "Osaka-等幅","Osaka-Mono","ＭＳ ゴシック","MS Gothic",monospace !important;'
        + '    font-size: 13px !important;'
        + '    font-family: "Osaka-等幅","Osaka-Mono","ＭＳ ゴシック","MS Gothic",monospace !important;'
        + '}';
	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();