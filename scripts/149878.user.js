// ==UserScript==
// @name       Fringe glyphs post icons
// @namespace  http://subject13fringe.tumblr.com/
// @version    0.1
// @description  New Post Icons replaced with the fringe glyphs
// @include       http://www.tumblr.com/*
// ==/UserScript==
(function() {
var css = ".new_post_label{\nfont-size:0px !important;\n\n}\n\n\n.new_post_label_icon{background-image:none !important\n}\nol#posts li.post.new_post {\n\n\n\nbackground: #ffffff url('http://static.tumblr.com/usldvzy/PF5mbllmj/picture1sss__1_.png') center center no-repeat;\n}\n\n.new_post_label{\nfont-size:11px !important;\npadding-top:10px !important;\nfont-family:helvetica !important;\ntext-transform: lowercase!important;\nletter-spacing:1px !important;\n}\n\n\n\n\n\n\nimg[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{\n\n\n\n    width:0;\n\n\n\n    height:70px;\n\n\n\n    padding-right:250px;\n\n\n\n    opacity: 0;\n\n\n\n}";
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