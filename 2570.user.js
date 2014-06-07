// copyright 2005 Billy wenge-murphy
// first release: dec 23, 2005

// ==UserScript==
// @name LJ: express lane counter
// @version	1.0
// @namespace	http://doorknobsoft.com/greasemonkey/scripts/
// @description	Keeps a record of "express lane" stats
// @include	http://*.livejournal.com/*
// ==/UserScript==

( function() {

	//<!-- LiveJournal ExpressLane: You received this page before 123 free users, saving approximately 3 seconds! -->
	
	//running total of users, saved across all sessions
	var screwedUsersTotal;
	//running total of time saved, saved across all sessions
	var savedTimeTotal;
	// and this time....
	var screwedUsers = 0;
	var savedTime = 0;
	// record...
	var recordUsers;
	var recordTime;
	// option whether or not to show info box
	var showInfoBox;
	// this is how many times they loaded the page as a logged in, paid account user
	//	used for determining how much of the time there was no need to cut in line
	var pageLoads;
	// times there's been a line / they've cut in front of free users
	var timesInLine;
	// percentage of times there's been no line, calculated with the above.
	// 		first caclulated as percent there's been a line, then subtracted from 100
	var percentWithLine;
	
	screwedUsersTotal = parseInt(GM_getValue("screwedUsersTotal",0));
	savedTimeTotal = parseInt(GM_getValue("savedTimeTotal", 0));
	showInfoBox = GM_getValue("showInfoBox", true);
	recordUsers = GM_getValue("recordUsers", 0);
	recordTime = GM_getValue("recordTime", 0);
	pageLoads = GM_getValue("pageLoads", 1);	// default to 1 to avoid division by 0 when caculating percentWithLine
	timesInLine = GM_getValue("timesInLine", 0);
	
	regex = /You received this page before (\d+?) free users(?:, saving approximately (\d+?) seconds){0,1}/;
	// get the HTML of the whole page
	laneMessage = document.getElementsByTagName("HTML")[0].innerHTML;
	// get only the part containing the expresslane comment and some junk after, so that on the off change this phrase appears in the page, it will
	// not interfere
	start = laneMessage.indexOf("LiveJournal ExpressLane")
	laneMessage = laneMessage.substring(start, start + 120);
	
	// extract and save the new values
	regexResult = regex.exec(laneMessage);
	if (regexResult) {
		pageLoads++;
		GM_setValue("pageLoads", pageLoads);
		screwedUsers = parseInt(regexResult[1])
		screwedUsersTotal += screwedUsers;
		if (regexResult[2]) {
			savedTime = parseInt(regexResult[2])
			savedTimeTotal += savedTime;
		}
		GM_setValue("screwedUsersTotal", screwedUsersTotal);
		GM_setValue("savedTimeTotal", savedTimeTotal);
		
		if (screwedUsers > recordUsers) {
			GM_setValue("recordUsers", screwedUsers);
			// since this time was the record, make sure it displays
			recordUsers = screwedUsers;
		}
		if (savedTime > recordTime) {
			GM_setValue("recordTime", savedTime);
			// since this time was the record, make sure it displays
			recordTime = savedTime;
		}
		// if screwed users >= 1, there was a line, even if small, so increment timesInLine
		if (screwedUsers >= 1) {
			timesInLine++;
			GM_setValue("timesInLine", timesInLine);
		}

	}
	
	percentWithLine = timesInLine / pageLoads;
	percentWithLine = (1 - percentWithLine) * 100;
	percentWithLine = parseInt(percentWithLine);

		// make a box to display the info in
		infoBox = document.createElement("DIV");
		infoBox.setAttribute("ID","expressLaneInfoBox");
		infoBox.style.position = "fixed";
		infoBox.style.display = "none";
		if (showInfoBox) {
			infoBox.style.display = "block";
		}
		infoBox.style.width = 250;
		infoBox.style.height = 100;
		infoBox.style.zIndex = 12456789;
		infoBox.style.backgroundColor = "red";
		infoBox.style.fontSize = "14px";
		infoBox.style.left = "0%";
		infoBox.style.top = "88%";
		infoBox.innerHTML = ("<span style='font-size:12px'><font size='2'>You've screwed over <b>"
							+ screwedUsersTotal + "</b> free users,<br> saving YOURSELF <b>"
							+ savedTimeTotal + "</b> seconds!<br>"
							+ "This time: <b>" + screwedUsers + "</b> users, <b>" + savedTime + " seconds</b><br>"
							+ "Record: <b>" + recordUsers + "</b> users; <b>" + recordTime + "</b> seconds<br>"
							+ "<b>" + percentWithLine +"%</b> of the time there's been no line!</font></span>");
		body = document.getElementsByTagName("BODY")[0];
		body.insertBefore(infoBox, body.firstChild);

		infoBox.addEventListener("click", showhide, true);
	
	function showhide() {
		var infoBox = document.getElementById("expressLaneInfoBox");
		if (infoBox.style.display != "none") {
			infoBox.style.display = "none";
			GM_setValue("showInfoBox", false);
		} else {
			infoBox.style.display = "block";
			GM_setValue("showInfoBox", true);
		}
	}
	
	GM_registerMenuCommand( "Show/Hide ExpressLane stats", showhide);

})();