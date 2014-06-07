// ==UserScript==
// @name           Gmail Spam-count Hide
// @namespace      http://userscripts.org/scripts/show/22660
// @description    Hide the spam-counter in Gmail.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @version        1.25 2012-04-26
// ==/UserScript==

/* Written 2008 by Arend v. Reinersdorff, arendvr.com
 * Original version by daniel Rozenberg, http://userscripts.org/scripts/show/2210
 * This script is Public Domain.
 */

GM_addStyle("span#ds_spam b, div.TO a[href$='#spam']{visibility:hidden;} span#ds_spam b:before, div.TO a[href$='#spam']:before{content:'Spam';visibility:visible;font-weight:400;}");
GM_addStyle("div.TO.ol a[href$='#spam']{visibility:visible;} div.TO.ol a[href$='#spam']:before{content: normal;}");
