// ==UserScript==
// @name          Search in Citing Articles
// @namespace     http://userscripts.org/scripts/show/74620
// @version       0.0
// @description   Adds a “Search in Citing Articles” button to the list of citing articles in Google Scholar.
// @include       http://scholar.google.*
// @license       This program is in the public domain.
// ==/UserScript==

void function() {
  var HTML_NS = 'http://www.w3.org/1999/xhtml';

  var found = location.href.match(/^http:\/\/[^\/]+\/scholar[^#]*[\?&]cites=([^\?&#]+)/);
  if (!found)
    return;
  var cited = found[1];
  var searchBtns = document.evaluate('//input[@type="submit" and @name="btnG"]',
    document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (!searchBtns || searchBtns.snapshotLength == 0)
    return;

  for (var i = 0; i < searchBtns.snapshotLength; i++)
  {
    // Since we add a button _after_ the original “Search” button,
    // our button is ignored (as desired) when a user simply press
    // the Enter key in the search box.
    var searchBtn = searchBtns.snapshotItem(i);
    var button = document.createElementNS(HTML_NS, 'button');
    button.setAttribute('type', 'submit');
    button.setAttribute('name', 'cites');
    button.setAttribute('value', cited);
    button.appendChild(document.createTextNode('Search in Citing Articles'));
    searchBtn.parentNode.insertBefore(button, searchBtn.nextSibling);
    searchBtn.parentNode.insertBefore(document.createTextNode(' '), searchBtn.nextSibling);
  }
}();
