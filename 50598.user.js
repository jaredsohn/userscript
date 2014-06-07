
// This script adds player salary to the team spreadsheet
//
// version 0.1.0 
// 2009-05-28
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
// select "Enhanced Spreadsheet", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Enhanced Spreadsheet
// @namespace     http://www.grid-iron.org/
// @description   Adds player salary to the team spreadsheet
// @copyright     2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license       (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version       0.1.0
// @include       http://www.grid-iron.org/index.php?page=club&subpage=spreadsheet
// @include       http://grid-iron.org/index.php?page=club&subpage=spreadsheet
// @contributor   Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu)
// ==/UserScript==

window.setTimeout( function() 
{
    // Function which adds the training description to the line
    // containing the age and position of the player
    function addSalary(map) {
	// Find the table (strangly enough given the id 'offense')
	var table = document.getElementById('offense');
	var firstTd = table.getElementsByTagName('td')[0];
	// Make the row with the selectors one column wider
       	firstTd.setAttribute('colspan', Number(firstTd.getAttribute('colspan')) + 1);

	// Add Salary header
	var firstRow = table.rows[1];
	firstRow.innerHTML = firstRow.innerHTML + 
	    '<td align="center" width="22" valign="middle" style="padding-left: 1px; padding-right: 1px; font-size: 11px; font-family: verdana,arial,sans-serif; font-weight: bold;">Sal</td>';

	// Retrieve teamid
	var teamref = document.getElementById('left_navigation').getElementsByTagName('a')[0];
	var teamid = teamref.href.match('team_id=([0-9]+)')[1];

	// String used as the first part of the salary column
	var startTag = '<td align="center" width="22" valign="middle" onclick="document.location.href=\'index.php?page=club&subpage=pldetails&back=spreadsheet&team_id=' + teamid + '&playerid=';
	
	// Retrieve all the player rows on the spreadsheet
	var xpathExpr = '//tr[starts-with(@class,"tr_")]';
	var playerData = document.evaluate(xpathExpr, table, null, 
					   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var length = playerData.snapshotLength;
	for (var i = 0; i < length; i++) {
	    var player = playerData.snapshotItem(i);
	    // Retrieve player id
	    var playerref = player.getElementsByTagName('a')[0];
	    var playerid = playerref.href.match('playerid=([0-9]+)')[1];

	    // Add new column with the appropriate style and data 
	    // (retrieved from map via map[playerid])
	    player.innerHTML = player.innerHTML + 
		[startTag, playerid, '\'" style="cursor: pointer;"><font style="font-family: verdana,arial,sans-serif; font-size: 10px; color: rgb(0, 0, 0); font-weight: bold;">', map[playerid] , '</font></td>'].join('');
	}
    }

    // Retrieve and add the salaries to the spreadsheet page
    function getSalary() {
	if (!GM_xmlhttpRequest) {
	    alert('Please upgrade to the latest version of Greasemonkey.');
	    return;
	}

	// Retrieve the training-page
	GM_xmlhttpRequest({
		method: 'GET',
		    url: 'http://' + window.location.hostname + '/index.php?page=club&subpage=players',
		    headers: {
		    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8',
			'Accept': 'text/html,text/xml'},
		    onload: function(responseDetails) {
		    // Extract the content of the body of the request
		    var html = responseDetails.responseText.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];
		
		    // Create a new (hidden) div element (with id "responseText") 
		    // and insert the cleaned body into this element
		    var responseTextdiv = document.createElement("div");
		    responseTextdiv.id = "responseText";
		    responseTextdiv.style.display = "none";
		    responseTextdiv.innerHTML = html;
		    document.body.appendChild(responseTextdiv); 

		    // Map from playerids to salaries
		    var map = {};

		    // Refer to all the players every second has tr_normal and tr_normal2
		    var xpathExpr = '//tr[starts-with(@class,"tr_normal")]';
		    var playerData = document.evaluate(xpathExpr, document, null, 
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		    var length = playerData.snapshotLength;
		    for (var i = 0; i < length; i++) {
			var player = playerData.snapshotItem(i);
			var playerref = player.getElementsByTagName('a')[0];
			// Extract the playerid
			var playerid = playerref.href.match('playerid=([0-9]+)')[1];
			// Extract the salary, ie. $ 2,881
			var salary = player.childNodes[6].innerHTML;
			map[playerid] = salary.substring(2);
		    }
			
		    addSalary(map);
		}
	    }
	    );
    }

    var training = getSalary();
}, 100);