// ==UserScript==
// @name          Youtube - Clean Up & Grey Theme
// @namespace     http://userstyles.org
// @description	  Hides everything but the video, title, and description; applies a grey background.
// @author        legendeveryone
// @homepage      http://userscripts.org/scripts/show/105766
// @include       http://www.youtube.com/watch*
// @include       https://www.youtube.com/watch*
// ==/UserScript==
(function() {
var css = "body{background-color:#eaeaea !important;}\n #watch-description-extras {display:none !important;}\n #watch-description-extra-info {display:none !important;}\n #watch-discussion{display:none !important;}\n #watch-headline-user-info {display:none !important;}\n #watch-sidebar {display:none !important;}\n #watch-video-container {background-color:#eaeaea !important}\n .yt-alert-content{display:none !important;}\n #watch-container{background-color:#eaeaea !important;}\n #watch-headline{color:#eaeaea !important}\n #watch-headline-title{color:#000 !important;}\n #watch-headline-title a{color:#0066FF !important;}\n #footer-container {display:none !important;}\n #masthead-nav {display:none !important;}\n #masthead {display:none !important}";

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
