// ==UserScript==
// @name          Slim iGoogle
// @namespace     http://userstyles.org
// @description	  Slims the iGoogle header by removing the search box and account bar and resizing the theme header down to 100 pixels and removes the footer's content and scales it down to 20 pixels.
// @author        JustJohn
// @homepage      http://userstyles.org/styles/29605
// @include       http://www.google.com/ig*
// ==/UserScript==
(function() {
var css = "#gbar, #guser, .gbh, #promo, #footerwrapinner, #gsea {\n    display:none;\n}\n#footerwrap {\n    height:20px !important;\n}\n#nhdrwrapsizer {\n    height:100px !important;\n}\n#nhdrwrapinner, #nhdrwrap {\n    background-position:bottom !important;\n}";
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
