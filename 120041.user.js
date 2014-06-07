// ==UserScript==
// @name          twitter-sane-layout
// @namespace     http://vrde.wordpress.com/
// @description   This little script fixes the new (dec 2011) twitter layout.
// @include       https://twitter.com/*
// @include       http://twitter.com/*
// @include       https://*.twitter.com/*
// @include       http://*.twitter.com/*
// @version       0.3
// ==/UserScript==

/* chrome does not understand regexp? mmh
  /^https?://twitter\.com/.*$/
*/

GM_addStyle(".dashboard { float: right !important; }");
GM_addStyle(".content-main { float: left !important; }");
GM_addStyle("#suggested-users { clear: none !important; }");
GM_addStyle(".dashboard .js-items-container .list-link { text-indent: 20px; ");
GM_addStyle(".dashboard .js-items-container .list-link i { -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg); left: 10px !important }");
