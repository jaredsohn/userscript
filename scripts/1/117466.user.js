// ==UserScript==
// @name           Facebook Plain Text Smilies
// @namespace      underyx
// @description    Replaces smilies in chat with their plain text equivalent.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        0.3
// ==/UserScript==

GM_addStyle(".emoticon{ display: none; }");
GM_addStyle(".emoticon_text{ display: inline; }");
