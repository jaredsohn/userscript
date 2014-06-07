// ==UserScript==
// @name Google Docs Accessibility Fixes
// @namespace http://www.jantrid.net/axSGrease/
// @description Improves the accessibility of Google Docs.
// @author James Teh <jamie@jantrid.net>
// @copyright 2011 James Teh
// @license GNU General Public License version 2.0
// @version 0.20111110.03
// @include https://docs.google.com/*
// ==/UserScript==

function onNodeInserted(evt) {
	var target = evt.target;
	if (target.nodeType != Node.ELEMENT_NODE)
		return;
	if (target.getAttribute("id") == "docs-aria-speakable") {
		// The Google Docs live region has aria-relevant set to additions,
		// but the changes are actually text.
		// Therefore, remove aria-relevant.
		target.removeAttribute("aria-relevant");
	}
}

document.addEventListener("DOMNodeInserted", onNodeInserted, false);

var url = document.location.href;
if (url.indexOf("/spreadsheet/ccc") != -1) {
	// In a spreadsheet, the input box always has focus, even when not editing.
	// This can cause screen readers to try to read text at the cursor when cursor keys are pressed.
	// Work around this by faking focus on a non-editable control when not editing.
	var inputBox = document.getElementsByTagName("textarea")[0];
	inputBox.setAttribute("id", "input-box");
	// Create our fake focus node.
	var gridFocus = document.createElement("div");
	gridFocus.setAttribute("id", "grid-focus");
	gridFocus.style.position = "-10000px";
	gridFocus.setAttribute("role", "grid");
	inputBox.parentNode.appendChild(gridFocus);

	function setInputBoxFocus() {
		// aria-hidden is set to true when not editing.
		if (inputBox.getAttribute("aria-hidden") == "true")
			inputBox.setAttribute("aria-activedescendant", "grid-focus");
		else
			inputBox.setAttribute("aria-activedescendant", "input-box");
	}

	function onInputBoxAttrModified(evt) {
		attrName = evt.attrName;
		if ((attrName == "aria-hidden" || attrName == "aria-activedescendant")) {
			// Editing has started or stopped.
			setInputBoxFocus();
		}
	}

	setInputBoxFocus();
	inputBox.addEventListener("DOMAttrModified", onInputBoxAttrModified, false);

} else if (url.indexOf("/spreadsheet/gform?") != -1) {
	// Fix some buttons which have no content or role.
	const BUTTON_LABELS = {
		"ss-formwidget-edit-icon": "Edit",
		"ss-formwidget-duplicate-icon": "Duplicate",
		"ss-formwidget-delete-icon": "Delete",
		"ss-x-box": "Delete",
	}

	function fixButton(node) {
		var classes = node.getAttribute("class");
		if (!classes)
			return;
		classes = classes.split(" ");
		for (var i = 0; i < classes.length; ++i) {
			var label;
			if (!(label = BUTTON_LABELS[classes[i]]))
				continue;
			node.setAttribute("role", "button");
			node.setAttribute("aria-label", label);
		}
	}

	function onFormNodeInserted(evt) {
		var target = evt.target;
		if (target.nodeType != Node.ELEMENT_NODE)
			return;
		if (target.tagName != "DIV")
			return;
		var elements = target.getElementsByTagName("div");
		for (var i = 0; i < elements.length; ++i)
			fixButton(elements[i]);
		elements = target.getElementsByTagName("span");
		for (var i = 0; i < elements.length; ++i)
			fixButton(elements[i]);
	}

	document.addEventListener("DOMNodeInserted", onFormNodeInserted, false);
	var elements = document.getElementsByTagName("div");
	for (var i = 0; i < elements.length; ++i)
		fixButton(elements[i]);
}
