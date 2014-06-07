// ==UserScript==
// @name           Something Awful "Politically Correct" New Post Message
// @namespace      neito
// @description    Replaces the message that appears every time you add a new post on SA to something less offending to jerks like Jozier.
// @include        http://forums.somethingawful.com/newreply.php
// ==/UserScript==

textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('God','gi');
var replace = 'the Generic non-denominational celestial force';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}
