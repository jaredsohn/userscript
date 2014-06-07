// ==UserScript==
// @name        Okcupid profile section reverser
// @namespace   3fe12000-1b32-11e3-b773-0800200c9a66
// @description Reverses the order of the sections in an okcupid profile, since it actually makes more sense that way.
// @include     /http://www.okcupid.com/profile/[^/]+/?/
// @version     1
// @grant       none
// ==/UserScript==

// Adapted from http://stackoverflow.com/revisions/7943390/7

function reverseChildNodes(node) {
    var parentNode = node.parentNode, nextSibling = node.nextSibling,
        frag = node.ownerDocument.createDocumentFragment();
    parentNode.removeChild(node);
    while(node.lastChild)
        frag.appendChild(node.lastChild);
    node.appendChild(frag);
    parentNode.insertBefore(node, nextSibling);
    return node;
}

reverseChildNodes(document.getElementById('main_column'));
