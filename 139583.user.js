// ==UserScript==
// @name        48 Comments Only
// @namespace   http://akr.tw/
// 
// @description Follow AKB48, SKE48, NMB48, HKT48 and JKT48 members on Google+
// @icon        data:image/png;base64,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
// 
// @author      akiratw
// @version     1.23
// @license     MIT License
// 
// @homepage    http://userscripts.org/scripts/show/120097
// @updateURL   https://userscripts.org/scripts/source/120097.meta.js
// 
// @include     https://plus.google.com/*
// @exclude     https://plus.google.com/*ripple/*
// @exclude     https://plus.google.com/*apps-static/*
// @exclude     https://plus.google.com/*notifications/frame*
// @domain      plus.google.com
// @domain      userscripts.org
// ==/UserScript==