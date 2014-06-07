//
// Gmail Preview Pane Extend++
// Created by: ASB
//
//
// --------------------------------------------------------------------
// 
//  Sets the text size to 0.85% and puts labels to the left, in the
//  message list.
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Gmail Preview Pane Extend++
// @namespace     GMAIL
// @description   Smaller text (0.85) and labels to the left in message list
// @include       http*://mail.google.*/*
// @exclude       
// @version       0.3 Support for the GMail new ugly Look
// @history       0.2 Forcing labels to the left using !important attribute
// @history       0.1 Initial release
// ==/UserScript==
//
// --------------------------------------------------------------------

var css = "@namespace url(http://www.w3.org/1999/xhtml); .aim .p6,.aim .pM{border-radius:2px;}.nM{font-size:0.7em!important}.aps{background-color:#F9F9E0!important;color:#222!important}.at{box-shadow:1px 1px 2px #aaa;}.ar,.at,.au,.av{border-radius:2px}.apB{height:3ex!important;overflow:visible;}.yO{background-color:white}.akh{font-size:0.7em!important}.xY{font-size:0.7em!important}.xY .xS{padding-top:4px;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
