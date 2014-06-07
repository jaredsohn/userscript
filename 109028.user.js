// ==UserScript==
// @name           Disable Google Search Hover
// @namespace      http://userscripts.org/users/125059
// @description    Disables the annoying popup for search results
// @include        http://*google.com/search*
// @include        https://*google.com/search*
// ==/UserScript==
(function() {
	var css = ".vspib { display:none; }"
		+ "#center_col { width: 700px !important; }"
		+ ".s { max-width: 650px !important; }";

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