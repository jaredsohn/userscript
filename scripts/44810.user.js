// ==UserScript==
// @name           temp_Facebook
// @namespace      arrigo
// @include        http://www.nikhilk.net/FacebookNET.aspx
// ==/UserScript==


var snap = document.evaluate("//div[@class='Comment']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap.snapshotLength - 1; i >= 0; i--) {
		var elm = snap.snapshotItem(i);
		elm.parentNode.removeChild(elm);
		// do stuff with elm
	}

var snap2 = document.evaluate("//table[@class='PageHeader']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap2.snapshotLength - 1; i >= 0; i--) {
		var elm = snap2.snapshotItem(i);
		elm.parentNode.removeChild(elm);
		// do stuff with elm
	}
	
var snap3 = document.evaluate("//td[@class='Sidebar']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap3.snapshotLength - 1; i >= 0; i--) {
		var elm = snap3.snapshotItem(i);
		elm.parentNode.removeChild(elm);
		// do stuff with elm
	}
	
var snap4 = document.evaluate("//ins",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap4.snapshotLength - 1; i >= 0; i--) {
		var elm = snap4.snapshotItem(i);
		elm.parentNode.removeChild(elm);
		// do stuff with elm
	}
	
var snap5 = document.evaluate("//div[@class='PageBreak']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap5.snapshotLength - 1; i >= 0; i--) {
		var elm = snap5.snapshotItem(i);
		elm.parentNode.removeChild(elm);
		// do stuff with elm
	}
	
var snap6 = document.evaluate("//div[@class='PageFooter']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap6.snapshotLength - 1; i >= 0; i--) {
		var elm = snap6.snapshotItem(i);
		elm.parentNode.removeChild(elm);
		// do stuff with elm
	}

var snap7 = document.evaluate("//div[@class='CommentsHeading']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap7.snapshotLength - 1; i >= 0; i--) {
		var elm = snap7.snapshotItem(i);
		elm.parentNode.removeChild(elm);
		// do stuff with elm
	}
	
var snap8 = document.evaluate("//h2[@class='PageSection']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap8.snapshotLength - 1; i >= 0; i--) {
		var elm = snap8.snapshotItem(i);
		elm.parentNode.removeChild(elm);
		// do stuff with elm
	}