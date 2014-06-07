// ==UserScript==
// @name           Torrent411 CLEANER
// @namespace      http://userscripts.org/scripts/show/82686
// @description    Vire les pubs de torrent411.com
// @include        http://www.torrent411.com/*
// ==/UserScript==

var xpathResult = document.evaluate('//td[div[@id="AF_TA"]] | //*[@class="title_ads"] | //*[@id="tadd"] | //*[@id="tagcloud"] | //*[@id="footer"] | //*[@id="vadd"] ', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<xpathResult.snapshotLength; i++) {
    var nodeToHide = xpathResult.snapshotItem(i);
    nodeToHide.style.display='none';
}

var xpathResult2 = document.evaluate('//IFRAME[@id="tadd-con"] | //IFRAME[@id="vadd-con"] | //IFRAME[@id="badd-con"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<xpathResult2.snapshotLength; i++) {
    var nodeToHide2 = xpathResult2.snapshotItem(i);
    nodeToHide2.src='';
}
