// ==UserScript==
// @name            Pardus Ribbon Hunter's Module
// @namespace       azureflash@gmail.com
// @author          Azure Flash
// @version         4.1
// @description     Displays essential information for ribbon hunters right on the Nav screen in Pardus.
// @include         http*://*.pardus.at/main.php*
// @include         http*://*.pardus.at/overview_stats.php*
// @include         http*://*.pardus.at/ship2opponent_combat.php*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant           GM_setValue
// @grant           GM_getValue
// ==/UserScript==
"use strict";

// Cookie functions from quirksmode.org
function createCookie(name,value,days) {
	var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
	else
	{ 
	    expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	}
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ')
		{
		    c = c.substring(1,c.length);
		}
		if (c.indexOf(nameEQ) === 0)
		{
		    return c.substring(nameEQ.length,c.length);
		}
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
// End of cookie functions from quirksmode.org
var prefs = {};
var imgDir = "";

if (readCookie("prefs") !== null) {
	prefs = JSON.parse(readCookie("prefs"));
} else {
	prefs.debug = false;
	// Align is -1 for left, 0 for auto and 1 for right
	prefs.align = 0;
	prefs.sortAbs = false;
	prefs.showConfig = false;
	prefs.showAllNextRibbons = true;
	prefs.showTopRibbons = true;
	prefs.nbTopRibbons = 15;
	prefs.topRibbonsImgSize = 11;
	prefs.boundaries = [10, 100, 500, 1000];
	createCookie("prefs", JSON.stringify(prefs));
}

// Useful subroutines
function toUpperCaseWords(string) {
	string = string.split(" ");
	for (var i = 0; i < string.length; i += 1) {
		string[i] = string[i][0].toUpperCase() + string[i].slice(1);
	}
	string = string.join(" ");
}

function deltaToNextBoundary(x, boundaries) {
	// Function to determine how much to add to x to make it equal
	// to the nearest boundary in the array of boundaries.
	// Returns -1 if x is higher than all of the boundaries
	var delta = -1;
	var nextBoundary = -1;
	boundaries = boundaries.sort(function (a, b) { return a - b });
	
	for (var i = 0; i < boundaries.length; i += 1) {
		if (x < boundaries[i]) {
			nextBoundary = boundaries[i];
			delta = nextBoundary - x;
			break;
		}
	}
	
	return [delta, nextBoundary];
}

// Ribbons header in base 64

var ribbonsImg = "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";

// List of monsters with irregular file names
var monsterNameExceptions = {};
monsterNameExceptions.space_dragon_elder = "Elder Space Dragon";
monsterNameExceptions.smuggler_escorted = "Escorted Smuggler";
monsterNameExceptions.pirate_experienced = "Experienced Pirate";
monsterNameExceptions.pirate_famous = "Famous Pirate";
monsterNameExceptions.pirate_inexperienced = "Inexperienced Pirate";
monsterNameExceptions.smuggler_lone = "Lone Smuggler";
monsterNameExceptions.space_maggot_mutated = "Mutated Space Maggot";
monsterNameExceptions.space_worm_mutated = "Mutated Space Worm";
monsterNameExceptions.manifestation_developed = "Developed Manifestation";
monsterNameExceptions.manifestation_ripe = "Ripe Manifestation";
monsterNameExceptions.manifestation_verdant = "Verdant Manifestation";
monsterNameExceptions.energybees = "Swarm of Energy Bee";
monsterNameExceptions.gorefanglings = "Swarm of Gorefangling";
monsterNameExceptions.x993_battlecruiser = "X-993 Battlecruiser";
monsterNameExceptions.x993_mothership = "X-993 Mothership";
monsterNameExceptions.x993_squad = "X-993 Squad";
monsterNameExceptions.space_dragon_young = "Young Space Dragon";
monsterNameExceptions.wormhole = "Wormhole Monster";
monsterNameExceptions.hidden_drug_stash = "Hidden Drug Stashe";
monsterNameExceptions.medusa_swarmlings = "Medusa Swarmling";
monsterNameExceptions.stheno_swarmlings = "Stheno Swarmling";

// Function to turn monster name into file name
function name2file(name) {
	for (var n in monsterNameExceptions) {
		if (monsterNameExceptions[n] === name) {
			return n + ".png";
		}
	}
	return name.toLowerCase().replace(/ /g, "_") + ".png";
}

// When in the stats page, refresh the NPC kill counts
if (location.pathname.replace("/", "") === "overview_stats.php") {
	// Find table rows containing the NPC kills statistics
	var killsList = document.body.innerHTML.match(/<tr><td>[\w\s-]* killed:<\/td><td>[0-9,]+<\/td><\/tr>/gi);
	
	if (prefs.debug) {
		alert(killsList.length + " killcount rows found:\n" + killsList.join("\n"));
	}
	
	// Extract data from the table rows
	var killsArray = [];
	var totalKills = 0;
	for (var i = 0; i < killsList.length; i += 1) {
		killsList[i].match(/<tr><td>([\w\s-]*)s killed:<\/td><td>([0-9,]+)<\/td><\/tr>/);
		var monsterName = RegExp.$1;
		var count = RegExp.$2.replace(",", "");
		totalKills += parseInt(count);
		killsArray.push(monsterName);
		killsArray.push(count);
		
		if (prefs.debug) {
			alert("Added " + count + " " + monsterName + " to the list of kills");
		}
	}
	
	// Add total kills at the end of the left pane
	var statsTable = document.forms[0].getElementsByTagName("tbody")[0];

	var spacerTD = document.createElement("td");
	spacerTD.colSpan = "5";
	spacerTD.innerHTML = "&nbsp;";
	var spacerTR = document.createElement("tr").appendChild(spacerTD);

	statsTable.appendChild(spacerTR);
	
	var killsTR = document.createElement("tr");
	var totalTD = document.createElement("td");
	var killsTD = document.createElement("tr");
	
	totalTD.innerHTML = "Total kills: ";
	killsTD.innerHTML = totalKills;
	
	killsTR.appendChild(totalTD);
	killsTR.appendChild(killsTD);
	
	statsTable.appendChild(killsTR);
	
	if (prefs.debug) {
		alert("Killcounts extracted:\n" + killsArray.join("\n"));
	}
	
	// Save the list of NPCs and kills in the key corresponding to the current universe
	GM_setValue(location.hostname.replace(".pardus.at", ""), killsArray.join(","));
}

if (location.pathname.replace("/", "") === "main.php") {
	// If standing on a legitimate wormhole, record its ID
	var whID;
	var centerCell = document.getElementById("navarea").getElementsByTagName("td");
	centerCell = centerCell[Math.floor(centerCell.length / 2)].getElementsByTagName("a");
	
	if (centerCell.length > 0 && centerCell[0].href.indexOf("warp") > -1) {
		whID = centerCell[0].href;
		whID = whID.replace("javascript:warp(", "");
		whID = whID.replace(")", "");
		if (GM_getValue("wormholes") === undefined) {
			GM_setValue("wormholes", whID);
		}
		else {
			if (GM_getValue("wormholes").indexOf(whID) === -1) {
				GM_setValue("wormholes", GM_getValue("wormholes") + "," + whID);
			}
		}
	}

	// Recall the list of NPCs and kills for the current universe
	var killsArray = GM_getValue(location.hostname.replace(".pardus.at", ""), "").split(",");
	
	if (prefs.debug) {
		alert("List of kill counts retrieved:\n" + killsArray.join("\n"));
	}
	
	if (prefs.showTopRibbons) {
		displayRibbons();
	}

	
	insertMouseOver();
	
	var local_arrived = unsafeWindow.arrived;
	if (local_arrived) {
		unsafeWindow.arrived = function(result) {
			local_arrived(result);
			if (prefs.showTopRibbons) {
				displayRibbons();
			}
			insertMouseOver();
		}
	}
}

// If an opponent dies, update the killsArray for the current universe
if (location.pathname.replace("/", "") === "ship2opponent_combat.php") {
	if (document.getElementsByTagName("html")[0].innerHTML.match(/D E A D/g) !== null) {
		if (prefs.debug) {
			alert("Monster killed!");
		}

		// Find the name of the NPC killed
		var monsterName = $("img[src*='/opponents/']")[0].src;
		monsterName = monsterName.substring(monsterName.lastIndexOf("/") + 1, monsterName.indexOf(".png"));
		if (monsterNameExceptions[monsterName] !== undefined) {
			monsterName = monsterNameExceptions[monsterName];
		}
		else {
			monsterName = monsterName.replace(/_/g, " ");
		}
		
		if (prefs.debug) {
			alert("The name of the NPC killed is: " + monsterName);
		}
		
		// Retrieve the kills array
		var killsArray = GM_getValue(location.hostname.replace(".pardus.at", ""));
		killsArray = killsArray.split(",");
		
		if (prefs.debug) {
			alert("List of kill counts retrieved:\n" + killsArray.join("\n"));
		}

		// Find the name of the NPC killed in the killsArray and increment the next value, which is the kill count
		var found = false;
		for (i = 0; i < killsArray.length; i = i + 2) {
			if (prefs.debug) {
				alert("Comparing '" + monsterName.toLowerCase() + "' with '" + killsArray[i].toLowerCase() + "'");
			}
			
			if (killsArray[i].toLowerCase() === monsterName.toLowerCase()) {
				if (prefs.debug) {
					alert(monsterName + " was found in dictionary, adding kill");
				}
				found = true;
				killsArray[i+1] = parseInt(killsArray[i + 1]) + 1;
				break;
			}
		}
		
		// If the NPC wasn't found, add the NPC at the end with 1 kill
		if (!found) {
			monsterName = toUpperCaseWords(monsterName);
			killsArray.push(monsterName);
			killsArray.push(1);
		}

		if (prefs.debug) {
			alert("New list of kill counts saved:\n" + killsArray.join("\n"));
		}
		
		// Pack up and save the kills array
		killsArray = killsArray.join(",");
		GM_setValue(location.hostname.replace(".pardus.at", ""), killsArray);
	}
}

function displayRibbons() {
		// Calculate the kills to the nearest ribbons in a 2D array of the form:
		// allDeltas[i] = [monsterName, killCount, remaining, boundary]
		// Where remaining is the number of kills left before reaching the next ribbon, boundary
		var allDeltas = [];
		
		for (var i = 0; i < killsArray.length; i = i + 2) {
			var delta = deltaToNextBoundary(killsArray[i + 1], prefs.boundaries);
			allDeltas[i] = [killsArray[i], killsArray[i + 1], delta[0], delta[1]];
		}
		
		if (prefs.debug) {
			alert("allDeltas array:\n" + allDeltas.join("\n"));
		}
		
		// Sort the allDeltas array by ascending order of remaining kills
		allDeltas = allDeltas.sort(function (a, b) {
		    // The arguments to this function, a and b, will be arrays of this format:
	    	// [monsterName, killCount, remaining, boundary]
		    var criteria;
			
		    if (prefs.showAbs) {
	    		criteria = a[2] - b[2];
		    } else {
			    criteria = a[2]/a[3] - b[2]/b[3];
		    }
			
		    return criteria;
		});
		
		if (prefs.debug) {
			alert("Sorted allDeltas array:\n" + allDeltas.join("\n"));
		}
						
		for(var i = 0; i < allDeltas.length; i++)
		{
		    // Remove the undefined elements at the end of the array left by sorting
			if (allDeltas[i] === undefined) {
				allDeltas.splice(i,1);
				i--;
			}			
    		// Remove the remaining values of -1 (meaning over 1000) and optionally 1	
			else if (allDeltas[i][2] === -1)
			{
			    allDeltas.splice(i,1);
			    i--;
			}
		}
		
		if (prefs.debug) {
			alert("Cleaned allDeltas array:\n" + allDeltas.join("\n"));
		}
		
		// Display the specified number of closest ribbons or all of them if nbTopRibbons is higher
		if (prefs.debug) {
			alert("Displaying " + Math.min(prefs.nbTopRibbons, allDeltas.length) + " of " + allDeltas.length + " elements:\n" + allDeltas.slice(0, Math.min(prefs.nbTopRibbons, allDeltas.length)).join("\n"));
		}
		
		// Get current image directory
		try {
            document.getElementsByTagName('script')[1].innerHTML.match(/imgDir = "(.+)"/)[0] !== null;
			imgDir = RegExp.$1;
		} catch (err) {
			if (err.name.toString() === "TypeError") {
				imgDir = "";
			}
		}
		
		// Clone a box, change the id and header, empty it, put the list of ribbons instead and insert it
		var statusBox = document.getElementById('status');
		var ribbonBox = statusBox.cloneNode(true);
		var spacer = "<br><br>";
		if ($("#otherships:hidden").length === 1) {
			spacer = "";
		}
		ribbonBox.innerHTML = spacer + ribbonBox.innerHTML;
		
		ribbonBox.getElementsByTagName('img')[0].src = "data:image/png;base64," + ribbonsImg;
		ribbonBox.id = "ribbons";
		
		var ribbonBoxDivs = ribbonBox.getElementsByTagName('div');
		ribbonBoxDivs[ribbonBoxDivs.length - 1].innerHTML = "";
		ribbonBoxDivs[ribbonBoxDivs.length - 1].id = "ribbonbox_content";
		
		var ribbonScript = setPref.toString() + "\n" + readCookie.toString() + "\n" + createCookie.toString() + "\n" + eraseCookie.toString() +  "\n" + toggleBoundary.toString();

		var ribbonList = "";
		var scriptElement = document.createElement("script");		
		scriptElement.type = "text/javascript";
		scriptElement.innerHTML = ribbonScript;
		
		var possibleBoundaries = [10, 100, 500, 1000];
		if (prefs.showConfig) {
			ribbonList += "<a href='javascript:setPref(\"showConfig\",false);' style='font-size: 9px; display: block; text-align: center;'>Hide Settings</a><br>";
			ribbonList += "<span style='font-size: 10px'>Align:";
			ribbonList += "<input type='button' onclick='setPref(\"align\", -1)' value='<--' style='font-size: 9px; margin: 0 5px 5px 5px;'/>";
			ribbonList += "<input type='button' onclick='setPref(\"align\", 0)' value='Auto' style='font-size: 9px; margin: 0 5px 5px 0;'/>";
			ribbonList += "<input type='button' onclick='setPref(\"align\", 1)' value='-->' style='font-size: 9px; margin: 0 5px 5px 0;'/>";
			ribbonList += "<br>Sort by";
			ribbonList += "<input type='button' onclick='setPref(\"showAbs\", true)' value='#' style='font-size: 9px; margin: 0 5px 5px 5px;'/>";
			ribbonList += "<input type='button' onclick='setPref(\"showAbs\", false)' value='%' style='font-size: 9px; margin: 0 5px 5px 0;'/>";
			ribbonList += "kills left.<br>";
			for (var v in possibleBoundaries) {
				var checked = "";
				if ($.inArray(possibleBoundaries[v], prefs.boundaries) > -1) {
					checked = "checked='checked'";
				}
				ribbonList += "<input type='checkbox' onchange='toggleBoundary(this.value, this.checked)' name='boundaries' " + checked + " value='" + possibleBoundaries[v] + "' />" + possibleBoundaries[v];
			}
			ribbonList += "<br><br>";
		} else {
			ribbonList += "<a href='javascript:setPref(\"showConfig\",true);' style='font-size: 9px; display: block; margin: 0; padding: 0; text-align: center;'>Show Settings</a><br>";
		}
		
		allDeltas = allDeltas.slice(0, Math.min(prefs.nbTopRibbons, allDeltas.length));
		var subdir = "";
		for (var i = 0; i < allDeltas.length; i += 1) {
			if (imgDir === "") {
				ribbonList += "<p style='font-size: 10px; color: #ccc; margin: 0; padding: 0;'><span style='font-size: 13px'>" + allDeltas[i][2] + "</span> <b>" + allDeltas[i][0] + "</b> to " + allDeltas[i][3] + "</p>";
			} else {
				subdir = "/opponents/";
				if (allDeltas[i][0].indexOf("Wormhole") !== -1) { subdir = "/foregrounds/"; }
				ribbonList += 	"<p style='font-size: 10px; color: #ccc; margin: 0; padding: 0;'>\
									<img style='display: inline; vertical-align: middle; margin-right: 10px;' height='16' src='" + imgDir + subdir + name2file(allDeltas[i][0]) + "' />" + 
									allDeltas[i][2] + " to " + allDeltas[i][3] + 
								"</p>";
			}
		}
        var scripts = document.getElementsByTagName('script');
        scripts[scripts.length - 1].parentNode.appendChild(scriptElement);
		ribbonBoxDivs[ribbonBoxDivs.length - 1].innerHTML += ribbonList;

		if (document.getElementById('ribbons') !== null) {
			document.getElementById('ribbons').parentNode.removeChild(document.getElementById('ribbons'));
		}
		
		if (prefs.align === 1 || (prefs.align === 0 && $("#otherships:hidden").length === 1)) {
			document.getElementById('cargo').parentNode.appendChild(ribbonBox);
		} else {
			statusBox.parentNode.appendChild(ribbonBox);
		}
	}
	
// Attach function to display kill count when mousing over an NPC's picture
function insertMouseOver() {
	$("img[src*='/opponents/'], img[src*='wormhole.png']").bind("mouseover", function (e) {
		var image = this;
		
		// Get the ID of the tile the image is on
		// If the ID corresponds to a known wormhole, abort
		var fieldHTML = image.parentNode.parentNode.innerHTML;
		var fieldID = fieldHTML.substring(fieldHTML.indexOf("(") + 1, fieldHTML.indexOf(")\""));
		
		if (prefs.debug) {
			alert(fieldID + "\n\n" + GM_getValue("wormholes"));
		}
		
		
		/* Beigeman - removed this as GM_getValue is out of scope when it gets called here.
		if (GM_getValue("wormholes").indexOf(fieldID) !== -1) {
			return;
		}
		*/
		
		if (prefs.debug) {
			alert("Filename of image moused over:\n" + image.src);
		}
		
		// Transform file name into searchable NPC name
		var monsterName = image.src.substring(image.src.lastIndexOf("/") + 1, image.src.indexOf(".png"));
		if (monsterNameExceptions[monsterName] !== undefined) {
			monsterName = monsterNameExceptions[monsterName];
		}
		else {
			monsterName = monsterName.replace(/_/g, " ");
		}
		
		if (prefs.debug) {
			alert("NPC Name extracted: " + monsterName);
		}
		
		// Find the monster manually in the array in order to have the properly punctuated name.
		// If the monster is not found in the array, kill count is 0.
		var killCount = 0;
		for (var i = 0; i < killsArray.length; i += 2) {
			if (prefs.debug) {
				alert("Comparing '" + monsterName.toLowerCase() + "' and '" + killsArray[i].toLowerCase() + "'");
			}
			if (killsArray[i].toLowerCase() === monsterName.toLowerCase()) {
				killCount = killsArray[i + 1];
				monsterName = killsArray[i];
				if (prefs.debug) {
					alert(monsterName + " found, " + killCount + " killed.");
				}
				break;
			}
		}
		
		// If the monster wasn't found in the dictionary, manually capitalize every word
		if (killCount === 0) {
			if (prefs.debug) {
				alert(monsterName + " not found in dictionary. Assuming none are killed.");
			}
			monsterName = monsterName.split(" ");
			for (i = 0; i < monsterName.length; i += 1) {
				monsterName[i] = monsterName[i][0].toUpperCase() + monsterName[i].slice(1);
			}
			monsterName = monsterName.join(" ");
		}
		
		// Change the title of the image
		var plural = "s";
		if (monsterName[monsterName.length - 1] === "s") {
			plural = "";
		}
		image.title = monsterName + plural + " killed: " + killCount;
		var delta = deltaToNextBoundary(killCount, [100, 500, 1000]);
		if (prefs.showAllNextRibbons && delta[0] > 0) {
			image.title += " (" + delta[0] + " to " + delta[1] + ")";
		}
	});
	}

function setPref(name, value) {
			var prefs = JSON.parse(readCookie('prefs'));
			prefs[name] = value;
			createCookie('prefs', JSON.stringify(prefs));
			location.reload();
}

function toggleBoundary(value, isadded) 
{
	var prefs = JSON.parse(readCookie('prefs'));
	if (isadded) 
	{
		prefs['boundaries'].push(parseInt(value));
	} 
	else
    {
		var newBoundaries = [];
		while (prefs['boundaries'].length > 0) 
		{
			if (prefs['boundaries'][0] !== parseInt(value)) 
			{
				newBoundaries.push(prefs['boundaries'].shift());
			} 
			else 
			{
				prefs['boundaries'].shift();
			}
		}
		prefs['boundaries'] = newBoundaries;
	}
	createCookie('prefs', JSON.stringify(prefs));
	location.reload();
}

