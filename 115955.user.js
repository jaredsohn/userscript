// ==UserScript==
// @name          Blue to Black - Tumblr V1
// @namespace     http://rossotron.com
// @description   Return Tumblr's Dash to Black - for those who once had the Limited Edition Black Dashboard option but don't anymore, for whatever reason
// @author        Ross Goldberg
// @homepage      http://rossotron.com
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
var css = "body {background: #272727;  !important;}\n\n#nav .nav_item .nav_item_nipple .nav_item_nipple_pixel {background: url(\"http://assets.tumblr.com/images/black_30.png\") top left repeat #000000;  !important;}\n\n#content { background: #000000;  !important; }\n\n #right_column #dashboard_switch_blog_menu_wrapper #dashboard_switch_blog_menu a#dashboard_switch_blog_menu_header #dashboard_switch_blog_arrow_and_divider {border-top:1px solid #272727;}\n\nol#posts li.notification {background-color:#272727; border-bottom:1px solid #000000; color:#FFFFFF;}\n\nol#posts li.notification a{color:#FFFFFF;border-bottom:solid 1px #FFFFFF;}\n\nol#posts ol.notes li blockquote .ellipsis{color:#FFFFFF;}\n\nol#posts li.notification.alt{background-color:#272727;}\n\n";

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