// ==UserScript==
// @name        Deadfix nav
// @namespace   http://www.maatie.nl/
// @description Makes the the navigation on Deadfix more usable for humans. Why is the Last button the biggest? Is is used only by accident.
// @include     http://deadfix.com/*
// @grant       GM_addStyle
// @version     1
// ==/UserScript==
GM_addStyle("a.nextpostslink:before {content:'Next '; font-weight:600;}"); 
GM_addStyle("a.previouspostslink:after {content:' Back'; font-weight:600;}");
GM_addStyle("a.last {font-size:11px;}");
GM_addStyle("span.pages{color:#9C9C9C;font-size:11px;}"); 