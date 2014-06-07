// ==UserScript==
// @name          Help Ninjas 'Report' Button
// @namespace     http://userstyles.org
// @description	  Changes look of 'Report' button
// @author        Spartan 891
// @idea          ssTHC DJS1324/Duardo
// @contributor   Duardo
// @homepage      http://userstyles.org/styles/
// @include       http*://*bungie.net/Forums/posts.*
// ==/UserScript==
(function() {
var css = "a.forum_post_report_button { background-image: url(http://i.imgur.com/iyaxD.png) !important; background-position: 0 -20px !important; }\n\na.forum_post_report_button:hover { background-image: url(http://i.imgur.com/b6h63.png) !important; background-position: -123 -20px !important; }";
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
