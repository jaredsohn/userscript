// ==UserScript==
// @name       Black out Feedly edge background
// @namespace  http://adamnel.com
// @version    0.1
// @description  Since Feedly doesn't provide a true black background theme, this hacks one on
// @include    http://feedly.com/*
// @include    https://feedly.com/*
// @include    http://*.feedly.com/*
// @include    https://*.feedly.com/*
// @run-at     document-start
// @copyright  2013+, Adam Nelson
// ==/UserScript==
(function() {
    
    var css = "BODY.home {background: #000 !important;} #feedlyProBar, #feedlyMessageBar {display:none !important;}";
    
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
    
})();