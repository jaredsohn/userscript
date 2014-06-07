// ==UserScript==
// @name           FriendFeed Static Sidebar Tweak
// @namespace      http://3on.us/
// @description    Make the FriendFeed Sidebar static for constant access despite scrolling & tighten/move up to show more items. For use with "Helvetica" FF theme. Tighten main column & highlight owner comments in light-blue. CSS changes only.
// @include        http://friendfeed.com/*
// @include        https://friendfeed.com/*
// ==/UserScript==

GM_addStyle("#sidebar{position:fixed;top:20px;left:900px;font-family:Verdana,Helvetica,sans-serif;!important;}");
GM_addStyle("#sidebar div.friends{!important;}"); // could hide the semi-nonsensical (and duplicate) "Friends" heading/link with "display:none;" if desired
GM_addStyle("#sidebar div.footer{font-size:8px;margin-top:-10px;margin-left:40px;!important;}");
GM_addStyle("#sidebar div.box{margin-top:-20px;padding-top:0px;!important;}");
GM_addStyle("#sidebar li{font-size:11px;!important;} #sidebar li div{display:none;!important;}"); // hide the Group "last update" time, saves a line each
GM_addStyle("#sidebar div.box-bar{border-bottom:none;margin-bottom:-10px;!important;}");
GM_addStyle("#body{font-size:12px;font-family:Verdana,Helvetica,sans-serif;!important;}");
GM_addStyle("#body div.info, #body div.info a, div.clusterlink a, #body div.comment div.content, #body div.likes {font-size:10px;!important;}");
GM_addStyle("#body div.sharebox{margin-bottom:22px;!important;}");
GM_addStyle("#body div.l_entry{margin-top:8px;padding-top:0px;!important;}");
GM_addStyle("#body div.clear{margin-top:-10px;padding-top:0px;!important;}");
GM_addStyle("#body div.comment div.content {font-size:11px;color:#101030;!important;}");
GM_addStyle("#body div.owner div.content {background:#ddeeff;!important;}");
