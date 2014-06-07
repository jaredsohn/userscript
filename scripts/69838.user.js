// ==UserScript==
// @name           hide sa forum avatars
// @namespace      http://userscripts.org/users/85054
// @description    Most of SA is work safe, but sometimes the avatars are not.
// @include        http://forums.somethingawful.com/showthread.php?*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); dd.title { display:none !important; }";
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
