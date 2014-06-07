// ==UserScript==
// @name           Facebook Old Navbar Fix
// @author         Franx
// @namespace      http://userscripts.org/users/122428
// @version        1.1
// @description    Get the old navbar back!
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://fbcdn.net/*
// @include        https://fbcdn.net/*
// @include        http://*.fbcdn.net/*
// @include        https://*.fbcdn.net/*
// ==/UserScript==

(function() {
var css = "#pageHead {\n\nmargin-top: -11px !important;\n} #headNav {\nbackground-color: #3b5998 !important;\nborder-top: 1px solid #3b5998 !important;\nborder-right: 1px solid #3b5998 !important;\nborder-left: 1px solid #3b5998 !important;\n}\n\n.hasLeftCol #mainContainer { border-right: 0px !important; }\n\n.hasLeftCol #contentCol {border-left: 1px solid #FFFFFF !important; }\n#leftCol {border-right: 1px solid #FFFFFF !important; }\n\n#contentCurve { border: 1px solid #FFFFFF !important; }\n\n#footerContainer {\nborder-top: 1px dashed #FFFFFF !important;\n}\n\n#blueBar {\nbackground-color: transparent !important;\nbackground: url(\"http://i50.tinypic.com/9asqol.png\") bottom center no-repeat !important;\n}\n\n";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
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
})();