// ==UserScript==
// @name        Feedly Hide Refresh Bar
// @namespace   none
// @description Get rid of space-consuming redundant Refresh bar.
// @include     https://feedly.com/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("#realtimeSign {display: none !important;}");