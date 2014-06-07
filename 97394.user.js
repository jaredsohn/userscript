// ==UserScript==
// @name           Vintage Post Icons
// @namespace      http://userscripts.org/users/295307
// @author	   thirddeadlysin.tumblr.com
// @description    Vintage 'new post' icons for your dash with a bonus replacement tumblr logo
// @include        http://www.tumblr.com/*
// ==/UserScript==
(function() {
var css = "@import url(http://fonts.googleapis.com/css?family=Radley); #posts .post.new_post .new_post_label { color: #666; padding-top:5px; font-family: Radley, Verdana, Helvetica, sans-serif; } .nav_item { font-family: Radley, Verdana, Helvetica, sans-serif } #posts .post .post_info .private_label { background-color:#e90f3d; color:#fff; text-shadow:#000000 1px 1px 1px; } #logo {height: 0 !important;	width: 0 !important; padding-left: 240px !important; padding-top: 70px !important; background: url(http://i51.tinypic.com/nosvw5.png) no-repeat !important;} ol#posts li.post.new_post { background: #ffffff url('http://i56.tinypic.com/2bxlw2.jpg') center center no-repeat; }  img[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{ width:0; height:70px; padding-right:250px; opacity: 0; }" ;
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


