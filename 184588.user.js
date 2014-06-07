// ==UserScript==
// @name          Supernatural followers, drafts, and posts
// @namespace     http://userstyles.org
// @description	  Revamp your posts, followers and drafts supernatural style.
// @author        Rhandrey
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".controls_section li .posts:before {\n\n  position: absolute !important;\n  height: 30px !important;\n  line-height: 28px !important;\n  width: 180px !important;\n  font: inherit !important;\n}\n\na.posts  div.hide_overflow{\n  visibility: hidden !important;\n}\n\n.controls_section li .posts:before {\n  content: \"Daily\" !important;\n}.controls_section li .followers:before {\n\n  position: absolute !important;\n  height: 30px !important;\n  line-height: 28px !important;\n  width: 180px !important;\n  font: inherit !important;\n}\n\na.followers  div.hide_overflow{\n  visibility: hidden !important;\n}\n\n.controls_section li .followers:before {\n  content: \"Hunters\" !important;\n}.controls_section li .drafts:before {\n\n  position: absolute !important;\n  height: 30px !important;\n  line-height: 28px !important;\n  width: 180px !important;\n  font: inherit !important;\n}\n\na.drafts  div.hide_overflow{\n  visibility: hidden !important;\n}\n\n.controls_section li .drafts:before {\n  content: \"Purgatory\" !important;\n}.controls_section li .activity:before {\n\n  position: absolute !important;\n  height: 30px !important;\n  line-height: 28px !important;\n  width: 180px !important;\n  font: inherit !important;\n}\n\na.activity  div.hide_overflow{\n  visibility: hidden !important;\n}\n\n.controls_section li .activity:before {\n  content: \"Case\" !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();