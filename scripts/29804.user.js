// ==UserScript==
// @name        HairyWomanPussyNet 
// @namespace  	MarkusW 
// @description Removes unnecessary content from http://www.hairy-women-pussy.net
// @include     http://www.hairy-women-pussy.net/?id=hair-everywhere.com
// ==/UserScript==

// Find code like <a href="/rt/engine/thumb.php?..."/>...</a>
var snapResults = document.evaluate('//a[contains(@href, "/go.php?block=")]',
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Get <body> element and delete every child
var elmBody = document.getElementsByTagName("body")[0];
elmBody.innerHTML = '';

for (var i = snapResults.snapshotLength - 1; i >= 0; i--) { 
  var elm = snapResults.snapshotItem(i);
  elmBody.appendChild(elm);
}
