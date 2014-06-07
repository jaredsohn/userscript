// ==UserScript==
// @name          Twitter Font
// @namespace     http://userscripts.org
// @description	  Trebuchet MS & Tahoma...
// @author        Amir Story
// @homepage      http://userscripts.org
// @include       http://https://.twitter.com/*
// @include       https://https://.twitter.com/*
// @include       http://*.https://.twitter.com/*
// @include       https://*.https://.twitter.com/*
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://*.twitter.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "* {\n	font-family: \"Trebuchet MS\", Tahoma, sans-serif !important;\n    }\n\n.tweet-row {\ndisplay: block;\nfont-size: 13px !important;\nposition: relative;\nline-height: 15px !important;\n}\n#session #screen-name {\nfont-size: 12px !important;\n}\n.component h2 {\nfont-size: 12px !important;\n}\n.component h2 {\nfont-size: 15px !important;\n}\n.tweet-text-rtl {\nfont-size: 12px !important;\ndirection: rtl;\nunicode-bidi: embed;\ntext-align: right;\npadding-right: 2px !important;\n}\n.details-pane .tweet-text-large {\nfont-family: \"Trebuchet MS\", Tahoma, sans-serif !important;\nfont-weight: normal !important;\nfont-size: 17px !important;\n}\nh3.retweets_count {\nfont-size: 15px !important;\n}\n.component h2 {\nfont-size: 12px !important;\nfont-weight: 300;\npadding-bottom: 6px !important;\n}\n.component .getting-started ol > li span {\nfont-weight: normal !important;\nfont-size: 12px !important;\n}\n.contact-import-services .service-button strong {\nfont-size: 12px !important;\n}\n#global-nav {\nfont-size: 12px !important;\n}\n.dashboard ul.trends, .dashboard ul.trends li {\nfont-size: 12px !important;\n}\n.details-pane .tweet-text-large {\nfont-family: \"Trebuchet MS\", Tahoma, sans-serif !important;\nfont-weight: normal !important;\nfont-size: 15px !important;\n}\n.trends-inline-controls {\nfont-size: 12px;\n}\n.user-static-list-item .user-screen-name, .user-small-list-item .user-screen-name {\ncolor: black;\nfont-weight: bold;\nfont-size: 12px;\noverflow: hidden;\n}\n\n\n\n.component div.definition {\nfont-size: 12px !important;\n}\n.component .promo strong {\nfont-size: 12px !important;\n}\n.dashboard .footer {\nfont-size: 11px !important;\n}\n.dashboard h3 {\nfont-size: 12px !important;\n}\ndiv.latest-tweet .tweet-row, div.truncated-tweet .tweet-row {\nfont-size: 11px !important;\n}\n\n.tweet-box h2 {\nfont-size: 15px !important;\n}";
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
