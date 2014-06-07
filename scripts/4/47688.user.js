
// This script highlights the players who played in the last match for the team.
//
// version 0.1.0
// 2009-04-27
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
// select "Played Last Match", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Played Last Match
// @namespace     http://www.grid-iron.org/
// @description   Highlights the players who played in the last match.
// @copyright     2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license       (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version       0.1.0
// @include       http://www.grid-iron.org/index.php?page=club&subpage=makeorders*
// @include       http://grid-iron.org/index.php?page=club&subpage=makeorders*
// @contributor   Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// ==/UserScript==

window.setTimeout( function() 
{

    function updatePlayers(playerids) {
	// Find all option tags containing a value attribute
	var allPlayers = document.evaluate(
				'//option[@value]',
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

	// For each found tag test whether it should be highlighted (i.e. given a yellow background)
	for (var i = 0; i < allPlayers.snapshotLength; i++) {
		var thisPlayer = allPlayers.snapshotItem(i);
		if (playerids[thisPlayer.value] === true) {
		    thisPlayer.style.backgroundColor = 'yellow';
		}
	}

    }

    function getPlayedLastGame() {
	if (!GM_xmlhttpRequest) {
	    alert('Please upgrade to the latest version of Greasemonkey.');
	    return;
	}
	
	/* First extract the url of the "Matches" page, and retrieve the page */
	var header = document.getElementsByClassName('left_navigation_panel')[0];
	var matchURL = header.getElementsByTagName('a')[6];

	GM_xmlhttpRequest({
		method: 'GET',
		    url: matchURL.href,
		    headers: {
		    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8',
			'Accept': 'text/html,text/xml'},
		    onload: function(responseDetails) {

		    /* Find the match_id of the team's last match, and retrieve page match's page */
		    var matchid = responseDetails.responseText.match('match_id=([0-9]+)')[1];

		    GM_xmlhttpRequest({
			    method: 'GET',
				url: 'http://' + window.location.hostname + '/index.php?page=match&match_id=' + 
				                 matchid + '&action=stats',
				headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8',
				    'Accept': 'text/html,text/xml'},
				onload: function(responseDetails) {
				var playerids = {};

				// Find all playerids and record these in variable "playerids"
				var re = /playerid=([0-9]+)/g;
				var id;
				while ((id = re.exec(responseDetails.responseText)) !== null) {
				    playerids[id[1]] = true;
				}
				
				// Update the match-order page with the information
				updatePlayers(playerids);
			    }
			});
		}
	    });
    }

    getPlayedLastGame();
}, 100);