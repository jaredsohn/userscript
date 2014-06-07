// ==UserScript==
// @name           Facebook - Fishwrangler Auto-Alert
// @namespace      Ineluctable
// @description    A script that will alert you when it is time to fish, for the Facebook game Fish Wrangler. 
// @version       1.0.1
// @include       http://www.facebook.com/common/error.html
// @include       http://apps.facebook.com/fishwrangler/*
// @exclude       http://apps.facebook.com/fishwrangler/profile/*
// @exclude       http://apps.facebook.com/fishwrangler/mystery-tackle-box*
// @exclude       http://apps.facebook.com/fishwrangler/forum*
// @exclude       http://apps.facebook.com/fishwrangler/?logged-out=1*
// ==/UserScript==

var script_title = "Facebook - Fish Wrangler Auto-Alert";
var source_location = "http://userscripts.org/scripts/source/102784.user.js";
var current_version = "1.0.1";
var latest_version = " ";
var gm_updateparam = "FWAutoAlert_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");
var version_holder = "http://sites.google.com/site/fwautoalert/version";

var safeToFish = true;
var needOxygen = false;
var needFuel = false;
var timervalue = -1;
var timeoutvalue = -1;
var voyaging = ((document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2}.[0-9]{1,2} minutes./) != -1) || (document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2} seconds./) != -1));
var nightFishing = (document.body.innerHTML.indexOf('You are currently on a Night Fishing Trip') != -1); //check if a Night Fishing is detected
var scheduledDowntime = ((document.body.innerHTML.indexOf('Scheduled Downtime: Fish Wrangler should be back up in') != -1) || (document.body.innerHTML.indexOf('Scheduled Maintenance: Fish Wrangler should be back up in') != -1) || document.body.innerHTML.indexOf('Fish Wrangler will be back up soon') != -1);
var dit = null;
var suigdit = null;
var activeChum = null;
var chumNumber = -1;
var needChum = null;
var idChum = null;

var island = null;
var activePole = null;
var repairNeeded = false;

runHelper();

//===============================================================================
//- ALL FUNCTIONS ARE BELOW -
//===============================================================================


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g, "");
}

function changeTitleWithTimeout(title) {
	setTimeout(function () {
		document.title = title;
	}, 3000);
}

function nextAvailableTime(zTimeoutvalue) {
	//Determine the current date, add the timeoutvalue in milliseconds, and
	//return the formatted time.
	var d = new Date();
	var minutes = null;
	var seconds = null;

	if (zTimeoutvalue >= 0) {
		d.setTime(d.getTime() + zTimeoutvalue);
	}

	minutes = d.getMinutes();
	seconds = d.getSeconds();

	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	
	return d.getHours() + ':' + minutes + ':' + seconds;
}

function initialize() {
	//===============================================================================
	// - Registering GreaseMonkey Commands -
	//===============================================================================
	//
	GM_registerMenuCommand('FW - Options', options);
	GM_registerMenuCommand("FW - Check for Updates", checkVersion);

	if (GM_getValue('Auto Fish', true) == true) {
		var message = "Setting initial script options. To change these options, go to 'User Script Commands' -> 'FW - Options'. Some options are unable to be changed at this time.";
        /* Default options */
        GM_setValue('Auto Fish', false);
        GM_setValue('Treasure Chest Music', true);
        GM_setValue('Safety Alerts', false);
        GM_setValue('Boat Trainer', false);
		setTimeout(function () {
			alert(message);
		}, 10000);
		return true;
	}
	
	//===============================================================================
	//            - Weekly Auto-Update Check -
	//===============================================================================
	// checkForUpdate() will verify if the time has come to look if an update is available.
	// checkVersion() will verify if this script version is the latest available.
	//===============================================================================
	
	checkForUpdate();

	//Add command to the menu in case someone wants to manually check for an update.
	var s = document.body.innerHTML.indexOf('userinfo = {"id":');
	var s2 = document.body.innerHTML.indexOf(',', s);
	dit = document.body.innerHTML.substring(s + 'userinfo = {"id":'.length, s2);
	suigdit = (document.body.innerHTML.indexOf(">Select a Chest!<") != -1)||(document.body.innerHTML.indexOf(">Select a Case!<") != -1); //document.body.innerHTML.indexOf('a/uid/'+dit) != -1;
	return true;
}

function startMusicAlert() {
	//Script code from Facebook MouseHunt Game Auto Horn Blower - http://userscripts.org/scripts/review/53071
	var musicAlert = document.createElement("div");
	musicAlert.innerHTML = "<embed name=\"musicAlert\" src=\"http://images.norack.info/prodigy_-_girls.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"></embed>";
	document.getElementById("content").appendChild(musicAlert);
	musicAlert = null;
}

function gatherFishingInfo() {
	//===============================================================================
	//            - Gather Fish Wrangler Information -
	//===============================================================================
	//
	//Determine which Island we're fishing.
	//Determine which Pole we're using.
	//Determine which Chum we're using.
	//Determine nextAvailableTrip time.
	var images = document.getElementsByTagName("img");
	var activeBoat = null;
	island = "not_set";
	activePole = "not_set";
	activeChum = "not_set";

	for (var i = 0; i < images.length; i++) {
		//Determine Island
		if (images[i].src.indexOf("images/towns/thumbs/") != -1 && images[i].title != "") {
			island = images[i].title;
			break;
		}
	}

	//Determine activePole
	if (document.getElementById("app8138090269_c_poles_user_active") != null) {
		var poleTable = document.getElementById("app8138090269_c_poles_user_active");
		repairNeeded = poleTable.getElementsByTagName('table')[0].innerHTML.indexOf('NEEDS REPAIR!') != -1; //check if anything needs repair
		activePole = trim(poleTable.getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.substring(10, 40));
	}
	//Determine activeChum
	if (document.getElementById("app8138090269_header_chum") != null) {
		needChum = document.getElementById("app8138090269_header_chum").innerHTML.indexOf("Get Chum") != -1;
		var s = document.getElementById("app8138090269_header_chum").getElementsByTagName('a')[0].innerHTML;
		var d = s.lastIndexOf('.');
		chumNumber = parseInt(s.substring(s.lastIndexOf('/') + 1, d < 0 ? s.length : d), 10);
		switch (chumNumber) {
		case 1:
			activeChum = 'Generic';
			break;
		case 2:
			activeChum = 'Steak';
			break;
		case 3:
			activeChum = 'Cayenne';
			break;
		case 4:
			activeChum = 'Red Love';
			break;
		case 5:
			activeChum = 'Loaf';
			break;
		case 6:
			activeChum = 'Fish Guts';
			break;
		case 7:
			activeChum = 'Fire Sludge';
			break;
		case 8:
			activeChum = 'not_set';
			break;
		case 9:
			activeChum = 'Veggie Blend';
			break;
		case 10:
			activeChum = 'Nail Goo';
			break;
		case 11:
			activeChum = 'Algae';
			break;
		case 12:
			activeChum = 'Plankton';
			break;
		case 13:
			activeChum = 'Free Love';
			break;
		case 14:
			activeChum = 'Gold Goop';
			break;
		case 15:
			activeChum = 'Diamond Dip';
			break;
		case 17:
			activeChum = 'Grub';
			break;
		case 18:
			activeChum = 'Mystery Meat';
			break;
		case 19:
			activeChum = 'Tater';
			break;
		case 20:
			activeChum = 'Butter Chum';
			break;
		default:
			activeChum = 'not_set';

		}
	}
	//Determine activeBoat
	if ((document.getElementById("app8138090269_c_boats_user_active") != null)) {
		var boatTable = document.getElementById("app8138090269_c_boats_user_active");
		if (boatTable.getElementsByTagName('table')[0] == undefined) {
			activeBoat = 'not_set';
		} else {
			activeBoat = trim(boatTable.getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.substring(13, 18));
			if (!repairNeeded) {
				repairNeeded = boatTable.innerHTML.indexOf('NEEDS REPAIR!') != -1;
			}
		}
		GM_setValue("Boat", activeBoat);
	}
	else if ((document.getElementById("app8138090269_c_boats_user_active") == null) && (window.location.href.indexOf('fishwrangler/my') != -1)) {
		GM_setValue("Boat", "Beat");
	}
}

function safetyCheck() {
	//===============================================================================
	//            - Safety Checker -
	//===============================================================================
	//
	//Safe To Fish -- *Only active if RiskyFishing = "false"
	//  --If island is Magma Reef, look for the text "Aye, Danger!" or "Continue at your own risk".
	//  --If island is Sans Culpra, look for the text "Scuba Diving License REQUIRED..." and abort if found
	//
	//Safety Alerts -- *Only active if SafetyAlerts = "true"
	//  --If island isn't "Magma Reef" and activeChum is "Fire Sludge"
	//  --If island is "Magma Reef" and activeChum isn't "Fire Sludge" or "Steak"
	//  --If island is "Magma Reef" and activePole isn't "Cubey Incinerator"
	//  --If island is "Blue Crescent" and activePole is "Cubey Incinerator"
	//  --If island is "Sans Culpra" and activePole isn't "Spear Gun" or "Pneumatic Spear"
	//  --If island isn't "Sans Culpra" and activePole is "Spear Gun" or "Pneumatic Spear"
	//If "true" -- >At Magma Reef and Sans Culpra, Auto-Fish will continue fishing regardless of saftey
	//If "false" -- >At Magma Reef and Sans Culpra, Auto-Fish will pause until it's safe to fish
    
	/*if (!GM_getValue('Risky Fishing', false)) {
		if (island == "Magma Reef") {
			safeToFish = ((document.body.innerHTML.indexOf('Aye, Danger!') == -1) && (document.body.innerHTML.indexOf('Continue at your own risk') == -1));
		}
		else if (island == "Sans Culpra") {
			safeToFish = (document.body.innerHTML.indexOf('Scuba Diving License REQUIRED...') == -1);
		}
	}*/

	if (GM_getValue('Safety Alerts', false)) //Generate Alerts to prevent "Nice whiff!" or activePole damages
	{ // I THINK THERE ARE USUALLY 4 CASES TO EVERY ISLAND. 
/* 1. RIGHT ISLAND, WRONG CHUM
     2. RIGHT ISLAND, WRONG POLE
     3. THE ABOVE ISLAND, SPECIFIC POLE CAN'T BE USED IN CURRENT LOCATION
     4. THE ABOVE ISLAND, SPECIFIC CHUM CAN'T BE USED IN CURRENT LOCATION
		 */
		// MAGMA REEF
		if (island != "Magma Reef" && activeChum == "Fire Sludge" && activeChum != "not_set") {
			alert(activeChum + " (chum) will explode at " + island);
		}
		//RIGHT ISLAND, WRONG CHUM
		if (island == "Magma Reef" && !(activeChum == "Fire Sludge" || activeChum == "Steak" || activeChum == "Red Love" || activeChum == "Free Love" || activeChum == "not_set")) {
			alert(activeChum + " (chum) will burn up at " + island);
		}
		//RIGHT ISLAND, WRONG POLE
		if (island == "Magma Reef" && activePole != "Cubey Incinerator" && activePole != "not_set") {
			alert(activePole + " (pole) will burn up at " + island);
		}

		//BLUE CRESCENT POLE
		if ((island == "Blue Crescent") && (activePole == "Cubey Incinerator") && (activePole != "not_set")) {
			alert(activePole + " (pole) only catches Cubey fish outside of Magma Reef, and there are no Cubey fish at " + island);
		}

		else if (island == "Blue Crescent" && activePole != "Steam Powered Hydro-pole" && activePole != "Sonar Pulverizer" && activePole != "not_set") {
			alert(activePole + " (pole) isn't strong enough to catch many fish at " + island);
		}


		//Sans Culpra Pole Recommendation
		if (island == "Sans Culpra" && activePole != "Spear Gun" && activePole != "Pneumatic Spear" && activePole != "not_set") {
			alert("Spear (pole) is recommended if you plan on diving and catching the best fish at " + island);
		}
		// SPECIFIC POLES DON'T WORK OUTSIDE OF SIG'S
		if (island != "Sans Culpra" && island != "Sig" && (activePole == "Spear Gun" || activePole == "Pneumatic Spear") && (activePole != "not_set")) {
			alert(activePole + " (pole) won't work at " + island);
		}
		// SPECIFIC POLES DON'T WORK OUTSIDE OF SIG'S
		if (island != "Sig" && (activePole == "Planktonite" || activePole == "Algaenite") && (activePole != "not_set")) {
			alert("Symbiotic Poles do not work outside of Sig's locations");
		}
		// RIGHT ISLAND, WRONG CHUM
		if (island == "Sig" && activeChum != "Plankton" && activeChum != "Algae" && activeChum != 'Red Love' && activeChum != 'Free Love' && activeChum != "not_set") {
			alert("Do not use anything other than symbiotic chum or R/FLC in Sig's locations");
		}
		// SPECIFIC POLES DON'T WORK OUTSIDE OF ICELANTIA
		if ((island != "Glacier Bay" && island != "San Digloo" && island != "Lake Freezberg" && island != "Snowpeak River" && island != "Snowpeak Summit") && (activePole == "Evil Obliterator" || activePole == "Holy Liberator") && activePole != "not_set") {
			alert("Icelantia Poles do not work outside of Sig's locations");
		}
		// RIGHT ISLAND, WRONG POLE
		if ((island == "Glacier Bay" || island == "San Digloo" || island == "Lake Freezberg" || island == "Snowpeak River" || island == "Snowpeak Summit") && (activePole != "Evil Obliterator" && activePole != "Holy Liberator" && activePole != "not_set")) {
			alert("Use only the Icelantia Poles in this region");
		}
		// RIGHT ISLAND, WRONG CHUM
		if ((island == "Glacier Bay" || island == "San Digloo" || island == "Lake Freezberg" || island == "Snowpeak River" || island == "Snowpeak Summit") && (activeChum != "Nail Goo" && activeChum != "Veggie Blend" && activeChum != "Red Love" && activeChum != "Free Love" && activeChum != "not_set")) {
			alert("Do not use anything other than Evil/Good Chum or RLC in the Icelantia Region");
		}
		// THIS CHUM CAN ONLY BE USED IN ICELANTIA
		if ((island != "Glacier Bay" && island != "San Digloo" && island != "Lake Freezberg" && island != "Snowpeak River" && island != "Snowpeak Summit") && (activeChum == "Nail Goo" || activeChum == "Veggie Blend") && activeChum != "not_set") {
			alert("Do not use Icelantia chum in this region");
		}
		// PIRATE COVE
		// RIGHT ISLAND, WRONG POLE
		if ((island == "Devil" || island == "Deadwater") && (activePole != "Pyratic Plunder" && activePole != "Royal Rescuer") && activePole != "not_set") {
			alert("You must use Parribben poles here");
		}
		// RIGHT ISLAND, WRONG CHUM
		if ((island == "Devil" || island == "Deadwater") && (activeChum != "Diamond Dip" && activeChum != "Gold Goop" && activeChum != "Red Love" && activeChum != "Free Love") && activeChum != "not_set") {
			alert("You must use Paribbean chum here");
		}
		// SPECIFIC POLES CAN ONLY BE USED IN PARRIBEA
		if ((island != "Devil" && island != "Deadwater") && (activePole == "Pyratic Plunder" || activePole == "Royal Rescuer") && activePole != "not_set") {
			alert("Use Parribea poles only in Parribea");
		}
		// SPECIFIC CHUM CAN ONLY BE USED IN PARRIBEA
		if ((island != "Devil" && island != "Deadwater") && (activeChum == "Diamond Dip" || activeChum == "Gold Goop") && activeChum != "not_set") {
			alert("Use Parribea chum only in Parribea");
		}
		// ONLY SPECIFIC CHUM CAN BE USED IN GEMINISLES
		if ((island == "Poseidon" || island == "Misty Cliffs" || island == "Bottomless Depths") && (activeChum != "Blue Earthworm" && activeChum != "Red Love" && activeChum != "Free Love") && activeChum != "not_set") {
			alert("Use only Blue Earthworm chum or Love chum in Geminisles");
		}
		// ONLY SPECIFIC POLE CAN BE USED IN GEMINISLES
		if ((island == "Poseidon" || island == "Misty Cliffs" || island == "Bottomless Depths") && (activePole != "Alcatraz") && activePole != "not_set") {
			alert("Use only Alcatraz pole in Geminisles");
		}
	}
}


function boatTrainer() {
	//===============================================================================
	//            - Boat Trainer -
	//===============================================================================
	//
	//GM_log("In Boat Trainer");
	var nextLocation = null;
	var locationIndex = -1;
	var timeAndExtra = null;
	var time = null;
	var boatTimeout = null;
	var activeBoat = GM_getValue('Boat', false);
	if (GM_getValue('Boat Trainer', false) && (!needFuel)) {
		
		//Determine nextLocation for next Voyage based on Boat
		if ((activeBoat == 'Toxic') || (activeBoat == 'Hybri')) {
			//this is where we go from Glacier Bay (6) to Sans Culpra (4) and then back again
			locationIndex = (island == "Glacier Bay") ? 6 : 4;
			if (locationIndex == 6) {
				nextLocation = (locationIndex - 2);
			}
			else if (locationIndex == 4) {
				nextLocation = (locationIndex + 2);
			}
		}

		if (activeBoat == 'Beat') {
			//this is where we go from WaterPort (1) to Fishertonville (2) and then back again
			locationIndex = (island == "WaterPort") ? 1 : 2;
			if (locationIndex == 1) {
				nextLocation = (locationIndex + 1);
			}
			else if (locationIndex == 2) {
				nextLocation = (locationIndex - 1);
			}
		}
		if (activeBoat == 'Mini') {
			//this is where we go from Fishertonville(2) to Blue Crescent(3) and then back again
			//I changed it from 'BC to SC' to 'FV to BC' b/c not everyone can go to SC
			locationIndex = (island == "Blue Crescent") ? 3 : 2;
			if (locationIndex == 2) {
				nextLocation = (locationIndex + 1);
			}
			else if (locationIndex == 3) {
				nextLocation = (locationIndex - 1);
			}
		}
		if (activeBoat == 'Alcat') {
			//this is where we go from Blue Crescent(3) to Sans Culpra (4) and then back again
			//Made it between those islands because its faster
			locationIndex = (island == "Blue Crescent") ? 3 : 4;
			nextLocation = (locationIndex == 3) ? 4 : 3;
		}
		if (activeBoat == 'Palle' || activeBoat == 'Cabin') {
			//this is where we go from Santa Francesca(20) to New Seinborough (21) and then back again
			//Made it between those islands because its faster
			locationIndex = (island == "Santa Francesca") ? 20 : 21;
			nextLocation = (locationIndex == 20) ? 21 : 20;
		}
		if (activeBoat == 'Folso') {
			//this is where we go from Redwood Crescent(22) to Asteroid Reef (23) and then back again
			//Made it between those islands because its faster
			locationIndex = (island == "Redwood Crescent") ? 22 : 23;
			nextLocation = (locationIndex == 22) ? 23 : 22;
		}

		var textLocation = document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2}.[0-9]{1,2} minutes./);
		var textLocation2 = document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2} seconds./);
		
		if (textLocation != -1) {
			//magic number: +50, pulled from my butt, just wanted to get the full message
			timeAndExtra = document.body.innerHTML.substring(textLocation + "Arriving at ".length, textLocation + "Arriving at ".length + 50);
			time = parseFloat(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" minutes")));
			timervalue = Math.ceil(time * 60.0);
			boatTimeout = (parseInt(timervalue, 10) + Math.round(Math.random() * 30) + 3) * 1000;
			
		}
		else if (textLocation2 != -1) {
			//magic number: +50, pulled from my butt, just wanted to get the full message
			timeAndExtra = document.body.innerHTML.substring(textLocation2 + "Arriving at ".length, textLocation2 + "Arriving at ".length + 50);
			timervalue = parseInt(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" seconds")), 10);
			boatTimeout = (parseInt(timervalue, 10) + Math.round(Math.random() * 30) + 3) * 1000;
			
		}

		//Already determined what boat and the nextLocation. If we aren't traveling, then lets get the party started!
		if (locationIndex > -1 && (!voyaging)) {
			
			setTimeout(function () {
				document.location = 'http://apps.facebook.com/fishwrangler/map-travel/' + nextLocation;
			}, 5000);
			changeTitleWithTimeout("Boat Training - Arrive at " + nextAvailableTime(boatTimeout));
		}
		//Already determined what boat, and the nextLocation.  Use boatTimeout from voyaging message to determime next trip.     
		else if (locationIndex > -1 && boatTimeout >= 0) {
			
			setTimeout(function () {
				document.location = 'http://apps.facebook.com/fishwrangler/map-travel/' + nextLocation;
			}, boatTimeout);
			changeTitleWithTimeout("Boat Training - Arrive at " + nextAvailableTime(boatTimeout));
		}
		else {
			alert("Boat Trainer Issues - Unable to determine enough to auto-travel.\n Boat: "+activeBoat+"\n timeoutvalue: " + boatTimeout + "\n locationIndex: " + locationIndex + "\n URL location:" + location + "\n\nPlease turn Boat Trainer OFF if you aren't using it");
		}

	}
}

function getIdForm (forms) {
	var formId = null;
	for (var formCount=0; formCount < forms.length; formCount++) {
		
		if (forms[formCount].id.indexOf('app8138090269')!= -1) {
			formId = formCount;
			break;
		}
	}
	if (formId != null) {
		return forms[formId].id;
	}
	return null;
}

//================================================================================
//-Update Function-
//===============================================================================


function checkVersion(scheduleCheck) {
	//Make sure we don't have the latest version
	GM_xmlhttpRequest({
		method: 'GET',
		url: version_holder,
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		},
		onload: function (responseDetails) {
			//var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9].[0-9]?[0-9]/));
			var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));
			if (line != null) {
				var strSplit = [];
				strSplit = line.split('=');
				latest_version = strSplit[1];

				if (current_version != latest_version && latest_version != "undefined") {
					if (confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nYou are using version " + current_version + "\r\nWould you like to get it now?")) {
						getNewVersion();
					} else {
						askForReminder();
					}
				}
				else if (current_version == latest_version) {
					alert("You have the latest version of " + script_title + ", version " + current_version + " ");
				}
                //alert("DEBUG STATEMENT\r\nLatest Version: " + latest_version + ", Current Version: " + current_version + ".");
				var today = new Date();
				GM_setValue(gm_updateparam, String(today));
			}
			else {
				alert("Unable to obtain latest version number, please try to update again later.");
				skipWeeklyUpdateCheck();
			}

		}
	});
}

function getNewVersion() {
	//Initiate the download of the new script version.
	var today = new Date();
	GM_setValue(gm_updateparam, String(today));
	window.location = source_location;
}

function checkForUpdate() {
	//Verify if it's time to update
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
	if (lastupdatecheck != "never") {
		today = today.getTime(); //Get today's date
		var interval = (today - new Date(lastupdatecheck).getTime()) / one_day; //Find out how much days have passed
		//If a week has passed since the last update check, check if a new version is available
		if (interval >= 3) {
			checkVersion(true);
		}
	}
	else {
		checkVersion(true);
	}

}

function askForReminder() {
	//Ask the user to be reminded in 24 hours or only next week.
	if (confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded 3 days only)")) {
		var today = new Date();
		today = today.getTime();
		var twodays_ms = 2 * 24 * 60 * 60 * 1000;
		var tda_ms = today - twodays_ms;
		var twodaysago = new Date(tda_ms);

		//Since we check for updates after 3 days, just make it seem like the last check was 2 days ago.
		GM_setValue(gm_updateparam, String(twodaysago));
	}
	else {
		skipWeeklyUpdateCheck();
	}
}

function skipWeeklyUpdateCheck() {
	//Set the next update check in 3 days
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}

//================================================================================
//-Auto Tourny-
//================================================================================


function autoTourny() {
	//Copied from "Facebook Fishwrangler - Smart Auto Tournament Caster", thanks to Wr3cktangle
	var inputs = document.getElementsByTagName("input");
	var tournyTimervalue = -1;

	if (inputs) {
		//loop through and find the fish timer hidden input box and get it's value
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].id.indexOf("tourny_timer_hidden") != -1) {
				tournyTimervalue = inputs[i].value;
				break;
			}
		}
	}

	//recast or go home
	if (tournyTimervalue > 0) {
		//calculate timeoutvalue in milliseconds
		//tournytimervalue is in seconds, so convert that, and add on [3,5) seconds randomly
		//the random time is to help keep it less obvious mostly.
		var tournyTimeoutValue = (parseInt(tournyTimervalue, 10) + Math.round(Math.random() * 2) + 3) * 1000;

		changeTitleWithTimeout("Tourny Active - Cast at " + nextAvailableTime(tournyTimeoutValue));
		setTimeout(function () {
			document.location = 'http://apps.facebook.com/fishwrangler/cast';
		}, tournyTimeoutValue);
	}
	else {
		document.location = 'http://apps.facebook.com/fishwrangler/my';
	}
}


//================================================================================
//-CODE BLOCK FOR THE NEW GUI-
//===============================================================================
function options() {
	var div = document.createElement('div');
	div.setAttribute('style', 'position: fixed; top:100px; left:100px; z-index: 10; background: white; border: 10px solid #9a9a9a; padding: 10px;');
	div.style.backgroundColor = 'cyan';
    div.innerHTML =
		'<h2>Options</h2>' +
        '<label>Auto Fish<input type="checkbox" DISABLED></label><br />' +
		'<label>Treasure Chest Music<input type="checkbox"></label><br />' +        
		'<label>Safety Alerts<input type="checkbox"></label><br /><br />' +
        '<h2>Extras</h2>' +
		'<label>Boat Trainer<input type="checkbox" DISABLED></label><br />' +

	'<a>save</a> <a>cancel</a>'; 
    
	var boxes = div.getElementsByTagName('input');
	for (var i = 0, l = boxes.length; i < l; i++) {
		boxes[i].checked = GM_getValue(boxes[i].previousSibling.textContent);
	}
	var a = div.getElementsByTagName('a');
	a[0].addEventListener('click', function () { //save
		var div = this.parentNode;
		var boxes = div.getElementsByTagName('input');
		for (var i = 0, l = boxes.length; i < l; i++) {
			GM_setValue(boxes[i].previousSibling.textContent, boxes[i].checked);
		}
		div.parentNode.removeChild(div);
	}, true);
	a[1].addEventListener('click', function () { //cancel
		var div = this.parentNode;
		div.parentNode.removeChild(div);
	}, true);
	document.body.appendChild(div);
}



/**/
//================================================================================
//-FISHING FUCTION-
//-MOST IMPORTANT-
//================================================================================

function autoFish() {
	var timeAndExtra = null;
	var time = null;
	var boatTimeout = null;
	
	if (suigdit) {
		changeTitleWithTimeout("Select a Treasure! - Auto-Fish is paused");
		window.setTimeout(function () {
			window.location.href = "http://apps.facebook.com/fishwrangler/my";
		}, 600000);
		if (GM_getValue('Treasure Chest Music', false)) {
			startMusicAlert();
		}
	}
	else if (needChum) {
		changeTitleWithTimeout('Out of Chum, buy more');
		//alert('Out of Chum, buy more');
	}
	else if (needFuel) {
		changeTitleWithTimeout('Out of Fuel, buy more');
		//alert('Out of Fuel, buy more');
	}
	else if ((!safeToFish) && (!voyaging) && (window.location.href != "http://apps.facebook.com/fishwrangler/map")) {
		changeTitleWithTimeout("Not safe to fish! - Auto-Fish is paused");
		//alert("Not safe to fish! - Auto-Fish is paused");
	}
	else if (repairNeeded || window.location.href == "http://apps.facebook.com/fishwrangler/customize/repair") {
        changeTitleWithTimeout("Repair Needed! - Auto-Fish is paused");
        //alert("Repair Needed! - Auto-Fish is paused");
	}
	else if (needOxygen) {
		changeTitleWithTimeout("Refill Oxygen Tank! - Auto-Fish is paused");
		//alert("Refill Oxygen Tank! - Auto-Fish is paused");
	}
	else if (window.location.href == "http://www.facebook.com/common/error.html") {
		changeTitleWithTimeout("Error Page - Refresh in 5 seconds");
		window.setTimeout(function () {
			window.location.href = "http://apps.facebook.com/fishwrangler/my";
		}, 5000);
	} 
	else if(document.body.innerHTML.indexOf('Error while loading page') != -1) {
		changeTitleWithTimeout("Error Page - Refresh in 10 seconds");
		window.setTimeout(function () {
			window.location.href = "http://apps.facebook.com/fishwrangler/my";
		}, 10000);
	}
	else if (window.location.href == "http://apps.facebook.com/fishwrangler/my?treasure") {
		changeTitleWithTimeout("Treasure Chest claimed - Resuming Auto-Fish in 5 seconds");
		window.setTimeout(function () {
			window.location.href = "http://apps.facebook.com/fishwrangler/my";
		}, 5000);
	}
	else if (window.location.href == "http://apps.facebook.com/fishwrangler/auger") {
		setTimeout(function () {
			window.location.href = 'http://apps.facebook.com/fishwrangler/my';
		}, ((Math.round(Math.random() * 5) + 1) * 1000));
	}
	else if (GM_getValue('Boat Trainer', false)) {
		//Auto Fish logic resumes when arriving to your destination
		changeTitleWithTimeout("Boat Trainer Active! - Auto-Fish is paused");
		boatTrainer();
	}
	else if (voyaging) {
		var textLocation = document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2}.[0-9]{1,2} minutes./);
		var textLocation2 = document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2} seconds./);

		if (textLocation != -1) {
			//magic number: +50, pulled from my butt, just wanted to get the full message
			timeAndExtra = document.body.innerHTML.substring(textLocation + "Arriving at ".length, textLocation + "Arriving at ".length + 50);
			time = parseFloat(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" minutes")));
			timervalue = Math.ceil(time * 60.0);
			boatTimeout = (parseInt(timervalue, 10) + Math.round(Math.random() * 30) + 3) * 1000;
			//alert("boatTimeout " + boatTimeout);
		}
		else if (textLocation2 != -1) {
			//magic number: +50, pulled from my butt, just wanted to get the full message
			timeAndExtra = document.body.innerHTML.substring(textLocation2 + "Arriving at ".length, textLocation2 + "Arriving at ".length + 50);
			timervalue = parseInt(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" seconds")), 10);
			boatTimeout = (parseInt(timervalue, 10) + Math.round(Math.random() * 30) + 3) * 1000;
			//alert("boattimeout " + boatTimeout);
		}
		//Auto Fish logic resumes when arriving to your destination
		changeTitleWithTimeout("Voyaging - Next trip at " + nextAvailableTime(boatTimeout));
		setTimeout(function () {
			document.location = 'http://apps.facebook.com/fishwrangler/my';
		}, (boatTimeout + 10000));
	}
	else if (nightFishing) {
		//If Night Fishing! has started, check for timer every hour by reloading the
		//Fish Wrangler home page until "Go Fishing Now!" is found.
		changeTitleWithTimeout("Night Fishing! - Refreshing main page every hour until Go Fishing Now! is displayed");
		window.setTimeout(function () {
			window.location.href = "http://apps.facebook.com/fishwrangler/my";
		}, 3600000);
	}
	else if (scheduledDowntime) {
		//If Scheduled Downtime has started, check for timer every half hour by reloading the
		//Fish Wrangler home page until "Go Fishing Now!" is found.
		changeTitleWithTimeout("Scheduled Downtime! - Refreshing main page every 30 minutes until Go Fishing Now! is displayed");
		window.setTimeout(function () {
			window.location.href = "http://apps.facebook.com/fishwrangler/my";
		}, 1800000);
	}
	else if (timeoutvalue == -1 && (document.body.innerHTML.indexOf('Go Fishing Now!') != -1) && (safeToFish) && GM_getValue('Auto Fish', true)) {
		changeTitleWithTimeout("Fish NOW!");
		if (GM_getValue('Auto Fish', true)) {
			window.setTimeout(function () {
				window.location.href = "http://tinyurl.com/REPLACEME123";
			}, 3000);
		}
		else if (!GM_getValue('Auto Fish', true)) {
			window.setTimeout(function () {
				alert("It's time to fish!");
			}, timeoutvalue);
		}
	}
	else if (timeoutvalue == -1 && (document.body.innerHTML.indexOf('Last <a class="ul"') != -1 || (document.body.innerHTML.indexOf('win-500-rlc.gif') != -1)) && (safeToFish)) {
		changeTitleWithTimeout("Fish NOW!");
		if (GM_getValue('Auto Fish', true)) {
			window.setTimeout(function () {
				window.location.href = "http://tinyurl.com/REPLACEME123";
			}, 3000);
		}
		else if (!GM_getValue('Auto Fish', true)) {
			window.setTimeout(function () {
				alert("It's time to fish!");
			}, timeoutvalue);
		}
	}
	else if ((timeoutvalue == -1) && GM_getValue('Auto Fish', true) && window.location.href.indexOf("http://apps.facebook.com/fishwrangler/recent-trip-log?last_trip=") != -1) {
		changeTitleWithTimeout("Fish NOW!");
		window.setTimeout(function () {
			window.location.href = "http://tinyurl.com/REPLACEME123";
		}, 3000);
	}
	else if ((timeoutvalue == -1) && GM_getValue('Auto Fish', true) && 
			window.location.href != 'http://apps.facebook.com/fishwrangler/my' && 
			window.location.href != 'http://tinyurl.com/REPLACEME123') {
		//If none of the conditions above are met, go to main page in 5 seconds to continue fishing
		changeTitleWithTimeout("Reloading page, please wait!");
		window.setTimeout(function () {
			window.location.href = "http://apps.facebook.com/fishwrangler/my";
		}, 5000);
	}
	else if ((timeoutvalue == -1) && GM_getValue('Auto Fish', true)) {
		//As a last resort to ensure Auto-Fish is working 100% of the time, if timeoutvalue is still
		//not found, reload Fish Wrangler Home page every 60 seconds until "Go Fishing Now!" is found.
		changeTitleWithTimeout("Auto-Fish Issue - Reloading in 300 seconds");
		window.setTimeout(function () {
			window.location.href = "http://apps.facebook.com/fishwrangler/my";
		}, 300000);
	}
	else if (timeoutvalue >= 0 && (safeToFish) && GM_getValue('Auto Fish', true)) {
		changeTitleWithTimeout("Active - Next trip at " + nextAvailableTime(timeoutvalue));
		setTimeout(function () {
			document.location = 'http://tinyurl.com/REPLACEME123';
		}, timeoutvalue);
	}
	else if (timeoutvalue >= 0 && (safeToFish) + !GM_getValue('Auto Fish', true)) {
		changeTitleWithTimeout("You will be alerted at " + nextAvailableTime(timeoutvalue));
        window.setTimeout(function () {
            alert("It's time to fish!");
        }, timeoutvalue);
	}
	else if (timeoutvalue == -1 && (safeToFish) + !GM_getValue('Auto Fish', true)) {
		window.setTimeout(function () {
            alert("It's time to fish!");
        }, timeoutvalue);
	}
}

function runHelper () {
	if (initialize()) {
		var duig = -1;
		if (document.getElementById('app8138090269_timer_hidden') != null) {
			duig = document.getElementById('app8138090269_timer_hidden').value;
		}
		timeoutvalue = parseInt(duig, 10);
		if (timeoutvalue > 0) {
			timeoutvalue = (timeoutvalue + Math.round(Math.random() * 25) - 8) * 1000;
		}
		
		gatherFishingInfo();
		
		if (document.body.innerHTML.indexOf('c bold tiny llred') != -1 && (island == 'Sig' || island == 'Sans Culpra')) {
			if (trim(document.getElementsByClassName('c bold tiny llred')[1].getElementsByClassName('tiny')[0].innerHTML) == '0 %') {
				needOxygen = true;
			}
		} else {
			needOxygen = false;
		}
		
		if (document.body.innerHTML.indexOf('tiny green bold noul') != -1 && (island == 'Sig' || island == 'Sans Culpra')) {
			if (trim(document.getElementsByClassName('tiny green bold noul')[0].innerHTML) == "Unlimited") {
				needOxygen = false;
			}
		}
		
		var tanka = document.getElementsByTagName("a");
		for (var i = 0; i < tanka.length; i++) {
			if (tanka[i].innerHTML.indexOf("EMPTY!") != -1) {
				needFuel = true;
				break;
			} else {
				needFuel = false;
			}
		}

		if (GM_getValue('Boat Trainer', false) == false) {
			safetyCheck();
		}

		autoFish();
	}	
}