// ==UserScript==
// @name          Black to Blue - Tumblr V1
// @namespace     http://userstyles.org
// @description   Return tumblr to blue
// @author        Haxi
// @homepage      http://twitter.com/jevihax
// @include       http://tumblr.com/dashboard/*
// @include       http://tumblr.com/dashboard*
// @include       https://tumblr.com/dashboard/*
// @include       https://tumblr.com/dashboard*
// @include       http://tumblr.com/tumblelog/*
// @include       http://tumblr.com/tumblelog*
// @include       https://tumblr.com/tumblelog/*
// @include       https://tumblr.com/tumblelog*
// @include       http://www.tumblr.com/dashboard/*
// @include       http://www.tumblr.com/dashboard*
// @include       https://www.tumblr.com/dashboard/*
// @include       https://www.tumblr.com/dashboard*
// @include       http://www.tumblr.com/tumblelog/*
// @include       http://www.tumblr.com/tumblelog*
// @include       https://www.tumblr.com/tumblelog/*
// @include       https://www.tumblr.com/tumblelog*
// ==/UserScript==

(function() {
var css = "body {background: #2c4762;  !important;}\n\n#nav .nav_item .nav_item_nipple .nav_item_nipple_pixel {background: url(\"http://assets.tumblr.com/images/black_30.png\") top left repeat #2c4762;  !important;}\n\n#content { background: #2c4762;  !important; }\n\n";

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