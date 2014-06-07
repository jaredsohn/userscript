// ==UserScript==
// @name          tvgool.ro fancybox remover
// @description	  remove fancybox(likebox popup) from tvgool.ro
// @homepage      http://userstyles.org/styles/85156
// @include       http://tvgool.ro/*
// @include       https://tvgool.ro/*
// @include       http://*.tvgool.ro/*
// @include       https://*.tvgool.ro/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#fancybox-overlay,\n    #fancybox-loading,\n    #fancybox-wrap {\n        display: none !important;\n    }";
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
