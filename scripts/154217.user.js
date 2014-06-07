// ==UserScript==
// @name        Always unfolded tweets
// @namespace   http://www.maatie.nl/
// @description Makes the irritating hover effect dissapear. The links to retweet, quote etcetera are now standard visible.
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @grant       GM_addStyle
// @version     1
// ==/UserScript==

GM_addStyle(".tweet-actions { display: inline-block; !important }");
GM_addStyle(".tweet .details { display: none; !important }"); 