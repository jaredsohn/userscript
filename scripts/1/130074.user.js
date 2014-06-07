// ==UserScript==
// @name          Javadoc Instant Search
// @namespace     http://jo.zerezo.com/projects/
// @description   Instant search for Javadoc class names.
// @include       */allclasses-frame.html
// @include       */allclasses-noframe.html
// @include       */package-frame.html
// @include       */overview-frame.html
// ==/UserScript==
//
// version 0.5 (2012/11/17)
// author Joël THIEFFRY
// http://jo.zerezo.com/projects/javadocInstantSearch.html
// 
// This script is distributed under the MIT licence.
// http://www.opensource.org/licenses/mit-license.php
//

(function() {
	"use strict";

	// ID of the container for Javadoc Instant Search
	var ELEMENT_ID = "javadocInstantSearchElement";

	// IDs for regex type selector
	var ECLIPSE_REGEX_ID = "Eclipse";
	var SIMPLIFIED_REGEX_ID = "Simplified";
	var PLAIN_REGEX_ID = "Plain";

	// Compatibility layer for adding and removing events
	var addEvent;
	var removeEvent;
	if (document.addEventListener) {
		addEvent = function(element, eventname, funcname) {
			element.addEventListener(eventname, funcname, false);
		};
		removeEvent = function(element, eventname, funcname) {
			element.removeEventListener(eventname, funcname, false);
		};
	} else if (document.attachEvent) {
		addEvent = function(element, eventname, funcname) {
			element.attachEvent("on" + eventname, funcname);
		};
		removeEvent = function(element, eventname, funcname) {
			element.detachEvent("on" + eventname, funcname);
		};
	}

	// Create and insert the Javadoc Instant Search container
	var install = function() {
		// Second safegard to prevent double instanciation (while debugging)
		if (document.getElementById(ELEMENT_ID)) {
			return true;
		}

		// Detection of javadoc format
		var indexContainer = document.getElementsByClassName("indexContainer");
		var table = document.getElementsByTagName("table");
		if (!indexContainer && !table) {
			return;
		}
		var isModernFormat = indexContainer.length === 1;

		// Creation of search elements
		var searchContainer = document.createElement("p");
		searchContainer.id = ELEMENT_ID;

		var textInput = document.createElement("input");
		textInput.type = "text";
		textInput.style.backgroundColor = "White";

		var eraseIcon = document.createElement("input");
		eraseIcon.type = "image";
		// Origin: http://www.teria.com/~koseki/tools/gm/javadoc_isearch/index.html
		eraseIcon.src = "data:image/gif;base64,R0lGODlhDQANAJEDAM%2FPz%2F%2F%2F%2F93d3UpihSH5BAEAAAMALAAAAAANAA0AAAIwnCegcpcg4nIw2sRGDZYnBAWiIHJQRZbec5XXEqnrmXIupMWdZGCXlAGhJg0h7lAAADs%3D";
		eraseIcon.alt = "erase search pattern";
		eraseIcon.style.marginLeft = "3px";
		eraseIcon.style.marginRight = "3px";

		var isOverview = document.URL.match("/overview-frame\\.html$", "g") !== null;
		var typeRegex = document.createElement("select");
		typeRegex.size = 1;
		typeRegex.multiple = false;
		if (!isOverview) {
			var typeRegexOptionEclipse = document.createElement("option");
			typeRegexOptionEclipse.value = ECLIPSE_REGEX_ID;
			typeRegexOptionEclipse.appendChild(document.createTextNode("Eclipse"));
			typeRegexOptionEclipse.selected = true;
			typeRegex.add(typeRegexOptionEclipse);
		}
		var typeRegexOptionSimplifiedRegex = document.createElement("option");
		typeRegexOptionSimplifiedRegex.value = SIMPLIFIED_REGEX_ID;
		typeRegexOptionSimplifiedRegex.appendChild(document.createTextNode("Simplified"));
		typeRegexOptionSimplifiedRegex.selected = isOverview;
		typeRegex.add(typeRegexOptionSimplifiedRegex);
		var typeRegexOptionPlainRegex = document.createElement("option");
		typeRegexOptionPlainRegex.value = PLAIN_REGEX_ID;
		typeRegexOptionPlainRegex.appendChild(document.createTextNode("Regex"));
		typeRegex.add(typeRegexOptionPlainRegex);

		// Insertion of search elements
		searchContainer.appendChild(textInput);
		searchContainer.appendChild(eraseIcon);
		searchContainer.appendChild(typeRegex);
		if (isModernFormat) {
			indexContainer = indexContainer[0];
			indexContainer.insertBefore(searchContainer, indexContainer.firstChild);
		} else {
			table = table[0];
			table.parentNode.insertBefore(searchContainer, table);
		}

		// Handle the timeout for text input
		var searchTimeoutHandle = null;
		var setSearchTimeout = function() {
			if (searchTimeoutHandle) {
				clearTimeout(searchTimeoutHandle);
			}
			searchTimeoutHandle = setTimeout(runSearch, 200); // in milliseconds
		};

		// Run the search
		var runSearch = function() {
			if (searchTimeoutHandle) {
				clearTimeout(searchTimeoutHandle);
				searchTimeoutHandle = null;
			}
			var acceptFunction = function() {
				return true;
			};
			if (textInput.value) {
				var regex = textInput.value;
				var caseInvariantSwitch = "";
				//console.log("input  = " + regex);
				var selectedTypeRegex = typeRegex.options[typeRegex.selectedIndex].value;
				switch (selectedTypeRegex) {
					case ECLIPSE_REGEX_ID:
						regex = "^.*" + regex.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, "\\$1") +  ".*$";
						regex = regex.replace(/([A-Z])/g, ".*$1");
						caseInvariantSwitch = "i";
						break;
					case SIMPLIFIED_REGEX_ID:
						// Escape all except ? and *
						regex = regex.replace(/([\\\^\$+\[\]{}.=!:(|)])/g, "\\$1");
						regex = "^.*" + regex.replace(/(?:\*)+/g, ".*").replace(/(?:\?)+/g, ".") + ".*$";
						caseInvariantSwitch = "i";
						break;
				}
				//console.log("before = " + regex);
				regex = regex.replace(/((.[\*\?])+)(?=\2)/g, "")  // Replace successive x* and x? to only one
							.replace(/((.)\*\2\?)+/g, ".*")      // Replace x*x? with x*
							.replace(/((.)\?\2\*)+/g, ".*")      // Replace x?x* with x*
							.replace(/((.)\+\2\*)+/g, ".+")      // Replace x+x* with x+
							.replace(/((.)\*\2\+)+/g, ".+")      // Replace x*x+ with x+
							.replace(/((.[\*\?])+)(?=\2)/g, ""); // Replace successive x* and x? to only one
				//console.log("after  = " + regex);
				try {
					var searchRegexp = new RegExp(regex, "g" + caseInvariantSwitch);
				} catch (err) {
					textInput.style.backgroundColor = "Tomato";
					return false;
				}
				textInput.style.backgroundColor = "Lavender";
				acceptFunction = function(name) {
					// Fix for Issue #1: reset the lastIndex in the regex for reuse
					searchRegexp.lastIndex = 0;
					return searchRegexp.test(name);
				};
			} else {
				textInput.style.backgroundColor = "White";
			}

			if (isModernFormat) {
				var origUl = indexContainer.getElementsByTagName("ul")[0];
				var clonedUl = origUl.cloneNode(true);
				(function(items) {
					for (var iItem = 0; iItem < items.length; iItem++) {
						var liItem = items[iItem];
						var itemText = liItem.firstChild.firstChild;
						if (itemText.tagName === "I") {
							itemText = itemText.firstChild;
						}
						liItem.style.display = acceptFunction(itemText.nodeValue) ? "" : "none";
					}
				})(clonedUl.getElementsByTagName("li"));
				indexContainer.replaceChild(clonedUl, origUl);
				origUl.innerHTML = "";
			} else {
				var origTBody = table.getElementsByTagName("tbody")[0];
				var clonedTBody = origTBody.cloneNode(true);
				(function(items) {
					for (var iItem = 0; iItem < items.length; iItem++) {
						var aItem = items[iItem];
						var itemText = aItem.firstChild;
						if (itemText.tagName === "I") {
							itemText = itemText.firstChild;
						}
						var displayStyle = acceptFunction(itemText.nodeValue) ? "" : "none";
						aItem.style.display = displayStyle;
						var nextBr = aItem.nextSibling;
						while (nextBr.nodeType !== 1) {
							nextBr = nextBr.nextSibling;
						}
						if (nextBr.tagName === "BR") {
							nextBr.style.display = displayStyle;
						}
					}
				})(clonedTBody.getElementsByTagName("a"));
				table.replaceChild(clonedTBody, origTBody);
				origTBody.innerHTML = "";
			}
			
			textInput.focus();
			return false;
		};

		// Change the type of regex
		var changeRegexType = function() {
			if (textInput.value !== "") {
				runSearch(); // will clear the timeout
			} else {
				textInput.focus();
				return false;
			}
		};

		// Erase the current input pattern
		var eraseSearch = function() {
			if (textInput.value !== "") {
				textInput.value = "";
				runSearch(); // will clear the timeout
			} else {
				textInput.focus();
				return false;
			}
		};

		// Install all event listeners
		addEvent(textInput, "input", setSearchTimeout);
		addEvent(typeRegex, "change", changeRegexType);
		addEvent(eraseIcon, "click", eraseSearch);

		// Uninstall all event listeners
		var uninstall = function() {
			removeEvent(textInput, "input", setSearchTimeout);
			removeEvent(typeRegex, "change", changeRegexType);
			removeEvent(eraseIcon, "click", eraseSearch);
		};
		addEvent(window, "unload", uninstall);
		
		textInput.focus();
		return true;
	};

	// Install the component when window has done loading, and the component is not already here
	if (!document.getElementById(ELEMENT_ID)) {
		install();
	}
})();
