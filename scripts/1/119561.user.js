// ==UserScript==
// @name           Theme
// @description    Test
// @include        *facebook*
// @version        1.0!
// ==/UserScript==

(function() {
var css = "";
if (false || (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf(".facebook.com") + 1) == "facebook.com") || (document.domain == "ilike.com" || document.domain.substring(document.domain.indexOf(".ilike.com") + 1) == "ilike.com"))
	css += "html, body, #nonfooter, #booklet, #content, .UIFullPage_Container, .home, #facebook, .profile{ background: url(\"http://facebookskin.com/imgres/advancedmatrixphp.gif\")";
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