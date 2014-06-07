// ==UserScript==
// @name           Arisia ConSchedule Filter
// @namespace      http://axisofevil.net/~xtina/
// @description    Remove things you don't care about.
// @include        http://2009.arisia.org/ConSchedule*
// ==/UserScript==

// This part, you edit.  Add names of participants here to remove them from the
// page.  Comma-separated: ("Michael Moore", "Monkey Butter")
var folkFilters = new Array("");
// End editing.


// Set all tracks.
var allTracks = new Array("Anime", "Art", "Comic", "Costuming", "Fan Interest", "Fandom", "FastTrack", "Filk", "Gaming", "Life 2.0", "Lifestyles", "Literature", "Media", "Science", "Teen");

// Set the menu item.
GM_registerMenuCommand("Arisia Track Filteriser", setTracks);

// The window for filtering the tracks.
function setTracks() {
	editWindow = window.open("about:blank", "_blank", "width=250, height=300, resizable=1");

// Style tiem.
	editWindow.document.writeln('<html><head><style type="text/css">body, td { font-family: Verdana; font-size: 10pt; color: #036 }');
	editWindow.document.writeln('body { text-align: center; }');
	editWindow.document.writeln('form { border: 1px #CCC dotted; width: 200px; text-align: center; } p { color: #000; text-align: left; padding: 0 10px 0 10px;}');
	editWindow.document.writeln('td { text-align: left; } table { width: 180px; } </style></head><body>');

// Open the form, and warn.
	editWindow.document.writeln("<p>Check to view items in that track; uncheck to not.");
	editWindow.document.writeln("<form name='trackform' action='about:blank'>");
	editWindow.document.writeln("<table>");

// Check if none are checked.
	var tkCt = 0;
	for (var x = 0; x < allTracks.length; x++) {
		if (GM_getValue(allTracks[x], "") == "") { tkCt++; }
	}
	if (tkCt == allTracks.length) { tkCt = "all"; }

// Woo dee woo, tracks.
	for (var x = 0; x < allTracks.length; x++) {
		var thisTrack = allTracks[x];
		editWindow.document.writeln("<tr><td><input type='checkbox' name='" + thisTrack + "' value='" + thisTrack);
		if (GM_getValue(thisTrack, "") == "chk" || tkCt == "all") {
			editWindow.document.writeln("' checked");
		}
		editWindow.document.writeln("'></td><td>" + thisTrack + "</td></tr>");
	}

// La la close out.
	editWindow.document.writeln("<tr><td colspan=2><input type='submit' value='Set Filters'></td></tr>");
	editWindow.document.writeln("</table></form>");
	editWindow.document.writeln("</body></html>");

	editWindow.document.close();

	var form = editWindow.document.forms.namedItem("trackform");
	form.addEventListener("submit", processForm, true); 
	editWindow.focus();
}

// Process the form - set all the elements.
function processForm() {
	var form = editWindow.document.forms.namedItem("trackform");
	var allInp = form.getElementsByTagName("input");
	for (var x = 0; x < (allInp.length - 1); x++) {
		if (allInp[x].checked == true) {
			GM_setValue(allInp[x].name, "chk");
		} else {
			GM_setValue(allInp[x].name, "");
		}
	}

	editWindow.close();
	location.reload();
}

// Having accomplished this, we go forth and remove/reshow rows.

var tkCt = 0;
var filtTracks = new Array();

for (var x = 0; x < allTracks.length; x++) {
	if (GM_getValue(allTracks[x], "") == "") {
		tkCt++;
		filtTracks.push(allTracks[x]);
	}
}

// If there actually are tracks to filter on...
if (tkCt < allTracks.length) {
	var allDays = document.getElementsByTagName("table");
	for (var x = 0; x < allDays.length; x++) {
		var allEvents = allDays[x].getElementsByTagName("tr");
		for (var y = 1; y < allEvents.length; y++) {
			var thisTrack = allEvents[y].childNodes[7].innerHTML;
			thisTrack = thisTrack.replace(/\n/, " ");
			if (tFilt(thisTrack) == true) {
				allEvents[y].style.display = "none";
			}
		}
	}
}

// Folk filter.
var allDays = document.getElementsByTagName("table");
for (var x = 0; x < allDays.length; x++) {
	var allEvents = allDays[x].getElementsByTagName("tr");
	for (var y = 1; y < allEvents.length; y++) {
		var thisFolk = allEvents[y].childNodes[11].innerHTML;
		if (fFilt(thisFolk) == true) {
			allEvents[y].style.display = "none";
		}
	}
}

// Filtering tracks.

function tFilt(evt) {
	for (var x = 0; x < filtTracks.length; x++) {
		if (evt == filtTracks[x]) {
			return true;
		}
	}
	return false;
}

// Filtering folk.
function fFilt(evt) {
	for (var y = 0; y < evt.split(",").length; y++) {
		var thisEvt = trim(evt.split(",")[y]);
		thisEvt = thisEvt.replace(/\n/, " ");
		for (var x = 0; x < folkFilters.length; x++) {
			if (thisEvt == folkFilters[x]) {
				return true;
			}
		}
	}
	return false;
}

function trim(str) {
    while('' + str.charAt(0) == ' ') {
        str = str.substring(1, str.length);
    }
    while('' + str.charAt(str.length-1)==' ') {
        str = str.substring(0, str.length-1);
    }
    return str;
}
