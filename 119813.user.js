// ==UserScript==
// @name          Icon Running Man Korean Variesty Show members.
// @namespace     http://userstyles.org
// @description	  Icon of Running Man members.Just the icon will be change.
// @author        vijei.tumblr.com
// @edited        nazirahmoktar
// @homepage      http://vijei.tumblr.com
// @include       http://www.tumblr.com/
// @include       http://www.tumblr.com/*
// @include       http://http://www.tumblr.com//*
// @include       https://http://www.tumblr.com//*
// @include       http://*.http://www.tumblr.com//*
// @include       https://*.http://www.tumblr.com//*
// ==/UserScript==
(function() {
var css = "ol#posts li.post.new_post {background: #ffffff url('https://lh6.googleusercontent.com/-dts1aLv6U_4/Tt5NL9OMFoI/AAAAAAAAEZA/WcpaCe5_kaI/s513/logo%2525201.png') center center no-repeat;}img[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{width:0;height:70px;padding-right:250px;opacity: 0;}\n/*";
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

