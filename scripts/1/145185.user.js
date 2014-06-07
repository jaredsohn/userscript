// ==UserScript==
// @name          tumblr - "Real" Post Counts
// @namespace     http://userstyles.org
// @description	  Displays the real truth behind your tumblr Post statistics. <b>NOTE:</b> Actual post statistics will display upon hover.
// @author        Ohne Mitleid
// @homepage      http://userstyles.org/styles/69607
// @include       http://www.tumblr.com/blog*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".controls_section li .posts:before,\n.controls_section li .followers:before,\n.controls_section li .messages:before,\n.controls_section li .drafts:before,\n.controls_section li .queue:before {\n  position: absolute !important;\n  content: \"A lot\" !important;\n  top: 8px !important;\n  left: 110px !important;\n  height: 30px !important;\n  line-height: 28px !important;\n  width: 92px !important;\n  font: inherit !important;\n  text-align: right !important;\n  color: inherit !important;\n  opacity: .5 !important;\n}\n.count {\n  visibility: hidden !important;\n}\n.controls_section li .posts:before {\n  content: \"A Lot\" !important;\n}\n.controls_section li .followers:before {\n  content: \"Enough\" !important;\n}\n.controls_section li .messages:before {\n  content: \"HAHAHA\" !important;\n}\n.controls_section li .drafts:before {\n  content: \"Draft?\" !important;\n}\n.controls_section li .queue:before {\n  content: \"?????\" !important;\n}\n.controls_section li .posts:hover:before,\n.controls_section li .followers:hover:before,\n.controls_section li .messages:hover:before,\n.controls_section li .drafts:hover:before,\n.controls_section li .queue:hover:before {\n  display: none !important;\n}\n.controls_section:nth-child(3) li:hover .count {\n  visibility: visible !important;\n}";
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
})()