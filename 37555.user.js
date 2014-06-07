// ==UserScript==
// @name          Youtube - Old Video Size
// @namespace     http://userstyles.org
// @description	  Youtube changed all videos to widescreen, so I changed it back
// @author        Fishface2775
// @homepage      http://userstyles.org/styles/12407
// @include       *www.youtube.com/watch*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #movie_player { width: 75% !important; margin-left: 75px !important; } #watch-vid-title {margin-left: 74px !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
