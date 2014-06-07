// ==UserScript==
// @name       Hardwarezone.com.sg
// @version    0.1
// @description  Cleans up Hardwarezone.comsg
// @include			http*://forums.hardwarezone.com.sg/*
// ==/UserScript==

/*global unsafeWindow: true, GM_addStyle: true  */

GM_addStyle("td#right-ads,img[src^='/avatars'],div.hwz-ad-postbit,div[id^='hwz_ad_'],div#masthead,div#posts td.alt1 > div:not([id^='post_message']),\
	div#sponsored-links,table#forum-ads-table + div,div#footer,div#floating-toolbar { display: none !important; }\
#canvas.fixed { width: 100% !important; }");