// ==UserScript==
// @name           Old at style in mention
// @namespace      http://redrum.cz
// @description    Use old style (non transparent) for at in mention
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// This work is licensed under WTFPL license

GM_addStyle("span.at { opacity: 1.0 !important }");

