// ==UserScript==
// @name           Kijiji Click Fix
// @namespace      http://designspike.ca
// @description    Removes the click event handler on table cells that breaks ctrl clicking listings to open in a new tab.
// @include        *.kijiji.*
// ==/UserScript==


var unbind_event_listeners = function (node) {
    var parent = node.parentNode;
    if (parent) {
        parent.replaceChild(node.cloneNode(true), node);
    } else {
        var ex = new Error("Cannot remove event listeners from detached or document nodes");
        ex.code = DOMException[ex.name = "HIERARCHY_REQUEST_ERR"];
        throw ex;
    }
};

var nodes = document.querySelectorAll(".rrow td"), i = nodes.length;
while (i--) {
    unbind_event_listeners(nodes.item(i));
}