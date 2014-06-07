// ==UserScript==
// @name           Mefi Social tags
// @namespace      http://userscripts.org/users/71401
// @description    Maps MeFi tags to social bookmarking tags.
// @include        http://*.metafilter.com/*
// ==/UserScript==

// Config 
// A prefix for your social bookmark site.
var bmkPrefix = "http://pinboard.in/t:";
// The link text 
var bmkText = " *";
var Elements;


// from http://blog.svidgen.com/2007/10/javascript-insertafter.html
function insertAfter(new_node, existing_node) {
       // if the existing node has a following sibling, insert the current
       // node before it. otherwise appending it to the parent node
       // will correctly place it just after the existing node.

if (existing_node.nextSibling) {
       // there is a next sibling. insert before it using the mutual
       // parent's insertBefore() method.
       existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
} else {
       // there is no next sibling. append to the end of the parent's
       // node list.
       existing_node.parentNode.appendChild(new_node);
}

}

// Find all the tag anchors
Elements = document.evaluate(
       "//a[ @rel='tag']",
       document,
       null,
       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);

// Create new a that links to tag on bookmarking site.
// Insert it next to the existing tag link.
for (var i = 0; i < Elements.snapshotLength; i++) {
       thisElement = Elements.snapshotItem(i);
       thisText = thisElement.textContent;
       var newa=document.createElement('a');
       newa.href=bmkPrefix+thisText;
       insertAfter(newa, Elements.snapshotItem(i));
       newa.appendChild(document.createTextNode(bmkText));
}