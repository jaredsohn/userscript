// ==UserScript==
// @name          pornhub - black, clean and no ads
// @namespace     http://userstyles.org
// @description	  pornhub.com user style which cleans up the layout, widens the page and player.
// @author        adultvideohelper
// @homepage      http://userstyles.org/styles/24432
// @include       http://pornhub.com/*
// @include       https://pornhub.com/*
// @include       http://*.pornhub.com/*
// @include       https://*.pornhub.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".ad_box {\ndisplay: none !important;\n}\n\n\n.pre-footer, .footer {\ndisplay: none !important;\n}\n\n\n.nf-adbox {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n.right-ads {\ndisplay: none !important;\n}\n\n\n.video-title-nf {\nwidth: 100% !important;\ntext-align: center !important;\nbackground: none !important;\n}\n\n\n.video-wrapper, .flv-player-new, #playerDiv_0 {\nwidth: 100% !important;\ntext-align: center !important;\n}\n\n#PHUBMXPlayer {\nwidth: 730px !important;\nheight: 570px !important;\n}\n\n\n.nf-sub_video {\nmargin: auto !important;\n}\n\n\ndiv[style=\"margin-top: 8px;\"] {\ndisplay: none !important;\n}\n\niframe {\ndisplay: none !important;\n}";
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