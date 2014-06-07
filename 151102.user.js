// ==UserScript==
// @name        startpage.com remove ads
// @namespace   startpage.com
// @description Removes ads from startpage.com before they are displayed.
// @include     https://startpage.com/*
// @include     https://*.startpage.com/*
// @run-at      document-start
// @version     2012-10-14
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("div#sponsored, a.bookmark { display: none !important}");
