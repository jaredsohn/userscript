// ==UserScript==
// @name         Facebook Poke O' Matic
// @version		 1.6.1
// @author		 John Watson
// @namespace    wizputer.pokeomatic
// @description	 Poke all button, with option to auto poke-all. Dialog of attempted pokees, and removes pokee from sidebar on success. A built in configurable poke limit with an override prompt. Displays poke counter with the limit. Pokes section hide button.
// @include		 https://*.facebook.com/home.php*
// @include      http://*.facebook.com/home.php*
// ==/UserScript==

//Author contact info: John Watson <wizputer@wizputer.net>

//Copyright (C) 2007. John Watson and contributor(s).
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 fo the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html

//This script is distribute in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.

/******** CHANGE LOG ********/
//	[2007-06-24][1.0][Initial release]
//	[2007-06-25][1.1][Poke counter bug fix and added display of the poke counter.]
//	[2007-06-26][1.2][Added a button to reset the poke counter when it's reached and the counter is updated when poking.]
//	[2007-06-26][1.3][Added "Pokes" section even when no pokes for people to see the poke counter and enable/disable auto-poke. Also added a "hide" button to hide the "Pokes" section.]
//	[2007-06-27][1.4][Rewrote the way the script searches for pokes.]
//	[2007-07-09][1.5][Added Poke Stats logging. (Requires the Poke Stats application to be installed to your profile only, not either user script)]
//	[2008-07-30][1.6][Removed Facebook dialogs for Firefox 3 compatibility, added new FB layout compatibility and updated Pokes Stats link ]
//	[2009-03-15][1.6.1][Updated script for new Facebook layout]

// Enable this to get some console messages
var DEBUG = 0;

/******** GLOBALS ********/
// Values aren't based on any fact, suggestions would be appreciated
var MAX_POKES = GM_getValue("fb_max_pokes");
if (MAX_POKES == null) {
	MAX_POKES = 100;
	GM_setValue("fb_max_pokes",100);
}

// In seconds for accuracy
var MAX_TIME = GM_getValue("fb_max_time");
if (MAX_TIME == null) {
	MAX_TIME = 60 * 60 * 24; //24 hours
	GM_setValue("fb_max_time", MAX_TIME);
}

var AUTO_POKE = GM_getValue("fb_auto_poke");
if (AUTO_POKE == null) {
	AUTO_POKE = 0; // Off
	GM_setValue("fb_auto_poke", 0);
}

// Enable/Disable Poke Stats logging
var POKE_STATS = GM_getValue("fb_poke_stats");
if (POKE_STATS == null) {
	POKE_STATS = 0; // Disabled
	GM_setValue("fb_poke_stats",0);
}

// Holder for my FaceBook ID
var MY_ID = document.getElementById('user').value;

/******** FUNCTIONS ********/

// Retrieves pokers from sidebar and stores information into array, while adding the Poke All button and checkbox
// If there any pokers and either AUTO_POKE is on or user said to poke, pop up dialog stating number of people being poked and pass the array of info
// and update the number of pokes counter
// If at the set poke limit, show dialog asking if user wants to continue to poke or not
function getPokes(nomax,act){
	var pokeInfo;
	var date = new Date();
	// Get current time from 1/1/1970 in seconds
	var time = Math.floor(date.getTime()/1000);
	// Get current number of pokes if time period hasnt elapsed, if it has reset to 0
	var curNumPokes = (GM_getValue("fb_pokeEnd")>time)?GM_getValue("fb_numPokes"):0;
	pokeInfo = new Array();

	// Seperate sidebar into divs
	var divs = document.getElementById("home_sidebar").getElementsByTagName("div");
	var pokesSection;
	// Go through each one
	for (var i = 0; i < divs.length; i++) {
		// Find the pokes sidebar item
		if (divs[i].getAttribute("class") == "sidebar_item pokes UIHomeBox") {
			pokesSection = divs[i].getElementsByTagName("div");
			if (divs[i].getAttribute("id")!="pokes") {
				// Add an id to the Pokes section to easily hide it
				var idAttr = document.createAttribute("id");
				idAttr.nodeValue = "pokes";
				divs[i].setAttributeNode(idAttr);
			}
			break;
		}
	}

	if (pokesSection != undefined) {
		for (var i = 0; i < pokesSection.length; i++) {
			// Find the pokers
			if (pokesSection[i].getAttribute("class") == "ind_poke") {
				// Add them into an array
				pokeInfo.push(pokesSection[i]);
			// Find the body
			} else if (pokesSection[i].getAttribute("class") == "UIHomeBox_Content") {
				var pokesBody = pokesSection[i].getElementsByTagName("div")[0];
				// Add the Poke All button and checkbox if they dont exist
				if (pokesBody.innerHTML.indexOf('Poke All') == -1) {
					pokesBody.innerHTML += '<form><table><tr>' +
						'<td><div class="UIComposer_ButtonContainer"><input class="UIComposer_Button" type="button" id="poke_all" value="Poke All" /></div></td>' +
						'<td><input id="auto_poke" type="checkbox" ' + ((AUTO_POKE)?'CHECKED':'') + '></td>' +
						'<td><label for="auto_poke">Auto Poke All</label></td></tr>' +
						'<tr><td id="poke_counter" colspan=3>Poke counter: ' + curNumPokes + '/' + MAX_POKES + ' pokes.</td></tr></table></form>';
				}
			// Find the header, and add the hide button if the pokes id doesnt exist (meaning it already hasnt been added)
			} else if (pokesSection[i].getAttribute("class") == "UIHomeBox_Top" && pokesSection[i].innerHTML.indexOf('hide_pokes') == -1) {
				pokesSection[i].innerHTML += '<div class="UIHomeBox_More"><small><a class="UIHomeBox_MoreLink" href="#" id="hide_pokes" onClick="return false;">hide</a></small></div>';
			}
		}

		// If we have someone to poke, and user said to or auto poke is enabled
		if (pokeInfo.length && (act || AUTO_POKE)) {
			var newNumPokes = 0;
			// If we haven't reached our max pokes yet, or if user already said to disregard the limit
			if (((newNumPokes = (curNumPokes + pokeInfo.length)) < MAX_POKES) || nomax) {

				// Get the post form id from the hidden field
				var post_form_id = document.getElementById('post_form_id').value;

				// Update the number of people poked for limit
				updatePokes(pokeInfo.length);

				// Start poking
				poke(post_form_id,pokeInfo);

				// Update counter
				updateCounter(newNumPokes,MAX_POKES);
			// Reached or going to reach limit by poking everyone
			} else {
				alert("You have reached your poke limit, reset or the raise the limit and try again");
			}
		}
	} else {
		insertPokesSection();
	}

	return false;
}

// Go through the pokeInfo array and poke everyone
function poke(post_form_id,pokeInfo){
	// There are still people left to poke
	if (pokeInfo.length > 0) {
		// Get next person to poke
		var div = pokeInfo.pop();
		// Seperate into anchor tags
		var hrefs = div.getElementsByTagName("a");
		// Get the poker ID
		var pokeId = hrefs[1].href.match(/id=(\d*)/)[1];
		// Get the url to send poke to
		var postUrl = hrefs[1].href.match(/http:\/\/(.*\.)facebook\.com/)[0] + "/poke.php";
		// Create string to send to poke.php
		var pokepost = "post_form_id=" + post_form_id + "&id=" + pokeId + "&confirmed=1&pokeback=1";

		GM_log("Post: " + pokepost);

		// Thanks to EZPoke (Lukas Fragodt & Mike Soh) for the onload and onerror functions
		GM_xmlhttpRequest(
			{
			method:'POST',
			url:postUrl,
			headers:
				{
				'User-Agent':window.navigator.userAgent,
				'Content-Type':'application/x-www-form-urlencoded',
				},
			data:pokepost,
			onload: function(res) {
				// OK
				if (res.status == 200) {
					if (res.responseText.indexOf('has not received your last poke yet') != -1) {
						// Remove Poke and Remove links and replace with "Poked before!"
						hrefs[1].removeAttribute('href');
						hrefs[1].innerHTML = 'Poked before!';
						hrefs[2].removeAttribute('href');
						hrefs[2].innerHTML = '';
						if (DEBUG) GM_log(hrefs[0].innerHTML + ' has not received your last poke');
					} else if (res.responseText.indexOf('You have poked') != -1) {
						// Remove the person we poked
						remove(div);
						// If Poke Stats logging is enabled, log the poke
						if (POKE_STATS) pokeStatsLog(pokeId);
						if (DEBUG) GM_log(hrefs[0].innerHTML + ' poked!');
					// Unkown response
					} else {
						// Remove Poke and Remove links and replace with "Poke failed!"
						hrefs[1].removeAttribute('href');
						hrefs[1].innerHTML = 'Poke failed!';
						hrefs[2].removeAttribute('href');
						hrefs[2].innerHTML = '';
						if (DEBUG) GM_log('Unkown reponse: ' + res.responseText);
					}
				// Received not OK status
				} else {
					// Remove Poke and Remove links and replace with "Poke failed!"
					hrefs[1].removeAttribute('href');
					hrefs[1].innerHTML = 'Poke failed!';
					hrefs[2].removeAttribute('href');
					hrefs[2].innerHTML = '';
					if (DEBUG) GM_log('Poke failed, not OK response - status received: ' + res.status);
				}
			},
			onerror: function(res) {
				// Remove Poke and Remove links and replace with "Poke failed!"
				hrefs[1].removeAttribute('href');
				hrefs[1].innerHTML = 'Poke failed!';
				hrefs[2].removeAttribute('href');
				hrefs[2].innerHTML = '';
				if (DEBUG) GM_log('Unkown error when poking. Status: ' + res.status + ' Text: ' + res.statusText);
			}
		});

		// Wait 100 milliseconds before doing next poke
		setTimeout(poke,100,post_form_id,pokeInfo);
	}

	// Done poking
	return false;
}

// Log to Poke Stats
function pokeStatsLog(pokeId) {
	var pokeStatsUrl = 'http://lab.ojaisoft.com/pokestats/logPoke.php?p=poke&uid=' + MY_ID + '&by=' + pokeId;
	GM_xmlhttpRequest(
		{
		method:'GET',
		url:pokeStatsUrl,
		headers:
			{
			'User-Agent':window.navigator.userAgent,
			'Content-Type':'application/x-www-form-urlencoded',
			}
		});
}

// Insert own poke section
function insertPokesSection() {
	var date = new Date();
	var time = Math.floor(date.getTime()/1000);
	// Get the current number of pokes
	var curNumPokes = (GM_getValue("fb_pokeEnd")>time)?GM_getValue("fb_numPokes"):0;
	
	var pokeSectionDiv = document.createElement("div");
	pokeSectionDiv.className = "sidebar_item pokes UIHomebox";
	pokeSectionDiv.id = "pokes";
	// Our poke all button, check box and poke counter
	var pokeSidebar = '<form><table><tr><td></td><td><input id="auto_poke" type="checkbox" ' + ((AUTO_POKE)?'CHECKED':'') + '></td><td><label for="auto_poke">Auto Poke All</label></td></tr><tr><td id="poke_counter" colspan=3>Poke counter: ' + curNumPokes + '/' + MAX_POKES + ' pokes.</td></tr></table></form>';
	// Our own "pokes" section
	var pokeSection = '<div class="UIHomeBox_Top"><div class="UIHomeBox_TitleBar"><span class="UIHomeBox_Title">Pokes</span></div><div class="UIHomeBox_More"><small><a class="UIHomeBox_MoreLink" href="#" id="hide_pokes" onClick="return false;">hide</a></small></div></div><div class="UIHomeBox_Content"><div>' + pokeSidebar + '</div></div>';
	pokeSectionDiv.innerHTML = pokeSection;
		
	var sidebar = document.getElementById("home_sidebar");
	var sidebar_divs = sidebar.getElementsByTagName("div");
	for (var i = sidebar_divs.length-1; i > 0; i--) {
		if (sidebar_divs[i].getAttribute("class") == "invitefriends findfriends UIHomeBox") {
			sidebar.insertBefore(pokeSectionDiv,sidebar_divs[i]);
		}
	}

	return false;
}

// Hide own poke section
function hidePokes() {
	document.getElementById("pokes").style.display = "none";
	return false;
}

// Update our poke counter
function updatePokes(num) {
	var date = new Date();
	// Get current time since 1/1/1970 in seconds
	var time = Math.floor(date.getTime()/1000);
	// Get the current values
	fb_pokeEnd = GM_getValue("fb_pokeEnd");
	fb_numPokes = GM_getValue("fb_numPokes");
	// If none exist yet, create it
	if (fb_pokeEnd == null) {
		GM_setValue("fb_pokeEnd", (fb_pokeEnd=(time + MAX_TIME)));
	}
	if (fb_numPokes == null) {
		GM_setValue("fb_numPokes", (fb_numPokes=0));
	}

	// If we haven't reached the end of the time period
	if (fb_pokeEnd > time) {
		// Add the pokes to the counter
		GM_setValue("fb_numPokes", (fb_numPokes+num));
	// If time period has already elapsed
	} else {
		// Reset both values to current values
		GM_setValue("fb_numPokes", num);
		GM_setValue("fb_pokeEnd", (time + MAX_TIME));
	}
}

// Update the poke counter
function updateCounter(curPokes,maxPokes) {
	document.getElementById("poke_counter").innerHTML = 'Poke counter: ' + curPokes + '/' + maxPokes + ' pokes.';
}

// Reset the poke counter
function resetCounter() {
	GM_setValue("fb_numPokes",0);
	updateCounter(0,MAX_POKES);
}

// Toggle auto poking
function autoPoke() {
	var auto_poke = GM_getValue("fb_auto_poke");
	GM_setValue("fb_auto_poke",(auto_poke?0:1));
}

// Event listener for Poke All button, check box and hide button
function listen_poke_click(e) {
	if (e.target) {
		if (e.target.id) {
			switch(e.target.id) {
				case "poke_all":
					getPokes(0,1);
					break;
				case "auto_poke":
					autoPoke();
					break;
				case "hide_pokes":
					hidePokes();
					break;
			}
		}
	}
}

// Change the poke limit settings
function changePokeLimit() {
	var max_time;
	// Do this until a number is entered
	do {
		max_time = prompt("Number of seconds before resetting poke counter:",MAX_TIME);
	} while (isNaN(max_time = parseInt(max_time)));

	var max_pokes;
	// Do this until a number is entered
	do {
		max_pokes = prompt("Max pokes per time period:",MAX_POKES);
	} while (isNaN(max_pokes = parseInt(max_pokes)));

	alert("Limit is now - " + max_pokes + " every " + (max_time/60/60) + " hours (" + max_time + " seconds)");

	GM_setValue("fb_max_time",max_time);
	GM_setValue("fb_max_pokes",max_pokes);
}

// Display current poke limit
function currentPokeLimit() {
	alert(MAX_POKES + " every " + (MAX_TIME/60/60) + " hours (" + MAX_TIME + " seconds)");
}

// Toggle Poke Stats logging
function togglePokeStats(){
	if (POKE_STATS) {
		GM_setValue("fb_poke_stats",0);
	} else {
		GM_setValue("fb_poke_stats",1);
	}
}

// Add the commands to Greaseonkey User Script menu
GM_registerMenuCommand("Change poke limit", changePokeLimit);
GM_registerMenuCommand("Display poke limit", currentPokeLimit);
GM_registerMenuCommand("Reset poke counter",resetCounter);

if (POKE_STATS) {
	GM_registerMenuCommand("Disable Poke Stats logging", togglePokeStats);
} else {
	GM_registerMenuCommand("Enable Poke Stats logging", togglePokeStats);
}

// Listen for clicks, send event into to listen_poke_click function
window.addEventListener('click',listen_poke_click, true);

// Start script
getPokes(0,0);