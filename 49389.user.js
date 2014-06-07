// This script adds the missed tackles, tackles for loss, 
// pressures, forced fumbles, and interceptions
// to the tackles statistics and fumbles for offensive players
// on the box score pane
//
// version 0.6.0
// 2009-05-22
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
// select "Enhanced Tackle Stats", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Enhanced Tackle Stats
// @namespace      http://www.grid-iron.org/
// @description    Enhances the tackle statistics with information about: missed tackles, tackles for loss, pressures, forced fumbles, and interceptions. The script also sum player statistics if the player is mentioned several times in the statistics. For offensive players the script adds fumbles
// @copyright      2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license        (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version        0.6.0
// @include        http://www.grid-iron.org/index.php?page=match&match_id=*&action=boxscore
// @include        http://grid-iron.org/index.php?page=match&match_id=*&action=boxscore
// @contributor    Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu)
// ==/UserScript==

window.setTimeout( function() 
{

    /**
     * Constructor for player
     * Mandatory Arguments: id and name
     * Optional  Arguments: tackles, missed, tfls, pressures, interceptions, fumbles
     */
    function Player(plrid, plrname, plrtackles, 
		    plrmissed, plrtfl, plrpressure, plrinterception, plrfumbles) {
	if (arguments < 2) {
	    alert('Too few arguments to constructor');
	    return;
	}
	this.id = (plrid ? plrid : 0);
	this.name = (plrname ? plrname : 0);
	this.tackles = (plrtackles ? plrtackles : 0);
	this.missed = (plrmissed ? plrmissed : 0);
	this.tfl = (plrtfl ? plrtfl : 0);
	this.pressure = (plrpressure ? plrpressure : 0);
	this.interceptions = (plrinterception ? plrinterception : 0);
	this.fumbles = (plrfumbles ? plrfumbles : 0);
    }


    function addFumblesTeam(data, xpath) {
	var path = document.evaluate(xpath, document, null, 
				     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (path.snapshotLength === 0) {
	    return;
	}

	var table = path.snapshotItem(0);
	
	// Add 4 columns to the header
	var rows = table.getElementsByTagName('tr');
	rows[0].firstChild.colSpan = rows[0].firstChild.colSpan + 1;

	// Add headers: MISSED, TFL, PRESSURE, and Force Fumbles
	var startTags = '<td align="center" width="50" valign="middle" style="border-top: 1px solid rgb(170, 170, 170); border-left: 1px solid rgb(170, 170, 170); font-size: 10px;">';
	var endTags = '</td>';
	rows[1].innerHTML = rows[1].innerHTML + 
	    startTags + '<b>FUM</b>' + endTags;

	// Fill in the data stored in data
	for (var i = 2; i < rows.length; i++) {
	    // Extract the playerid
	    var plrid = rows[i].innerHTML.match('playerid=([0-9]+)')[1];

	    // See if any stats are stored for this player in data
	    var plrtackles = data[plrid];
	    if (plrtackles !== undefined) {
		// If so, then extract stats
		var fumbles = plrtackles.fumbles;

		// Insert stats
		rows[i].innerHTML = rows[i].innerHTML + 
		    startTags + fumbles + endTags;
	    }
	    else {
		// Add 0 in all the new columns
		rows[i].innerHTML = rows[i].innerHTML + 
		    startTags + 0 + endTags;
	    }
	}
    }

   
    /** 
     * Adds additional tackle stats to the team.
     * First arg:  a map from playerid to Player objects
     * Second arg: xpath expression to result table
     */
    function addTacklesTeam(data, xpath) {
	var path = document.evaluate(xpath, document, null, 
				     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (path.snapshotLength === 0) {
	    return;
	}

	var table = path.snapshotItem(0);
	
	// Add 4 columns to the header
	var rows = table.getElementsByTagName('tr');
	rows[0].firstChild.colSpan = rows[0].firstChild.colSpan + 5;

	// Add headers: MISSED, TFL, PRESSURE, and Force Fumbles
	var startTags = '<td align="center" width="50" valign="middle" style="border-top: 1px solid rgb(170, 170, 170); border-left: 1px solid rgb(170, 170, 170); font-size: 10px;">';
	var endTags = '</td>';
	rows[1].innerHTML = rows[1].innerHTML + 
	    startTags + '<b>MISSED</b>' + endTags +
	    startTags + '<b>TFL</b>' + endTags +
	    startTags + '<b>PRESSURE</b>' + endTags +
	    startTags + '<b>FF</b>' + endTags +
	    startTags + '<b>INT</b>' + endTags;

	var dupls = {}; // Map: id -> [tackles, sacks]

	// Remove duplicate entries and sum the tackles 
	for (var j = rows.length-1; j > 1; j--) {
	    // Record player id and tackles
	    var playerid = rows[j].innerHTML.match('playerid=([0-9]+)')[1];
	    var tack = Number(rows[j].childNodes[1].innerHTML);
	    var sck = Number(rows[j].childNodes[2].innerHTML);
	    
	    if (!(playerid in dupls)) {
		// If the player is new add him to the map
		dupls[playerid] = [tack,sck];
	    }
	    else {
		// If the player is already in the map, 
		// add the number of tackles and remove the row
		dupls[playerid] = [dupls[playerid][0]+tack,dupls[playerid][1]+sck];
		table.removeChild(rows[j]);
	    }
	}

	// Fill in the data stored in data
	for (var i = 2; i < rows.length; i++) {
	    // Extract the playerid
	    var plrid = rows[i].innerHTML.match('playerid=([0-9]+)')[1];

	    // If the player was in more than one entry update the number of tackles
	    if (plrid in dupls) {
		rows[i].childNodes[1].innerHTML = dupls[plrid][0];
		rows[i].childNodes[2].innerHTML = dupls[plrid][1];
	    }

	    // Remember the number of tackles (used to calculate the number 
	    // of forced fumbles
	    var presTackles = Number(rows[i].childNodes[1].innerHTML);

	    // See if any stats are stored for this player in data
	    var plrtackles = data[plrid];
	    if (plrtackles !== undefined) {
		// If so, then extract stats
		var missed = plrtackles.missed;
		var TFL = plrtackles.tfl;
		var pressure = plrtackles.pressure;
		var tackles = Number(plrtackles.tackles);
		var inter = plrtackles.interceptions;

		// Insert stats
		rows[i].innerHTML = rows[i].innerHTML + 
		    startTags + missed + endTags + 
		    startTags + TFL + endTags + 
		    startTags + pressure + endTags +
		    // Forced fumbles = recorded tackles minus tackles mentioned in the 
		    // game report
		    startTags + (presTackles-tackles) + endTags + 
		    startTags + inter + endTags;
	    }
	    else {
		// Add 0 in all the new columns
		rows[i].innerHTML = rows[i].innerHTML + 
		    startTags + 0 + endTags + 
		    startTags + 0 + endTags + 
		    startTags + 0 + endTags + 
		    startTags + 0 + endTags +
		    startTags + 0 + endTags;
	    }
	}

	// Insert players who did not make a tackle
	for (var missingPlayer in data) {
	    // If the player is not already in the table
	    if (!(missingPlayer in dupls)) {

		// Extract matchid
		var matchId = window.location.href.match('match_id=([0-9]+)')[1];

		// Create new row and insert the relevant data
		var newRow = document.createElement('tr');
		newRow.setAttribute('style', 'background-color: rgb(234, 235, 238);');
		table.appendChild(newRow);

		newRow.innerHTML = '<td style="border-top: 1px solid rgb(170, 170, 170); font-size: 10px; padding-left: 2px;"><a href="index.php?page=club&amp;subpage=pldetails&amp;back=match&amp;action=boxscore&amp;match_id=' + matchId + '&amp;playerid=' + missingPlayer + '" style="font-size: 10px;">' + data[missingPlayer].name + '</a></td>' +
		    startTags + 0 + endTags + 
		    startTags + 0 + endTags + 
		    startTags + data[missingPlayer].missed + endTags + 
		    startTags + 0 + endTags + 
		    startTags + data[missingPlayer].pressure + endTags + 
		    startTags + 0 + endTags +
		    startTags + data[missingPlayer].interceptions + endTags;
	    }
	}
    }

    function insertData(res, tacklerId, tacklerName, index) {
	if (res[tacklerId] === undefined) {
	    res[tacklerId] = new Player(tacklerId, tacklerName);
	    res[tacklerId][index]++;
	}
	else {
	    var data = res[tacklerId];
	    res[tacklerId][index]++;
	}
    }


    // Updates the relevant property represented by the function
    // funct of the player in tackler
    function updatePlayer(team, tackler, prop) {
	var url = tackler.href;
	var tacklerId = url.slice(url.indexOf('playerid=')+9);
	var tacklerName = tackler.innerHTML;
	insertData(team, tacklerId, tacklerName, prop);
    }

    // Takes the url of the match data page
    function retrieveTackles(matchDataUrl) {
	if (!GM_xmlhttpRequest) {
	    alert('Please upgrade to the latest version of Greasemonkey.');
	    return;
	}

	GM_xmlhttpRequest({
		method: 'GET',
		    url: matchDataUrl,
		    headers: {
		    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8',
			'Accept': 'text/html,text/xml'},
		    onload: function(responseDetails) {
		    
		    // Extract the content of the body of the request
		    var html = responseDetails.responseText.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];

		    html = html.replace(/<script[^>]*>((?:.|\n)*)<\/script>/gi,"");
		    
		    // Create a new (hidden) div element (with id "responseText") 
		    // and insert the cleaned body into this element
		    var responseTextdiv = document.createElement("div");
		    responseTextdiv.id = "responseText";
		    responseTextdiv.style.display = "none";
		    responseTextdiv.innerHTML = html;
		    document.body.appendChild(responseTextdiv); 

		    // Loop through all the quarters, and store the results in homeTeam 
		    // and awayTeam which are maps from player id to Player object
		    var i = 1;
		    var homeTeam = {};
		    var awayTeam = {};
		    var currentDefense;  // points to the current team defending
		    var currentOffense;  // points to the current team attacking

		    // This only works if the two teams have different team names
		    var teamNamePaths = '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/table/tbody/tr/*/a';
		    // var homeTeamNamePath = '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/table/tbody/tr/td[3]/a';
		    // var awayTeamNamePath = '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/table/tbody/tr/td[5]/a';

		    // USE '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/table/tbody/tr/*/a' and then index 0 and 1
		    // path.snapshotItem(0) and path.snapshotItem(1)

		    var teamRes = document.evaluate(teamNamePaths, document, null, 
							XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		    if (teamRes.snapshotLength < 2) {
			alert('Cannot find team names');
			return;
		    }
		    var homeTeamName = teamRes.snapshotItem(0).innerHTML;
		    // Remove the '&nbsp;&nbsp;' after the team name
		    homeTeamName = homeTeamName.slice(0,homeTeamName.indexOf('&nbsp;'));
		    var awayTeamName = teamRes.snapshotItem(1).innerHTML;

		    // Loop through all the quarters
		    while(true) {
			var quarter = document.getElementById('quarter_' + i);
			// No more quarters
			if (quarter === null) {
			    break;
			}
			
			// Select all the elements (events) within the quarter
			var trs = quarter.getElementsByTagName('tr');

			for (var j = 0; j < trs.length; j++) {
			    // Check header for change change of possession
			    if (trs[j].childNodes.length !== 3) {
				// Detect the current offense and defense
				var label = trs[j].childNodes[0].innerHTML;

				// Is the home team in possession ?
				if (label.match('^' + homeTeamName)) {
				    currentOffense = homeTeam;
				    currentDefense = awayTeam;
				}
				else if (label.match('^' + awayTeamName)) {
				    currentOffense = awayTeam;
				    currentDefense = homeTeam;
				}
				else {
				    alert('Cannot decide possession. Label = ' + label);
				    return;
				}
			    }
			    // else the row contains an event in the game
			    else {
				// data contains the events of the play
				var data = trs[j].childNodes[2]; 
				// Extract the players of the play
				var players = data.getElementsByTagName('a');

				// Detect the kind of play
				switch(trs[j].childNodes[1].innerHTML) {
				case 'Rush':
				    // Either detect negative yards and TFL or
				    // detect 3 missed tackles or regular run
				    if (data.innerHTML.match('-[0-9]+ yards')) {
					updatePlayer(currentDefense, players[1], 'tfl');
					updatePlayer(currentDefense, players[1], 'tackles');
				    }
				    else if (data.innerHTML.match('Missed tackle')) {
					updatePlayer(currentDefense, players[1], 'missed');
					updatePlayer(currentDefense, players[2], 'missed');
					updatePlayer(currentDefense, players[3], 'missed');
				    }
				    else if (!data.innerHTML.match('TOUCHDOWN')) {
					updatePlayer(currentDefense, players[1], 'tackles');
				    }
				    break;

				    // Either detect pressure or 
				    // detect 2 missed tackles
				case 'Pass':
				    if (data.innerHTML.match('under pressure')) {
					updatePlayer(currentDefense, players[1], 'pressure');
				    }
				    else if (data.innerHTML.match('Missed tackle')) {
					updatePlayer(currentDefense, players[2], 'missed');
					updatePlayer(currentDefense, players[3], 'missed');
				    }
				    break;
				case 'Sack': 
				    updatePlayer(currentDefense, players[1], 'tackles');
				    break;
				case 'Kickoff':
				case 'Punt':
				    if (data.innerHTML.match('fumbles')) {
					updatePlayer(currentDefense, players[1], 'fumbles');
				    }
				    // If the return is not a fumble then the last (3rd) player is the tackler
				    else { 
					updatePlayer(currentOffense, players[2], 'tackles');
				    }
				    break;
				    // WHAT ABOUT TD and missed tackles on interceptions
				case 'Interception':
				    updatePlayer(currentDefense, players[1], 'interceptions');
				    updatePlayer(currentOffense, players[2], 'tackles');
				    break;
				case 'Fumble':
				    updatePlayer(currentOffense, players[0], 'fumbles');
				    break;
				}
			    }
			}

			i++;
		    }

		    // HOME TEAM
		    addTacklesTeam(homeTeam, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[8]/table/tbody');
		    // AWAY TEAM
		    addTacklesTeam(awayTeam, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[9]/table/tbody');

		    addFumblesTeam(homeTeam, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[2]/table/tbody');
		    addFumblesTeam(awayTeam, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[3]/table/tbody');

		    addFumblesTeam(homeTeam, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[4]/table/tbody');
		    addFumblesTeam(awayTeam, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[5]/table/tbody');

		    addFumblesTeam(homeTeam, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[6]/table/tbody');
		    addFumblesTeam(awayTeam, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[7]/table/tbody');
		}
	    });
    }

    // The url of the page
    var url = window.location.href;
    // Retrieve the url of the match page
    var matchDataUrl = url.replace(/&action.*/,"");
    var tackles = retrieveTackles(matchDataUrl);
}, 100);