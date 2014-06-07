// ==UserScript==
// @name           Cinema Paradiso: shorter list
// @namespace      http://raines.me.uk/
// @description    Reduces the height of items in your list at cinemaparadiso.co.uk so more items are visible on screen.
// @include        http://www.cinemaparadiso.co.uk/MySelection/MySelection.aspx*
// @include        http://www.cinemaparadiso.co.uk//MySelection/MySelection.aspx*
// ==/UserScript==

GM_addStyle(".ml_que td { height: auto; } .ml_que td>img, .ml_que td input { max-height: 18px; max-width: 25px; font-size: 6pt; }");

var headings = document.evaluate(
    "//tr[@class='ml_queHead']/td",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < headings.snapshotLength; ++i) {
    var heading = headings.snapshotItem(i);
    if (/Cert|Remove|Top|Bottom/.test(heading.firstChild.nodeValue)) {
        heading.removeChild(heading.firstChild);
    }
}

