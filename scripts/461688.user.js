// ==UserScript==
// @name        Reddit - Remove Trending
// @namespace   http://userscripts.org/users/GodOfAtheism
// @description Don't like trends? Get rid of the trending subreddits header
// @include     *.reddit.com/*
// @version     1.0
// ==/UserScript==
//1.0 Initial release

GM_addStyle(".content .trending-subreddits {display: none;}");