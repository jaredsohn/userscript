// Check Check
// version 0.2
// 2005-09-10
// Copyright (c) 2005, Mike Scalora
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name           Check Check
// @namespace      http://scalora.org/projects/greasemonkey/
// @description    Check, uncheck or toggle all selected checkboxes from the "Tools/User Scripts Commands" menu
// @include        http://*
// ==/UserScript==

var checkCheck_on = 1;
var checkCheck_off = 0;
var checkCheck_tog = -1;

function checkCheck_check() { checkCheck(checkCheck_on); }
function checkCheck_uncheck() {	checkCheck(checkCheck_off); }
function checkCheck_toggle() {	checkCheck(checkCheck_tog); }

GM_registerMenuCommand("Check All Selected Checkboxes",checkCheck_check);
GM_registerMenuCommand("Uncheck All Selected Checkboxes",checkCheck_uncheck);
GM_registerMenuCommand("Toggle All Selected Checkboxes",checkCheck_toggle);

function checkCheck(op) {
	//alert(op==checkCheck_on ? 'on' : (op==checkCheck_off ? 'off' : 'tog'));
	var es = checkCheck_getElementsInSelection('input');
	for (i = 0; i<es.length; i++) {
		var e = es[i];
		if (e.type=="checkbox") {
			if (op==checkCheck_on) {
				e.checked = true;
			} else if (op==checkCheck_off) {
				e.checked = false;
			} else {
				e.checked = !e.checked;
			}
		}
	}
}

function checkCheck_getElementsInSelection (tagName) {
	var elements = null;
	var range;
	var selection;
	if (window.getSelection) {
		selection = window.getSelection();
		elements = new Array();
		if (selection.rangeCount > 0) {
			range = selection.getRangeAt(0);
			var elementsToCheck = range.commonAncestorContainer.getElementsByTagName(tagName);
			for (var i = 0; i < elementsToCheck.length; i++) {
				var elementToCheck = elementsToCheck[i];
				if (range.compareNode(elementToCheck) == range.NODE_INSIDE) {
					elements.push(elementToCheck);
				}
			}
		}
	}
	return elements;
}
