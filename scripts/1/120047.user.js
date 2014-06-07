// ==UserScript==
// @name           Facebook Ad Remover Beta by Faridzhuan Firdaus
// @namespace      http://userscripts.org/users/127643
// @include        http://www.facebook.com/*
// @author         Faridzhuan Firdaus
// @version        beta
// @description    Very simple script to stop ads pane from displaying on Facebook pages.
// ==/UserScript==
//
// Changes:
//
// 1.0.1 - 2010/06/15
//
// 1.0 -2010/02/20
//  * 1.0 release
//
// 0.9.3 - 2010/02/11
//  * bumped version number due to plagiarism
//
// 0.9.2 - 2010/02/08
// * Another new layout already. Removed a chunk of sponsored links from friends pages.
//
// 0.9.1 - 2010/02/08
//  * Remove sponsored box from home page
//
// 0.9 - First release 2010/02/08

GM_addStyle("#pagelet_adbox{display: none}");
GM_addStyle("#pagelet_ads{display: none}");
GM_addStyle(".profile_two_columns #right_column{width: 720px}");
GM_addStyle("#right_column{width: 840px}");
GM_addStyle(".UIStandardFrame_SidebarAds{display: none}");
GM_addStyle(".ego_spo{display: none}");
GM_addStyle(".UIHomeBox_Sponsored{display:none}");
GM_addStyle("div.ego_header ~ div.ego_header {display:none}");