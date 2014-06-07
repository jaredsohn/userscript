// ==UserScript==
// @name          Add PMs to Sent Items in BabelZilla
// @namespace     http://userscripts.org/scripts/show/64224
// @version       0.0
// @description   Checks “Add a copy of this message to my sent items folder” by default.
// @include       http://www.babelzilla.org/forum/index.php?*
// @license       This program is in the public domain.
// ==/UserScript==

void function(){
  var nodes = document.evaluate('//input[@type="checkbox" and @name="add_sent"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < nodes.snapshotLength; i++)
    nodes.snapshotItem(i).checked = true;
}();
