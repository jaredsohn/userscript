// ==UserScript==
// @name           Cachesökningsbetyg
// @namespace      http://norpan.org/greasemonkey/
// @description    Visar cachebetyg på söksidan
// @include        http://www.geocaching.com/seek/nearest.aspx?*
// ==/UserScript==

// Find the <td> that contains the text (GCxxxxx)
// that is where the results are
var allElem, thisElem;
allElem = document.evaluate(
  "//table[@id='dlResults']//tr[@bgcolor]/td[6]",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i = 0; i < allElem.snapshotLength; i++) {
  thisElem = allElem.snapshotItem(i);
  var wp = thisElem.innerHTML.match(/GC[^)]*/);
  var td = document.createElement('td');
  td.innerHTML ='<a rel="nofollow" href="http://www.geocaching.se/?page=stats/vote&amp;cache=' +
                     wp + '"><img src="http://www.geocaching.se/stats/opinion.php?cache=' +
                     wp + '" alt="This cache is rated." border="0" height="50" width="200"></a>'
  
  thisElem.parentNode.insertBefore(td, thisElem.nextSibling);
}