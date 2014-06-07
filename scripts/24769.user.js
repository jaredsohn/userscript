// ==UserScript==
// @name        Netvibes, collapse read RSS feeds
// @namespace   http://www.unchqua.ru/ns/greasemonkey
// @description Collapse "RssReader" modules without unread articles.
// @include     http://www.netvibes.com/*
// ==/UserScript==

var collapseReadFunction = function () {
	var Application = window.wrappedJSObject.App;
	var modules = Application.moduleList;
	var module;
	for (var i = 0; i < modules.length; i++) {
		module = modules[i];
		if (module.dataObj && module.elm_module
		        && module.dataObj.moduleName == "RssReader"
		        && module.isVisible && module.isVisible()) {
			if (module.widget.unreadCount > 0) {
				module.expand("nosave");
				//show[show.length] = module.dataObj.id;
			} else {
				module.collapse("nosave");
				//hide[hide.length] = module.dataObj.id;
			}
		}
	}
}

// Our element will be placed next to (after) it.
var collapseExpand = document.getElementById("collapseExpand");

// Anchor elements, according to which new element will be placed.
var referenceParentElement = collapseExpand.parentNode;
var referenceElement = collapseExpand;

// Search for proper anchor element.
do {
	referenceElement = referenceElement.nextSibling;
} while (referenceElement && (referenceElement.nodeType != collapseExpand.ELEMENT_NODE));

// Our element.
var collapseReadLink = document.createElement("A");
collapseReadLink.href = "#";
collapseReadLink.title = "Not read";
collapseReadLink.addEventListener("click", collapseReadFunction, true);
var collapseReadLinkText = document.createTextNode("(+)");
collapseReadLink.appendChild(collapseReadLinkText);

// Additions of our element to document.
var separatorText = document.createTextNode(" | ");
if (referenceElement) {
	referenceParentElement.insertBefore(collapseReadLink, referenceElement);
	referenceParentElement.insertBefore(separatorText, referenceElement);
}
else {
	referenceParentElement.appendChild(separatorText);
	referenceParentElement.appendChild(collapseReadLink);
}
