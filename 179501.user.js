// ==UserScript==
// @name          brb.to Wide - No Ads
// @icon        http://i.imgur.com/z4lzN5U.png
// @namespace     http://userstyles.org
// @description	  no ads, wider articles
// @author        BskyB
// @version     2013.10.28
// @homepage      http://userstyles.org/styles/93817
// @require  http://usocheckup.dune.net/179501.js
// @downloadURL		https://userscripts.org/scripts/source/179501.user.js
// @updateURL		https://userscripts.org/scripts/source/179501.meta.js
// @include       http://brb.to/*
// @include       https://brb.to/*
// @include       http://*.brb.to/*
// @include       https://*.brb.to/*
// @include       http://sdf.to/*
// @include       https://sdf.to/*
// @include       http://*.sdf.to/*
// @include       https://*.sdf.to/*
// @include       http://brb.to/view*
// @include       http://sdf.to/view*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "sdf.to" || document.domain.substring(document.domain.indexOf(".sdf.to") + 1) == "sdf.to") || (document.domain == "brb.to" || document.domain.substring(document.domain.indexOf(".brb.to") + 1) == "brb.to"))
	css += "body, .b-body-branding-hr,.l-body-branding, .l-body-inner {\nbackground:#000000 URL('http://i.imgur.com/UTRmrmh.jpg') no-repeat center fixed !important;\nbackground-size:cover !important;\n}\n.b-filelist .filelist li.b-transparent-area {\n    z-index: 1 !important;\n}\n.b-spoiler .right, .l-content-center, .b-tab-item__vote, .l-content-center, .b-item-material-comments__item {\n    width: 100% !important;\n}\n.m-main {\nbackground:none !important;\n}\n.l-content > div > a, .b-promo-banner, .b-similar, #mid_banner_div,.h-ad, .b-ad-resizable, .b-body-branding-hr__left, .b-body-branding-hr__right,\n#adsProxy-zone-section-adsuniversal, .l-content-right, .b-adsuniversal-wrap, #adsProxy-zone-section-glowadswide,\n#b-seo-text-source, .b-adsuniversal-wrap, .l-footer-top,#center_banner_div, .b-ad-resizable, \n.l-body-branding-link, #adsProxy-zone-video, \n.b-material-new__player-gradient, .b-feedback,.l-fixed, .l-footer,#video_ablock, \n.b-ad-block-vertical {\ndisplay:none !important;\n}\n.b-item-material-comments__item-right {\n    width: 85% !important;\n}\n.l-tab-item-content .l-center {\n    width: 80% !important;\n}\n.b-social-icons {\nopacity:0.1 !important;\n}\n.b-social-icons:hover {\nopacity:1 !important;\n}\n.current-file-fullname {\nfont-family:calibri !important;\n}\n.b-poster, .m-video,.subject-link {\nborder-radius: 4px !important;\n}\n.b-item-material-comments__item-review-positive {\nbackground:#DDF9D1 !important;\n}\n.b-item-material-comments__item-review-negative {\nbackground:#FFDDDD!important;\n}";
if (false || (document.location.href.indexOf("http://sdf.to/view") == 0) || (document.location.href.indexOf("http://brb.to/view") == 0))
	css += ".l-content {\n background-color:transparent !important;\n }\n body, .b-body-branding-hr, .l-body-branding,.l-body-inner {\n background:black url('http://i.imgur.com/BhVrVWD.png') repeat !important;\n }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();