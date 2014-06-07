// ==UserScript==
// @name       Remove Reddit Ad Bar
// @namespace  http://userscripts.org/scripts/show/162565
// @version    1.0
// @description  Remove's Reddit.com's ad bar.
// @match      http://www.reddit.com/*
// @copyright  2012+, You
// ==/UserScript==

var dombar;

dombar = document.getElementById("siteTable_promoted");

if (dombar) {
    dombar.remove();
}