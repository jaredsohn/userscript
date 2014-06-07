// ==UserScript==
// @name           Gmail Consider Nothing
// @version 1.05
// @namespace      http://b.enjam.in
// @description    Disable "Consider Including:" recommendations and other annoyances in Gmail
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://gmail.com/*
// @include        https://gmail.com/*
// @include        http://gmail.google.com/*
// @include        https://gmail.google.com/*
// @include        https://www.emailintervention.com/*
// @include        https://emailintervention.com/*
// ==/UserScript==

/* Based on 'Gmail: Hide Chat and invite boxes but not Docs' by     */
/* Chris Wood: http://gracefool.com                                 */
/* ..itself a modification of 'Hide Gmail Chat Box' by xarph        */
/* ..apparently a modification of 'Gmail Professional' by jbmarteau */
/*                Which really says it all, right?                  */

/* Version 1.01 removes "invite a friend" branding from main page   */
/* Version 1.05 removes "Share" button if you are a G+ member       */

var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Disable recipient recommendations */ .r4axtf, .cTSLAb, .GcwpPb-WhOend, .aaf, .gb_9a, [title=Share], .aai, #link_invite { display:none !important; visibility:hidden !important; }";
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