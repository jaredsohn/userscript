// ==UserScript==
// @name          Help Duardo 'Report' Button
// @namespace     http://userstyles.org
// @description	  Changes look of 'Report' button
// @author        Duardo
// @contributor   komark
// @homepage      http://userstyles.org/styles/20147
// @include       http://*bungie.net/Forums/posts.*
// ==/UserScript==
(function() {
var css = "a.forum_post_report_button { background-image: url(http://s37.photobucket.com/albums/e55/drew_tucker21/bungie/helpduardo.gif) !important; background-position: 0 -20px !important; }\n\na.forum_post_report_button:hover { background-image: url(http://s37.photobucket.com/albums/e55/drew_tucker21/bungie/help-duardo2.gif) !important; background-position: 0 -20px !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
