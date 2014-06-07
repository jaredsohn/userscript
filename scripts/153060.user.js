// ==UserScript==
// @name          TF2Oputost Bumper
// @namespace     http://nmgod.com
// @description   Bumps trades in My Trades area of tf2outpost.com
// @include       http://www.tf2outpost.com/trades
// @copyright     NMGod
// @version        1.2
// @updateURL      http://userscripts.org/scripts/source/153060.meta.js
// @installURL     http://userscripts.org/scripts/source/153060.user.js
// ==/UserScript==

setTimeout(function() {
    $(".trade_bump").click()
}, 100);