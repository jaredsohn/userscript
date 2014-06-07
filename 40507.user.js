// ==UserScript==
// @name           Facebook - "News Feed" -> "Stalker Feed!"
// @namespace      http://userscripts.org/users/noahrichards
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

var news_feed = document.getElementById("newsfeed_tabs_tab_0");

if (news_feed)
    news_feed.innerHTML = "Stalker Feed!";
