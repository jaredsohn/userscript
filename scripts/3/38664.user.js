// ==UserScript==
// @name          OWA PlainText
// @namespace     http://userstyles.org
// @description	  it hacks owa2007's "PlainText" class to 10p
// @author        xabolcs
// @homepage      ----
// @include       http://....exch2007..../*
// @include       https://....exch2007..../*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml);  \
div.PlainText { font-size: 10pt !important} \
div.bdy { height: auto !important; }";
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