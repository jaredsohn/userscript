// Copyright 2008-2010 Christopher Nguyen <ctn@alumni.stanford.org> - Web site: http://www.pentagoniac.com
// All rights Reserved.
//
// DESCRIPTION
// ============
// Adds an "Unread Mail" button to your gmail interface
// 080903 version 1.0
// 081012 version 1.1: fix to match GMail's changing element ID
// 100225 version 1.2: fix to be more robust for different languages and GMail javascript recompilations
// 100226 version 1.3: fix to give the canvas_frame IFRAME a chance to load first
//
// ==UserScript==
// @name           Gmail Search-Unread Button v1.2
// @namespace      pentagoniac.com
// @description    Adds a "Search Unread" button to your GMail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==


function searchUnreadMail(theDocument, searchTextBox, searchMailButton) {
    if (searchTextBox == null || searchMailButton == null) return; // no can do
    if (!searchTextBox.value.match(/is:unread/)) {
	searchTextBox.value = "is:unread " + searchTextBox.value;
    }

    var clientX = searchMailButton.offsetLeft + searchMailButton.clientWidth/2;
    var clientY = searchMailButton.offsetTop + searchMailButton.clientHeight/2;
    var evt = theDocument.createEvent("MouseEvents");

    var theWindow = theDocument.defaultView;

    evt.initMouseEvent("mousedown", true, true, theWindow, 1, 0, 0, clientX, clientY, false, false, false, false, 0, null);
    searchMailButton.dispatchEvent(evt);
    evt.initMouseEvent("click", true, true, theWindow, 1, 0, 0, clientX, clientY, false, false, false, false, 0, null);
    searchMailButton.dispatchEvent(evt);
    evt.initMouseEvent("mouseup", true, true, theWindow, 1, 0, 0, clientX, clientY, false, false, false, false, 0, null);
    searchMailButton.dispatchEvent(evt);
    //var evt = theDocument.createEvent("KeyboardEvent");
    //evt.initKeyEvent("keypress", true, false, window, 0, 0, 0, 0, 13, 13);
    //alert(searchMailButton.children[0].children[0].children[0].children[1].innerHTML);
    //var result = searchMailButton.dispatchEvent(evt);
    //alert(result);
}

function trace(message) {
    alert(message);
}

function tryAgain(tries) {
    setTimeout(function() { setupSearchUnreadButton(tries++); }, 500*tries);
}

function setupSearchUnreadButton(tries) {
    tries = tries || 0;
    if (tries > 3) return; // give up, too many tries

    // Locate the canvas_frame iframe
    var f = document.getElementById("canvas_frame");
    if (f == null) return tryAgain(tries);

    // Locate the SEARCH table
    var d = f.contentWindow.document;
    if (d == null) return tryAgain(tries);
    var tables = d.getElementsByTagName("table");
    if (tables == null) return tryAgain(tries);
    var searchTable = null;
    for (var i in tables) {
	if (tables[i].getAttribute("role") == "search") {
	    searchTable = tables[i]; // found
	    break;
	}
    }
    if (searchTable == null) return tryAgain(tries);

    // Locate a visible Search "DIV" button (it's first non-hidden DIV that has non-empty text)
    var tds = searchTable.getElementsByTagName("TD");
    var searchTextBox = null, searchMailButton = null, searchUnreadButton = null;
    if (tds == null) return;
    for (var i in tds) {
	// Locate search text box
	var inputs = tds[i].getElementsByTagName("input");
	for (var j in inputs) {
	    if (inputs[j].getAttribute && inputs[j].getAttribute("type") == "text") searchTextBox = inputs[j];
	}

	// Locate Search-Mail button; it's the first non-hidden, non-empty DIV that's an immediate child of the TD
	var children = tds[i].children;
	if (children == null || children.length == 0) continue;
	for (var j in children) {
	    var child = children[j];
	    if (child.tagName == null || child.tagName.toLowerCase() != "div") continue;
	    var div = child;
	    // It must be a non-hidden, non-empty DIV
	    if (div.style != null && div.style.display != "none" && div.textContent.replace(/\s/ig, "") != "") {
		// found
		searchMailButton = div;
		searchUnreadButton = searchMailButton.cloneNode(/*deep*/true);
		// change the ID
		searchUnreadButton.id = "_search_unread_";
		// change the text
		var oldText = searchMailButton.textContent.replace(/^\s*/gi, "").replace(/\s*$/gi, "");
		searchUnreadButton.innerHTML = searchUnreadButton.innerHTML.replace(oldText, "Search Unread");
		// copy the style attribute
		searchUnreadButton.setAttribute("style", searchMailButton.getAttribute("style"));
		// attach the event handler
		searchUnreadButton.addEventListener('click', function() {
		    searchUnreadMail(d, searchTextBox, searchMailButton);
		}, false);
		// append the button
		if (searchMailButton.nextSibling != null) {
		    tds[i].insertBefore(searchUnreadButton, searchMailButton.nextSibling);
		} else {
		    tds[i].appendChild(searchUnreadButton);
		}
		return;
	    }
	}
    }
}

window.addEventListener('load', setupSearchUnreadButton, false);
