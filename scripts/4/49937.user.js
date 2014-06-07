// ==UserScript==
// @name               Dotted Links
// @author             MerlinSVK
// @description        Script shows 1px dotted line around hypertext links in Opera & Chrome, like Firefox does. 
// @include            *
// ==/UserScript==
(function() {
var css = "a:focus, a:active  { outline: 1px dotted invert !important; }";
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