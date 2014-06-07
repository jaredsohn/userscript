// ==UserScript==
// @name Ravelry: Start/End Today
// @namespace http://axisofevil.net/~xtina/
// @description Set the start/end date for a project to today's date.
// @include http://www.ravelry.com/projects/*/edit*
// ==/UserScript==

/* Code 10 minutes to save 10 seconds. */

// Mwahaha functions.
makeLink("completed");
makeLink("started");

// Arr, widen the container to show the images properly.
var style = document.createElement('style');
style.type = 'text/css';
if (document.getElementsByTagName) {
	document.getElementsByTagName('head')[0].appendChild(style);
    if (style.sheet && style.sheet.insertRule) {
        style.sheet.insertRule(".projects .project_overview { width: 291px; }", 0);
    }
}

function makeLink(range) {
	// Create the image element.
	var img = document.createElement("img");
	img.setAttribute("src", "http://style1.ravelry.com/images/silk-tick.png");
	img.setAttribute("border", "0");

	// Create and set the link.
	var lnk = document.createElement("a");
	lnk.setAttribute("href", "#");
	lnk.setAttribute("title", "Set " + range + " date to today's date.");
	lnk.setAttribute("alt", "Set " + range + " date to today's date.");
	lnk.setAttribute("onClick", "javascript:var now = new Date(); document.getElementById(\"date_" + range + "_month\").selectedIndex = now.getMonth() + 1; document.getElementById(\"date_" + range + "_day\").selectedIndex = now.getDate(); var begYear = document.getElementById(\"date_" + range + "_year\"); for (var x = 0; x < begYear.childNodes.length; x++) { if (begYear[x].getAttribute(\"value\") == now.getFullYear()) { document.getElementById(\"date_" + range + "_year\").selectedIndex = x; break; } }");

	// Append the mage to the link.
	lnk.appendChild(img);

	// And put the imagelink in.
	document.getElementById("date_" + range + "_month").parentNode.appendChild(lnk);
}
