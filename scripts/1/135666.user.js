// ==UserScript==
// @name          Anchor Tumblr Icons
// @namespace     http://userstyles.org
// @description	  ANCHOR ICONS
// @author        ohhhlauren
// @homepage      http://userstyles.org/styles/46112
// @include       http://www.tumblr.com/dashboard*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "ol#posts li.post.new_post {\n\n\n\nbackground: #ffffff url('http://i51.tinypic.com/2qb5g8y.jpg') center center no-repeat;\n}\n\n.new_post_label{\nfont-size:11px !important;\npadding-top:10px !important;\nfont-family:helvetica !important;\ntext-transform: lowercase!important;\nletter-spacing:1px !important;\n}\n\n\n\n\n\n\nimg[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{\n\n\n\n    width:0;\n\n\n\n    height:70px;\n\n\n\n    padding-right:250px;\n\n\n\n    opacity: 0;\n\n\n\n}";
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