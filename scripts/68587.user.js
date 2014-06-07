// ==UserScript==
// @name           Google Buzz Count Hide
// @namespace      http://userscripts.org/scripts/show/68587
// @description    Hide the Google Buzz count in Gmail.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @version        1.0.1 2010-03-06
// ==/UserScript==

/* Written 2010 by Victor Zhang http://viczhang.com
 * Use at your own risk. 
 */

GM_addStyle("div.Alfa2e a[href$='#buzz']{visibility:hidden;} div.Alfa2e a[href$='#buzz']:before{content:'Buzz';visibility:visible;font-weight:400;text-decoration:underline;}");
GM_addStyle("div.Alfa2e.ol a[href$='#buzz']{visibility:visible;} div.Alfa2e.ol a[href$='#buzz']:before{content: normal;}");
GM_addStyle(".igqjf{visibility:hidden;}");