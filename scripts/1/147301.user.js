// ==UserScript==
// @name          Ultimate Whovian [ModuleI]â€” Doctor Who Gallifreyan
// @namespace     http://userstyles.org
// @description	  Icons in Gallifreyan, compatible with the "new" tumblr layout.
// @author        Galifreyan Doctor Who Tumblr Icons
// @homepage      http://userstyles.org/styles/67915
// @include       http://www.tumblr.com/*
// @include       https://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".new_post_label{\nfont-size:0px !important;\n}\n\n.new_post_label_icon{background-image:none !important}\n\n#new_post{\nbackground: url(http://25.media.tumblr.com/tumblr_mam3e37V3f1qa0t06o10_r1_1280.png) center no-repeat;\nbackground-color:#fff !important;\n}";
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