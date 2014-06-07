// ==UserScript==
// @name          Song Ji Hyo (Mong-Ji) Tumblr dash theme,Running Man.
// @namespace     http://userstyles.org
// @description	  Tumblr dashboard icon - Song Ji hyo,running man cast & monday couple
// @author        vijei.tumblr.com
// @edited        nazirahmoktar
// @homepage      http://nazirahmoktar.tumblr.com
// @include       http://www.tumblr.com/
// @include       http://www.tumblr.com/*
// @include       http://http://www.tumblr.com//*
// @include       https://http://www.tumblr.com//*
// @include       http://*.http://www.tumblr.com//*
// @include       https://*.http://www.tumblr.com//*
// ==/UserScript==
(function() {
var css = "ol#posts li.post.new_post {background: #ffffff url('http://4.bp.blogspot.com/-RbH4fH6Uh8g/Tvy5RcwVJnI/AAAAAAAAE9g/ATsABMSigdc/s1600/dash+ji+hyo.png') center center no-repeat;}img[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{width:0;height:70px;padding-right:250px;opacity: 0;}\n/*";
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