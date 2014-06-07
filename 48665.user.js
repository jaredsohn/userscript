// ==UserScript==
// @name          Fanfiction.net Update Changer
// @author        W.Eisenhower
// @version       1.3
// @description   Highlights, using colours, how long since the last update. UPDATED FOR NEW SITE LAYOUT.
// @include       http://*.fanfiction.net/*
// ==/UserScript==


// -------- Begin Options --------

// - Date Colour -
// 0: Don't colour anything, just show the amount of time since last update.
// 1: Only colour the amount of time since last update.
// 2: Colour both the date of last update and amount of time since then.
var colourDate = 2;

// - Word Count -
// 0: Don't calculate or show the word count.
// 1: Calculate and show the word count.
var enableWordCount = 0;

// - Date Format -
// 0: Set time format to US - i.e. MM-DD-YYYY
// 1: Set time format to UK - i.e. DD-MM-YYYY
var dateFormat = 1;

// - Date Order -
// 0: Old format, i.e. Published then Updated
// 1: New format, i.e. Update then Published
var dateOrder = 0;

// - Date Separator -
// Change this to whatever you want the date separator to be, e.g. DD-MM-YYYY, DD.MM.YYYY, DD/MM/YYYY etc.
var sep = "-";

// -------- End Options --------


var data = document.getElementsByTagName('div');
var i = 0;

var divs = new Array();
var list = false;
for (i = 0; i < data.length; i++) {
	if (data[i].innerHTML.match("Published:")) {
		if (data[i].className == "gray x-padtop2") {
			doWork(data, i, true);
			list = true;
		}
	}
}

if (!(list)) {
	for (i = 0; i < data.length; i++) {
		if (data[i].innerHTML.match("Published:")) {
			doWork(data, i, false);
		}
	}
}

function doWork(data, i, list) {
	var html = data[i].innerHTML;

	var bCompleted = false;
	if (list) {
		if (html.match(/[ -]?Complete[ -]?/)) {
			bCompleted = true;
			html = html.replace(/[ -]{0,}Complete[ -]{0,}/, "");
		}
	}
	if (!(list) && html.match("- Complete -")) {
		// If story has been completed, then show the Complete sign in green.
		bCompleted = true;
		html = html.replace("- Complete -", "- <span style=\"color: #00A000;\">Complete</span> -");
	}

	

	// Change the published date format to match the update date format.
	p = html.match("Published: ([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})");
	var published = '';
	if (p[3] < 50) {
		if (dateFormat == 0) {
			published = p[1]+sep+p[2]+sep+"20"+p[3]; // US date format
		} else {
			published = p[2]+sep+p[1]+sep+"20"+p[3]; // UK date format
		}
		var date = new Date(p[1]+"/"+p[2]+"/"+"20"+p[3]);
	} else {
		if (dateFormat == 0) {
			published = p[1]+sep+p[2]+sep+"19"+p[3]; // US date format
		} else {
			published = p[2]+sep+p[1]+sep+"19"+p[3]; // UK date format
		}
		var date = new Date(p[1]+"/"+p[2]+"/"+"20"+p[3]);
	}
	
	var bUpdated = false;
	if (html.match("Updated: ")) {
		// Only if the story has more than one chapter, it shows the Updated date value.
		bUpdated = true;
		u = html.match("Updated: ([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})");
	
		var datestring = '';
		if (u[3] < 50) {
			if (dateFormat == 0) {
				datestring = u[1]+sep+u[2]+sep+"20"+u[3]; // US date format
			} else {
				datestring = u[2]+sep+u[1]+sep+"20"+u[3]; // UK date format
			}
			var date = new Date(u[1]+"/"+u[2]+"/"+"20"+u[3]);
		} else {
			if (dateFormat == 0) {
				datestring = u[1]+sep+u[2]+sep+"19"+u[3]; // US date format
			} else {
				datestring = u[2]+sep+u[1]+sep+"19"+u[3]; // UK date format
			}
			var date = new Date(u[1]+"/"+u[2]+"/"+"19"+u[3]);
		}
	} else {
		datestring = published;
	}

	var diff = 0, updated = '';
	var today = new Date();
	diff = Math.round((today - date)/(1000*60*60*24));

	if (colourDate > 0) {
		var colour = '';
		switch (true) {
			case (diff < 14): colour = "#00A000"; break;   // Green
			case (diff < 31): colour = "#0000CD"; break;   // Blue
			case (diff < 90): colour = "#800080"; break;   // Purple
			case (diff < 180): colour = "#FF8C00"; break;  // Orange
			case (diff >= 180): colour = "#FF0000"; break; // Red
		}
	}

	if (diff == 0) {
		updated = "Today";
	} else if (diff == 1) {
		updated = "Yesterday";
	} else {
		var iYears = 0, iWeeks = 0, iDays = 0, strYears = "", strWeeks = "", strDays = "";

		if (diff >= 365) {
			iYears = Math.floor(diff / 365);
			if (iYears == 1) {
				strYears = "1 year";
			} else {
				strYears = iYears + " years";
			}		
		}

		if ((diff % 365) > 0) {
			iWeeks = Math.floor((diff % 365) / 7);
			if (iWeeks == 1) {
				strWeeks = "1 week";
			} else {
				strWeeks = iWeeks + " weeks";
			}
		}

		if ((diff % 7) > 0) {
			iDays = Math.floor(diff % 7);
			if (iDays == 1) {
				strDays = "1 day";
			} else {
				strDays = iDays + " days";
			}
		}

		if (iYears > 0) {
			updated = updated + strYears;
		}

		if (iWeeks > 0) {
			if (iYears > 0) {
				updated = updated + ", ";
			}
			updated = updated + strWeeks;
		}

		if (iDays > 0) {
			if (iYears > 0 || iWeeks > 0) {
				updated = updated + ", ";
			}
			updated = updated + strDays;
		}
	}

	var strUpdated = "";
	if (colourDate == 2) {
		if (!(bCompleted)) {
			strUpdated = "<span style=\"color: "+colour+";\">"+datestring+" ("+updated+")</span>"; // If the story is not complete, add colour.
		} else {
			strUpdated = datestring+" ("+updated+")";
			if (list) {
				strUpdated = strUpdated + " - <span style=\"color: #00A000;\">Complete</span>";
			}
		}
	} else if (colourDate == 1) {
		if (!(bCompleted)) {
			strUpdated = datestring+" <span style=\"color: "+colour+";\">("+updated+")"+"</span>"; // If the story is not complete, add colour.
		} else {
			strUpdated = datestring+" ("+updated+")";
			if (list) {
				strUpdated = strUpdated + " - <span style=\"color: #00A000;\">Complete</span>";
			}
		}
	}

	if (bUpdated) {
		// Set the new date formats.
		if (dateOrder == 1) {
			html = html.replace(u[0]+" - "+p[0], "Updated: "+strUpdated+" - Published: "+published);
		} else {
			html = html.replace(u[0]+" - "+p[0], "Published: "+published+" - Updated: "+strUpdated);
		}
	} else {
		// Just set the new published format.
		html = html.replace(p[0], "Published: "+strUpdated);
	}


	// Word Count
	if (!(list)) {
		if (enableWordCount == 1) {
			var content = document.getElementById("storytext").textContent;
			content = content.replace(/\.[a-z]/gi, " ");
			var words = content.split(/\s/);
			if (dateOrder == 1) {
				html = html.replace("Updated:", "Words: "+words.length+" - Updated:");
			} else {
				html = html.replace("Published:", "Words: "+words.length+" - Published:");
			}
		}
	}
	// End Word Count
	
	data[i].innerHTML = html; // Apply Changes
}