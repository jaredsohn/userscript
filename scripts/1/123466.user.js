// ==UserScript==
// @name           Un-blackout English Wikipedia
// @namespace      b78a8959-1139-4093-a807-b7511b4bebfc
// @description    COMPLETELY disable the black out (SOPA/PIPA protest) of English Wikipedia on Jan 18, 2012 (The blackout overlay never shows, not appears then removed). You can also find instructions to un-blackout with Adblock Plus, NoScript, Stylish and Bookmarklet here: http://userscripts.org/scripts/show/123466 . Note: logged-in users need to LOG OUT to make the userscript work.
// @include        http://en.wikipedia.org/*
// @include        https://en.wikipedia.org/*
// @author         tomchen1989
// @version        1.0
// ==/UserScript==
function addStyleCompatible(css) {
	if (typeof(GM_addStyle) !== "undefined") {//Greasemonkey, Google Chrome
		GM_addStyle(css);
	} else {//others
		var head, style;
		head = document.getElementsByTagName("head")[0];
		if (!head) { return; }
		style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = css;
		head.appendChild(style);
	}
}
addStyleCompatible("#mw-page-base,#mw-head-base,#content,#mw-head,#mw-panel,#footer{display:block!important;}#mw-sopaOverlay{display:none;}");