// Copyright 2006 Mihai Parparita. All Rights Reserved.

// ==UserScript==
// @name          Gmail Show Details
// @namespace     http://web.mit.edu/mathmike
// @description	  Always show details in the most recent message of a gmail conversation.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

// Utility functions (taken from gmailmacros)
function simulateClick(node, eventType) {
    var event = node.ownerDocument.createEvent("MouseEvents");
    event.initMouseEvent(eventType,
                         true, // can bubble
                         true, // cancellable
                         window,
                         1, // clicks
                         50, 50, // screen coordinates
                         50, 50, // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         node);
    node.dispatchEvent(event);
}
function bind(func, thisObject) {
  return function() {
    return func.apply(thisObject, arguments);
  }
}

var getNode = bind(unsafeWindow.document.getElementById, unsafeWindow.document);
var msg = null;
// Find the most recent message in the conversation 
// (assuming there are at most 101).
for (var i = 0; i <= 100; i++){
  if (getNode('mh_' + i) != null){
      msg = getNode('mh_' + i);
  }
}

// The following is fragile, but if the gmail DOM tree changes, then the worst
// that should happen is some errors in the error console.
if (msg != null){
    var ancestor = msg.childNodes[0];
    var child1 = ancestor.childNodes[0];
    var child2 = child1.childNodes[1];
    var child3 = child2.childNodes[3];
    var details_node = child3.childNodes[0];
    if (details_node.innerHTML == "show details"){
	simulateClick(details_node, "mousedown");
    }
}
