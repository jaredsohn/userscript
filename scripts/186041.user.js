// ==UserScript==
// @name          Always show attachment size in Gmail
// @namespace     http://userscripts.org/users/437446/scripts/gmail-attachment-size
// @include       http*://mail.google.com/mail/*
// @description   Always show attachment size in Gmail (currently only displays on hover as of Dec 2013)
// @grant         GM_addStyle
// @author        ypeels
// @version       0.001
// ==/UserScript==

/* Sigh, Gmail is treating its users dumber and dumber... */

GM_addStyle( '.aYp { display: block !important; }' );