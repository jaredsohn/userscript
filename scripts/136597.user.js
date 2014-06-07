// ==UserScript==
// @name        Ikariam Bogus Background Remover 4.5
// @namespace   http://localhost
// @description Ikariam Bogus Background Remover 4.5
// @downloadURL    https://userscripts.org/scripts/source/136597.user.js
// @updateURL      https://userscripts.org/scripts/source/136597.meta.js
// @include     http://m*.ikariam.*/*
// @version     3
// ==/UserScript==


GM_addStyle("div.content ul {background-image: none !important;}");
GM_addStyle(".dangerButton, .cancelUpgrade {background-image:none !important; background-color: FF6633;}");