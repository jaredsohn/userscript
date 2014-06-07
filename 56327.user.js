// ==UserScript==
// @name           AgileZen Readability
// @namespace      http://userscripts.org/users/chillu
// @include        https://agilezen.com/*
// ==/UserScript==
var css = '#details ul li {margin-bottom: .5em;margin-top: .5em;}';
css += '#details p {line-height: 1.5em}';
GM_addStyle(css);