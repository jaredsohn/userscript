// ==UserScript==
// @name          Gintama Tumblr dash theme.
// @namespace     http://userstyles.org
// @description	  Swaps out the default Tumblr post icons on the dashboard with cute chibi icons from Japan's No.1 Anime show, Gintama, which The Warner Brothers called "The Most Messed-up Anime Mankind Has Ever Known". This theme does not touch other elements of the default Tumblr UI so you will find the change very subtle and pleasant while also making sure that updates to Tumblr UI, that don't affect the dashboard, will not ruin your experience in any way - I installed a red Tumblr dash theme the other day, but since it was not updated to support the newest Tumblr UI update, it was red in some places, blue in others making it real messy. This dash theme avoids this issue.
// @author        vijei.tumblr.com
// @homepage      http://vijei.tumblr.com
// @include       http://www.tumblr.com/
// @include       http://www.tumblr.com/*
// @include       http://http://www.tumblr.com//*
// @include       https://http://www.tumblr.com//*
// @include       http://*.http://www.tumblr.com//*
// @include       https://*.http://www.tumblr.com//*
// ==/UserScript==
(function() {
var css = "ol#posts li.post.new_post {background: #ffffff url('http://i.imgur.com/7h0tE.png') center center no-repeat;}img[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{width:0;height:70px;padding-right:250px;opacity: 0;}\n/*";
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
