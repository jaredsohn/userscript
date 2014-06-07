// ==UserScript==
// @name           Img size WTC Forums
// @namespace      *
// @include        http://forums.whatthechrist.com/viewtopic.php*
// ==/UserScript==

(function() {
css =  '.content img, .attach-image img {max-width: 100% !important;}';
css += '.attach-image {max-height: none; overflow: visible;}';

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