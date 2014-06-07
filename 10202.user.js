// ==UserScript==
// @name           Cachebetyg
// @namespace      http://norpan.org/greasemonkey/
// @description    Visar cachebetyg på alla cachesidor på geocaching.com
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

// Find font with color="#1c7d87"
// If they change the style this breaks
var allElems, thisElem;
allElems = document.evaluate(
  "//font[@color='#1c7d87']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i = 0; i < allElems.snapshotLength; i++) {
  thisElem = allElems.snapshotItem(i);
  // Change contents to image link
  var wp = thisElem.innerHTML;
  var td = document.createElement('td');
  td.innerHTML ='<a rel="nofollow" href="http://www.geocaching.se/?page=stats/vote&amp;cache=' +
                     wp + '"><img src="http://www.geocaching.se/stats/opinion.php?cache=' +
                     wp + '" alt="This cache is rated." border="0" height="50" width="200"></a>'
  
  thisElem.parentNode.insertBefore(td, thisElem.nextSibling);
}