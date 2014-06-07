// ==UserScript==
// @name           Google Reader - pubDate fix
// @namespace      http://gecko.535design.com/grease/
// @description    Cause GR to use an item's publish date for sorting and display (default is "received" date).
// @include        http://www.google.com/reader/view/*
// @run-at         document-end
// ==/UserScript==

function pubDateFix() {
	// the property names need updated each time Google Reader pushes a new version
	if (!(Jo && Jo.b && Jo.b.Qn && Jo.b.Rq)) {
		alert("The pubDate fix script is out of date.  Please check for an update.");

		return;
	}

	var oldItem = Jo, failed = false;

	window.Jo = function Item(data) {
		var item = new oldItem(data);

		if (!failed) {
			if (typeof item.Vi !== "number" || !(item.vG instanceof Date)) {
				alert("The pubDate script is out of date.  Please check for an update.");
				failed = true;
			} else {
				item.Vi = item.vG.getTime(); // crawledTime = updatedTime
			}
		}

		return item;
	};

	window.Jo.b = oldItem.b;
}

// this is the only script injection technique I've found which works on Chrome with the above function
var inject = document.createElement("script");

inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + pubDateFix + ")()"));

document.body.appendChild(inject);
