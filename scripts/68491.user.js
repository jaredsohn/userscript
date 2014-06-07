// ==UserScript==
// @name           Facebook Ad Remover
// @namespace      http://userscripts.org/users/127643
// @include        http://www.facebook.com/*
// @author         John Belisle
// @version        0.9.2
// @description    Removes Ads from your facebook page.
// ==/UserScript==
//
// Changes:
//
// 0.9.2 - 2009/02/08
// * Another new layout already. Removed a chunk of sponsored links from friends pages.
//   Still leaves ugly "Sponsored" line. Will try and get rid of that later.
//
// 0.9.1 - 2009/02/08
//  * Remove sponsored box from home page
//
// 0.9 - First release 2009/02/08

GM_addStyle("#pagelet_adbox{display: none}");
GM_addStyle("#pagelet_ads{display: none}");
GM_addStyle(".profile_two_columns #right_column{width: 720px}");
GM_addStyle("#right_column{width: 840px}");
GM_addStyle(".UIStandardFrame_SidebarAds{display: none}");
GM_addStyle(".ego_spo{display: none}");
GM_addStyle(".UIHomeBox_Sponsored{display:none}");
GM_addStyle("div.ego_header ~ div.ego_header {display:none}");