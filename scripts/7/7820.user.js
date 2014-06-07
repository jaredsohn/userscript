// ==UserScript==
// @name           ScrollToNew
// @namespace      http://mywebsite.com/myscripts
// @description    Scrolls to the new item because for some damn reason the forum doesn't do that by itself?  Seriously WTF?
// @include        http://www.gamerswithjobs.com/node/*
// ==/UserScript==

window.setTimeout(function() {
var elSS = document.evaluate("//A[@id='new']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
elSS.snapshotItem(0).scrollIntoView(true);}, 3);