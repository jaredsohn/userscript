// ==UserScript==
// @name Twitter Hover Darkener
// @namespace Twitter-Hover-Darkener
// @description Darken the tweet that you have selected or moused over (for LCDs with bad white saturation levels)
// @include http://twitter.com/*
// @include https://twitter.com/*
// @match http://twitter.com/*
// @match https://twitter.com/*
// @run-at document-end
// @grant GM_addStyle
// @version 1.9
// ==/UserScript==

GM_addStyle(".tweet:hover, .tweet.focus, .stream-item.hovered-stream-item { background-color: rgb(230, 230, 230); !important }");