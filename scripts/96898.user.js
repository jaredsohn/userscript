// ==UserScript==
// @name CleanTube
// @description Hide some YouTube"s elements. Many thanks to war59312 @ userstyles! ;)
// @include http://*.youtube.com/*
// @include http://youtube.com/*
// @author nabeschin
// @version 1.0.6
// @run_at document_start
// @lastupdated 17-02-2011
// ==/UserScript==

var wade = document.getElementById("watch-description");
if (wade) {
	wade.setAttribute("class", "watch-expander yt-uix-expander yt-uix-expander-animated");
}

(function () {
	var css = "#watch-discussion {\nmargin-top:0;\n}\n\n#watch-info {\nmargin-bottom:10px;\nborder:1px solid #CCC;\n-moz-box-shadow:0 0 0 rgba(0,0,0,0);\n-webkit-box-shadow:0 0 0 rgba(0,0,0,0);\n}\n\n#watch-info.expanded {\nborder:1px solid #CCC;\n-moz-box-shadow:0 0 0 rgba(0,0,0,0);\n-webkit-box-shadow:0 0 0 rgba(0,0,0,0);\n}\n\n.watch-expander-body yt-uix-expander-body {\nheight:auto;\n}\n\n.watch-extra-info {\nborder:1px;\nborder-top:1px;\nmargin:-1px;\n}\n\n.yt-rounded {\n-webkit-border-top-left-radius:5px;\n-webkit-border-top-right-radius:5px;\n-moz-border-radius-topleft:5px;\n-moz-border-radius-topright:5px;\nborder-top-left-radius:5px;\nborder-top-right-radius:5px;\n}\n\n#ad_creative_1,#default-language-box,#footer-container,#iyt-login-suggest-box,#masthead-utility,#masthead_child_div,#watch-description-rounded-top,#watch-embed,#watch-flag,#watch-more-related-button,#watch-share,#watch-headline-user-info,#watch-info .watch-expander-head {\ndisplay:none!important;\n}";
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