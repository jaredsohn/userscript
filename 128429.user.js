// ==UserScript==
// @name           Netvibes - stop fading headlines on mouseover
// @namespace      mikecupcake
// @include        http*://*netvibes.com/*
// ==/UserScript==

// in feed reader view, set mouseovered unread headlines to black
GM_addStyle("#feedReaderHeadlinesFrame div.unread a.headline-link:hover { color: #000000 !important; }  ");

// in main view, set mouseovered unread headlines to black
GM_addStyle(".rssItemList li.unread a:hover, .nv-feedList li.unread a:hover { color: #000000 !important; } ");

