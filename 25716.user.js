// ==UserScript==
// @name           Hide MySpace Tabbed Videos
// @namespace      http://userscripts.org/people/51503
// @description    Hides the celebrity, film, comedy (etc.) tabs on your MySpace homepage
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// @exclude        http://comments.myspace.com/*
// ==/UserScript==

// Hide the tabbed videos
GM_addStyle("#ctl00_cpMain_MarketingBox_userHomeTabs_userHomeTabs {display:none;}");


GM_addStyle(s);