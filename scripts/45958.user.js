// This script adds numbers to the training bars of a player. The numbers allow
// for easier reading of training progress. The script also updates the main
// page of the player with this information.
//
// version 0.3.0
// 2009-04-14
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
// select "Training Progress Numbers", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Training Progress Numbers
// @namespace     http://www.grid-iron.org/
// @description   Adds numbers to the training bars of a player. The script also updates the main page of the player with this information.
// @copyright     2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license       (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version       0.3.0
// @include       http://www.grid-iron.org/index.php?page=club&subpage=pldetails*
// @include       http://grid-iron.org/index.php?page=club&subpage=pldetails*
// @contributor   Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// ==/UserScript==

window.setTimeout( function() 
{
    // Function whichs appends a leading zero to numbers 0..9
    // Ie. 4 => 04, 0 => 00, and 12 => 12 etc.
    function leadingZero(n) {
	return (n !== null && n < 10 && n >= 0 ? "0" : "") + n;
    }

    
    function getTraining() {
	var output = {};
	// Retrieve training pane
	var trainingPane = document.getElementById('trdetails');

	// Check whether the manager owns the current player
	if (!trainingPane || trainingPane.childNodes.length <= 1) {
	    return null;
	}

	// Retrieve first table (containing the skills)
	var skillRows = trainingPane.getElementsByTagName('table')[0].rows;
	var skillNum = skillRows.length;

	// For all rows in skillRows (except first and last) 
	for (var j = 1; j < skillNum-1; j++) {
	    var currentSkillRow = skillRows[j];
	    // Extract the inner table containing the skill value
	    var value = currentSkillRow.getElementsByTagName('table')[0];
	    
	    var values = value.getElementsByTagName('td');
	    var res = 0;
	    
	    // Count the skill value
	    while (res < values.length) {
		if (values[res].getAttribute('bgcolor') === null) {
		    break;
		}
		res++;
	    }
	    
	    // Update text
	    var skillTarget = currentSkillRow.getElementsByTagName('td')[0];
	    var skillText = skillTarget.innerHTML;
	    skillTarget.innerHTML = skillText + " (" + res + " points)";
	    
	    // Extract training status (image)
	    var status = currentSkillRow.getElementsByTagName('img')[0];

	    // Can either be: 
	    // * progress_sure.png
	    // * progress_maybe.png
	    // * progress_not.png

	    if (status.src.indexOf("sure") === -1) {
		// Set output (both value and status 
		// (since different from sure) 
		output[skillText] = [res,status.src];
	    }
	    else {
		// Set output (only value, since status == sure)
		output[skillText] = [res];
	    }
	}
	return output;
    }

    function setProfile(map) {
	// Retreive the profile pane
	var trainingPane = document.getElementById('profile');
	// Retrieve first table (containing the skills)
	var skillRows = trainingPane.getElementsByTagName('table')[0].rows;

	// Insert the data
	for (var i = 1; i <= 5; i++) {
	    var currRow = skillRows[i];
	    var cols = currRow.getElementsByTagName('td');
	    for (var j = 0; j < cols.length; j++) {
		// If even column
		if ((j % 2) === 0) {
		    cols[j].width = 137;
		    var skillText = cols[j].innerHTML;
		}
		else {
		    var skillValue = cols[j].childNodes[0].innerHTML;
		    // To avoid problems with Intelligence
		    if (map[skillText] !== undefined) {
			cols[j].width = 60;
			cols[j].childNodes[0].innerHTML = skillValue + 
			    "," + leadingZero(map[skillText][0]) + 
			    // If status different from "sure"
			    ( (map[skillText].length === 1) 
			      ? '' 
			      : '<img src="' + map[skillText][1] + '" width="13" height="13" border="0"  />');
		    }
		}
	    }
	}
    }

    var map = getTraining();
    if (map !== null) {
	setProfile(map);
    }
    
}, 100);