// ==UserScript==
// @name           fix link modifica post
// @namespace      http://userscripts.org/bastaniente
// @include        http://www.bastaniente.com/forum/*
// ==/UserScript==
 
var snap = document.evaluate("//a[contains(@href,'http://www.bastaniente.com/forum/index.php?action=post;msg')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap.snapshotLength - 1; i >= 0; i--) {
			var elm = snap.snapshotItem(i);
			var inp = document.createElement("a");
			var attr = elm.getAttribute("href");
			inp.appendChild(document.createTextNode("Modifica"));
			inp.setAttribute("href",attr);
			elm.parentNode.replaceChild(inp,elm);
		}
		
var snap_2 = document.evaluate("//a[contains(@href,'http://www.bastaniente.com/forum/index.php?action=post;quote')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap_2.snapshotLength - 1; i >= 0; i--) {
			var elm = snap_2.snapshotItem(i);
			var inp = document.createElement("a");
			var attr = elm.getAttribute("href");
			inp.appendChild(document.createTextNode("Quota"));
			inp.setAttribute("href",attr);
			elm.parentNode.replaceChild(inp,elm);
		}
		

var snap_3 = document.evaluate("//a[contains(@href,'http://www.bastaniente.com/forum/index.php?action=deletemsg')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap_3.snapshotLength - 1; i >= 0; i--) {
			var elm = snap_3.snapshotItem(i);
			var inp = document.createElement("a");
			var attr = elm.getAttribute("href");
			inp.appendChild(document.createTextNode("Rimuovi"));
			inp.setAttribute("href",attr);
			elm.parentNode.replaceChild(inp,elm);
		}
		


var snap_4 = document.evaluate("//a[contains(@href,'http://www.bastaniente.com/forum/index.php?action=splittopics')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap_4.snapshotLength - 1; i >= 0; i--) {
			var elm = snap_4.snapshotItem(i);
			var inp = document.createElement("a");
			var attr = elm.getAttribute("href");
			inp.appendChild(document.createTextNode("Splitta"));
			inp.setAttribute("href",attr);
			elm.parentNode.replaceChild(inp,elm);
		}
		

var snap_5 = document.evaluate("//a[contains(@href,'http://www.bastaniente.com/forum/index.php?action=search')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap_5.snapshotLength - 1; i >= 0; i--) {
			var elm = snap_5.snapshotItem(i);
			var inp = document.createElement("a");
			var attr = elm.getAttribute("href");
			inp.appendChild(document.createTextNode("Cerca"));
			inp.setAttribute("href",attr);
			elm.parentNode.replaceChild(inp,elm);
		}
		

var snap_6 = document.evaluate("//a[@href='http://www.bastaniente.com/forum/index.php?action=post;board=9.0']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap_6.snapshotLength - 1; i >= 0; i--) {
			var elm = snap_6.snapshotItem(i);
			var inp = document.createElement("a");
			var attr = elm.getAttribute("href");
			inp.appendChild(document.createTextNode("Nuovo"));
			inp.setAttribute("href",attr);
			elm.parentNode.replaceChild(inp,elm);
		}
		
var snap_7 = document.evaluate("//a[contains(@href,'http://www.bastaniente.com/forum/index.php?action=markasread')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snap_7.snapshotLength - 1; i >= 0; i--) {
			var elm = snap_7.snapshotItem(i);
			var inp = document.createElement("a");
			var attr = elm.getAttribute("href");
			inp.appendChild(document.createTextNode("Segna come Letto"));
			inp.setAttribute("href",attr);
			elm.parentNode.replaceChild(inp,elm);
		}