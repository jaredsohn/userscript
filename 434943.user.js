// ==UserScript==
// @name        Facebook width adjustment
// @namespace   http://userscripts.org/users/200448
// @description Make stuff wider on FB
// @include     https://www.facebook.com/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("\
div#rightCol {display: none !important;}\
div#contentArea {width: auto !important;}\
");