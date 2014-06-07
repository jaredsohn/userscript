// ==UserScript==
// @name           Gmail Show Details (New)
// @namespace      http://web.mit.edu/mathmike
// @description    Always show details in the first open message of a gmail conversation.
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

// Most of the functions below were borrowed from Gmail Macros (New)

var SHOW_DETAILS_CLASS = "iD";

var gmail = null;

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(g) {
      gmail = g;
      window.setTimeout(registerCallback, 500);
    });
  }
}, true);

function registerCallback() {
    gmail.registerViewChangeCallback(showDetails);
}

function showDetails() {
  var nodes = 
    getNodesByTagNameAndClass(gmail.getActiveViewElement(), "span", SHOW_DETAILS_CLASS);
  if (!nodes) return;
  var show = nodes[0]; //only shows details of the first available message
  if (!show) return;
  if (show.innerHTML == "show details"){
    simulateClick(show, "click");
  }
}

function simulateClick(node, eventType) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent(eventType,
                       true, // can bubble
                       true, // cancellable
                       node.ownerDocument.defaultView,
                       1, // clicks
                       50, 50, // screen coordinates
                       50, 50, // client coordinates
                       false, false, false, false, // control/alt/shift/meta
                       0, // button,
                       node);

  node.dispatchEvent(event);
}

function getNodesByTagNameAndClass(rootNode, tagName, className) {
  var expression = 
      ".//" + tagName + 
      "[contains(concat(' ', @class, ' '), ' " + className + " ')]";
  
  return evalXPath(expression, rootNode);
}

function evalXPath(expression, rootNode) {
  try {
    var xpathIterator = rootNode.ownerDocument.evaluate(
      expression,
      rootNode,
      null, // no namespace resolver
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null); // no existing results
  } catch (err) {
    GM_log("Error when evaluating XPath expression '" + expression + "'" +
           ": " + err);
    return null;
  }
  var results = [];

  // Convert result to JS array
  for (var xpathNode = xpathIterator.iterateNext();
       xpathNode;
       xpathNode = xpathIterator.iterateNext()) {
    results.push(xpathNode);
  }
    
  return results;
}
