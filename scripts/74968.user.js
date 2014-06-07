// ==UserScript==
// @name           Facebook.com - Hide Apps/Games/LikePages count
// @description    Makes the apps/games/likepages unread count not show
// @include        http://facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://facebook.com/*
// @include        https://www.facebook.com/*
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.7.6
// ==/UserScript==

// Message View
GM_addStyle("#appsNav a.item[href~='/apps/feed'] div.rfloat {display: none !important}");
GM_addStyle("#appsNav a.item[href~='/gifts'] div.rfloat {display: none !important}");
GM_addStyle("#pagesNav a.item[href~='/pages?ref=bookmarks'] div.rfloat {display: none !important}");
GM_addStyle("#pagesNav a.item[href~='/pages/feed?ref=bookmarks'] div.rfloat {display: none !important}");
GM_addStyle("#pagesNav a.item[href~='/addpage?ref=bookmarks'] div.rfloat {display: none !important}");
GM_addStyle("ul#home_stream.uiStream div.storyContent.storyInnerContent {display: none !important}");