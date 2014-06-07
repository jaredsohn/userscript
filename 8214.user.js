// w3schools resizer
// version 0.1
// 2007-03-29
// Copyright (c) 2007, Daniel Muenter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
// ==UserScript==
// @name            w3schools resizer
// @namespace       http://www.w3schools.com/
// @description		Resizes the w3schools.com page.
// @include         http://www.w3schools.com/*
// ==/UserScript==
// -----------------------------------------------------------------------------

relax(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[2]', 
	document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);

var children = document.evaluate('/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[1]/TD[3]/TABLE', 
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < children.snapshotLength; i++) {
	var child = children.snapshotItem(i);
	enlarge(window.document,child);
}

var children = document.evaluate('//iframe', 
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < children.snapshotLength; i++) {
	var child = children.snapshotItem(i);
	remove(window.document,child);
}

function relax(doc, node) {
	walk_down(node, function (node) {
		node.style.width = 'auto';
		node.style.marginLeft = '0pt';
		node.style.marginRight = '0pt';
		if (node.width) node.width = null; });
}

function enlarge(doc, node) {
	walk_down(node, function (node) {
		node.style.width = '100%';
		node.style.marginLeft = '0pt';
		node.style.marginRight = '0pt';
		if (node.width) node.width = null; });
}

function walk_down(node, func) {
	if (node.nodeType == 1) {
		if (node.tagName != "IMG") func(node);
			if (node.childNodes.length != 0)
				for (var i=0; i<node.childNodes.length; i++)
					walk_down(node.childNodes.item(i),func);
	}
}

function remove(doc, node) {
	if (doc == null || node == null) return;
	if (!node.parentNode) return;
	node.style.display = "none";
	doc.last_removed_node = node;
}