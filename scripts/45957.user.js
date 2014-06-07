// This script adds the current training of a player on the player page and makes it possible to change the training from the player page.
//
// version 0.4.0
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
// select "Show Training", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Show Training
// @namespace     http://www.grid-iron.org/
// @description   Adds the current training of a player on the player page and makes it possible to change the chosen training 
// @copyright     2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license       (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version       0.4.0
// @include       http://www.grid-iron.org/index.php?page=club&subpage=pldetails*
// @include       http://grid-iron.org/index.php?page=club&subpage=pldetails*
// @contributor   Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// ==/UserScript==

window.setTimeout( function() 
{
    // Function which adds the training description to the line
    // containing the age and position of the player
    function addTraining(tr1, tr2, tr3) {
	var selectTraining = document.createElement('div');
	selectTraining.setAttribute('align', 'left');
	selectTraining.setAttribute('style', 'padding-left: 15px; padding-bottom: 5px;');

	var medhead;
	// Detect if the 'highlightSkills' script is is loaded
	// If so insert above the 'highlightSkills' script
	if (!(medhead = document.getElementById('selectBuild'))) {
	    medhead = document.getElementById('profile');   
	}
	medhead.parentNode.insertBefore(selectTraining, medhead);

	// Insert training block, training focus, and the save button
	selectTraining.innerHTML = tr1 + tr2 + tr3;
    }

    // Retrieve and add the training to the player page
    function getTraining(plrId) {
	if (!GM_xmlhttpRequest) {
	    alert('Please upgrade to the latest version of Greasemonkey.');
	    return;
	}

	// Check whether the manager owns the current player
	// /html/body/center/div/div/div/div/table/tbody/tr/td[3]/b
	// /html/body/center/div/div/div/div[3]/div[2]/div
	// /html/body/center/div/div/div/div[3]/div[2]/div/div
	// '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/a'
	var playerTeamPath = '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/a';
	var browserTeamPath = '/html/body/center/div/div/div/div/table/tbody/tr/td[3]/b';
	
	var playerTeamName = document.evaluate(playerTeamPath, document, null, 
					       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
	var browserTeamName = document.evaluate(browserTeamPath, document, null, 
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;

	if (playerTeamName !== browserTeamName) {
	    return;
	}

	// Retrieve the training-page
	GM_xmlhttpRequest({
		method: 'GET',
		    url: 'http://' + window.location.hostname + '/index.php?page=club&subpage=training',
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

		    // Extract the relevant data (matching the player id)
		    var xpathExpr = "//input[@value = '" + plrId + "']/../..";
		    var playerData = document.evaluate(xpathExpr, document, null, 
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		    // Retrieve the columns containin the training information of the player
		    var len = playerData.snapshotLength;
		    var tds = playerData.snapshotItem(len-1).getElementsByTagName('td');

		    var trainBlock = tds[8].innerHTML;
		    var trainFocus = tds[9].innerHTML;
		    var playerid = trainBlock.match(/group_([0-9]+)/)[1];

		    // Create copies of the controls and augment their name and id with '_tmp'
		    trainBlock = trainBlock.replace(/group_([0-9]+)/gi,'group_$1_tmp');
		    trainBlock = trainBlock.replace(/focus_([0-9]+)/gi,'focus_$1_tmp');
		    trainFocus = trainFocus.replace(/focus_([0-9]+)/gi,'focus_$1_tmp');

		    // Retrieve the 'Save training' button
		    var xpathExpr2 = "//input[contains(@value, 'Save training')]/..";
		    var save = document.evaluate(xpathExpr2, document, null, 
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		    var saveButton = save.snapshotItem(0).innerHTML;

		    // Create new code for the button's onclick event. The new code 
		    // updates the original controls with the values of the copied controls
		    // before executing the original code of the button
		    var newCode = 
			'var tarctrl1 = document.getElementById(\'group_' + playerid + '\');' +
			'var souctrl1 = document.getElementById(\'group_' + playerid + '_tmp\');' +
			'tarctrl1.value = souctrl1.value;' +
			'tarctrl1.onchange();'+
			'var tarctrl2 = document.getElementById(\'focus_' + playerid + '\');' +
			'var souctrl2 = document.getElementById(\'focus_' + playerid + '_tmp\');' +
			'tarctrl2.value = souctrl2.value;';

		    // Add new code (newCode) before the original code of the button
		    saveButton = saveButton.replace(/onclick="(.*)"/,
						    'onclick="' + newCode + ' $1"');

		    // Add training block, training focus, and the save button to the player page
		    addTraining(trainBlock, trainFocus, saveButton);
		}
	    }
	    );
    }

    // Retreive the player id (ie. the last number in the url)
    var playerId = window.location.href.match(/[0-9]+$/g);
    // Retreive the training and update the player page
    var training = getTraining(playerId);
}, 100);