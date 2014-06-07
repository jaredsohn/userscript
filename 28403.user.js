// ==UserScript==
// @name          Userscripts.org - bw's Black Design
// @namespace     http://userstyles.org
// @description	  Just a simple black Userscripts.org makeover. Code from userscripts.org ad remover and Widen userscripts.org description editor has been tossed in for good measure
// @author        blackwind
// @homepage      http://userstyles.org/styles/2459
// @include       http://userscripts.org/*
// @include       https://userscripts.org/*
// @include       http://*.userscripts.org/*
// @include       https://*.userscripts.org/*
// ==/UserScript==
(function() {
var css = "/* Userscripts.org - bw's Black Design * * Author : blackwind * Updated : April 5th, 2008 * Website : http://blackwind.org/ * Description : Gives Userscripts.org a new, dark look. */ @namespace url(http://www.w3.org/1999/xhtml); body, #content { background: #000000 !important; color: #CCCCCC !important; } #content > iframe { display: none !important; } #script_description_extended { width: 100% !important; } a:link { color: #FFFFFF !important; } a:visited { color: #EEEEEE !important; } a:hover { color: #FFFF00 !important; } input, select, textarea { background-color: #444444 !important; color: #FFFFFF !important; } label { color: #AAAA88 !important; } th { border: 1px solid #FFFFFF !important; } .author.vcard, .inv.lp { background-color: #555555 !important; color: #CCCCCC !important; } .by-author > .body.entry-content { background-color: #444444 !important; } .ca.inv { background-color: #555555 !important; } .date { color: #CCCCCC !important; } .notice, .stats { background-color: #AA0000 !important; color: #FFFFFF !important; border: 1px solid #888888 !important; } .role { color: #FFFF00 !important; } .title { font-weight: bold !important; }";
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
