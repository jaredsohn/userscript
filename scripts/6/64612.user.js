// ==UserScript==
// @name          GMail BCC
// @description	  Shows the BCC field in GMail compose forms.
// @namespace     http://behrang
// @include       https://mail.google.tld/mail/*
// @include       http://mail.google.tld/mail/*
// @include       https://mail.google.tld/a/*
// @include       http://mail.google.tld/a/*
// @version       0.1
// ==/UserScript==

// Based on lifehacker.com code at http://lifehacker.com/393844/always-show-gmails-cc-field-user-script
// Please visit that script for more information.

var INNER_HTML = "Add Bcc";

var gmail = null;

window.addEventListener("load", function(e) {
    if (unsafeWindow.gmonkey) {
        unsafeWindow.gmonkey.load("1.0", function(gmailAPI) {
            gmail = gmailAPI;
            gmail.registerViewChangeCallback(handleView);
            handleView();
        });
    }
}, true);

function handleView() {
    if (gmail.getActiveViewType() == "co") { // Compose view
        clickSpan();
    }
    if (gmail.getActiveViewType() == "cv") { // Conversation view
        tryToClickSpan();
    }
}

function clickSpan() {
    var span = getSpan();
    if (span) {
        simulateClick(span, "click");
        return true;
    }
    return false;
}

function tryToClickSpan() {
    if (!clickSpan()) {
        setTimeout(tryToClickSpan, 1000);
    }
}

function getSpan() {
    var rootNode = gmail.getActiveViewElement();
    try {
        var xpathIterator = rootNode.ownerDocument.evaluate(".//span[contains(concat(' ', @class, ' '), ' el ')]", rootNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    } catch (error) {
        return null;
    }
    for (var xpathNode = xpathIterator.iterateNext(); xpathNode; xpathNode = xpathIterator.iterateNext()) {
        if (xpathNode.innerHTML == INNER_HTML) {
            return xpathNode;
        }
    }
    return null;
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

