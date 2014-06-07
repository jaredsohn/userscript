// ==UserScript==
// @name          Maraudr Link Bar
// @namespace     http://userstyles.org
// @description	  A new link bar that coincides with this theme: http://userstyles.org/styles/51262/marauders-map
// @author        avalonolava
// @homepage      http://userstyles.org/styles/51290
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "ol#posts li.post.new_post {\nbackground: #ffffff url('http://29.media.tumblr.com/tumblr_lpms0w4jPl1qbfge0o1_r1_500.png') center center no-repeat;\n}\n\nimg[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{\nopacity: .00 !important;\n}\n.new_post_label{\nfont-size:0px !important;\npadding-top:5px !important;\nfont-family:Georgia, Times New Roman, sans-serif !important;\nfont-style:italic !important;\ntext-transform: lowercase !important;\ncolor:#ffffff !important;\nletter-spacing:1px !important\n}";
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
