// ==UserScript==
// @name           Gmail Spam-count Hide
// @namespace      http://userscripts.org/scripts/show/22660
// @description    Hide the spam-counter in Gmail.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @version        3 (Unmastered)
// ==/UserScript==

/* Written 2010 by Jackpot08
 * Original version by daniel Rozenberg, http://userscripts.org/scripts/show/2210
 * This script is Public Domain.
 */
GM_addGlobalStyle=function(css) {
	var style = document.createElement("style");
	style.type = "text/css";
	style.appendChild(document.createTextNode(css));
	document.getElementsByTagName("head")[0].appendChild(style);
}
GM_addGlobalStyle("span#ds_spam b, div.Alfa2e a[href$='#spam']{visibility:hidden;} span#ds_spam b:before, div.Alfa2e a[href$='#spam']:before{content:'Spam';visibility:visible;font-weight:400}");
GM_addGlobalStyle("div.Alfa2e.ol a[href$='#spam']{visibility:visible;} div.Alfa2e.ol a[href$='#spam']:before{content: normal;}");
