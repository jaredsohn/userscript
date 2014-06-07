// ==UserScript==
// @name           OFM - Vereinsseite - Nationensammler Info-Panel
// @namespace      RapTor-X
// @description    Adds an additional element to the team page, if the manager is collecting players of one nation.
// @include        http://www.onlinefussballmanager.de/*php*
// @version        1.0.2
// @license        MIT
// @copyright      2012-2013 RapTor-X
// @date           2013-04-04
// @grant          none
// ==/UserScript==

/*
Version History

0.0.1	- shows Nationensammler InfoPanel with fixed values

0.0.5	- shows Nationensammler InfoPanel only if the team is collecting players of one nation
		- recognizes the correct nation
		- counts players of collected nation
		- gets nations name out of tooltip
		
0.0.6   - fills all player arrays to calculate strength of specific spot
        - atm strength is sum of all players and not the 11 best
		
0.1		- calculates Strength for different squads
		- has still some bugs
		- switched Friendlystaerke and FunCupstaerke in View
		
0.1.1	- fixed bug, if only less than 11 players are eligible to play

0.1.2	- fixed weltpokal bug with wpOffset

0.1.3	- fixed wrong nationName bug by moving recognition to fillSquadArrays

0.2.0	- new calculateStrength function replaces the old one and should work correct now
		- no known bugs atm
		
0.2.1	- fixed bug by resetting reserves arrays 
		- fixed bug: sum up strength on empty reserves
		- fixed bug: another Weltpokal bug

0.5.0	- added more source code comments
		- fixed variable naming to consistent language
		
0.6.0	- fixed some umlaut issues
		- now works with Google Chrome + Tampermonkey and Opera

0.7.0	- optimized runtime by avoiding recalculation of same squad

0.8.0	- added Feature: legionnaires in squads will be recognized and displayed with a warning
		- InfoPanel Generation refactored
		- Changed Background Color of InfoPanel

0.8.1	- bugfix icon2

0.9.0	- adapted to change of Vereinsseite layout 

1.0.0	- added row for maximum strength in OCs (Schinkensystem)
		- added horizontal lines

1.0.1	- optimized code

1.0.2	- changes include parameter to http://www.onlinefussballmanager.de/*php* to support separate UserScript for DE2-Server

*/

var flagUrl = "none";
var playerCount = 0;
var nationName = "Nation";
var allPlayersArray = new Array();
var fcPlayersArray = new Array();
var friendlyPlayersArray = new Array();
var maxStrength = 0;
var friendlyStrength = 0;
var funcupStrength = 0;
var wpOffset = 0;
var legionaerStatusFr = 0;
var legionaerStatusFc = 0;

var injuredImage = "http://www.onlinefussballmanager.de/bilder/kreuz.gif";
var suspendedImage1 = "http://www.onlinefussballmanager.de/bilder/rot1.gif";
var suspendedImage2 = "http://www.onlinefussballmanager.de/bilder/rot2.gif";
var suspendedImage3 = "http://www.onlinefussballmanager.de/bilder/rot3.gif";
var suspendedImage4 = "http://www.onlinefussballmanager.de/bilder/rot4.gif";
var suspendedImage5 = "http://www.onlinefussballmanager.de/bilder/rot5.gif";
var friendlyActive = "http://www.onlinefussballmanager.de/db/images/ingame/aufgestellt_friendly2.png";
var funcupActive = "http://www.onlinefussballmanager.de/db/images/ingame/aufgestellt_funcup2.png"
var substitute =  "http://www.onlinefussballmanager.de/db/images/ingame/aufgestellt_reserve2.png"

var TW = 0;
var LIB = 1;
var LV = 2;
var LMD = 3;
var RMD = 4;
var RV = 5;
var VS = 6;
var LM = 7;
var DM = 8;
var ZM = 9;
var RM = 10;
var LS = 11;
var MS = 12;
var RS = 13;

var reserves433 = new Array();
var reserves442 = new Array();
var reserves343 = new Array();
var reserves451 = new Array();
var reserves532lib = new Array();
var reserves541 = new Array();
var reserves352 = new Array();
var reserves532vs = new Array();

var formation433 =    new Array(TW,  LV,  LMD, RMD, RV,  LM,  ZM,  RM,  LS,  MS,  RS);
var formation442 =    new Array(TW,  LV,  LMD, RMD, RV,  LM,  DM,  ZM,  RM,  LS,  RS);
var formation343 =    new Array(TW,  LIB, LMD, RMD, LM,  DM,  ZM,  RM,  LS,  MS,  RS);
var formation451 =    new Array(TW,  LV,  LMD, RMD, RV,  VS,  LM,  DM,  ZM,  RM,  MS);
var formation532lib = new Array(TW,  LIB, LV,  LMD, RMD, RV,  LM,  ZM,  RM,  LS,  RS);
var formation541 =    new Array(TW,  LIB, LV,  LMD, RMD, RV,  LM,  DM,  ZM,  RM,  MS);
var formation352 =    new Array(TW,  LIB, LMD, RMD, VS,  LM,  DM,  ZM,  RM,  LS,  RS);
var formation532vs =  new Array(TW,  LV,  LMD, RMD, RV,  VS,  LM,  ZM,  RM,  LS,  RS);

// 4-3-3 	TW 		LV 	LMD RMD RV 		LM 		ZM 	RM 	LS 	MS 	RS
// 4-4-2 	TW 		LV 	LMD RMD RV 		LM 	DM 	ZM 	RM 	LS 		RS
// 3-4-3 	TW 	LIB 	LMD RMD 		LM 	DM 	ZM 	RM 	LS 	MS 	RS
// 4-5-1 	TW 		LV 	LMD RMD RV 	VS 	LM 	DM 	ZM 	RM 		MS 	
// 5-3-2  	TW 	LIB LV 	LMD RMD RV 		LM 		ZM 	RM 	LS 		RS
// 5-4-1  	TW 	LIB LV 	LMD RMD RV 		LM 	DM 	ZM 	RM 		MS 	
// 3-5-2 	TW 	LIB 	LMD RMD 	VS 	LM 	DM 	ZM 	RM 	LS 		RS
// 5-3-2  	TW 		LV 	LMD RMD RV 	VS 	LM 		ZM 	RM 	LS 		RS



// counts all players of collected nation
function countPlayers (table) {
	var total = table.getElementsByTagName("tr").length;
	flagarray = new Array();
	for (var i=1;i<total;i++){
		flagarray[i-1] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[7+wpOffset].lastChild.getAttribute("src");
		// get all flags
	}
	flagarray.sort();
	for (var j=0;j<flagarray.length-10;j++){
		if (flagarray[j] == flagarray[j+10]){
		// more than 11 players from the same nation
			flagUrl = flagarray[j];
			//alert(flagUrl);
			break;
		}
	}
	for (j=0;j<flagarray.length;j++){
		if (flagarray[j] == flagUrl){
			playerCount++;
		}
	}
}

//pushes player to all reserves arrays
function pushToReserves(strength){
	reserves433.push(strength);
	reserves442.push(strength);
	reserves343.push(strength);
	reserves451.push(strength);
	reserves532lib.push(strength);
	reserves541.push(strength);
	reserves352.push(strength);
	reserves532vs.push(strength);
}


//sorts all reserves arrays descending
function sortReserves(){
	reserves433.sort().reverse();
	reserves442.sort().reverse();
	reserves343.sort().reverse();
	reserves451.sort().reverse();
	reserves532lib.sort().reverse();
	reserves541.sort().reverse();
	reserves352.sort().reverse();
	reserves532vs.sort().reverse();
}

//only used, if all reserves arrays contain the same players (have same length...)
function getBestReserve(){
	if(reserves433.length>0){
		reserves433.shift();
		reserves442.shift();
		reserves343.shift();
		reserves451.shift();
		reserves532lib.shift();
		reserves541.shift();
		reserves352.shift();
		return reserves532vs.shift();
	}
	return 0;
}


// calculates Strength of given playersArray
function calculateStrength (playersArray){
	var strength = 0;
	reserves433 = new Array();
	reserves442 = new Array();
	reserves343 = new Array();
	reserves451 = new Array();
	reserves532lib = new Array();
	reserves541 = new Array();
	reserves352 = new Array();
	reserves532vs = new Array();
	var squad = new Array(0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0);
	// step 1: fill all positions with the best player and move other players of the same position to all reserves arrays
	for (var i=0; i<playersArray.length; i++){
		switch (playersArray[i][0]) {
			case "TW":
				if (squad[TW]==0){
					squad[TW] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[TW]){
					pushToReserves(squad[TW]/2);
					squad[TW] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;
			case "LIB":
				if (squad[LIB]==0){
					squad[LIB] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[LIB]){
					pushToReserves(squad[LIB]/2);
					squad[LIB] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;
			case "LV":
				if (squad[LV]==0){
					squad[LV] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[LV]){
					pushToReserves(squad[LV]/2);
					squad[LV] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;	
			case "LMD":
				if (squad[LMD]==0){
					squad[LMD] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[LMD]){
					pushToReserves(squad[LMD]/2);
					squad[LMD] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;
			case "RMD":
				if (squad[RMD]==0){
					squad[RMD] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[RMD]){
					pushToReserves(squad[RMD]/2);
					squad[RMD] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;	
			case "RV":
				if (squad[RV]==0){
					squad[RV] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[RV]){
					pushToReserves(squad[RV]/2);
					squad[RV] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;
			case "VS":
				if (squad[VS]==0){
					squad[VS] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[VS]){
					pushToReserves(squad[VS]/2);
					squad[VS] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;
			case "LM":
				if (squad[LM]==0){
					squad[LM] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[LM]){
					pushToReserves(squad[LM]/2);
					squad[LM] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;	
			case "DM":
				if (squad[DM]==0){
					squad[DM] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[DM]){
					pushToReserves(squad[DM]/2);
					squad[DM] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;	
			case "ZM":
				if (squad[ZM]==0){
					squad[ZM] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[ZM]){
					pushToReserves(squad[ZM]/2);
					squad[ZM] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;	
			case "RM":
				if (squad[RM]==0){
					squad[RM] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[RM]){
					pushToReserves(squad[RM]/2);
					squad[RM] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;	
			case "LS":
				if (squad[LS]==0){
					squad[LS] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[LS]){
					pushToReserves(squad[LS]/2);
					squad[LS] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;	
			case "MS":
				if (squad[MS]==0){
					squad[MS] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[MS]){
					pushToReserves(squad[MS]/2);
					squad[MS] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;	
			case "RS":
				if (squad[RS]==0){
					squad[RS] = parseFloat(playersArray[i][1]);
				}
				else if (parseFloat(playersArray[i][1]) > squad[RS]){
					pushToReserves(squad[RS]/2);
					squad[RS] = parseFloat(playersArray[i][1]);
				}
				else{
					pushToReserves(parseFloat(playersArray[i][1])/2);
				}
				break;	
			default:
				alert("bad position error");
		}
	}
	sortReserves();
	//sort reserves so that the best is first

	// step 2: the following positions are always needed, so they can be filled if empty with the best reserves
	if(squad[TW]==0 && reserves433.length > 0){
		squad[TW] = getBestReserve();
	}
	if(squad[LMD]==0 && reserves433.length > 0){
		squad[LMD] = getBestReserve();
	}
	if(squad[RMD]==0 && reserves433.length > 0){
		squad[RMD] = getBestReserve();
	}
	if(squad[LM]==0 && reserves433.length > 0){
		squad[LM] = getBestReserve();
	}
	if(squad[ZM]==0 && reserves433.length > 0){
		squad[ZM] = getBestReserve();
	}
	if(squad[RM]==0 && reserves433.length > 0){
		squad[RM] = getBestReserve();
	}
	
	// now we start differentiating different formations...
	var strength433 = 0;
	var strength442 = 0;
	var strength343 = 0;
	var strength451 = 0;
	var strength532lib = 0;
	var strength541 = 0;
	var strength352 = 0;
	var strength532vs = 0;
	var squad433 = new Array();
	var squad442 = new Array();
	var squad343 = new Array();
	var squad451 = new Array();
	var squad532lib = new Array();
	var squad541 = new Array();
	var squad352 = new Array();
	var squad532vs = new Array();
	
	//step 3: if player of position X is present, but not needed in the formation, he can be moved to reserves of the other formations
	if(squad[LIB]!=0){
		reserves433.push(squad[LIB]/2);
		reserves442.push(squad[LIB]/2);
		reserves451.push(squad[LIB]/2);
		reserves532vs.push(squad[LIB]/2);
	}
	if(squad[LV]!=0){
		reserves343.push(squad[LV]/2);
		reserves352.push(squad[LV]/2);
	}
	if(squad[RV]!=0){
		reserves343.push(squad[RV]/2);
		reserves352.push(squad[RV]/2);
	}
	if(squad[VS]!=0){
		reserves433.push(squad[VS]/2);
		reserves442.push(squad[VS]/2);
		reserves343.push(squad[VS]/2);
		reserves532lib.push(squad[VS]/2);
		reserves541.push(squad[VS]/2);
	}
	if(squad[DM]!=0){
		reserves433.push(squad[DM]/2);
		reserves532lib.push(squad[DM]/2);
		reserves532vs.push(squad[DM]/2);
	}
	if(squad[LS]!=0){
		reserves451.push(squad[LS]/2);
		reserves541.push(squad[LS]/2);
	}
	if(squad[MS]!=0){
		reserves442.push(squad[MS]/2);
		reserves532lib.push(squad[MS]/2);
		reserves352.push(squad[MS]/2);
		reserves532vs.push(squad[MS]/2);
	}
	if(squad[RS]!=0){
		reserves451.push(squad[RS]/2);
		reserves541.push(squad[RS]/2);
	}
	sortReserves();
	//again sort the reserves to get the best in first position
	
	//step 4: fill the different formation squads with the players of the total squad array
	//the formation arrays contain the indices needed for that formation - see global variables above
	var i;
	for (i=0; i<11; i++){
		squad433.push(squad[formation433[i]]);
		squad442.push(squad[formation442[i]]);
		squad343.push(squad[formation343[i]]);
		squad451.push(squad[formation451[i]]);
		squad532lib.push(squad[formation532lib[i]]);
		squad541.push(squad[formation541[i]]);
		squad352.push(squad[formation352[i]]);
		squad532vs.push(squad[formation532vs[i]]);
	}
	squad433.sort();
	squad442.sort();
	squad343.sort();
	squad451.sort();
	squad532lib.sort();
	squad541.sort();
	squad352.sort();
	squad532vs.sort();
	//sort the formations so the weakest players are first
	
	//step 5: check all positions if there is a reserve available who is better and than switch the players
	// here the strength of each formation is also calculated
	var sub;
	for (i=0; i<11; i++){
		if (reserves433.length>0){
			sub = reserves433[0];
			if(squad433[i]==0){
				squad433[i] = reserves433.shift();
				strength433 = strength433 + squad433[i];
			}
			else if (squad433[i] < sub) {
				reserves433.push(squad433[i]/2);
				reserves433.sort().reverse();
				squad433[i] = reserves433.shift();
				strength433 = strength433 + squad433[i];
			}
			else {
				strength433 = strength433 + squad433[i];
			}
		}
		else{
			strength433 = strength433 + squad433[i];
		}
		if (reserves442.length>0){
			sub = reserves442[0];
			if(squad442[i]==0){
				squad442[i] = reserves442.shift();
				strength442 = strength442 + squad442[i];
			}
			else if (squad442[i] < sub) {
				reserves442.push(squad442[i]/2);
				reserves442.sort().reverse();
				squad442[i] = reserves442.shift();
				strength442 = strength442 + squad442[i];
			}
			else {
				strength442 = strength442 + squad442[i];
			}
		}
		else{
			strength442 = strength442 + squad442[i];
		}
		if (reserves343.length>0){
			sub = reserves343[0];
			if(squad343[i]==0){
				squad343[i] = reserves343.shift();
				strength343 = strength343 + squad343[i];
			}
			else if (squad343[i] < sub) {
				reserves343.push(squad343[i]/2);
				reserves343.sort().reverse();
				squad343[i] = reserves343.shift();
				strength343 = strength343 + squad343[i];
			}
			else {
				strength343 = strength343 + squad343[i];
			}
		}
		else{
			strength343 = strength343 + squad343[i];
		}
		if (reserves451.length>0){
			sub = reserves451[0];
			if(squad451[i]==0){
				squad451[i] = reserves451.shift();
				strength451 = strength451 + squad451[i];
			}
			else if (squad451[i] < sub) {
				reserves451.push(squad451[i]/2);
				reserves451.sort().reverse();
				squad451[i] = reserves451.shift();
				strength451 = strength451 + squad451[i];
			}
			else {
				strength451 = strength451 + squad451[i];
			}
		}
		else{
			strength451 = strength451 + squad451[i];
		}
		if (reserves532lib.length>0){
			sub = reserves532lib[0];
			if(squad532lib[i]==0){
				squad532lib[i] = reserves532lib.shift();
				strength532lib = strength532lib + squad532lib[i];
			}
			else if (squad532lib[i] < sub) {
				reserves532lib.push(squad532lib[i]/2);
				reserves532lib.sort().reverse();
				squad532lib[i] = reserves532lib.shift();
				strength532lib = strength532lib + squad532lib[i];
			}
			else {
				strength532lib = strength532lib + squad532lib[i];
			}
		}
		else{
			strength532lib = strength532lib + squad532lib[i];
		}
		if (reserves541.length>0){
			sub = reserves541[0];
			if(squad541[i]==0){
				squad541[i] = reserves541.shift();
				strength541 = strength541 + squad541[i];
			}
			else if (squad541[i] < sub) {
				reserves541.push(squad541[i]/2);
				reserves541.sort().reverse();
				squad541[i] = reserves541.shift();
				strength541 = strength541 + squad541[i];
			}
			else {
				strength541 = strength541 + squad541[i];
			}
		}
		else{
			strength541 = strength541 + squad541[i];
		}
		if (reserves352.length>0){
			sub = reserves352[0];
			if(squad352[i]==0){
				squad352[i] = reserves352.shift();
				strength352 = strength352 + squad352[i];
			}
			else if (squad352[i] < sub) {
				reserves352.push(squad352[i]/2);
				reserves352.sort().reverse();
				squad352[i] = reserves352.shift();
				strength352 = strength352 + squad352[i];
			}
			else {
				strength352 = strength352 + squad352[i];
			}
		}
		else{
			strength352 = strength352 + squad352[i];
		}
		if (reserves532vs.length>0){
			sub = reserves532vs[0];
			if(squad532vs[i]==0){
				squad532vs[i] = reserves532vs.shift();
				strength532vs = strength532vs + squad532vs[i];
			}
			else if (squad532vs[i] < sub) {
				reserves532vs.push(squad532vs[i]/2);
				reserves532vs.sort().reverse();
				squad532vs[i] = reserves532vs.shift();
				strength532vs = strength532vs + squad532vs[i];
			}
			else {
				strength532vs = strength532vs + squad532vs[i];
			}
		}
		else{
			strength532vs = strength532vs + squad532vs[i];
		}
	}
	//uncomment for debugging and get a popup with best strength for each formation
	//alert("433: " + strength433 + "\n442: " + strength442 + "\n343: " + strength343 + "\n451: " + strength451 + "\n532lib: " + strength532lib + "\n541: " + strength541 + "\n352: " + strength352 + "\n532vs: " + strength532vs);
	
	// step 6: return the maximum value of all formations
	return Math.max(strength433, strength442, strength343, strength451, strength532lib, strength541, strength352, strength532vs);
}

// parses through all players and fills the squads for all/friendly/funcup with position and strength
function fillSquadArrays(table){
	var total = table.getElementsByTagName("tr").length;
	var fcount = 0; //friendly squad player count
	var fccount = 0; //funcup squad player count
	var allcount = 0; // all player count
	for (var i=1; i<total; i++){
		//only players of collected nation
		if(table.getElementsByTagName("tr")[i].getElementsByTagName("td")[7+wpOffset].lastChild.getAttribute("src") == flagUrl){
			if(nationName == "Nation"){
				//acquire nationName out of popup of flag
				var popupString = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[7+wpOffset].lastChild.getAttribute("onmouseover");
				var startPos = popupString.indexOf("<b>");
				var endPos = popupString.indexOf("</b>");
				nationName = popupString.substring(startPos+3, endPos-18);
				//name is between a <b> tag
			}
			allPlayersArray[allcount] = new Array(2);
			presenticonf = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("img")[0];
			//is friedlyicon present?
			presenticonfc = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[3+wpOffset].getElementsByTagName("img")[0];
			//is funcupicon present?
			allPlayersArray[allcount][0] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[4+wpOffset].firstChild.data; //position
			allPlayersArray[allcount][1] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[8+wpOffset].getElementsByTagName("b")[0].firstChild.data; //strength
			allcount++;
			if(presenticonf != null){
				var icon = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("img")[0].src;
				if (icon != injuredImage && icon != suspendedImage1 && icon != suspendedImage2 && icon != suspendedImage3 && icon != suspendedImage4 && icon != suspendedImage5){
					//put only into friendly squad if the player is not injured or is not eligible to play
					friendlyPlayersArray[fcount] = new Array(2);
					friendlyPlayersArray[fcount][0] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[4+wpOffset].firstChild.data; //position
					friendlyPlayersArray[fcount][1] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[8+wpOffset].getElementsByTagName("b")[0].firstChild.data; //strength
					fcount++;
				}
			}
			else{
				//if no icon is present the player is eligible to play
				friendlyPlayersArray[fcount] = new Array(2);
				friendlyPlayersArray[fcount][0] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[4+wpOffset].firstChild.data; //position
				friendlyPlayersArray[fcount][1] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[8+wpOffset].getElementsByTagName("b")[0].firstChild.data; //strength
				fcount++;
			}
			if(presenticonfc != null){
				var icon2 = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[3+wpOffset].getElementsByTagName("img")[0].src;
				if (icon2 != injuredImage && icon2 != suspendedImage1 && icon2 != suspendedImage2 && icon2 != suspendedImage3 && icon2 != suspendedImage4 && icon2 != suspendedImage5){
					//put only into funcup squad if the player is not injured or is not eligible to play
					fcPlayersArray[fccount] = new Array(2);
					fcPlayersArray[fccount][0] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[4+wpOffset].firstChild.data; //position
					fcPlayersArray[fccount][1] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[8+wpOffset].getElementsByTagName("b")[0].firstChild.data; //strength
					fccount++;
				}
			}
			else{
				//if no icon is present the player is eligible to play
				fcPlayersArray[fccount] = new Array(2);
				fcPlayersArray[fccount][0] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[4+wpOffset].firstChild.data; //position
				fcPlayersArray[fccount][1] = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[8+wpOffset].getElementsByTagName("b")[0].firstChild.data; //strength
				fccount++;
			}
		}
		else{
		//here we find legionaers
			presenticonf = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("img")[0];
			//is friedlyicon present?
			presenticonfc = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[3+wpOffset].getElementsByTagName("img")[0];
			//is funcupicon present?
			if(presenticonf != null){
				var icon = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("img")[0].src;
				if (icon == friendlyActive){
					//legionaer is in the starting friendly squad
					legionaerStatusFr = 2;
				}
				else if(icon == substitute && legionaerStatusFr==0){
					//legionaer is on the bench (friendly)
					legionaerStatusFr = 1;
				}
			}
			if(presenticonfc != null){
				var icon2 = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[3+wpOffset].getElementsByTagName("img")[0].src;
				if (icon2 == funcupActive){
					//legionaer is in the starting funcup squad
					legionaerStatusFc = 2;
				}
				else if(icon2 == substitute && legionaerStatusFc==0){
					//legionaer is on the bench (funcup)
					legionaerStatusFc = 1;
				}
			}
		}
	}
}

function getOCRow (strength){
	return "<tr><td><font color=white><b>Gegnerst&aumlrke (OC)</b></font></td><td><font color=white><b>\<="+strength+"</b></font></td></tr>";
}

// only active on the kader page
if (location.pathname == "/vereinsseite/kader/vereinsseite_kader.php") {
	var teamname = document.getElementsByTagName("p")[0].firstChild.data.substring(10);
	var origelem = document.getElementsByTagName("p")[0];
	var teamtable = document.getElementsByTagName("tbody")[2];
	if (teamtable.getElementsByTagName("tr")[0].getElementsByTagName("td")[3].getElementsByTagName("a")[0].firstChild.data == "Wp"){
		// Weltpokal offset
		wpOffset = 1;
	}
	countPlayers(teamtable);
	if(flagUrl != "none"){
	// only if the team is a collector of nations
		fillSquadArrays(teamtable);
		maxStrength = calculateStrength(allPlayersArray);
		//if squads are of equal length, the strength don't need to recalculated
		if(allPlayersArray.length == friendlyPlayersArray.length){
			friendlyStrength = maxStrength;
		}
		else{
			friendlyStrength = calculateStrength(friendlyPlayersArray);
		}
		if(allPlayersArray.length == fcPlayersArray.length){
			funcupStrength = maxStrength;
		}
		else{
			funcupStrength = calculateStrength(fcPlayersArray);
		}
		//generate the infoPanel
		var infoPanel = document.createElement("span");
		var origtext = document.createTextNode(origelem.firstChild.data);
		var collectorTextStart = document.createTextNode("  (Nationensammler von  ");
		var collectorTextEnd = document.createTextNode(")");
		var flagimg = document.createElement("img");
		var rowFriendly = "";
		var rowOC = "";
		var rowFuncup = "";
		var rowHLine = "<tr><td colspan=2	><hr></td></tr>"
		switch (legionaerStatusFr) {
			case 1: rowFriendly = "<tr><td><font color=white><b>Friendlyst&aumlrke</b></font></td><td><font color=LightSkyBlue><b>"+friendlyStrength+" | Legion&aumlr!</b></font></td></tr>"; break;
			case 2: rowFriendly = "<tr><td><font color=white><b>Friendlyst&aumlrke</b></font></td><td><font color=Yellow><b>"+friendlyStrength+" | Legion&aumlr!</b></font></td></tr>"; break;
			default: rowFriendly = "<tr><td><font color=white><b>Friendlyst&aumlrke</b></font></td><td><font color=white><b>"+friendlyStrength+"</b></font></td></tr>";
			
		}
		if (maxStrength < 100) {
			rowOC = getOCRow(115);
		}
		else if (maxStrength >=100 && maxStrength < 111){
			rowOC = getOCRow(maxStrength+15);			
		}
		else if (maxStrength >=111 && maxStrength < 141){
			rowOC = getOCRow(maxStrength+20);
		}
		else if (maxStrength >=141 && maxStrength < 171){
			rowOC = getOCRow(maxStrength+25);
		}
		else {
			rowOC = getOCRow(maxStrength+30);		
		}
		switch (legionaerStatusFc) {
			case 1: rowFuncup = "<tr><td><font color=white><b>FunCupst&aumlrke</b></font></td><td><font color=LightSkyBlue><b>"+funcupStrength+" | Legion&aumlr!</b></font></td></tr>"; break;
			case 2: rowFuncup = "<tr><td><font color=white><b>FunCupst&aumlrke</b></font></td><td><font color=yellow><b>"+funcupStrength+" | Legion&aumlr!</b></font></td></tr>"; break;
			default: rowFuncup = "<tr><td><font color=white><b>FunCupst&aumlrke</b></font></td><td><font color=white><b>"+funcupStrength+"</b></font></td></tr>";
		}
		flagimg.src=flagUrl;
		flagimg.height=14;
		flagimg.width=23;
		flagimg.border=0;
		var rowNation = "<tr><td height=24><img src="+ flagUrl +" border=1 align=absmiddle width=40 height=25></td><td> <font color=white><b>" + nationName + "</b></font></td></tr>";
		var rowPlayerCount = "<tr><td><font color=white><b>Nationalspieler</b></font></td><td><font color=white><b>"+playerCount+"</b></font></td></tr>";
		var rowMaxStrength = "<tr><td><font color=white><b>Maximalst&aumlrke</b></font></td><td><font color=white><b>"+maxStrength+"</b></font></td></tr>";
		//popup is defined here
		var onMouseOverAttribute = "Tip('<table cellspacing=3 cellpadding=2 border=0><colgroup><col width=130><col width=120></colgroup><tr><th colspan=2><font color=white size=4><b>Nationensammler</b></font></th></tr>"+rowNation+rowHLine+rowPlayerCount+rowMaxStrength+rowFuncup+rowFriendly+rowHLine+rowOC+"</table>',WIDTH,250,BGCOLOR,'#006000',FADEIN,200,FADEOUT,200,BORDERWIDTH,0)";
		flagimg.setAttribute("onmouseover", onMouseOverAttribute);
		infoPanel.appendChild(origtext);
		//add old text to infoPanel
		infoPanel.appendChild(collectorTextStart);
		infoPanel.appendChild(flagimg);
		infoPanel.appendChild(collectorTextEnd);
		origelem.removeChild(origelem.firstChild);
		origelem.appendChild(infoPanel);
		//remove old text and append infoPanel
	}
}
