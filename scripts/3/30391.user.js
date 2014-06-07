// Target Highlight user script
// version 0.2 BETA!
// 2008-08-08
// Copyright (c) 2008, Jason Orendorff
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Target Highlight", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Target Highlight
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Press ? to highlight the target of the current URL.
// @include       *
// ==/UserScript==

function findAnchor(name) {
	var elt = document.getElementById(name);
	if (elt != null)
		return elt;

	var elts = document.getElementsByName(name);
	for (var i = 0; i < elts.length; i++)
		if (elts[i].localName.toLowerCase() == "a")
			return elts[i];
	return null;
}

function isVisible(elem)
{
	while (elem) {
		if (elem.style.display == 'none')
			return false;
		elem = elem.parentElement;
	}
	return true;
}

function findElementToCallOut(name) {
	var a = findAnchor(name);
	if (a.localName.toLowerCase() == "a" && a.childNodes.length == 0) {
		for (var x = a.nextSibling; x !== null; x = x.nextSibling) {
			if (x.nodeType == 1) {  // Node.ELEMENT_NODE
				if (isVisible(x))
					return x;
				else
					break;
			} else if (x.nodeType == 3) {  // Node.TEXT_NODE
				if (x.nodeValue.replace(/\s*/, '') != '')
					break;
			} else if (x.nodeType != 8) {  // Node.COMMENT_NODE
				break;
			}
		}
	}
	return a;
}

/*
 * A mutex of sorts, to prevent leaving garbage when the user presses '?'
 * while a previous '?' is still going.
 */
var blinking = false;
var original;

/* Cause elt's border to blink three times. */
function callOut(elt) {
	var count = 0;
	var bg1 = '#ff3d66';  //bright pink
	var bg2 = '#ffff61';  //bright yellow
	var fg = 'black';

	if (!blinking) {
		blinking = true;
		original = { background: elt.style.background,
		             color: elt.style.color };
		elt.style.background = bg1;  // before scrolling
		elt.style.color = fg;
		window.setTimeout(function () {
				elt.scrollIntoView();
				setBackground1();
			}, 1);
	}

	function setBackground1() {
		if (count < 3) {
			elt.style.background = bg1;
			window.setTimeout(setBackground2, 120);
		} else {
			elt.style.background = original.background;
			elt.style.color = original.color;
			blinking = false;
		}
	}

	function setBackground2() {
		elt.style.background = bg2;
		count++;
		window.setTimeout(setBackground1, 120);
	}
}

function complain(target) {
	alert("The target '#" + target + "' isn't in the page.");
}

function complainInvisible(target, e) {
	alert("The target '#" + target + "' is in the page, but hidden.");
	// scroll to it anyway!
	e.scrollIntoView();
}

function anyTextFieldHasFocus() {
	if (document.contentEditable)
		return true;

	var elt = document.activeElement;
	var tag = elt.localName.toLowerCase();
	return (tag == 'textarea'
	        || (tag == 'input'
	            && elt.type.match(/^(text|file|password)$/)));
}

function onKeyPress(event) {
	var QMARK = 63;  // the character code for '?'
	if (event.isChar && event.charCode == QMARK) {
		var match = /#(.*)/.exec(window.location);
		if (match != null && !anyTextFieldHasFocus()) {
			var anchor = match[1];
			var elt = findElementToCallOut(anchor);
			if (elt == null)
				complain(anchor);
			else if (!isVisible(elt))
				complainInvisible(anchor, elt);
			else
				callOut(elt);
		}
	}
}

window.document.addEventListener("keypress", onKeyPress, false);
