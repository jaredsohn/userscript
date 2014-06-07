// ==UserScript==
// @name        hideTwitterPromoted
// @namespace   DT
// @description Hides promoted tweets and accounts on Twitter
// @include     https://twitter.com/
// @include     http://twitter.com/
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(".promoted-tweet { display: none;}");
GM_addStyle(".promoted-account { display: none;}");