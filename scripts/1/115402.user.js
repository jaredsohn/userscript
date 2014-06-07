// ==UserScript==
// @name           Penny Arcade Forums Bookmark Highlight
// @namespace      http://engy.us/
// @description    Highlights bookmarked threads on the Penny Arcade forums
// @include        http://forums.penny-arcade.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$("li.Bookmarked").css("background-color", "#FFF29B");