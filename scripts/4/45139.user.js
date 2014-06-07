// ==UserScript==
// @name           Seattle Tracker Time In Title
// @namespace      http://axisofevil.net/~xtina/
// @description    Gets the next arrival time of your bus and puts it in the browser title.
// @include        http://trackerloc.kingcounty.gov/avl.jsp?*
// ==/UserScript==

/*
This gets the immediate next arrival time for the bus you choose, and sets it as
the browser title in this format: #Bus: Time - Status
*/


// If you want one particular route, set it here.  Leave blank if the stop only
// serves one route and/or you don't care.  Defaulted to blank.

var busLine = '';

// Do you care to see that a bus has already departed?  Defaulted to ignore.

var ignoreDept = true;


// --vv Don't touch. vv-- //


var theBus;
var isGood = false;

// If there's no bus line indicated, make sure the page is sorting by time.
// Otherwise, sort by route.

var theURL = window.location.href;
if (busLine == '') {
	theURL = theURL.replace("&sort=route", "");
	if (theURL.indexOf("?") > -1 && theURL.indexOf("sort=time") == -1) {
		window.location.href = theURL + "&sort=time";
	}
} else {
	theURL = theURL.replace("&sort=time", "");
	if (theURL.indexOf("?") > -1 && theURL.indexOf("sort=route") == -1) {
		window.location.href = theURL + "&sort=route";
	}
}


// Get table, then all rows in that table.
trackerTable = getElementsByClassName(document, "tr", "backcolor1")[0].parentNode.parentNode;
trackerRows = trackerTable.getElementsByTagName("tr");


if (busLine == '') {

// Get the firstmost bus where the status is *not* Departed.
	if (ignoreDept == true) {
		for (x = 1; x < trackerRows.length; x++) {
			trackRow = trackerRows[x];
			theBus = trackRow.childNodes[0].innerHTML;
			statCell = trackRow.childNodes[3].innerHTML;
			if (statCell.substr(0, 8) != "Departed") {
				isGood = true;
				break;
			}
		}

// Otherwise, get the firstmost bus.
	} else {
		trackRow = trackerRows[1];
		theBus = trackRow.childNodes[0].innerHTML;
		statCell = trackRow.childNodes[3].innerHTML;
		isGood = true;
	}
} else {
	if (ignoreDept == true) {
// Check all rows for the chosen bus where the status is *not* Departed.
		for (x = 1; x < trackerRows.length; x++) {
			trackRow = trackerRows[x];
			theBus = trackRow.childNodes[0].innerHTML;
			if (busLine == theBus) {
				x--;
				while (busLine == theBus) {
					x++;
					trackRow = trackerRows[x];
					theBus = trackRow.childNodes[0].innerHTML;
					statCell = trackRow.childNodes[3].innerHTML;
					if (statCell.substr(0, 8) != "Departed") {
						isGood = true;
						break;
					}
				}
				break;
			}
		}

	} else {
// Otherwise, check all rows for the chosen bus.
		for (x = 1; x < trackerRows.length; x++) {
			trackRow = trackerRows[x];
			theBus = trackRow.childNodes[0].innerHTML;
			if (busLine == theBus) {
				statCell = trackRow.childNodes[3].innerHTML;
				isGood = true;
				break;
			}
		}
	}
}

if (isGood == true) {
// Get the due time and status.
	timeCell = trackRow.childNodes[2].innerHTML;

// Aaand set the title.
	var newTitle = '#' + theBus + ': ' + timeCell + ' - ' + statCell;
	top.document.title = newTitle;
} else {
// For JS reasons, the title gets b0rked afters.  Make it pretty.
	var newTitle = document.getElementsByTagName("h2")[0].innerHTML;
	newTitle = newTitle.replace("&amp;", "&");
	top.document.title = newTitle;
}


// Code from: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all :
        oElm.getElementsByTagName(strTagName);

    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];     
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}