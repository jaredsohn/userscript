// ==UserScript==
// @name           Schneckenhof.de Location Highlighter
// @namespace      shlochigh
// @description    Highlights configured Locations in EventPlaner
// @include        http://*.schneckenhof.de/Events*
// ==/UserScript==

// TODO:
// location schleife als while schleife, damit nicht immer jede location durchgegangen werden muss

// ----------------------------------------------------------------
// | Configuration
// ----------------------------------------------------------------

var locationNames = GM_getValue("locationNames", "xyz").split(",");

var colorChecked = GM_getValue("colorChecked", "#004400");
var colorUnchecked = GM_getValue("colorUnchecked", "#440000");

var hideOther = GM_getValue("hideOther", false);
var hideChecked = GM_getValue("hideChecked", false);


// ----------------------------------------------------------------
// | Menü
// ----------------------------------------------------------------

GM_registerMenuCommand("Locations eintragen", setLocationNames);

GM_registerMenuCommand(" ", spacer);

GM_registerMenuCommand("Farbe Fotograf ausgewählt", setColorChecked);
GM_registerMenuCommand("Farbe Fotograf nicht ausgewählt", setColorUnchecked);

GM_registerMenuCommand("  ", spacer2);

if (hideChecked) {
	GM_registerMenuCommand("Bereits ausgewählte Locations einblenden", setHideChecked);
} else {
	GM_registerMenuCommand("Bereits ausgewählte Locations ausblenden", setHideChecked);
}
if (hideOther) {
	GM_registerMenuCommand("Nicht eingetragene Locations einblenden", setHideOther);
} else {
	GM_registerMenuCommand("Nicht eingetragene Locations ausblenden", setHideOther);
}

// ----------------------------------------------------------------
// | Menü Funktionen
// ----------------------------------------------------------------

function spacer() {
}

function spacer2() {
}

function setLocationNames() {
	var x = prompt("Locations eintragen (z.B. Location1,Location2,Location3,..):", locationNames);
	GM_setValue("locationNames", x);
	location.reload();
}

function setColorChecked() {
	var x = prompt("Farbe für Locations, bei denen EIN Fotograf ausgewählt ist:", colorChecked);
	GM_setValue("colorChecked", x);
	location.reload();
}

function setColorUnchecked() {
	var x = prompt("Farbe für Locations, bei denen KEIN Fotograf ausgewählt ist:", colorUnchecked);
	GM_setValue("colorUnchecked", x);
	location.reload();
}

function setHideOther() {
	if (hideOther) {
		GM_setValue("hideOther", false);
	} else {
		GM_setValue("hideOther", true);
	}
	location.reload();
}

function setHideChecked() {
	if (hideChecked) {
		GM_setValue("hideChecked", false);
	} else {
		GM_setValue("hideChecked", true);
	}
	location.reload();
}


// ----------------------------------------------------------------

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function highlightLocations() {
var arr = getElementsByClass("eventBox0");
arr = arr.concat(getElementsByClass("eventBox10"));
arr = arr.concat(getElementsByClass("eventBox100"));
arr = arr.concat(getElementsByClass("eventBoxUni"));

// Locations highlighten
var other = true;
for (i = 0; i < arr.length; i++) {
	other = true;
	for (j = 0; j < locationNames.length; j++) {
		if (arr[i].innerHTML.indexOf(locationNames[j]+"</a>") != -1) {
			other = false;
			if (arr[i].tBodies[0].rows[0].cells[2].getElementsByTagName('input')[0]!=undefined && arr[i].tBodies[0].rows[0].cells[2].getElementsByTagName('input')[0].checked == false) {
				arr[i].style.background = colorUnchecked;
			} else if (hideChecked) {
				arr[i].style.display = "none";
			} else {
				arr[i].style.background = colorChecked;
			}
		}
	}
	if (hideOther && other) {
		arr[i].style.display = "none";
	}
}
}

highlightLocations();