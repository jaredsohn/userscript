// ==UserScript==
// @name        BSE link fix
// @namespace   http://localhost
// @description replace the link on rpg logout page
// @include     http://bleachsoulevolution.com/logout.php
// @version     1
// @grant	none
// ==/UserScript==
var links = document.evaluate("//a[contains(@href, 'forums')]", document, null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i=0; i < links.snapshotLength; i++) 
{ 
  var thisLink = links.snapshotItem(i); 
  thisLink.href = 'http://bleachsoulevolution.com/forum/index.php'; 
} 