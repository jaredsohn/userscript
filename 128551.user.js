// ==UserScript==
// @name           Reddit Row Striping
// @namespace      http://danielj.se
// @author         MaTachi
// @description    Makes it easier to read on Reddit with row striping and darker keywords.
// @include        http://reddit.com/*
// @include        https://reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.0
// ==/UserScript==
(function() {
var css = " \
	.even { \
		background-color: #FFFFFF; \
	} \
	.odd { \
		background-color: #e7e7e7; \
	} \
	.link .rank { \
		color: #777; \
	} \
	.link .score { \
		color: #777; \
	} \
	.link .score.likes { \
		color: #A64714; \
	} \
	.link .score.dislikes { \
		color: #29517e; \
	} \
	.domain a { \
		color: #555; \
		font-size: 12px; \
	} \
	.entry .buttons li a.comments { \
		color: #666; \
	} \
	.tagline time { \
		color: #444; \
	} \
"; 


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