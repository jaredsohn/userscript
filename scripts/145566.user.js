// ==UserScript==
// @name          Who's the peasant now?! (Tumblr | Disney Edition)
// @namespace     http://userstyles.org
// @description	  We're all familiar with the Disney logo, aren't we? Disney version of my other Tumblr theme. I still don't know how to link to things here.
// @author        Yurt
// @homepage      http://userstyles.org/styles/72403
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#home_button {\n\n    padding-right: 17px !important;\n}\n\n\n#home_button a {\n\n    height: 0 !important;\n    width: 0 !important;\n    top: -7px !important;\n    padding-left: 41px !important;\n    padding-top: 37px !important;\n    background: url('http://24.media.tumblr.com/tumblr_ma1rmfjypD1qefa3ho2_100.png') !important;\n}\n\n\n#home_button .tab_notice {\n    left: 49px !important;\n    right: auto !important;\n}";
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
