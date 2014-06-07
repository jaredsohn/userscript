// ==UserScript==
// @name          OneNote Web App (SkyDrive): hide horizontal scroll bar
// @namespace     http://userscripts.org/topics/99057/scroll
// @include       /^https:\/\/skydrive.live.com\/.*&app=OneNote$$/
// @description   Hide stupid main browser horizontal scroll bar for "half-screen browser" (960 x 1080).
// @grant         GM_addStyle
// @version       0.03
// ==/UserScript==

// Version history
// 0.03 (2012-10-24) Initial release: now Tampermonkey-compatible! (CDATA purge)
// 0.02 (2012-10-24) Restricted @include to OneNote; 
// 0.01 (2012-10-23) Initial revision

GM_addStyle('html.fh .c_base { min-width: 940px; }');