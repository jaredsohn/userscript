// ==UserScript==
// @name           Gmail Spam-count Hide (no underline)
// @namespace      http://web.mit.edu/mathmike
// @description    Hide the spam-counter in Gmail for themes without underlines.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @version        1.01 2009-03-13
// ==/UserScript==

/* 
 * Same as http://userscripts.org/scripts/show/22660 but no underline.
 */
GM_addStyle("span#ds_spam b,.pX a[href$='#spam']{visibility:hidden;}span#ds_spam b::before,.pX a[href$='#spam']::before{content:'Spam';visibility:visible;font-weight:400;}");
