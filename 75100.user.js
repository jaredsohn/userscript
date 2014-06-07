// ==UserScript==
// @name          GMail Remove Task Link
// @version       0.3 (August 2010)
// @description   Remove tasks link from the left menu
// @author 	  jbmarteau 
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* REMOVE TASK LINK */ div[class=\"T3\"], div[class=\"J-M AW\"] > div > div:first-child +div +div +div {display: none !important;} {display: none !important; }" ;
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
})();