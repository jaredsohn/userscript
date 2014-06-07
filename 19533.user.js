// ==UserScript==
// @name            NoCitationNeeded
// @namespace       http://marcolson.net
// @description     Gets rid of [citation needed] in wikipedia
// @include         http://*.wikipedia.org/wiki/*
// ==/UserScript==
//
// History
// 2007-01-08 - 1.01 - changes for wikipedia layout changes

var anodes, node, supnode, parentnode;

//anodes = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
anodes = document.evaluate("//a[@title='Wikipedia:Citation needed']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < anodes.snapshotLength; i++) {
        node = anodes.snapshotItem(i);
        supnode = node.parentNode;
        parentnode = supnode.parentNode;
        supnode = parentnode;
        parentnode = supnode.parentNode;
        parentnode.removeChild(supnode);
}

document.normalize();
