// ==UserScript==
// @name           refresh button and mark all as read
// @namespace      http://userstyles.org
// @include        http://www.google.com/reader/view/*
// @description    shrink the "mark all as read" button and widen "refresh" button
// @website	   http://hronir.blogspot.com/?GrsMnk
// ==/UserScript==


var css = "#viewer-refresh tbody tr td div span { padding-left:160px !important; padding-right:160px !important;} #mark-all-as-read tbody tr td .button-body-container { height:1em !important; width:1em !important; bAAorder:3px solid #ff0000 !important; overflow:hidden !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}
