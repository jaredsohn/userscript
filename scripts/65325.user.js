// ==UserScript==
// @name           Arisia 2010 Griddifier
// @namespace      http://axisofevil.net/~xtina
// @description    Changes schedule from schedule to a proper table.
// @include        http://2010.arisia.org/Schedule2010*
// ==/UserScript==

// Create the optiony link.
var theURL = window.location.href;

// I'll be using '?gm' to indicate the griddy view.
var optLink = document.createElement("a");
if (theURL.indexOf("gm") == -1) {
	optLink.setAttribute("href", theURL.replace("Schedule2010", "Schedule2010?gm"));
	optLink.appendChild(document.createTextNode("Switch to table view"));
} else {
	optLink.setAttribute("href", theURL.replace("?gm", ""));
	optLink.appendChild(document.createTextNode("Switch to schedule view"));
}
var tmp = document.getElementById("node-84");
tmp.insertBefore(optLink, tmp.childNodes[0]);

// Only griddify if the page is set to gm.
if (theURL.indexOf("gm") > -1) {
	// Start the table.
	var newTable = document.createElement("table");
	newTable.setAttribute("border", "1");

	// Set the header row.
	var newRow = document.createElement("tr");
	var titleThings = new Array("#", "Start Time", "Length", "Room", "Title", "Description", "Participants");
	for (var x = 0; x < titleThings.length; x++) {
		var newCell = document.createElement("th");
		newCell.setAttribute("style", "background-color: #9294A5; color: #EEE; padding: 5px;");
		newCell.innerHTML = titleThings[x];
		newRow.appendChild(newCell);
	}
	newTable.appendChild(newRow);

	// Arr.  Get the content.
	var allDivs = document.evaluate('//div[@class="content"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var thisDiv = allDivs.snapshotItem(allDivs.snapshotLength - 1);
	var namedDay = "";

	for (var x = 0; x < thisDiv.childNodes.length; x++) {
		// Get the "Generated on" and day-nav things.
		if (x == 1) { var theGen = thisDiv.childNodes[x].innerHTML; }
		if (x == 3) { var theNav = thisDiv.childNodes[x].innerHTML; }

		var thisElm = thisDiv.childNodes[x];
		if (thisElm.nodeName.toUpperCase() == "H3") {
			// Get the day/time thing.
			var theTime = thisElm.innerHTML;
		} else if (thisElm.nodeName.toUpperCase() == "DL") {
			var newRow = document.createElement("tr");
			newRow.setAttribute("style", "vertical-align: top; background-color: #FFF");

			var lineItem = thisElm.childNodes[0];

			// Get the item ID (why not) and title.
			var theId = lineItem.childNodes[0].innerHTML.split("] ")[0];
			var newCell = document.createElement("td");
			newCell.setAttribute("style", "padding: 5px;");
			newCell.appendChild(document.createTextNode(theId.substr(1)));
			newRow.appendChild(newCell);

			var theTitle = lineItem.childNodes[0].innerHTML.split("] ")[1];

			// Go with the duration.
			var duration = lineItem.childNodes[2].innerHTML.substr(3);

			// Pull out the new start time, if any.
			if (duration.indexOf(",") > -1) {
				theTime = theTime.split(" ")[0] + ' ' + duration.split(", ")[0];
				duration = duration.split(", ")[1];
			}
			if (namedDay == "" || namedDay != theTime.split(" ")[0]) {
				namedDay = theTime.split(" ")[0];
				// Also, set the hash-ref for the new day.
				theTime = '<a name="' + theTime.substr(0, 3) + '"></a>' + theTime;
			}
			var newCell = document.createElement("td");
			newCell.innerHTML = theTime;
			newCell.setAttribute("style", "white-space: nowrap; padding: 5px;");
			newRow.appendChild(newCell);

			// Do the hrs/mins things.
			if (duration.indexOf(" ") > -1) {
				var tmp1 = duration.split(" ")[0];
				var tmp2 = duration.split(" ")[1];
				duration = doMin(tmp2, tmp1);
			} else if (duration.substr(-2) == "hr") {
				duration = doHour(duration, "00");
			} else {
				duration = doMin(duration, "00");
			}
			var newCell = document.createElement("td");
			newCell.setAttribute("style", "padding: 5px;");
			newCell.innerHTML = duration;
			newRow.appendChild(newCell);

			// The room.
			var newCell = document.createElement("td");
			newCell.setAttribute("style", "white-space: nowrap; padding: 5px;");
			newCell.innerHTML = lineItem.childNodes[4].innerHTML.substr(3);
			newRow.appendChild(newCell);

			// The panel title.
			var newCell = document.createElement("td");
			newCell.setAttribute("style", "padding: 5px;");
			newCell.innerHTML = theTitle;
			newRow.appendChild(newCell);

			// Description and participants, if any.
			if (thisElm.childNodes.length == 3) {
				// No description or known participants.
				var theDesc = "";
				var participants = "";
			} else {
				var theBlock = thisElm.childNodes[3].innerHTML;
				if (theBlock.indexOf('<i><a href="Bios') > -1) {
					// Woo-dee-hoo.
					theDesc = theBlock.split('<i><a href="Bios')[0];
					var participants = '<a href="Bios' + theBlock.split('<i><a href="Bios')[1];
					participants = participants.replace("</i>", "");
				} else {
					// Only a description.
					theDesc = theBlock;
					var participants = "";
				}
			}
			var newCell = document.createElement("td");
			newCell.setAttribute("style", "padding: 5px;");
			newCell.innerHTML = theDesc;
			newRow.appendChild(newCell);
			var newCell = document.createElement("td");
			newCell.setAttribute("style", "padding: 5px;");
			newCell.innerHTML = participants;
			newRow.appendChild(newCell);

			newTable.appendChild(newRow);
		}
	}

	// Replace the existing content with the new content.
	var newDiv = document.createElement("div");
	newDiv.appendChild(newTable);
	thisDiv.innerHTML = '<p>' + theGen + '</p>' + '<p>' + theNav + '</p>' + newDiv.innerHTML;
}

// Function for the hours part -- and both, kind of.
function doHour(str, mint) {
	str = '00' + str.replace("hr", "");
	str = "(" + str.substr(-2) + ":" + mint + ")";
	return str;
}

// Function for the minutes part.
function doMin(str, hr) {
	str = '00' + str.replace("min", "");
	str = doHour(hr, str.substr(-2));
	return str;
}
