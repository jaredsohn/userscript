// ==UserScript==
// @name           Lifehacker - Remove Gallery links
// @namespace      http://www.thewebsitetailor.com
// @description    Remove "/gallery" from links on Lifehacker
// @include        http://lifehacker.com*
// @include        http://*.lifehacker.com*
// @include        http://jezebel.com*
// @include        http://*.jezebel.com*
// @include        http://gizmodo.com*
// @include        http://*.gizmodo.com*
// @include        http://jalopnik.com*
// @include        http://*.jalopnik.com*
// @include        http://io9.com*
// @include        http://*.io9.com*
// @include        http://kotaku.com*
// @include        http://*.kotaku.com*
// @include        http://deadspin.com*
// @include        http://*.deadspin.com*
// @include        http://gawker.com*
// @include        http://*.gawker.com*
// @include        http://fleshbot.com*
// @include        http://*.fleshbot.com*
// ==/UserScript==

/* code heavily borrowed from Dive Into Greasemonkey - http://diveintogreasemonkey.org/ */

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.href = thisLink.href.replace(/\/gallery\/$/,'');
}
