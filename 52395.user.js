// ==UserScript==
// @name          iGoogle Remove Chat 
// @namespace     http://userscripts.org/users/americanjesus
// @description   Removes Chat from iGoogle page
// @author        American_Jesus
// @version       2009.06.25
// @include       http://www.google.tld/ig*
// @include       https://www.google.tld/ig*
// @include       http://www.google.com/ig*
// @include       https://www.google.com/ig*
// ==/UserScript==

(function() {
var css = " #tab_chat, .talk_roster, #talk_roster, .gtn-roster-iframe-id, .talk_container, .roster_parent{ display: none !important; }";
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