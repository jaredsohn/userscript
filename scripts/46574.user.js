// ==UserScript==
// @name          Fanfiction.net Update Changer
// @author        W.Eisenhower
// @version       1.3.2
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
var WordCount = true;

// - Date Format -
// 0: Set time format to US - i.e. MM-DD-YYYY
// 1: Set time format to UK - i.e. DD-MM-YYYY
// 2: Full date - i.e. 12th November 2008
var dateFormat = 1;

// - Date Order -
// 0: Old format, i.e. Published then Updated
// 1: New format, i.e. Update then Published
var dateOrder = 0;

// - Time Since Update Format -
// 0: Short Format, i.e. 1y 13w 4d
// 1: Long format, i.e. 1 year, 13 weeks, 4 days
var dateUpdateFormat = 1;

// - Date Separator -
// Change this to whatever you want the date separator to be, e.g. DD-MM-YYYY, DD.MM.YYYY, DD/MM/YYYY etc.
var sep = "/";

// - Show Date Change if Completed -
// false: No
// true: Yes
var bCompletedChange = false;

// -------- End Options --------


window.addEventListener('load', function() {

var data = document.getElementsByTagName('span');
var i = 0;

var divs = new Array();
var list = false;

for (i = 0; i < data.length; i++) {
	if (data[i].innerHTML.match("Published:")) {
		if (data[i].className == "gray") {
			list = true;
			doWork(data, i, true);
		}
	}
}

data = document.getElementsByTagName('div');

for (i = 0; i < data.length; i++) {
	if (data[i].innerHTML.match("Published:")) {
		if (data[i].className == "gray z-padtop2") {
			list = true;
			doWork(data, i, true);
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


function getNumberSuffix(i) {
	var num = i.charAt(i.length - 1);
	var pnum = i.charAt(i.length - 2);
	if (pnum == 0) {
		i = num;
	}
	
	if (pnum == 1) {
		return i+"th";
	} else {
		if (num == 1) {
			return i+"st";
		} else if (num == 2) {
			return i+"nd";
		} else if (num == 3) {
			return i+"rd";
		} else {
			return i+"th";
		}
	}
}

function getMonthValue(i) {
	switch (parseInt(i)) {
		case(1): return "January"; break;
		case(2): return "February"; break;
		case(3): return "March"; break;
		case(4): return "April"; break;
		case(5): return "May"; break;
		case(6): return "June"; break;
		case(7): return "July"; break;
		case(8): return "August"; break;
		case(9): return "September"; break;
		case(10): return "October"; break;
		case(11): return "November"; break;
		case(12): return "December"; break;
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

	
	if (html.match("Published:")) {
		// Change the published date format to match the update date format.
		p = html.match("Published: ([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})");
		var published = '';
		if (p[1].length < 2) {
			p[1] = "0"+p[1];
		}
		if (p[2].length < 2) {
			p[2] = "0"+p[2];
		}
		if (p[3] < 70) {
			if (dateFormat == 0) {
				published = p[1]+sep+p[2]+sep+"20"+p[3]; // US date format
			} else if (dateFormat == 1) {
				published = p[2]+sep+p[1]+sep+"20"+p[3]; // UK date format
			} else {
				published = getNumberSuffix(p[2])+" "+getMonthValue(p[1])+" 20"+p[3];
			}
			var date = new Date(p[1]+"/"+p[2]+"/"+"20"+p[3]);
		} else {
			if (dateFormat == 0) {
				published = p[1]+sep+p[2]+sep+"19"+p[3]; // US date format
			} else if (dateFormat == 1) {
				published = p[2]+sep+p[1]+sep+"19"+p[3]; // UK date format
			} else {
				published = getNumberSuffix(p[2])+" "+getMonthValue(p[1])+" 19"+p[3];
			}
			var date = new Date(p[1]+"/"+p[2]+"/"+"20"+p[3]);
		}
	}
	
	var datestring = '';
	
	var bUpdated = false;
	if (html.match("Updated:")) {
		// If the story has more than one chapter, use the updated value instead of the published value.
		bUpdated = true;
		u = html.match("Updated: ([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})");
		if (u[1].length < 2) {
			u[1] = "0"+u[1];
		}
		if (u[2].length < 2) {
			u[2] = "0"+u[2];
		}
		if (u[3] < 70) {
			if (dateFormat == 0) {
				datestring = u[1]+sep+u[2]+sep+"20"+u[3]; // US date format
			} else if (dateFormat == 1) {
				datestring = u[2]+sep+u[1]+sep+"20"+u[3]; // UK date format
			} else {
				datestring = getNumberSuffix(u[2])+" "+getMonthValue(u[1])+" 20"+u[3];
			}
			var date = new Date(u[1]+"/"+u[2]+"/"+"20"+u[3]);
		} else {
			if (dateFormat == 0) {
				datestring = u[1]+sep+u[2]+sep+"19"+u[3]; // US date format
			} else if (dateFormat == 1) {
				datestring = u[2]+sep+u[1]+sep+"19"+u[3]; // UK date format
			} else {
				datestring = getNumberSuffix(u[2])+" "+getMonthValue(u[1])+" 19"+u[3];
			}
			var date = new Date(u[1]+"/"+u[2]+"/"+"19"+u[3]);
		}
	} else {
		datestring = published;
	}

	if (!(datestring == '')) {
		if (!(bCompleted) && !(bCompletedChange)) {
			var diff = 0, updated = '';
			var today = new Date();
			diff = Math.round((today - date)/(1000*60*60*24));

			if (colourDate > 0) {
				var colour = '';
				switch (true) {
					case (diff < 14): colour = "#00A000"; break;   // Green
					case (diff < 28): colour = "#0000CD"; break;   // Blue
					case (diff < 91): colour = "#800080"; break;   // Purple
					case (diff < 182): colour = "#FF8C00"; break;  // Orange
					case (diff >= 182): colour = "#FF0000"; break; // Red
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
						if (dateUpdateFormat == 0) {
							strYears = "1y";
						} else {
							strYears = "1 year";
						}
					} else {
						if (dateUpdateFormat == 0) {
							strYears = iYears + "y";
						} else {
							strYears = iYears + " years";
						}
					}		
				}

				if ((diff % 365) > 0) {
					iWeeks = Math.floor((diff % 365) / 7);
					if (iWeeks == 1) {
						if (dateUpdateFormat == 0) {
							strWeeks = "1w";
						} else {
							strWeeks = "1 week";
						}
					} else {
						if (dateUpdateFormat == 0) {
							strWeeks = iWeeks + "w";
						} else {
							strWeeks = iWeeks + " weeks";
						}
					}
				}

				if ((diff % 7) > 0) {
					iDays = Math.floor(diff % 7);
					if (iDays == 1) {
						if (dateUpdateFormat == 0) {
							strDays = "1d";
						} else {
							strDays = "1 day";
						}
					} else {
						if (dateUpdateFormat == 0) {
							strDays = iDays + "d";
						} else {
							strDays = iDays + " Days";
						}
					}
				}

				if (iYears > 0) {
					updated = updated + strYears;
				}

				if (iWeeks > 0) {
					if (iYears > 0) {
						if (dateUpdateFormat == 0) {
							updated = updated + " ";
						} else {
							updated = updated + ", ";
						}
					}
					updated = updated + strWeeks;
				}

				if (iDays > 0) {
					if (iYears > 0 || iWeeks > 0) {
						if (dateUpdateFormat == 0) {
							updated = updated + " ";
						} else {
							updated = updated + ", ";
						}
					}
					updated = updated + strDays;
				}
			}
		}

		var strUpdated = "";
		var change = "";
		if (colourDate == 2) {
			if (!(bCompleted)) {
				strUpdated = "<span style=\"color: "+colour+";\">"+datestring+" ("+updated+")</span>"; // If the story is not complete, add colour.
			} else {
				if (bCompletedChange) {
					change = " ("+updated+")";
				}
				strUpdated = datestring+change;
				if (list) {
					strUpdated = strUpdated + " - <span style=\"color: #00A000;\">Complete</span>";
				}
			}
		} else if (colourDate == 1) {
			if (!(bCompleted)) {
				strUpdated = datestring+" <span style=\"color: "+colour+";\">("+updated+")"+"</span>"; // If the story is not complete, add colour.
			} else {
				if (bCompletedChange) {
					change = " ("+updated+")";
				}
				strUpdated = datestring+change;
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
	}


	// Word Count
	if (!(list)) {
		if (WordCount) {
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

}, true);
