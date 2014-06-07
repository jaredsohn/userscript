// Spleen Item Counter
// mostly stolen from the major ray counter script
// mostly stolen from the fortune cookie script which was in turn based on:
// csemaj's KoL Script 
//     Copyright (c) 2007, James Cammarata
//     Based on code written by Byung Kim (Tard) http://kol.dashida.com and OneTonTomato's scripts
// toggle preference code from lukifer's mrscript
//	   http://www.noblesse-oblige.org/lukifer/scripts/
// script update code based on DrEvi1's hatrack helper, which credits Picklish
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name		   Spleen Item Counter
// @namespace	   	garbled
// @include		   *kingdomofloathing.com/*.php*
// @include		   *127.0.0.1:600*/*.php*
// 
// @description	   Version 0.0.1, Initial attempt
// ==/UserScript==

// released versions:
// Version 0.0.1 initial try

// Known bugs:
// may not save data correctly if Firefox doesn't exit cleanly (Greasemonkey issue)

var currentVersion = "0.0.1";
var scriptSite = "http://userscripts.org/scripts/show/81868";
var scriptURL = "http://userscripts.org/scripts/show/81868";  // must contain exactly one "Version x.x.x" line

////////////////////////////////////////////////////////////////////////////////
// Based on a function taken from OneTonTomato's UpUp skill script
function GM_get(target, callback) {
   GM_xmlhttpRequest({
	  method: 'GET',
	  url: target,
	  onload:function(details) {
		 if( typeof callback=='function' ){
			callback(details.responseText);
		 }
	  }
   });
}

// Check version number of script on the web
function CheckScriptVersion(data)
{
    // Preemptively set error, in case request fails...
    GM_setValue("webVersion", "Error")

	var m = data.match(/Version\s*([0-9.]+)/);
	if (m)	{
		GM_setValue("webVersion", m[1]);
	}
}

////////////////////////////////////////////////////////////////////////////////
// parse the char pane for the player name
// revised version! now taken directly from kolpreviousnadventures to handle compact mode
function getPlayerNameFromCharpane() {
	var username = document.getElementsByTagName("b");
	if (!username || username.length < 1) return false;
	username = username[0];
	if (!username) return false;
	username = username.firstChild;
	if (!username) return false;
	// in full mode the link is <a><b>Name</b></a>
	// in compact mode it's <b><a>Name</a></b>
	// so have to handle this, and also can use it to tell
	// whether it's in compact mode or not.
	var fullmode = true;
	while (username && username.nodeType == 1)
	{
		username = username.firstChild;
		fullmode = false;
	}
	if (!username) return false;
	username = username.nodeValue;
	if (!username) return false;
	username = username.toLowerCase();
//	alert("found username " + username + ", fullmode: " + fullmode);
	return {'username': username, 'fullmode': fullmode};
}

////////////////////////////////////////////////////////////////////////////////
// parse the char sheet (not the sidepane) for the player name
function getPlayerNameFromCharsheet(data) {
	// it's an href with syntax something like 
	// showplayer.php?who=PlayerID">PlayerName</a>
//	var playerName = /showplayer\.php\?who\=\d+\">([^<]+)<\/a/i.exec(data)[1];
	var playerName = /showplayer\.php\?who\=\d+\">([^<]+)<\/a/i.exec(data);  // sometimes this fails, don't know why
//	alert("got player name from charsheet: " + playerName);
	if(playerName)
		return playerName[1].toLowerCase();
	else
		return null;
}

////////////////////////////////////////////////////////////////////////////////
// parse the char sheet (not pane) for the total adventure count
// taken from the csemaj cookie script
// the "(this run)" only appears if you have ascended 
function getTurnsPlayed(data) {
	var turncount = "0";
	if(data.indexOf("Turns Played (this run)") >= 0) {
// alert("parsing datasheet for turns for an ascended char");
		turncount = /Turns Played \(this run\)[^>]*>(<[^>]+>)*([\d,]+)/i.exec(data)[2];
	}
	else {
// alert("parsing datasheet for turns for an UNascended char");
		turncount = /Turns Played[^>]*>(<[^>]+>)*([\d,]+)/i.exec(data)[2];
	}
// alert("found turncount=" + turncount);
	return parseInt(turncount.replace(',',''),10);
}

function getDaysPlayed(data) {
	var dayCount = 0;
	if(data.indexOf("Days Played (this run)") >= 0) {
// alert("parsing datasheet for days for an ascended char");
		dayCount = /Days Played \(this run\)[^>]*>(<[^>]+>)*([\d,]+)/i.exec(data)[2];
	}
	else {
// alert("parsing datasheet for days for an UNascended char");
		dayCount = /Days Played[^>]*>(<[^>]+>)*([\d,]+)/i.exec(data)[2];
	}
// alert("found dayCount=" + dayCount);
	return parseInt(dayCount.replace(',',''),10);
}

// parse the charpane info for the password hash (use as a session ID)
function getPwdHash(data){
    var pwdHash = /pwdhash \= \"(.*?)\"/i.exec(data)[1];

// alert("got pwdHash: " + pwdHash);
	return pwdHash;
}

// parse the charpane info for the turnsplayed counter
// updates at the end of the adventure, not during the fight
function getTurnsplayedVar(data){
    var turnsplayed = /turnsthisrun \= (\d+)/i.exec(data)[1];

	return parseInt(turnsplayed);
}

function clearCounters(playerName) {
		GM_setValue(playerName+"_llama", 0);
		GM_setValue(playerName+"_sandworm", 0);
		GM_setValue(playerName+"_rogue", 0);
		GM_setValue(playerName+"_lobster", 0);
}

// check combat screen for use of a major/minor ray
function checkForSpleenItem(data) {
	var llama = false;
	var sandworm = false;
	var rogue = false;
	var lobster = false;

	llama = data.match(/I see you are too preoccupied with the woes of this world/)==null ? false : true;
	sandworm = data.match(/leans against a cactus, produces a bottle of tequila, and drinks it./)==null ? false : true;
	rogue = data.match(/Please accept this token of my devotion to my user/)==null ? false : true;
	lobster = data.match(/rubs up against your legs, leaving behind a handful of sand/)==null ? false : true;

	return {'llama': llama, 'sandworm': sandworm, 'rogue': rogue, 'lobster': lobster};
}

////////////////////////////////////////////////////////////////////////////////
// check for a major ray, set proper counter if see one
// don't waste time checking for a minor unless the major count is zero
//   ... if see a minor when the counter is zero, either we screwed up or
//   it should have been a major, but was used against a boss
function processFight() {
	var playerName = GM_getValue("currentPlayer");
	var turncount = GM_getValue(playerName+"_turncount", 0);

	var SpleenGet = checkForSpleenItem(document.body.innerHTML);

	// No spleen item?  Bail
	if (!SpleenGet.llama && !SpleenGet.sandworm && !SpleenGet.rogue && !SpleenGet.lobster) {
		return;
	}

	var updateDisplay = false;

	// see if we are still fighting, or if monster died as ray was used
	// can be at most one spleen item per fight
	// if see one, set target turn to current + cooldown... and update display

	if (SpleenGet.llama) {
		var spleencount = GM_getValue(playerName+"_llama");
		GM_setValue(playerName+"_llama", spleencount + 1);
		updateDisplay = true;
	} else if (SpleenGet.sandworm) {
		var spleencount = GM_getValue(playerName+"_sandworm");
		GM_setValue(playerName+"_sandworm", spleencount + 1);
		updateDisplay = true;
	} else if (SpleenGet.rogue) {
		var spleencount = GM_getValue(playerName+"_rogue");
		GM_setValue(playerName+"_rogue", spleencount + 1);
		updateDisplay = true;
	} else if (SpleenGet.lobster) {
		var spleencount = GM_getValue(playerName+"_lobster");
		GM_setValue(playerName+"_lobster", spleencount + 1);
		updateDisplay = true;
	}

	// trigger char pane refresh with the new info if needed
	if(updateDisplay)
		top.frames[1].location.reload();
}

// get familiar type from sidepane
function getFamiliar(data, fullmode) {
// alert("in getFamiliar, data = " + data);
	// <a target="mainpane" href="familiar.php"><img src="http://images.kingdomofloathing.com/itemimages/bandersnatch.gif" width="30" border="0" height="30"></a>
	var type = "";
	var weight = 0;
	var parsedData;
	if(fullmode == true) {
		parsedData = /itemimages\/([^\.]+)\.gif[^<]+<\/a>[^:]+<b>(\d+)<\/b> pound/i.exec(data);
	}
	else {
		parsedData = /itemimages\/([^\.]+)\.gif[^<]+<\/a><br>(\d+) lbs/i.exec(data);
	}
// alert("parsedData = " + parsedData);
	if(parsedData) {
		type = parsedData[1];
		weight = parseInt(parsedData[2]);
	}
// alert("found familiar type = " + type + ", weight = " + weight);	
	return { 'type' : type, 'weight': weight };
}

////////////////////////////////////////////////////////////////////////////////
// callback function to process the main charsheet as a sanity check after 
// something questionable was spotted, or just on a new session
function sanityCheckCharsheet(data) {
	var playerName = getPlayerNameFromCharsheet(data);
	GM_setValue("currentPlayer", playerName);
	
	var prevDayCount = GM_getValue(playerName+"_dayCount",-1);
	var dayCount = getDaysPlayed(data);

	if(isNaN(dayCount)) {
		return;	 // hopefully will try again with more success, can't continue
	}
	GM_setValue(playerName+"_dayCount", dayCount);

	// if a new day, zero the current ray countdowns, and we're done
	if( dayCount != prevDayCount ) {  // current dayCount is more, less (ascended) or prevDayCount was -1 are all valid
		clearCounters(playerName);
		somethingChanged = true;
	}
	
	// trigger char pane refresh with the new info
	if(somethingChanged == true) {
// alert("leaving sanityCheckCharsheet, calling reload()");
		top.frames[1].location.reload();
	}
}

////////////////////////////////////////////////////////////////////////////////
function manualCountdownEntry() {
	var playerName = getPlayerNameFromCharpane().username;
	GM_setValue("currentPlayer", playerName);  // store for other functions that need to know who's playing

	var llama = GM_getValue(playerName+"_llama", 0);
	var sandworm = GM_getValue(playerName+"_sandworm", 0);
	var rogue = GM_getValue(playerName+"_rogue", 0);
	var lobster = GM_getValue(playerName+"_lobster", 0);
	
	var llamaCount = 0;
	var sandwormCount = 0;
	var rogueCount = 0;
	var lobsterCount = 0;

	var displayText = "";
	
	displayText = Math.max(0,llama) + ", " + Math.max(0,sandworm) + ", " + Math.max(0,rogue) + ", " + Math.max(0,lobster);

	spleenText = prompt("Enter new llama, sandworm, rogue, lobster counters (0 if ready)\n", displayText);

	if(spleenText) { // will be null if user cancels
		llamaCount = parseInt(spleenText);
		var pos = spleenText.indexOf(",");
		if(pos > 0) {
			spleenText = spleenText.substring(pos+1);
			sandwormCount = parseInt(spleenText);
			pos = spleenText.indexOf(",");
			
			if(pos > 0) {
				spleenText = spleenText.substring(pos+1);
				rogueCount = parseInt(spleenText);
				pos = spleenText.indexOf(",");

				if (pos > 0) {
					spleenText = spleenText.substring(pos+1);
					lobsterCount = parseInt(spleenText);
				}
			}
		}
// alert("manual text entry, got values " + countdown1 + ", " + countdown2 + ", " + countdown3);
		GM_setValue(playerName+"_llama", llamaCount);
		GM_setValue(playerName+"_sandworm", sandwormCount);
		GM_setValue(playerName+"_rogue", rogueCount);
		GM_setValue(playerName+"_lobster", lobsterCount);

		GM_setValue(playerName+"_needSanityCheck", false);	// just in case we were in the middle of something
		
		// trigger char pane refresh with the new info
		top.frames[1].location.reload();
	}
}

////////////////////////////////////////////////////////////////////////////////
// this function must be called when we are in the char sidepane
function getPlayerLevel(data) {
	var playerLevel = /Level (\d+)/i.exec(data);  // full mode
	if( !playerLevel)
		playerLevel = /Lvl\. (\d+)/i.exec(data);  // compact mode
	if( playerLevel)
		return parseInt(playerLevel[1],10);

	// normal level checks fail if astral spirit
	if(data.indexOf("Astral Spirit") != -1)
		return 0; // astral spirit
	else 
		return -1; // error
}

////////////////////////////////////////////////////////////////////////////////
// this function must be called when we are in the char sidepane
function updateCharacterPane() {
	var a = getPlayerNameFromCharpane();
	var playerName = a.username;
	var fullmode = a.fullmode;
	if( playerName == null )  // not sure why we sometimes see this, but doesn't seem to be at critical times
		return;

	GM_setValue("currentPlayer", playerName);  // store for other functions that need to know who's playing
	
	familiar =  getFamiliar(document.documentElement.innerHTML, fullmode);

	// if astral plane, need to reset counters
	// getPlayerLevel() returns 0 for astral plane
	var playerLevel = getPlayerLevel(document.documentElement.innerHTML);
	if(playerLevel == 0) {
// alert("detected astral plane; zeroing counters");		
		// clear the counters, no point in doing anything else
		clearCounters(playerName);
		return;
	}

	// check the session ID to see if we are still in the same session
	// if a new session, check if an update is available
	var pwdHash = getPwdHash(document.documentElement.innerHTML);
	var oldPwdHash = GM_getValue(playerName + "_pwdHash", 0);
	if(pwdHash != oldPwdHash) {
		// new session
		GM_setValue(playerName + "_pwdHash", pwdHash);
		
		// run sanity check on new session, make sure we haven't missed anything
		GM_get(baseURL + charSheet, sanityCheckCharsheet);
		
		// check for a new version of script if none seen already (asynch call, will run in parallel)
		var webVer = GM_getValue("webVersion", "Error");
		if(webVer == "Error" || webVer <= currentVersion)
			GM_get(scriptURL, CheckScriptVersion);
	}

	oldFamiliarType = GM_getValue(playerName+"_familiarType",-1);
	oldFamiliarWeight = GM_getValue(playerName+"_familiarWeight",-1);
	GM_setValue(playerName+"_familiarType", familiar.type);
	GM_setValue(playerName+"_familiarWeight", familiar.weight);

	// read in the stored data (if it exists)
	var llama = GM_getValue(playerName+"_llama", 0);
	var sandworm = GM_getValue(playerName+"_sandworm", 0);
	var rogue = GM_getValue(playerName+"_rogue", 0);
	var lobster = GM_getValue(playerName+"_lobster", 0);
	
   // If any of the stored data is nonnegative then we need to display something
	var displayText = "";

	displayText += "L=" + Math.max(0,llama) + " ";
	displayText += "S=" + Math.max(0,sandworm) + " ";
	displayText += "RP=" + Math.max(0,rogue) + " ";
	displayText += "RL=" + Math.max(0,lobster) + " ";

// alert("display text: " + displayText);
   
    if(displayText != "") {
		if(fullmode) {
			var newElement = document.createElement("FONT");
			newElement.innerHTML = "<b>"
			  + "<font size=2>Spleen Drops: " 
			  + displayText
			  + "</font></b><br><br>"; ;
			newElement.setAttribute("onmouseover", 'this.style.opacity="0.5"');
			newElement.setAttribute("onmouseout", 'this.style.opacity="1"');
			newElement.setAttribute("id", 'spleenCounter');
			newElement.addEventListener("click", manualCountdownEntry, true);
			newElement.align = "center";
	
			var elements = document.getElementsByTagName( "FONT" );
			for ( var i = 0; i < elements.length; ++i ){
				if ( elements[i].innerHTML.indexOf( "Last Adventure" ) != -1 ){
					// insert our before this one
					elements[i].parentNode.insertBefore(newElement,elements[i]);
					break;
				}
			}
		}
		else { // compact mode - different layout, make a table row and two data element
			var newTR = document.createElement('tr');

			var newElement = document.createElement("td");
			newElement.appendChild(document.createTextNode("Spleens:"));
			newElement.align = "right";
			newTR.appendChild(newElement);
			
			newElement = document.createElement("td");
			newElement.setAttribute("onmouseover", 'this.style.opacity="0.5"');
			newElement.setAttribute("onmouseout", 'this.style.opacity="1"');
			newElement.setAttribute("id", 'spleenCounter');
			newElement.addEventListener("click", manualCountdownEntry, true);
			newElement.align = "left";
			newElement.style.fontWeight = "bold";
			newElement.appendChild(document.createTextNode(displayText));
			newTR.appendChild(newElement);
			
			var elements = document.getElementsByTagName( "TR" );
			var done = false;
			// if the last adventures script is running, insert before, else append to table
			for ( var i = 1; i < elements.length; ++i ){
				// normally "Adv", might be "Last Adventures" if that script is running
				if ( elements[i].innerHTML.indexOf( "Last Adventures" ) != -1 ){
					// insert ours before this one - experiment, back up one more
					elements[i].parentNode.insertBefore(newTR,elements[i-1]);
					done = true;
					break;
				}
			}
			if(!done) { // normal, no last adv script
				for ( var i = 0; i < elements.length; ++i ){
					 if ( elements[i].innerHTML.indexOf( "Adv" ) != -1 ){
						// insert ours at end of the table in compact mode
						elements[i].parentNode.appendChild(newTR);
						break;
					 }
				}
			}
		}
    }
}   

////////////////////////////////////////////////////////////////////////////////
// main prog, just call the proper routine if we are on a pane we care about
var nodeBody   = document.getElementsByTagName("body").item(0);
var textBody   = "";
var baseURL	   = "";
var charSheet = "charsheet.php";
var fighting = false;

if (nodeBody) {
   if (nodeBody.textContent) {
	  textBody = nodeBody.textContent;
   }
   else if (nodeBody.text) {
	  textBody = nodeBody.text;
   }
   baseURL = nodeBody.baseURI.substring(0,nodeBody.baseURI.lastIndexOf('/')+1);
}

if ( document.location.pathname.indexOf("fight.php") > 0 ) {
	fighting = true;
	// fighting, but maybe we're done, look for adventure again tag
	if ( document.body.innerHTML.indexOf( "Adventure Again (" ) != -1 ) {
		fighting = false;
	}

	processFight();
}
else if ( document.location.pathname.indexOf("charsheet.php") > 0){ 
	sanityCheckCharsheet(document.body.innerHTML);
}
else if ( document.location.pathname.indexOf("charpane.php") > 0 ) {
	updateCharacterPane();
}
