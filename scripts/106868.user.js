// ==UserScript==
// @name          Youtube - HD, 720p
// @namespace     http://userstyles.org
// @description	  Changes the resolution of the video in the enlarged video player to 1280x720px. This only affects the player when it is in wide mode.
// @author        none
// @homepage      http://userstyles.org/styles/25258
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// ==/UserScript==
(function() {
var css = "#watch-video.wide {\n    height: 765px !important;\n}\n\n.watch-wide .flash-player {\n    width: 1280px !important;\n    height: 750px !important;\n    margin-left: -213px !important;\n}";
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