// ==UserScript==
// @name           ebay fix tha pix
// @description    Attempts to fix links on thumbnail images in ebay search results so they open the item listing. NOT rigorously tested. 
// @namespace      http://tweaksthelimbs.org/greasemonkey
// @include        http://*shop.ebay.com/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var url;
var links;
var thisDiv;
var allDivs = xpath("//div[@class='rsic card']");
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    links = thisDiv.getElementsByTagName('a');
    url = links[links.length - 1].href;
    links[1].href = url;
    links[1].target = '_blank';
}