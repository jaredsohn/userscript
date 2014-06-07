// ==UserScript==
// @name          Modified User homepage
// @author        Eric Wolfe
// @description	  Gets rid of a few annoyances on the users home page
// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// ==/UserScript==

GM_addStyle("#home_additionalLinks {visibility:hidden;}");
GM_addStyle("#home_pickURL{visibility:hidden;}");
GM_addStyle("#home_userURLInfo {visibility:hidden;}");
GM_addStyle("#home_setHomePage {visibility:hidden;}");
GM_addStyle("#home_messages {position:relative; top:-240px;}");
GM_addStyle("#home_schools {position:relative; top:-240px;}");
GM_addStyle("#home_bulletins {position:relative; top:-240px;}");
GM_addStyle("#home_schools {position:relative; top:-240px;}");
GM_addStyle("#home_searchAddressBook{ position:relative; top:-240px;}");
