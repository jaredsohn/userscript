// ==UserScript==
// @name          Tumblr - Alternian Post Icons
// @namespace     http://carcinogeneticist.tumblr.com
// @description	  bluh bluh
// @author        carcinogeneticist
// @include       http://www.tumblr.com/*
// ==/UserScript==
(function() {
var css = "ol#posts li.post.new_post {\n\n\n\nbackground: #ffffff url('http://i56.tinypic.com/1zmz194.gif') center center no-repeat;\n\n\n\n}\n\n\n\n\n\n\n\nimg[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{\n\n\n\n    width:0;\n\n\n\n    height:70px;\n\n\n\n    padding-right:250px;\n\n\n\n    opacity: 0;\n\n\n\n}";
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
