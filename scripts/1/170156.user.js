// ==UserScript==
// @name          The Verge Wide
// @icon        http://i.imgur.com/SfDWYLz.png
// @namespace     http://userstyles.org
// @description	  less of unneeded things for better experience
// @author        BskyB
// @version	2013.09.29
// @homepage      http://userstyles.org/styles/86967
// @require    http://usocheckup.dune.net/170156.js
// @downloadURL		https://userscripts.org/scripts/source/170156.user.js
// @updateURL		https://userscripts.org/scripts/source/170156.meta.js
// @include       http://theverge.com/*
// @include       https://theverge.com/*
// @include       http://*.theverge.com/*
// @include       https://*.theverge.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".social-media-column, .vert300, .social-buttons,\n .btf-leaderboard, #comments, #leaderboard_ad, #network-bar,\n .column.grid_4.c-contain.border-l2.rightcol,\n .follow-the-verge.instapaper_ignore.entry-unrelated, .social-col,\n .story-navigation.row.clearfix, .comments, #modal_container, .vox-msg,\n #control_overlay {\ndisplay: none !important;\n}\n.article-body, .stream-summary, .c-contain {\nwidth: 979px !important;\n}\narticle.permalink .story-image img {\nwidth: 100% !important;\nheight: 100% !important;\n}\n.fixed .m-nav {\n    position: relative !important;\n    top: auto !important;\n    left: auto !important;\n    margin-left: 0px !important;\n}\n.m-nav__back-to-top {\n    width: 40px !important;\n}\n.m-nav__search {\n    margin-right: 0px !important;\n}\n.m-nav__back-to-top a:hover {\n    transform: rotate3d(-5,-5,-1,50deg) !important;\n}\n.m-nav__back-to-top a:active {\n    transform: rotate3d(5,5,1,50deg) !important;\n}\n.m-header {\n    margin-top: 0px !important;\n}\n.m-header.fixed {\n    padding-bottom: 0px !important;\n}";
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