// ==UserScript==
// @name           Trimet Title Time
// @namespace      http://twilite.org/~xtina/
// @include        http://trimet.org/arrivals/tracker*?locationID=*
// @include        http://www.trimet.org/arrivals/tracker*?locationID=*
// ==/UserScript==

// Add your bus number(s) here.
// If MAX, put the colour.  E.g.: "Orange"
// So, an example:
// var allBusses = new Array("12", "4", "blue");

var allBusses = new Array("14", "15");


// ***
// * And now, stop editing.
// ***


// # Get the block, and all items underneath.
var blk = document.getElementById("transittracker-form");
var itm = blk.getElementsByTagName("span");

// # Set the title now.

// The span tag holds the time left.  So, back up one, go up a cell, then
// descend into the <p><b> nest.

var allRoutes = document.evaluate("//span[@class='route']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var allTimes = document.evaluate("//span[@class='arrival']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var bus = allRoutes.snapshotItem(0).innerHTML;
var busNum = bus.split(" ")[0];
// Why is there a double-space?
if (busNum == "MAX") { busNum = bus.split(" ")[2]; }
var newTitle = "#" + busNum + " - " + allTimes.snapshotItem(0).innerHTML;
GM_log(newTitle);

// And if any busses have been defined?
if (allBusses.length > 0) {
	// Cycle through each line item.
	for (var x = 0; x < allRoutes.snapshotLength; x++) {
		// Same as before.
		bus = allRoutes.snapshotItem(x).innerHTML;
		busNum = bus.split(" ")[0];
		if (busNum == "MAX") { busNum = bus.split(" ")[2]; }
		// Now, cycle through each defined item.
		for (q = 0; q < allBusses.length; q++) {
			// Let's not fuss about if someone put in 'blue' instead of 'Blue'.
			if (busNum.toLowerCase() == allBusses[q].toLowerCase()) {
				newTitle = "#" + busNum + " - " + allTimes.snapshotItem(x).innerHTML;
				var okgo = "go";
				break;
			}
		}
		// I couldn't think of a cleverer way out.  :(
		if (okgo) {
			x = allRoutes.snapshotLength;
		}
	}
}

// Clean up and put the new title up.
newTitle = newTitle.replace("&nbsp;", " ");
newTitle += " [Trimet]";
document.title = newTitle;
