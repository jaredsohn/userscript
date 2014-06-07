// ==UserScript==
// @name           Twitter Balatarin 
// @namespace      http://dochar.com
// @description    script to add "balatarin this" links to twitters
// @include        http://twitter.com/home*
// @include        http://www.twitter.com/home*
// @include        http://twitter.com/public_timeline*
// @include        http://www.twitter.com/public_timeline*
// @include        http://twitter.com/favorites*
// @include        http://www.twitter.com/favorites*
// ==/UserScript==
// by Ali Mehrizi aka dochar (dochar@dochar.ir, http://dochar.com, http://mehrizi.ir), based on diggtwitter.user.js found on http://menti.net/?p=119
// 2007-Mar-26, version 0.0.1: first version
// 2007-Mar-27, version 0.0.2: changed balatarin.com to .info, to escape filtering

var allSpans, thisSpan;
var allLinks, thisLink;
var allAuthors, thisAuthor;

allSpans = document.evaluate(
    "//span[@class='meta']/span",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

allLinks = document.evaluate(
    "//span[@class='meta']/a[@href]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

allAuthors = document.evaluate(
    "//tbody/tr/td/strong/a[@title]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisSpan = allSpans.snapshotItem(i);
    thisLink = allLinks.snapshotItem(i);
    thisAuthor = allAuthors.snapshotItem(i);

    var balatarinthis = document.createElement("span");
    balatarinthis.innerHTML = '<a href="http://balatarin.info/links/submit?phase=2&url='+thisLink+'&title='+' &#1578;&#1608;&#1740;&#1740;&#1578;&#1585; &#1578;&#1608;&#1587;&#1591; '+thisAuthor+'" title="&#1576;&#1607; &#1576;&#1575;&#1604;&#1575;&#1578;&#1585;&#1740;&#1606; &#1576;&#1601;&#1585;&#1587;&#1578;&#1740;&#1583;"><img src="http://balatarin.info/images/web2/submit.png" alt="&#1576;&#1607; &#1576;&#1575;&#1604;&#1575;&#1578;&#1585;&#1740;&#1606; &#1576;&#1601;&#1585;&#1587;&#1578;&#1740;&#1583;" height="16" width="16" /></a>';
    thisSpan.parentNode.insertBefore(balatarinthis, thisSpan.nextSibling);

}




