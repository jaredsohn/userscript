// ==UserScript==
// @name           Argos: opt out
// @namespace      http://raines.me.uk/
// @description    Every time you order from argos.co.uk you have to remember to tick not to share your details or receive a newsletter. This script ticks the boxes for you.
// @include        https://www.argos.co.uk/*
// ==/UserScript==

var marketings = document.evaluate(
    "//li[@class='marketingonfo']/input[@type='checkbox'][@value='N']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < marketings.snapshotLength; ++i) {
    var marketing = marketings.snapshotItem(i);
    marketing.checked = true;
}

