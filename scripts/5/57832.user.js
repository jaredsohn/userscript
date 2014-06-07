// ==UserScript==
// @name           YarisWorld Edit Button Tweak
// @namespace      http://bkuri.com/projects/greasemonkey
// @description    Move "Edit" button to the left of each post (useful for new moderators)
// @include        http://www.yarisworld.com/forums/showthread.php*
// @include        http://yarisworld.com/forums/showthread.php*
// ==/UserScript==

var allEdits = document.evaluate("//a[starts-with(@name,'vB::QuickEdit::')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var editButton;
for (var i = 0; i < allEdits.snapshotLength; i++) {
  editButton = allEdits.snapshotItem(i);
  editButton.setAttribute("style", "float: left;");
}