// ==UserScript==
// @name          Infusion
// @namespace     Nexus Wars Large Map
// @author	  Piesquared
// @description  Automatically makes infusion information visible, adds button to report infusion information in text form.
// @include       http://www.nexuswar.com/*.do*
// @include	  http://nexuswar.com/*.do*
// @exclude	  http://www.nexuswar.com/*view.do*
// @exclude	  http://nexuswar.com/*view.do*
// Version: 11/01/08 @ 8:00 AM EST
// Previous version report button failed silently on uninfused squares.
// ==/UserScript==

//Hijack the "large map" button to additionally run "waitForMap" on click
map = document.getElementById("tomap-control");
map.innerHTML = map.innerHTML.replace(/<a.*?<\/a>/i,"<a id=\"largeMapHandle\" href=\"javascript:toggleFlyOut('tomap')\">Large Map</a>");
mapHandleElement = document.getElementById("largeMapHandle");
mapHandleElement.addEventListener("click", waitForMap, false);

//If map is already open, go ahead and run infuseScript right away
testString = document.getElementById("tomap").innerHTML.match(/td id="omap-[0-9]*"/);
if (testString != null) {infuseScript();}

//Wait for map to load (as evidenced by at least one td element with an ID indicating it is part of the large map) then run infuseScript
function waitForMap() {
	toMap = document.getElementById("tomap");
	isLoaded = toMap.innerHTML.match(/td id="omap-[0-9]*"/);
	if (isLoaded == null) {
		setTimeout(waitForMap, 350);
	}
	else {infuseScript();}
}

//Adds "report" button, runs infusion script
function infuseScript() {
	mapHandleElement.removeEventListener("click", waitForMap, false); //remove event listener
	if (document.getElementById("tomap").innerHTML.match(/Infusion:<\/span> [0-9]?[0-9]?[0-9]? to/) == null) {
		return;
	}
	//Add a button to report infusions
	charBox = document.getElementById("charbox");
	charBox.innerHTML = charBox.innerHTML.replace(/<form method="get" action="\/map\/disconnect.do"><button type="submit">Disconnect<\/button><\/form>/,"<form method=\"get\" action=\"/map/disconnect.do\"><button type=\"submit\">Disconnect</button></form><div id=\"reportButton\"><button type=\"submit\">Report</button></div>");
	document.getElementById("reportButton").addEventListener("click", reportInfusions, false);

	toMap = document.getElementById("tomap");
	//Infusion Script:
	toMap.innerHTML = toMap.innerHTML.replace(/(Infusion:<\/span> )([0-4]?[0-9][^0-9])(.*)<\/td>/gi,"$1$2$3<span style=\"color:#FF0000;font-size:11pt;font-weight:bold;\">$2</span></td>"); //1-49, red
	toMap.innerHTML = toMap.innerHTML.replace(/(Infusion:<\/span> )([5-9][0-9][^0-9])(.*)<\/td>/gi,"$1$2$3<span style=\"color:#FF8C00;font-size:11pt;font-weight:bold;\">$2</span></td>"); //50-99, orange
	toMap.innerHTML = toMap.innerHTML.replace(/(Infusion:<\/span> )([4][5-9][0-9]|500)(.*)<\/td>/gi,"$1$2$3<span style=\"color:#800080;font-size:11pt;font-weight:bold;\">$2</span></td>"); //450-500, purple
	toMap.innerHTML = toMap.innerHTML.replace(/(Infusion:<\/span> )([0-3][0-9][0-9]|[4][0-4][0-9])(.*)<\/td>/gi,"$1$2$3<span style=\"color:#00FF7F;font-size:11pt;font-weight:bold;\">$2</span></td>"); //100-449, green
	toMap.innerHTML = toMap.innerHTML.replace(/(Infusion:<\/span>  to )(<a.*>)(the )?(.{0,4})(.*<\/a>.*)<\/td>/gi,"$1$2$3$4$5<span style=\"color:#000000;font-size:7pt;\">$4</span></td>"); //other factions' infusions, black
	//Remove "self-image" and SH square if both are there and there are infusions present on current square
	toMap.innerHTML = toMap.innerHTML.replace(/(<img src="\/r\/i\/map\/omap\/omap-sh.gif".*?>)([^\n]*?Infusion:<\/span> [0-9]?[0-9]?[0-9] to <a.*?\/a><\/div>)<img src="\/r\/i\/map\/occ\/self-bigmap.gif".*?>/,'$2');
	//otherwise if it is there on a sqaure with infusions, replace it with a highlighted * character
	toMap.innerHTML = toMap.innerHTML.replace(/(Infusion:<\/span> [0-9]?[0-9]?[0-9] to <a.*?\/a><\/div>)<img src="\/r\/i\/map\/occ\/self-bigmap.gif".*?>/,'$1<span style=\"color:#FFFFFF;background:#000000\">*</span>');

	//To do just the original infusion script (everything the same color - bold and green) uncomment the following line and comment everything between here and "Infusion Script:".  For other color/level arrangements you're on your own.
	//toMap.innerHTML = toMap.innerHTML.replace(/(Infusion:<\/span> )([0-9]?[0-9]?[0-9])(.*)<\/td>/gi,"$1$2$3<span style=\"color:#00FF7F;font-size:11pt;font-weight:bold;\">$2</span></td>");
}

//Creates a pop-up with character information, location, and current time plus 19x19 matrix of infusion information
function reportInfusions() {

var character = getCharacter();
var charID = character.split("|")[0];
var charName = character.split("|")[1];
var charFaction = character.split("|")[2];
var charFactionID = character.split("|")[3];
var location = getLocationAll();
var plane = location[0];
var xCoord = location[1];
var yCoord = location[2];

toMap = document.getElementById("tomap");
var mapInfo = toMap.innerHTML.match(/<td id="omap-[0-9]*".*<\/td>/gi); //Every tile's HTML matches this pattern - returns an array of 361 strings, each one tile on the 19x19 Large Map
if (mapInfo == null) {
	alert("Map isn't Open");
	return null;
}
var reportString = "[";
var tempString = "";
var infusedSquares = 0;
var totalInfusion = 0;
for (i=0; i<mapInfo.length; i++) {
	var factionString = "";
	var infustionDepth = "";
	tempString = mapInfo[i].match(/Infusion:<\/span> \d* to <a.*\/a>/); //Strip out everything but the infusion information
	if (tempString == null || tempString[0] == ""){
		mapInfo[i] = "000"; //indicates uninfused squares
	}
	else{
		infusionDepth = tempString[0].replace(/Infusion:<\/span> /,"");
		infusionDepth = infusionDepth.replace(/ to <a.*\/a>/,"");
		if (infusionDepth == null || infusionDepth == "") {
			factionString = tempString[0].match(/<a.*\/a>/);
			factionString = factionString[0].replace(/<\/?a.*?>/g,""); //should result in just the faction name
			factionString = factionString.replace(/^The /,"");
			factionString = factionString.replace(/[\W]/g,"");
			while(factionString.length < 3){factionString += " ";}
			mapInfo[i] = factionString.substring(0,3); //indicates a square not infused to you.
		}
		else {
			infusedSquares++;
			totalInfusion += parseInt(infusionDepth);
			mapInfo[i] = infusionDepth;
			if (mapInfo[i].length == 1) { //Choose to format infusion depth as a 3 digit string.
				mapInfo[i] = "00" + mapInfo[i];
			}
			if (mapInfo[i].length == 2) {
				mapInfo[i] = "0" + mapInfo[i];
			}
		}
	}

	if ((i+1)%19 == 0 && i != 360) {
		reportString += mapInfo[i] + "],\n"; //new line after each 19th entry to make results semi-readable
	}
	else if (i%19 == 0) {
		reportString += "[" + mapInfo[i] + ",";
	}
	else if (i != 360) {
		reportString += mapInfo[i] + ",";
	}
	else {
		reportString += mapInfo[i] + "]]"; //double close brakets at the very end
	}
	
}
	reportString += "\nTotal infusion: " + totalInfusion + " in " + infusedSquares + " squares.";
	var x = new Date();
	var dateNow = (x.getMonth()+1) + '/' + x.getDate() + '/' + x.getFullYear();
	var timeNow = twoDigits(x.getHours()) + ':' + twoDigits(x.getMinutes()) + ':' + twoDigits(x.getSeconds());

alert(charName + "," + charID + " of " + charFaction + "," + charFactionID + " on " + dateNow + " at " + timeNow + "\nCentered at: " + xCoord + "," + yCoord + " (" + plane + ")\n" + reportString);
}

function twoDigits(num) { 
	return ( num < 10 ? '0' + num : num ); 
}

//From: Purveyor's Infusion Scout with permission
function getCharacter()
{
    // get the content of the location description
    var LocDesc = document.getElementById('charbox');
    if(LocDesc==null) return;
    var html = LocDesc.innerHTML;
    //get character ID
    var charId = html.match(/characterID=[\d]*/);
    if (charId===null)
    {
        return null;
    }
    var charName = html.match(/You are .*?<\/a>/); //The nasty list in [] is for a URL =>  You are <a href="/characters/view.do?characterID=24601">Jean Valjean</a>
    // alert(charName);
    if (charName===null)
    {
        return null;
    }
    charName = charName[0].match(/>.*?<\/a>/);
    charName = charName[0].substring(1, charName[0].length - 4);

    var factionString = html.match(/Faction:[\w\"=\/\? ><\.:]*/);   //The nasty list in [] is for a URL =>  Faction:</span> <a href="/factions/view.do?factionID=10">The Faithful</a>
    // alert("Faction name: " + factionName);
    if (factionString===null)
    {
        factionName = "";
        factionID = "0";
    }
    else
    {
		factionName = factionString[0].match(/\">[\w\. ]*<\/a/);
        factionName = factionName[0].substring(2, factionName[0].length - 3);
		factionID = factionString[0].match(/factionID=[\d]*/);
		factionID = factionID[0].substring(10);
    }
    // alert(charId[0].substring(12) + "|" +  charName + "|" + factionName);
    return charId[0].substring(12) + "|" +  charName + "|" + factionName + "|" + factionID;
}

//From: Purveyor's Infusion Scout with permission
function getLocationAll()
{
    var locationInfo = new Array();
    // get the content of the location description
    LocDesc = document.getElementById("actions");
    if(LocDesc == null)
        return;
    html = LocDesc.innerHTML;
    // Grab the string with the rest of the location info in it.
    var locString = html.match(/>[^>]* \([\d]*,[\d]*\) /);  //ex: ">Vault of Enlightenment (22,28)  (Paradise)<"
    if(locString == null)
        return;
    //get the x,y coordinates
    var xCoord = locString[0].match(/\([\d]*,/);
    xCoord = xCoord[0].substring(1,xCoord[0].length-1);
    var yCoord = locString[0].match(/,[\d]*\)/);
    yCoord = yCoord[0].substring(1,yCoord[0].length-1);

    if(html.match(/\(Paradise\)/))
    {
        plane = "Paradise";
    }
    else if(html.match(/\(Stygia\)/))
    {
        plane = "Stygia";
    }
    else if(html.match(/\(Valhalla\)/))
    {
        plane = "Valhalla";
    }
    else if(html.match(/\(Purgatorio\)/))
    {
        plane = "Purgatorio";
    }
    else if(html.match(/\(The Sewers\)/))
    {
        plane = "The Sewers";
    }
    else if(html.match(/\(Nifleheim\)/))
    {
        plane = "Nifleheim";
    }
    else if(html.match(/\(Nimbus\)/))
    {
        plane = "Nimbus";
    }
    else if(html.match(/\(Stygian Warrens\)/))
    {
        plane = "Stygian Warrens";
    }

//Modified by piesquared to remove unrequired information.
    locationInfo[0] = plane;
    locationInfo[1] = xCoord;
    locationInfo[2] = yCoord;
    return locationInfo;
}