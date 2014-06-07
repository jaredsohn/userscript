// ==UserScript==
// @name         FM Forum Fix 1
// @namespace    http://iscomputeronfire.com/download/ 
// @description  Removes the onClick attribute from thread listings. It makes middle-clicking on topics to open them in new tabs much easier.
// @include      http://www.fredmiranda.com/forum/board/*
// ==/UserScript==

var collection = document.evaluate(
	'//td[@onClick]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < collection.snapshotLength; i++) {
	collection.snapshotItem(i).removeAttribute("onClick")
}
