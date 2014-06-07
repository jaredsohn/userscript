// TripIt for GMail
// version 0.1 Alpha!
// 2008-01-18
// Copyright (c) 2008, TripIt, Inc.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that embeds an 'Add to TripIt'
//   button in the GMail UI.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TripIt for GMail", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TripIt for GMail
// @namespace     http://www.tripit.com/greasemonkey/
// @description   A script to enhance GMail to forward confirms to plans@tripit.com
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

var gmail = null;
var RHS_MENU_ELEMENT_CLASS='yMuNaf';
var FROM_ADDRESS_SPAN_CLASS='EP8xU';
var FORWARD_BUTTON_CLASS='XymfBd';
var FORWARD_TO_TEXTAREA_CLASS='mMl8gd';
var FORWARD_TO_ADDRESS='plans@tripit.com';
var FORWARD_MSG_DIV_CLASS='KTFFFd';
var ADD_TO_TRIPIT_ID='_add2trpt';

var TRAVEL_FROM_ADDRESSES=Object();
TRAVEL_FROM_ADDRESSES['American Airlines@aa.com']=1;

var TRIPIT_LOGO='data:application/octet-stream;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACocREArXkfAK16IACzgy8AuIs9ALiMPgC9lEwAw51bAMOeXADIpmoAyaZrAB%2BG8QAmivIAGpDzAM6ueADOr3gAzq95AM6vegA%2Bl%2FMARZv0ANO4iADUuIgASJz0AFCg9ADZwZYA2MGXAGKq9QBkq%2FUAZaz1AG2v8wDdyKIA3sqlANPIrgCBu%2FcAbcD5AOTStABryPoA3NnHAOnbwwDL2OEA7%2BTSAMDd%2BwDz690A9O3hAPr28AD%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSwCEC0tLS0tER8tLS0tLS0oAAMsLS0tLAAGLS0tLS0tLRgfIBwNJCUYKC0tKC0KAywtLSELCwsiLS0tGAAQAAAEBg8SCxoLFg4GBgEABBQHLC0tHQspDBstLS0jABgtLS0tHx4XCxMnCCwtLS0tLS0jFRAtLRkqLSYGESMtLS0tAQctLS0FKC0tJgAGLS0tLSMoLS0QAAIsLS0GFC0tLS0tLS0tBgAAJi0tLS0tLS0tLS0tLQkAACstLS0tLS0tLS0tLS0sFCYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D';

window.addEventListener('load', function() {
    if (unsafeWindow.gmonkey) {
	unsafeWindow.gmonkey.load('1.0', function(g) {
	    gmail = g;
	    gmail.registerViewChangeCallback(addAddToTripItButton);
	});
    }
}, true);

function _createAddToTripItElement() {
    var addToTripItEl = document.createElement('div');
    addToTripItEl.setAttribute('class', 'OZly4d');

    var addToTripItSpanEl = document.createElement('span');
    addToTripItSpanEl.setAttribute('id', ADD_TO_TRIPIT_ID);

    var addToTripItImgEl = document.createElement('img');
    addToTripItImgEl.setAttribute('src', TRIPIT_LOGO);
    addToTripItSpanEl.appendChild(addToTripItImgEl);

    var addToTripItClearImgEl = document.createElement('img');
    addToTripItClearImgEl.setAttribute('src', 'images/cleardot.gif');
    addToTripItSpanEl.appendChild(addToTripItClearImgEl);

    var addToTripItUEl = document.createElement('u');
    addToTripItUEl.setAttribute('class', '');
    addToTripItUEl.innerHTML = 'Add to TripIt';
    addToTripItSpanEl.appendChild(addToTripItUEl);

    addToTripItEl.appendChild(addToTripItSpanEl);

    return addToTripItEl;
}
//http://userscripts.org/scripts/review/13700
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

function evalXPath(expression, rootNode) {
    try {
	var xpathIterator = rootNode.ownerDocument.evaluate( expression,
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

function getNodesByTagNameAndClass(rootNode, tagName, className) {
    var expression =
	".//" + tagName +
	"[contains(concat(' ', @class, ' '), ' " + className + " ')]";
    
    return evalXPath(expression, rootNode);
}

function getNodesByTagName(rootNode, tagName) {
    var expression = ".//" + tagName;
    return evalXPath(expression, rootNode);
}

function _add_to_tripit(e) {
    var forwardButtonNodes = getNodesByTagNameAndClass(gmail.getActiveViewElement(), 'div', FORWARD_BUTTON_CLASS);
    simulateClick(forwardButtonNodes[0], 'click');
    
    var textAreas = getNodesByTagNameAndClass(gmail.getActiveViewElement(), 'textarea', FORWARD_TO_TEXTAREA_CLASS);
    textAreas[0].value=FORWARD_TO_ADDRESS;

    var controlPanelEls = getNodesByTagNameAndClass(gmail.getActiveViewElement(), 'div', FORWARD_MSG_DIV_CLASS);
    var buttons = getNodesByTagName(controlPanelEls[0], 'button');
    simulateClick(buttons[0], 'click');
}

function addAddToTripItButton() {
    if (gmail.getActiveViewType() == 'cv') {
        rhsEl = gmail.getConvRhsElement();
        var addToTripItDivElement = _createAddToTripItElement();
	    
        rhsEl.firstChild.firstChild.appendChild(addToTripItDivElement);
        addToTripItDivElement.addEventListener('click', _add_to_tripit, false);
        var addToTripItLinkElement = document.getElementById(ADD_TO_TRIPIT_ID);
    }
}
