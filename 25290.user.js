// ==UserScript==
// @name           Block.OpenDNS Cleaner
// @namespace      Block.OpenDNS Cleaner
// @include        http://block.opendns.com
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); b div, .ads, .blocked-ads, #bottom, #canvas, #about, #text, #blocked-top, #blocked-bottom, #blocked-ads, #footer {display: none !important;} body {width:100% !important;} .blocked-content {width:90% !important; border: 1px solid red;} table {border:0 !important;}";if (typeof GM_addStyle != "undefined") {
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