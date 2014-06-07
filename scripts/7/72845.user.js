// ==UserScript==
// @name           FB Show only Country Life
// @namespace      http://www.userscripts.org
// @description    FB Show only Country Life
// @include        http://www.facebook.com/home.php?filter=app_26947445683&show_hidden=true&ignore_self=true&sk=lf
// ==/UserScript==
(function() {
var css = "#contentArea div[id^=\"div_story_\"]:not([class*=\"aid_26947445683\"]) {\ndisplay:none !important;\n}";
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
