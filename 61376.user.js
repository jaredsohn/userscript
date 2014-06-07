// ==UserScript==
// @name           NoEngadgetAds2
// @version        0.20
// @description    Remove all engadgetads
// @include        *engadget*.com*
// ==/UserScript==

var classes = new Array("stats_inner","adsDiv1","adsDiv2","skyscraper","topLeader","cobrand_hdr","outerslice","adDiv","slice","omniture","inpostad","sponsorArea" );

for(var x = 0; x < classes.length;x++)
{

  var elements = document.evaluate("//*[contains(@class, '"+ classes[x] +"')] | //*[contains(@id, '"+ classes[x] +"')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < elements.snapshotLength; i++) {
    var thisElement = elements.snapshotItem(i);
	thisElement.parentNode.removeChild(thisElement);
 }
}
