// ==UserScript==
// @name          Forum4Designers.com Forums Collapser
// @namespace     http://mozilla.wikicities.com/
// @include       http://www.forum4designers.com/
// @include       http://www.forum4designers.com/index.php*
// @include       http://forum4designers.com/
// @include       http://forum4designers.com/index.php*
// @description	  Expands/collapses sub forums
// ==/UserScript==

(function() {
  var allTables, thisTable;
  allTables = document.evaluate(
    '//table[@class="tc"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  for (var i = 0; i < allTables.snapshotLength; i++) {
    thisTable = allTables.snapshotItem(i);
    thisTable.title = 'Click to expand';
    thisTable.style.cursor = 'pointer';
    thisTable.addEventListener('click', function(event) {
      var forumBody = this.nextSibling.nextSibling.nextSibling.nextSibling;
      if(forumBody.style.display == 'none') {
        forumBody.style.display = '';
        this.title = 'Click to collapse';
      } else {
        forumBody.style.display = 'none';
        this.title = 'Click to expand';
      }
    }, false);
    thisTable.nextSibling.nextSibling.nextSibling.nextSibling.style.display = 'none';
  }
})();

