// ==UserScript==
// @name          Excite TV Smart Browse
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Move to the correct position on the page when browsing earlier or later listings
// @include       http://www.excite.com/tv/grid.jsp*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

I originally wrote this script for Yahoo's TV listings, but they crappified the
interface. Excite's listing looks like the old Yahoo one, and has the same
problem that this script fixes.

History
-------

2006-11-29 - Created

*/

function linkToOwnId(xpath, prefix) {
  var result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var c = 0, link; link = result.snapshotItem(c); c++) {
    var id = prefix + c;
    link.id = id;
    link.href += '#' + id;
  }
}

linkToOwnId('//a[text()="<<"]', 'p');
linkToOwnId('//a[text()=">>"]', 'n');

if(location.hash) {
  location.href = location.href;
  addEventListener('load', function() {
    location.href = location.href;
  }, false);
}
