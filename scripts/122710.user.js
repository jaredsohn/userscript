 // ==UserScript==
// @name		anti-publicidad para elmostacho
// @description         Elimina la publicidad ladilla del fondo de la página de elmostacho.com
// @include		http://elmostacho.com/*
// @run-at 		document-start
// ==/UserScript==
(function() {
var css = ".sidebanner{display:none}\n.side-banner{display:none}\n[id^=google_ads_div]{display:none}\nbody{background-image: none !important}";
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