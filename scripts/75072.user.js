// ==UserScript==
// @name           Discogs "Copy to Draft" from Drafts
// @namespace      http://maxxyme.free.fr/userscripts
// @description    Add a link to copy a release to Drafts from Drafts page
// @copyright      2010, maxxyme (http://maxxyme.free.fr/userscripts)
// @license        GNU General Public License (GPL); http://www.opensource.org/licenses/gpl-2.0.php
// @version        23th April 2010
// @include        http://www.discogs.com/users/drafts
// ==/UserScript==

(function() {

var TD = document.evaluate("//form[@action='http://www.discogs.com/users/drafts']//td[@colspan]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (TD) {
  TD.setAttribute("colspan", TD.getAttribute("colspan") + 1);
}

var TRs = document.evaluate("//form[@action='http://www.discogs.com/users/drafts']//tr[not(@bgcolor)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);;
if (TRs && TRs.snapshotLength > 0) {
  for (var i = 0; i < TRs.snapshotLength; i++) {
    var TR = TRs.snapshotItem(i);

    // Step 1: extract "edit" link
    var href = document.evaluate("string(./td[2]/a/@href)", TR, null, XPathResult.STRING_TYPE, null);

    // Step 2: generate new "copy" link (A)
    var link = document.createElement("a");
    link.href = href.stringValue.replace("edit", "copy");
    link.appendChild(document.createTextNode("Copy to Draft"));
    
    // Step 3: create new cell (TD) with its child link
    var cell = document.createElement("td");
    cell.appendChild(link);

    // Step 4: add cell to row (TR)
    TR.insertBefore(cell, TR.lastChild.previousSibling);
  }
}

})();