// ==UserScript==

// @name          GCalendar Tooltiper

// @description   Adds tooltips to events, allowing to see the entire title in tooltip.
// @author        X4lldux
// @version       0.1

// @include       http://*google.tld/calendar/render

// @include       https://*google.tld/calendar/render

// ==/UserScript==

function addTooltips() {
	var eventXpath = "//div[@class='adc']//nobr";
	var events = document.evaluate(eventXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null);


	for (var i = 0; i < events.snapshotLength; i++) {
		var event = events.snapshotItem(i);
		event.setAttribute("title", event.textContent);
	}
	
	window.setTimeout(addTooltips, 500);
}

window.addEventListener('load', addTooltips, true);