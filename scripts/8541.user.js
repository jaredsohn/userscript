// ==UserScript==
// @name           Mine
// @namespace      IDK yet
// @description    For MySpace Homepage
// @include       http://home.myspace.com/index.cfm?fuseaction=user&*
// ==/UserScript==

//style sheet
s= 'body {overflow:hidden;}';
s+= '#home_coolNewVideos {display:none;}';
s+= '#home_userURLInfo {display:none;}';
s+= '#home_setHomePage {display:none;}';
s+= '#home_greybox {display:none;}';
s+= '#home_schools {display:none;}';
s+= '#home_searchAddressBook {display:none;}';
s+= '#ctl00_Main_ctl00_CMS_ProfileHome_Gads_A {display:none;}';
s+= '#ctl00_Main_ctl00_CMS_ProfileHome_Gads_BD {display:none;}';

GM_addStyle(s);
