// ==UserScript==
// @name           hi5 Ad Removal
// @namespace      http://www.esteticu.org
// @description    removes hi5 ads and games bar
// @include         http://hi5.com/*
// @include         http://*.hi5.com/*
// ==/UserScript==
//Change Log:
//21/09/09 First release.
//09/11/09 Updated to new hi5 version

GM_addStyle("div#GamesToolbar { visibility:hidden;display:none;}");
GM_addStyle("div.pageLeaderAd { visibility:hidden;display:none;}");
GM_addStyle("div#PageLeader { visibility:hidden;display:none;}");


GM_addStyle("div#mrec-container { visibility:hidden;display:none; }");
GM_addStyle("div#compliments { visibility:hidden;display:none; }");


GM_addStyle("div.advertisement { visibility:hidden;display:none;}");
GM_addStyle("div.rect-300x250 { visibility:hidden;display:none;}");