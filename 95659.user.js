// ==UserScript==
// @name          MAT MUSTO tumblr post icon
// @namespace     http://userstyles.org
// @description	  MAT MUSTO TUMBLR ICONS
// @author        chelseaaaron
// @homepage      http://userscripts.org/users/284731
// @include       http://www.tumblr.com/*
// ==/UserScript==
(function() {
var css = "ol#posts li.post.new_post {\n\nbackground: #ffffff url('http://i54.tinypic.com/346035t.png') center center no-repeat;\n\n}\n\n\n\nimg[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{\n\n    width:0;\n\n    height:70px;\n\n    padding-right:250px;\n\n    opacity: 0;\n\n}";
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