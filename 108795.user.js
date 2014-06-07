// ==UserScript==
// @name           Facebook Purity
// @namespace      http://www.iamronald.tk
// @description    Remove FB Make Facebook your Homepage
// @icon           http://alingbaby.files.wordpress.com/2010/12/icon_facebook.png
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        1.0.0
// (C) 2010 - 2011 Ronald Estacion
// ==/UserScript==
(function() {
var css = "#ConfirmBannerOuterContainer{visibility:hidden!important; display:none;!important;}";
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
