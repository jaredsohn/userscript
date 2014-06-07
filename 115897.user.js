// ==UserScript==
// @name           TL Local Timezone
// @description    Converts times to your local time on TeamLiquid.net
// @include        *teamliquid.net/*
// ==/UserScript==

////           //
/// SETTINGS  ///
//           ////

// How old a post can be for the small timer to show. In hours
//
// EXAMPLE:
// recent = 0   (turns it off)
// recent = -1  (shows the timer for ALL posts)
// recent = 24  (shows the timer for posts posted within 24 hours)
var recent = 24;

//////////////////////////////////////////////////////////////////////////

// Removes replyArea from script
if (document.getElementById("reply_area")) {
    var replyArea = document.getElementById("reply_area").innerHTML;
    document.getElementById("reply_area").innerHTML = "";
}


var html = document.body.innerHTML;





var localTime = new Date();
var localHour = localTime.getHours();
var localHourOffset = localTime.getTimezoneOffset() / 60;
var timeOffset = 9 + localHourOffset;

var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

// POSTDATES ////
var myRe = /(January|February|March|April|May|June|July|August|September|October|November|December).{4,7}20[0-9]{2}.[0-9]{2}:[0-9]{2}/g;
var myArray;

var counter = 0;
var arrayMatch = [];
var arrayLength = [];
var arrayStartpos = [];

// Fetching replace strings and positions
while ((myArray = myRe.exec(html)) !== null) {
    arrayMatch[counter] = myArray[0];
    arrayLength[counter] = myArray[0].length;
    arrayStartpos[counter] = myRe.lastIndex - myArray[0].length;
    counter++;
}

// Convert and replace text
var i = 0;
for (i = counter - 1; i >= 0; i--) {
    var thisHour;
    var thisMinute;
    var workStr = String(arrayMatch[i]);

    var postHour = workStr.substring(workStr.length - 5, workStr.length - 3);
    var postMinute = workStr.substring(workStr.length - 2, workStr.length);
    var postYear = parseInt(workStr.match(/[0-9]{4}/), 0);
    var postMonthName = workStr.match(/[A-z]*/);
    var postMonth = monthToNumber(postMonthName);
    var postDay = workStr.match(/[0-9]{2}/);

    var postDate = new Date(postYear, postMonth, postDay, postHour, postMinute);

    postDate.setHours(postDate.getHours() - timeOffset);

    var monthName = monthNames[postDate.getMonth()].substring(0, 3);

    if (postDate.getHours() < 10) {
        thisHour = "0" + String(postDate.getHours());
    } else {
        thisHour = postDate.getHours();
    }

    if (postDate.getMinutes() < 10) {
        thisMinute = "0" + String(postDate.getMinutes());
    } else {
        thisMinute = postDate.getMinutes();
    }

    var diffMinutes = (localTime.getTime() - postDate.getTime()) / 1000 / 60;
    var diffString = recentPostString(diffMinutes, recent);

    var newString = monthName + " " + postDate.getDate() + " " + postDate.getFullYear() + " " + thisHour + ":" + thisMinute + diffString;

    html = replaceChars(html, newString, arrayStartpos[i], arrayLength[i]);

}

document.body.innerHTML = html;
var g = document.createElement('script');
var s = document.getElementsByTagName('script')[0];
g.text = "jQuery(function(){jQuery('ul.sf-menu').superfish();});"
s.parentNode.insertBefore(g, s);
document.getElementById("reply_area").innerHTML = replyArea;

function recentPostString(diffMinutes, recent) {
    "use strict";
    var color = "",
		diffHours = Math.abs(diffMinutes / 60),
		diffDays = "",
		diffString = "";

    if (diffMinutes < 0) {
        color = "#23d500";
    } else {
        color = "#d20000";
    }

    diffMinutes = Math.abs(diffMinutes);

    if (recent !== 0) {
        if (recent === -1) {
            if (diffHours >= 48) {
                diffDays = diffMinutes / 60 / 24;
                diffString = "<span style='color:" + color + "'> (" + Math.round(diffDays) + " days)</span>";
            } else if (diffHours >= 1) {
                diffString = "<span style='color:" + color + "'> (" + Math.round(diffHours) + " hours)</span>";
			} else if (diffHours < 1) {
                diffString = "<span style='color:" + color + "'> (" + Math.round(diffMinutes) + " min)</span>";
			}
        } else if (diffHours <= recent) {
            if (diffHours >= 48) {
                diffDays = diffMinutes / 60 / 24;
                diffString = "<span style='color:" + color + "'> (" + Math.round(diffDays) + " days)</span>";
            } else if (diffHours >= 1) {
                diffString = "<span style='color:" + color + "'> (" + Math.round(diffHours) + " hours)</span>";
			} else if (diffHours < 1) {
                diffString = "<span style='color:" + color + "'> (" + Math.round(diffMinutes) + " min)</span>";
			}
        }
    }
    return diffString;
}

function monthToNumber(monthName) {
    "use strict";
    if (monthName == "January") {
		return 0;
	}
	if (monthName == "February") {
        return 1;
	}
	if (monthName == "March") {
        return 2;
	}
	if (monthName == "April") {
        return 3;
	}
	if (monthName == "May") {
        return 4;
	}
	if (monthName == "June") {
        return 5;
	}
	if (monthName == "July") {
        return 6;
	}
	if (monthName == "August") {
        return 7;
	}
	if (monthName == "September") {
        return 8;
	}
	if (monthName == "October") {
        return 9;
	}
	if (monthName == "November") {
        return 10;
	}
	if (monthName == "December") {
        return 11;
	}
}
function replaceChars(string, replacement, start, len) {
    "use strict";
	var firstPart  = string.substring(0,start),
		secondPart = string.substring(start+len);
	
	return firstPart + replacement + secondPart;
}