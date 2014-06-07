// ==UserScript==
// @name        Feedly Hide Recommendation Counts
// @namespace   none
// @description Get rid of space-consuming recommendation counts.
// @include     http://feedly.com/*
// @include     https://feedly.com/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(".recommendationInfo {display: none !important;}");