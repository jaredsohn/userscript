// ==UserScript==
// @name          Remove Chipmark Sidebar
// @namespace     http://userstyles.org
// @description	  This script takes off the left Chipmark sidebar from the "chipmark :: manage" page https://www.chipmark.com/Manage
// @author        crash
// @homepage      http://userscripts.org/scripts/show/9359
// @include       https://www.chipmark.com/Manage
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); td[style=\"width: 200px;\"] { display: none }";
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