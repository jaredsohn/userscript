// ==UserScript==
// @name          Icon Monday Couple jjang (Kang Gary x Song Ji Hyo) of Running Man.
// @namespace     http://userstyles.org
// @description	  Icon of Monday Couple jjang (Running Man).Just the icon will be change.
// @author        vijei.tumblr.com
// @edited        nazirahmoktar.tumblr.com
// @homepage      http://nazirahmoktar.tumblr.com
// @include       http://www.tumblr.com/
// @include       http://www.tumblr.com/*
// @include       http://http://www.tumblr.com//*
// @include       https://http://www.tumblr.com//*
// @include       http://*.http://www.tumblr.com//*
// @include       https://*.http://www.tumblr.com//*
// ==/UserScript==
(function() {
var css = "ol#posts li.post.new_post {background: #ffffff url('http://1.bp.blogspot.com/-2PJlNcwNnrw/TvMGyrfeH8I/AAAAAAAAE0M/tihgctH2Gtw/s1600/dash+monday+couple.png') center center no-repeat;}img[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{width:0;height:70px;padding-right:250px;opacity: 0;}\n/*";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var headNodes = document.getElementsByTagName("head");
	if (headNodes.length > 0) {
		var styleNode = document.createElement("style");
		styleNode.type = "text/css";
		styleNode.appendChild(document.createTextNode(css));
		headNodes[0].appendChild(styleNode); 
	}
}
})();