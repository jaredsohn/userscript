// ==UserScript==
// @name          SubDued
// @description	  Hides comments on YouTube video pages.
// @author        Vague Rant
// @homepage      http://vaguerant.tumblr.com/
// @include       http://*youtube.*/watch?*
// @include       https://*youtube.*/watch?*
// ==/UserScript==

(function() {
var css = "DIV#comments-view>DIV.comments-section>H4:nth-child(1), DIV#comments-view>DIV.comments-section>UL.comment-list, DIV.yt-uix-pager, DIV#live-comments-setting-scroll { display: none !important; }";
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