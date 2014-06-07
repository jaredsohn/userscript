// ==UserScript==
// @name          No Dislike buttons for SHAYTARDS
// @namespace     http://userstyles.org
// @description	  Removes Dislike buttons from SHAYTARDS videos on YouTube.
// @author        shaytards
// @homepage      http://userscripts.org/97626
// @include       http://www.youtube.com/watch?*
// @include       https://www.youtube.com/watch?*
// @include       http://www.youtube.com/user/SHAYTARDS
// @include       https://www.youtube.com/user/SHAYTARDS
// ==/UserScript==
(function() {
var info = document.getElementsById("watch-username");
var user = /shaytards/.test(info);
var css = "#watch-like {\n float:left !important;\n width: 90px !important;\n margin-right: 2px !important;\n border: solid 1px #CCCCCC !important;\n border-radius: 3px !important;\n -moz-border-radius: 3px !important;\n -webkit-border-radius: 3px !important; }\n #watch-unlike { display: none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else if (user) {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();