// ==UserScript==
// @name          Facebook Graffiti Protector
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Make those delete links a little safer
// @include       http://*.facebook.com/*
// ==/UserScript==

/*

This script half-fixes a nasty bug in the awesome Graffiti app.
<http://binghamton.facebook.com/topic.php?uid=2439131959&topic=3245>
Hopefully the script will be obsolete soon.

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-07-05 - Created

*/

var delLinks = document.evaluate('//a[contains(@href, "/graffitiwall/delete.php")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var c = 0, delLink; delLink = delLinks.snapshotItem(c); c++) {
  delLink.addEventListener('click', function(event) {
    if(!(confirm('Really?') && confirm('REALLY?!')))
      event.preventDefault();
  }, false);
}