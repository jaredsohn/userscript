//-----------------------------------------------------------------------------
// Weewar Statistics Script
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//  Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name Weewar Stats
// @namespace http://userscripts.org/
// @description Shows the # of each type of unit on the map for each player in the game as well as each player's relative army strength (based on unit costs). Click the word STATS on the left of the table to expand the table and show all unit counts. 
// @include http://*weewar.com/game*
// @exclude http://*weewar.com/game/new*
// @version 1.9.1
// @copyright       2008+, Ryan (http://www.whenbrainsfly.com/)
// @uso:script      47008
// ==/UserScript==

// Written originally by Tracy (My username is "Tracy", challenge me to a game.)
// This script is a Greasemonkey script.  It requires the Firefox browser and 
//	 the Greasemonkey add-on.
//
//	 Firefox: http://www.getfirefox.com
//	 Greasemonkey: http://www.greasespot.net
//-----------------------------------------------------------------------------
// Version History
// Unversioned : Basic units only, no Pro units.  Only covered 4 armies.
// 1.0 - First release with Pro units and all 6 armies.
// 1.1 - Fix problem with not showing table when it's the user's turn
//	   Add very basic error handling
//	   Link units & bases to the Weewar wiki
// 1.2 - Nov 14, 2007
//	   Fixed error display when starting a new game by using exclude
//	   Added "Army Strength" to stats per formula designed by Goater 
//	   (challenge him to a game)
// 1.3 - May 27, 2008
//	   Div's renamed again.  Moved it to 'game_info'.
// 1.4 - June 24, 2008
//	   Shortened the grid due to new placement above the map (so that the map
//	   isn't pushed off the bottom of the screen.
//	   Also changed strength rating of Light Artillery to 200 to coincide 
//	   with balancing changes made to the game.
// 1.5 - July 27, 2008, modified by spadequack using pluto's adapted version from his suite
//	   Moved grid to replace inspector, made it expandable (based on weewar suite)
//	   Added opacity, shrunk the word STATS to make it look nicer for 1 or 2
//	   player games. 
//	   Updated costs of other units to new specs (Anti-AIR, bomber, destroyer, sub)
//	   Updated wiki links to new wiki
// 1.6 - April 18, 2009, modified by spadequack to handle updated css
//	   Updated wiki links to newer wiki
// 1.7 - April 19, 2009, modified by spadequack to fix bug of missing base count
// 1.8 - June 2, 2009, modified by spadequack to adjust for using images instead of divs
// 1.8.1 - June 2, 2009, modified by spadequack - changed bottom margin from 10px to 5px
// 1.8.2 - August 12, 2009, modified by spadequack to handle updated css/html
// 1.8.3 - October 30, 2009, modified by spadequack to handle divide by 0 when harbor remains but no units
// 1.8.4 - November 11, 2009, modified by davewasthere to fix colours not showing
// 1.9.0 - January 23, 2010, modified by spadequack to use the new api for the flash interface. 
//	   Cleaned up code a little bit.
//	   Added check for new version from dave beer's team chat script. Not sure it works...
// 1.9.1 - January 26, 2010, modified by spadequack to exclude http://*weewar.com/game/new* (very minor update)
//-----------------------------------------------------------------------------

var opacity = "1.0"; // set the opacity level of the stats panel

var weewarUrl = "http://weewar.com";
var strWikiBase = 'http://weewar.wikispaces.com/';

var width = "15%";

// create unit arrays
var arrUnits = new Array();
var arrUnitInfo = new Array();
for (jj = 0; jj < 35; jj++) {
	arrUnits[jj] = new Array();
	arrUnitInfo[jj] = new Array();
}
// arrUnitInfo[i][0]: name for xml match
// arrUnitInfo[i][1]: name for weewar wiki
// arrUnitInfo[i][2]: cost of unit
// arrUnitInfo[i][3]: suffix of weewar hosted image
for (jj = 1; jj < 10; jj++) {
	arrUnitInfo[jj][3] = '00' + jj + '.png';
}
arrUnitInfo[1][0] = 'Trooper';
arrUnitInfo[1][1] = 'Trooper';
arrUnitInfo[1][2] = 75;
arrUnitInfo[2][0] = 'Heavy Trooper';
arrUnitInfo[2][1] = 'Heavy+Trooper';
arrUnitInfo[2][2] = 150;
arrUnitInfo[3][0] = 'Raider';
arrUnitInfo[3][1] = 'Raider';
arrUnitInfo[3][2] = 200;
arrUnitInfo[4][0] = 'Assault Artillery';
arrUnitInfo[4][1] = 'Assault+Artillery';
arrUnitInfo[4][2] = 450;
arrUnitInfo[5][0] = 'Tank';
arrUnitInfo[5][1] = 'Tank';
arrUnitInfo[5][2] = 300;
arrUnitInfo[6][0] = 'Heavy Tank';
arrUnitInfo[6][1] = 'Heavy+Tank';
arrUnitInfo[6][2] = 600;
arrUnitInfo[7][0] = 'Berserker';
arrUnitInfo[7][1] = 'Berserker';
arrUnitInfo[7][2] = 900;
arrUnitInfo[8][0] = 'Light Artillery';
arrUnitInfo[8][1] = 'Light+Artillery';
arrUnitInfo[8][2] = 200;
arrUnitInfo[9][0] = 'Heavy Artillery';
arrUnitInfo[9][1] = 'Heavy+Artillery';
arrUnitInfo[9][2] = 600;
arrUnitInfo[10][0] = 'DFA';
arrUnitInfo[10][1] = 'Death+From+Above';
arrUnitInfo[10][2] = 1200;
arrUnitInfo[10][3] = '010.png';
arrUnitInfo[11][0] = 'Anti Aircraft';
arrUnitInfo[11][1] = 'AA-Guns';
arrUnitInfo[11][2] = 300;
arrUnitInfo[11][3] = 'antiair.png';
arrUnitInfo[12][0] = 'Hovercraft';
arrUnitInfo[12][1] = 'Hovercraft';
arrUnitInfo[12][2] = 300;
arrUnitInfo[12][3] = 'hovercraft.png';
arrUnitInfo[13][0] = 'Helicopter';
arrUnitInfo[13][1] = 'Helicopter';
arrUnitInfo[13][2] = 600;
arrUnitInfo[13][3] = 'heli.png';
arrUnitInfo[14][0] = 'Jet';
arrUnitInfo[14][1] = 'Jet';
arrUnitInfo[14][2] = 800;
arrUnitInfo[14][3] = 'jet.png';
arrUnitInfo[15][0] = 'Bomber';
arrUnitInfo[15][1] = 'Bomber';
arrUnitInfo[15][2] = 900;
arrUnitInfo[15][3] = 'bomber.png';
arrUnitInfo[16][0] = 'Speedboat';
arrUnitInfo[16][1] = 'Speedboat';
arrUnitInfo[16][2] = 200;
arrUnitInfo[16][3] = 'speedboat.png';
arrUnitInfo[17][0] = 'Destroyer';
arrUnitInfo[17][1] = 'Destroyer';
arrUnitInfo[17][2] = 900;
arrUnitInfo[17][3] = 'destroyer.png';
arrUnitInfo[18][0] = 'Submarine';
arrUnitInfo[18][1] = 'Sub';
arrUnitInfo[18][2] = 1000;
arrUnitInfo[18][3] = 'sub.png';
arrUnitInfo[19][0] = 'Battleship';
arrUnitInfo[19][1] = 'Battleship';
arrUnitInfo[19][2] = 2000;
arrUnitInfo[19][3] = 'battleship.png';

arrUnitInfo[26][0] = 'Capturing';
arrUnitInfo[26][1] = 'Terrain';
arrUnitInfo[26][2] = 0;
arrUnitInfo[26][3] = 'capturing.gif';
arrUnitInfo[27][0] = 'Base';
arrUnitInfo[27][1] = 'Terrain';
arrUnitInfo[27][2] = 0;
arrUnitInfo[27][3] = 'city.png';
arrUnitInfo[28][0] = 'Harbor';
arrUnitInfo[28][1] = 'Terrain';
arrUnitInfo[28][2] = 0;
arrUnitInfo[28][3] = 'harbor.png';
arrUnitInfo[29][0] = 'Airfield';
arrUnitInfo[29][1] = 'Terrain';
arrUnitInfo[29][2] = 0;
arrUnitInfo[29][3] = 'airfield.png';

// [0]  = total things
// [31] = total playable units
// [32] = strength
// [33] = potential
// [34] = health

// init army colors
var sColors = new Array();
sColors[0] = '#81B7F5';
sColors[1] = '#FA5950';
sColors[2] = '#CE90C9';
sColors[3] = '#FFF22C';
sColors[4] = '#9FE07C';
sColors[5] = '#F4F7F2';

var statsText = "S<br/>T<br/>A<br/>T<br/>S";
var expandStatsText = "<b>&gt;</b><br/><br/>" + statsText + "<br/><br/><b>&gt;</b>";
var collapseStatsText = "<b>&lt;</b><br/><br/>" + statsText + "<br/><br/><b>&lt;</b>";

// init unit counts
for (jj = 0; jj < 35; jj++) {
	arrUnits[0][jj] = 0;
	arrUnits[1][jj] = 0;
	arrUnits[2][jj] = 0;
	arrUnits[3][jj] = 0;
	arrUnits[4][jj] = 0;
	arrUnits[5][jj] = 0;
}

addGlobalStyle('div#newStats {position: relative; margin: 0 0 5px 0; z-index: 85; }'); 
addGlobalStyle('table#newStatsTable { border-collapse: separate; border-spacing: 1px; border-color: #DDDDDD #AAAAAA #AAAAAA #DDDDDD; border-style: solid; border-width: 1px; background-color:#fff; }');
addGlobalStyle('#statsCell { background-color: #ecf5fc; vertical-align: middle; text-align: center; border-color: #DDDDDD #AAAAAA #AAAAAA #DDDDDD; border-style: solid; border-width: 1px; padding: 3px 5px; }');
addGlobalStyle('.statsToggleExpand { font-size: 0.85em; text-decoration:none; }');
addGlobalStyle('th.extraStats, th.summaryStats { border-color: #DDDDDD #AAAAAA #AAAAAA #DDDDDD; font-weight: none; font-size: 0.9em; line-height: 1.3em; height: 50px; }');
addGlobalStyle('td.extraStats, td.summaryStats { opacity: ' + opacity + '; border-color: #aaaaaa; font-weight: bold; height: 22px; }');
addGlobalStyle('.extraStats, .summaryStats { opacity: ' + opacity + '; border-style: solid; border-width: 1px; text-align: center; vertical-align: middle; padding: 2px; }');


var url = new String(window.location);
var gameId = url.substring(url.lastIndexOf('/')+1);
if (gameId.indexOf('#') != -1) gameId = gameId.substring(0, gameId.indexOf('#'));
getGameInfo(gameId);

//------------------------------------
// functions
//------------------------------------

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function expandStats() {
	for (var i = 0; i < hiddenStats.length; i++) {
		hiddenStats[i].style.display = "";
	}
	//document.getElementById('newStatsTable').style.width = "";
	document.getElementById('expandStatsLink').style.display = "none";
	document.getElementById('hideStatsLink').style.display = "";
}

function hideStats() {
	for (var i = 0; i < hiddenStats.length; i++) {
		hiddenStats[i].style.display = "none";
	}
	//document.getElementById('newStatsTable').style.width = width;
	document.getElementById('expandStatsLink').style.display = "";
	document.getElementById('hideStatsLink').style.display = "none";
}

function getGameInfo(gameId) {
	GM_xmlhttpRequest({
		method: 'POST',
		url: weewarUrl + '/client/gamestate/',		
		data: "<weewar game='" + gameId + "'/>",
		onload: parseGameXml
	});
}

function parseGameXml(responseDetails) {
	var parser = new DOMParser();
	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	var factions = dom.getElementsByTagName("faction");
	for (var i = 0; i < factions.length; i++) {
		arrUnits[i] = parseFactionXml(factions[i]);
	}
	
	buildTable();
}

function parseFactionXml(factionXml) {
	var factionArray = new Array();
	// init unit counts
	for (jj = 0; jj < 35; jj++) {
		factionArray[jj] = 0;
	}
	var units = factionXml.getElementsByTagName("unit");
	for (var i = 0; i < units.length; i++) {
		var index = parseInt(getUnitIndex(units[i].getAttribute("type")));
		var unitStrength = units[i].getAttribute("quantity");
		
		factionArray[0]++; // count all things
		if (units[i].getAttribute("capturing")) {
			factionArray[26]++; // count capturing
		} else {
			factionArray[index]++; // count for this unit type
			factionArray[31]++; // count for all units
		}
		// army strength
		factionArray[32] = factionArray[32] + (unitStrength * arrUnitInfo[index][2]);
		// army potential
		factionArray[33] = factionArray[33] + (10 * arrUnitInfo[index][2]);
	}
	
	// calculate health
	if (factionArray[33] > 0)
		factionArray[34] = factionArray[32] / factionArray[33] * 100;

	var terrains = factionXml.getElementsByTagName("terrain");
	for (var i = 0; i < terrains.length; i++) {
		var index = parseInt(getTerrainIndex(terrains[i].getAttribute("type")));
		factionArray[0]++; // count all things
		factionArray[index]++; // count for this terrain type
	}
	
	return factionArray;
}

function getUnitIndex(type) {
	for (var i = 0; i < 20; i++) {
		if (type == arrUnitInfo[i][0]) {
			return i;
		}
	}
	alert("Unit type not found: " + type);
}

function getTerrainIndex(type) {
	for (var i = 27; i < 30; i++) {
		if (type == arrUnitInfo[i][0]) {
			return i;
		}
	}
	alert("Terrain type not found: " + type);
}

function buildTable() {
	var jj, kk;

	// init display rows for armies & total the playable units for each army
	var playerRows = new Array();
	var numRows = 1;
	for (kk = 0; kk < 6; kk++) {
		// count active armies for the Rowspan to show "STATS"
		if (arrUnits[kk][0] > 0) { numRows++; }
		
		// cut the unit strength down
		arrUnits[kk][32] = arrUnits[kk][32] / 10;
		arrUnits[kk][33] = arrUnits[kk][33] / 10;
	}
	
	// register these functions
	//unsafeWindow.expandStats = expandStats;
	//unsafeWindow.hideStats = hideStats;

	var table = document.createElement("table");
	table.setAttribute("id", "newStatsTable");
	
	var headerRow = document.createElement("tr");
	
	// append the stats expand/hide link to the beginning
	var statsCell = document.createElement("td");
	statsCell.setAttribute("id", "statsCell");
	statsCell.setAttribute("rowspan", numRows);
	
	var expandLink = document.createElement("a");
	expandLink.setAttribute("id", "expandStatsLink");
	expandLink.setAttribute("href", "#");
	expandLink.setAttribute("class", "statsToggleExpand");
	expandLink.addEventListener('click', expandStats);
	expandLink.innerHTML = expandStatsText;	
	statsCell.appendChild(expandLink);
	
	var hideLink = document.createElement("a");
	hideLink.setAttribute("id", "hideStatsLink");
	hideLink.setAttribute("href", "#");
	hideLink.setAttribute("class", "statsToggleExpand");
	hideLink.setAttribute("style", "display: none;");
	hideLink.addEventListener('click', hideStats);
	hideLink.innerHTML = collapseStatsText;	
	statsCell.appendChild(hideLink);
	
	// 50 for header, 22 for each player, 2 for table border width
	statsCell.style.height = (50 + 22*(numRows-1) + 1*(numRows-1)) + "px";
	headerRow.appendChild(statsCell);
	
	for (kk = 0; kk < 6; kk++) {
		playerRows[kk] = document.createElement("tr");
	}

	// scan by columns and add to header and player rows
	for (jj = 1; jj < 35; jj++) {
		var unitCount = 0;
		for (kk = 0; kk < 6; kk++) {
			unitCount = unitCount + arrUnits[kk][jj];
		}

		// if there are any units or bases of this type, add this column to the table
		if (unitCount > 0) { 
			// unit headers
			var headerInner;
			if (jj < 31)
				headerInner = "<a href='" + strWikiBase + arrUnitInfo[jj][1] + "'><img src='/images/red_" + arrUnitInfo[jj][3] + "'/></a>";
			else if (jj == 31) { headerInner = "Total<br/>Units" }   
			else if (jj == 32) { headerInner = "Army<br/>Strength" }   
			else if (jj == 33) { headerInner = "Army<br/>Potential" }   
			else if (jj == 34) { headerInner = "Health (%)" }
			else { headerInner = "???" }

			// encapsulate in th
			var headerCell = createCell("th", "#eee", jj, headerInner);
			headerRow.appendChild(headerCell);
			
			// unit counts
			for (kk = 0; kk < 6; kk++) {
				// if this army has any units or bases, add data (rounded) to the row
				if (arrUnits[kk][0] > 0) {
					var newCell = createCell("td", sColors[kk], jj, arrUnits[kk][jj].toFixed(0));
					playerRows[kk].appendChild(newCell);
				}
			}  // for kk
		} // if unitCount > 0
	} // for jj

	table.appendChild(headerRow);
	for (kk = 0; kk < 6; kk++) {
		if (playerRows[kk].childNodes.length > 0)
			table.appendChild(playerRows[kk]);
	}
	
	insertTableIntoPage(table);
}

function insertTableIntoPage(table) {
	// display the stats table to the left of the flash object
	var wrapDiv = document.getElementById('wrap');
	var playingFieldFlashDiv = document.getElementById('playing_field_flash');
	if (wrapDiv) {
		wrapDiv.style.width = "99%";
		wrapDiv.style.marginLeft = "auto";
		wrapDiv.style.marginRight = "auto";
		
		playingFieldFlashDiv.style.width = "84%";
		playingFieldFlashDiv.style.marginLeft = "1%"; //"10px";
		playingFieldFlashDiv.style.marginRight = "0px";
		
		var newStatsDiv = document.createElement("div");
		newStatsDiv.setAttribute("id", "newStats");
		newStatsDiv.appendChild(table);
		
		// wait a second for team chat to load if it is there
		setTimeout(function () {wrapDiv.insertBefore(newStatsDiv, wrapDiv.firstChild); 
		
		var greaseDiv = document.getElementById('greasemonkeyScripts');
		if (!greaseDiv) {
			greaseDiv = document.createElement("div");
			greaseDiv.setAttribute("id", "greasemonkeyScripts");
			greaseDiv.style.width = "15%";
			greaseDiv.style.cssFloat = "left";
			wrapDiv.insertBefore(greaseDiv, wrapDiv.firstChild);
		}
		
		// make stats first
		greaseDiv.insertBefore(newStatsDiv, greaseDiv.firstChild);
		
		// work with team chat
		var chatContainerDiv = document.getElementById('chatcontainer');
		if (chatContainerDiv) {
			chatContainerDiv.style.width = "";
			chatContainerDiv.style.cssFloat = "";
			greaseDiv.appendChild(chatContainerDiv);
			addGlobalStyle('#chat.large ul, #chat.wide ul { height: 20em; }');
		}
		
		},1000);
	}
	
	hiddenStats = getElementsByClassName(newStatsDiv, "*", "extraStats");
}

function createCell(type, bgColor, jj, innerHTML) {
	var newCell = document.createElement(type);
	newCell.style.backgroundColor = bgColor;
	//if (jj < 26)
	// only disp base count, army strength
	if (jj != 27 && jj != 31 && jj != 32) { 
		newCell.style.display = 'none';
		newCell.setAttribute("class", "extraStats");
	} else {
		newCell.setAttribute("class", "summaryStats");
	}
	newCell.innerHTML = innerHTML;
	return newCell;
}

function getElementsByClassName(oElm, strTagName, strClassName) {
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++) {
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)) {
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}