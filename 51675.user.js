// Shows the time for the next match on the team page
//
// version 0.2.8
// 2009-06-09
// Copyright (c) 2009, Mikkel Bundgaard
// Released under the Creative Commons Attribution 3.0 Unported license
// http://creativecommons.org/licenses/by/3.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Next Match Countdown", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Next Match Countdown
// @namespace      http://www.grid-iron.org/
// @description    Shows a countdown for the next match on the team page
// @copyright      2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license        (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version        0.2.8
// @include        http://www.grid-iron.org/index.php?page=club
// @include        http://grid-iron.org/index.php?page=club
// @include        http://www.grid-iron.org/index.php?page=club&team_id=*
// @include        http://grid-iron.org/index.php?page=club&team_id=*
// @contributor    Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// ==/UserScript==

// Find the match date of the next match, a bit cumbersome since there are
// 5 different formats, and some of the formats overlap
function findMatchDate(matchTable) {
    var nextMatch = matchTable.rows[0].childNodes[0].innerHTML;

    var match;
    // Handle yyyy-mm-dd    
    var reYear = /(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)/;
    if ((match = reYear.exec(nextMatch))) {
	// Create a new Date(yy,mm,dd,hh,mm,ss)
	return new Date(match[1], match[2]-1, match[3], match[4], match[5], 0);
    }
    else {
	// Handle the remaining 4 formats: d-m-y, d.m.y, m-d-y, and m.d.y
	var reOther = /(\d\d).(\d\d).(\d\d\d\d) (\d\d):(\d\d) - (\w+)/;
	var currMatch = nextMatch;
	var matchGame = reOther.exec(nextMatch);

	var i = 0;

	while ((match = reOther.exec(currMatch))) {
	    // is the format dd.mm.yyyy or dd-mm-yyyy
	    if(match[1] > 12) {
		return new Date(matchGame[3], matchGame[2]-1, 
				matchGame[1], matchGame[4], matchGame[5], 0);
	    }
	    // is the format mm.dd.yyyy or mm-dd-yyyy
	    if (match[2] > 12) {
		return new Date(matchGame[3], matchGame[1]-1, 
				matchGame[2], matchGame[4], matchGame[5], 0);
	    }
	    // We cannot detect the format from the current match, 
	    // try the next one (until we find a match where the "day"-part
	    // is larger than 12)
	    currMatch = matchTable.rows[++i].childNodes[0].innerHTML;
	}
    }
}

function dateDifference(resultRow, matchDate, matchType) {
    var today = new Date();

    // Retrieve the server time from GI
    var time = document.getElementById('servertime').innerHTML.split(':');

    // Create a new Date(yy,mm,dd,hh,mm,ss)
    var currentTime = new Date(today.getFullYear(), today.getMonth(), 
			       today.getDate(), time[0], time[1], time[2]);

    var diff = matchDate.getTime()-currentTime.getTime();
    // What when there are no more upcoming matches ?? (ie. the off-season)
    
    // Are we beyond the match start ?
    if (diff < 0) {
	// Update the row with information
	resultRow.innerHTML = '<td style="font-size: 12px; color: rgb(0, 0, 0); font-weight: bold; font-family: verdana,arial,sans-serif; padding-top: 2px;" valign="middle" width="100" align="right">NEXT MATCH : </td>' + 
	    '<td style="font-size: 12px; font-weight: bold; font-family: verdana,arial,sans-serif; color: rgb(0, 0, 68); padding-top: 2px; padding-left: 5px;" valign="top">Match is playing</td>';
    }
    else {
	// Time difference in seconds
	diff = Math.floor(diff / 1000);
	var dateText = '';

	// Difference: Days
	if (diff > 86400) {
	    var days = Math.floor(diff / 86400);
	    diff -= days * 86400;
	    dateText = days + ' days ';
	}
	// Difference: Hours
	dateText += Math.floor(diff / 3600) + ':';
	diff -= Math.floor(diff / 3600) * 3600;

	// Difference: Minutes
	dateText += (((diff / 60) < 10) ? '0' : '') + Math.floor(diff / 60) + ':';
	diff -= Math.floor(diff / 60) * 60;

	// Difference: Seconds
	dateText += ((diff < 10) ? '0' : '') + diff;

	// Update the row with information
	resultRow.innerHTML = '<td style="font-size: 12px; color: rgb(0, 0, 0); font-weight: bold; font-family: verdana,arial,sans-serif; padding-top: 2px;" valign="middle" width="100" align="right">NEXT MATCH : </td>' + 
	    '<td style="font-size: 12px; font-weight: bold; font-family: verdana,arial,sans-serif; color: rgb(0, 0, 68); padding-top: 2px; padding-left: 5px;" valign="top">' +  dateText + ' ' + '(' + matchType + ')</td>';

	// Update again in 1 second
	window.setTimeout(dateDifference, 1000, resultRow, matchDate, matchType);
    }
}

// Retrieve information about the next match for the team
function retrieveNextMatch(teamid) {
    if (!GM_xmlhttpRequest) {
	alert('Please upgrade to the latest version of Greasemonkey.');
	return;
    }
    
    GM_xmlhttpRequest({
	    method: 'GET',
		url: 'http://' + window.location.hostname + '/index.php?page=club&subpage=matches&team_id=' + teamid,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8',
		    'Accept': 'text/html,text/xml'},
		onload: function(responseDetails) {
		// Extract the content of the body of the request
		var html = responseDetails.responseText.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];
		
		// Create a new (hidden) div element (with id "responseText") 
		// and insert the cleaned body into this element
		var responseTextdiv = document.createElement('div');
		responseTextdiv.id = "responseText";
		responseTextdiv.style.display = "none";
		responseTextdiv.innerHTML = html;
		document.body.appendChild(responseTextdiv);
		
		// Retrieve information about next match
		var xpath = '//*[@id="home_wrapper"]/div/div[2]/table/tbody';
		var nextMatch = document.evaluate(xpath, document, null, 
						 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var matchTable = nextMatch.snapshotItem(nextMatch.snapshotLength-1);
		var matchKind = matchTable.rows[0].childNodes[0].innerHTML.match('(\\w+)$')[1];
		// Find the date of the next match 
		// Problem: 5 different formats for dates
		var matchDate = findMatchDate(matchTable);

		// Make room for the additional information
		var xpathPic = '//*[@id="home_wrapper"]/div[1]/div[1]';
		var picRes = document.evaluate(xpathPic, document, null, 
					       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var pic = picRes.snapshotItem(0);
		pic.setAttribute('style','text-align: center; position: relative; width: 140px; height: 160px; cursor: pointer;');


		// Add row for additional information
		var xpathResult = '//*[@id="home_wrapper"]/div[1]/div[2]/table/tbody';
		var result = document.evaluate(xpathResult, document, null, 
					       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var resultRow = document.createElement('tr');
		result.snapshotItem(0).appendChild(resultRow);

		// Insert the information
		dateDifference(resultRow, matchDate, matchKind);
	    }
	}
	);
}

// Main
window.setTimeout(function() {
	// Extract teamid to find the next match for the team
	var teamidpath = '//*[@id="left_navigation"]/div/a';
	var teamurl = document.evaluate(teamidpath, document, null, 
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href;
	var teamid = teamurl.match('[0-9]+$');
	retrieveNextMatch(teamid);
    }, 1200);