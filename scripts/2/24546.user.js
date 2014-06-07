// ==UserScript==
// @name               AstroEmpiresExtras
// @namespace          frontwing.net
// @description           Various user interface enhancements for the Astro Empires MMOG (www.astroempires.com)
// @include            http://*.astroempires.com/*
// @include           http://corentin.jarnoux.free.fr/aecproject/*
// @exclude            http://forum.astroempires.com/*
// @exclude        *.astroempires.com/home.aspx*
// @exclude        *.astroempires.com/login.aspx*
// ==/UserScript==
/*
Copyright (C) 2008 knubile
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
For a full copy of the GNU General Public License, see <http://www.gnu.org/licenses/<.
*/

/*
<b>Info</b><br/>
Release notes, information, and feedback/request forums are available <a href="http://www.sea-of-lost-souls.net/forum/index.php?showforum=44" target="_new"> here</a>.

<p>
If you find this script helpful, show your love by <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=kareemsultan%40gmail%2ecom&item_name=AE%20Extras&amount=5%2e00&no_shipping=1&no_note=1&tax=0&currency_code=CAD&lc=CA&bn=PP%2dDonationsBF&charset=UTF%2d8">making a donation</a> using paypal, or upgrading me on AE(<a href="http://delta.astroempires.com/profile.aspx?player=56770">knubile</a>).
</p>
Enjoy!

<br/><br/><b> Feature List</b>
<br/><b>General</b>
<ul>
<li>Improves window titles for better viewing with multiple tabs;
<li>Adds Empire submenu to all pages for quick access to fleet menu, structures etc...;
<li>Adds link to the AstroEmpires Calculator Project by Guillaume Leonhart;
<li>Enhanced countdown timers show dates and times for completion of work in progress. Highlights work to be completed today;
<li>Highlight player links by guild;
<li>Named locations
<li>Displays base links next to galaxy map so both are visible simultaneously on bases page;
<li>Displays fleet links next to galaxy map so both are visible simultaneously on fleets page;
<li>Moves the galaxy links above the galaxy maps to the bottom of the page on fleets and bases pages;
</ul>
<br>
<b>Trade Enhancements</b>
<ul>
<li>Checks for and highlights duplicate trade routes on the empire trade screen;
<li>Highlights unbalanced trade routes. These are trade routes with bases that have an eco above or below your own. Thresholds are configurable;
<li>Highlights all trade route partners on all pages;
<li>Toggle visibility of bases with full trade routes. This makes it easy to copy and paste bases that need trade routes filled;
</ul>
<br>
<b>Structures Enhancements</b>
<ul>
<li>Advanced structures page colour codes structure values based on progress towards preset goals for eco,research, production bases;
</ul>
<br>
<b>Credit History Enhancements</b>
<ul>
<li>Sums credits grouped by income,production,contruction,pillage,debris and other(Courtesy of FlxGrey);
</ul>
<br>
<b>Fleet Enhancements</b>
<ul>
<li>Adds extra presets to existing 'all' and 'none' on fleet movement page;
<li>Calculate departure time base on travel duration and desired arrival time and optionally show countdown;
<li>Augments empire fleet screen with row totalling each ship;
<li>Totals attack fleet size for each fleet. The attack fleet size is the size of fighting fleet only, excluding recyclers, carriers, fleet carriers, scout ships and outpost ships;
<li>Breaks down mobile fleet by galazy on fleet screen;
<li>Makes the fleet size a direct link to the fleet movement page on the empire fleet screen;
<li>Inserts fleet summary table showing total size of fleets by guild on base pages showing fleets;
<li>Fleet summary table allows showing and hiding fleets for each guild;
<li>Attack and total fleet size added to single fleet overview page;
</ul>
<br>
<b>Attack Enhancements</b>
<ul>
<li>Adds "Open in battle calculator" link at bottom of attack screen. When clicked opens up battle calculator with all values pre-filled;
<li>Tech data for battle calculator is only updated when you visit your empire technologies page;
<li>Adds "Open in battle calculator" link at bottom of enemy fleet screen. When clicked opens up battle calculator with all values pre-filled;
</ul>
<br>
<b>Production/Construction Screen Enhancements</b>
<ul>
<li>Displays total cost and time of production in the Submit button;
<li>Fixes queues, submit button, and reset button to footer of screen so they are always visible;
<li>Clears zeros from production textboxes to help avoid accidently building too much fleet(Courtesy of FlxGrey);
<li>Enter production quantities by time (ex. 24 hours of fighters)
<li>Provides four presets just above the production table;
<li>Auto calculate number of fighters to fill hangar space for queued ships;
<li>Each preset fills the production numbers for each ship type;
<li>Preset names and value are customizable;
<ol>
<li>Set production values.
<li>Click on set button at the bottom of the page.
<li>Enter a name for the preset.
</ol>
</ul>
<br>
<b>Configuration Screen</b>
<ul>
<li>Adds an "AE Extras" link along with the other links at the top of the page;
<li>All features can be enabled or disabled;
<li>Separate config for each server;
</ul>
<br>
<br/>
<b>Note:</b> This script is untested with free accounts. <br><br>
*/
var scriptName='AstroEmpiresExtras';
var scriptId='24546';
var scriptVersion=4.1;

/*
==UpdateText==
<b>News:</b> A <a href="http://www.sea-of-lost-souls.net/forum/index.php?showforum=44" target="_new"> new forum</a> has been generously provided by ORCACommander.
<br/>Release Notes:
<font color='orange' size='4'><b>Caution: This release will reset your configuration!!!</b></font>
<br/>New Feature: Full support for multiple servers!!
<br/>Feature Enhancement: Fleet screen breaks down mobile fleet totals by galaxy;
<br/>Bug Fix:  Sum credits total in/out wasn't including some transactions;
<br/>Bug Fix:  Fleet sum bug when fleet contained Leviathans or Frigates;
<br/>Bug Fix:  Wasn't properly checking age of tech data. Reminders to keep up to date every three days now;
==/UpdateText==
*/

//random maroon highlight on trade page - caused by having to check for indexOf name instead of exact matches due to player titles prefix
//execution times hidden behind fixed queue
//improved format numbers
//sum fleets for overview as separate feature

/*
==========================================
Debug Setup
==========================================
*/
var DEBUG_KEY = "config_debug";
var LOG_LEVEL_KEY = "config_logLevel";

var LOG_LEVEL_DEBUG = 1;
var LOG_LEVEL_INFO = 2;
var LOG_LEVEL_WARN = 3;
var LOG_LEVEL_ERROR = 4;

var LOG_LEVEL = parseInt(getSetting(LOG_LEVEL_KEY,"1"));

if(!getSetting(DEBUG_KEY,true))
	LOG_LEVEL = 1;
	
if(unsafeWindow.console)
{
    console =
    {
        log : function (text) {
			if( LOG_LEVEL == 1 ) unsafeWindow.console.log( text );
        }
        ,
        info : function (text) {
            if( LOG_LEVEL <= 2 ) unsafeWindow.console.info( text );
        }
        ,
        warn : function (text) {
            if( LOG_LEVEL <= 3 ) unsafeWindow.console.warn( text );
        }
        ,
        error : function (text) {
            if( LOG_LEVEL <= 4 ) unsafeWindow.console.error( text );
        }
    }
}

console.log("Log level: "+LOG_LEVEL);


/*
==========================================
-----Production Preset Definitions--------
==========================================
*/
//NOTE: These are simpy defaults. There's no need to edit these here in the script. All names and values are
//configurable from the production page.
var PRESET_KEYS = new Array("Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods");
var DEFAULT_PRESET_1 = "500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_2 = "50,0,0,0,20,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_3 = "60,0,0,0,0,0,0,0,0,0,0,8,0,4,0,0,0,0,0,0,0";
var DEFAULT_PRESET_4 = "120,0,0,0,0,0,0,0,0,0,0,16,0,8,0,0,0,0,0,0,0";
var DEFAULT_PRESET_NAME_1 = "Fighters";
var DEFAULT_PRESET_NAME_2 = "Light Fleet";
var DEFAULT_PRESET_NAME_3 = "Heavy Fleet";
var DEFAULT_PRESET_NAME_4 = "Double Heavy Fleet";
var PRESET_1_NAME_KEY = "PRESET_1_NAME";
var PRESET_2_NAME_KEY = "PRESET_2_NAME";
var PRESET_3_NAME_KEY = "PRESET_3_NAME";
var PRESET_4_NAME_KEY = "PRESET_4_NAME";
var PRESET_1_VALUE_KEY = "PRESET_1_VALUE";
var PRESET_2_VALUE_KEY = "PRESET_2_VALUE";
var PRESET_3_VALUE_KEY = "PRESET_3_VALUE";
var PRESET_4_VALUE_KEY = "PRESET_4_VALUE";

/*
==========================================
---------Common Functions-----------
==========================================
*/
function getPlayerName(name){
    var regex = /(\[.*?\])(.*)/;
    result = regex.exec(name);
    if(result != null)
    return result[2].substring(1);
    else
    return name;
}
function getGuild(name){
    var regex = /\[.*?\]/;
    result = regex.exec(name);
    //console.log(result);
    if(result)
    return result[0];
    else return name;
}

//From http://www.web-source.net/web_development/currency_formatting.htm
function commaFormat(amount){
	var delimiter = unescape(getSetting(NUMBER_DELIMETER_KEY,","));
    //console.log("Delimeter:" +delimiter);
    amount = ""+amount;
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d==undefined || d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}

/*
==========================================
---------Fleet Screen Utilities-----------
==========================================
*/
var FT_INDEX = 0;
var BO_INDEX = 1;
var HB_INDEX = 2;
var IB_INDEX = 3;
var CV_INDEX = 4;
var RC_INDEX = 5;
var DE_INDEX = 6;
var FR_INDEX = 7;
var IF_INDEX = 8;
var SS_INDEX = 9;
var OS_INDEX = 10;
var CR_INDEX = 11;
var CA_INDEX = 12;
var HC_INDEX = 13;
var BC_INDEX = 14;
var FC_INDEX = 15;
var DN_INDEX = 16;
var TI_INDEX = 17;
var LE_INDEX = 18;
var DS_INDEX = 19;
var BARRACKS_INDEX = 20;
var LASER_TURRETS_INDEX = 21;
var MISSLE_TURRETS_INDEX = 22;
var PLASMA_TURRENTS_INDEX = 23;
var ION_TURRETS_INDEX = 24;
var PHOTON_TURRETS_INDEX = 25;
var DISRUPTOR_TURRETS_INDEX = 26;
var DEFLECTION_SHIELDS_INDEX = 27;
var PLANETARY_SHIELD_INDEX = 28;
var PLANETARY_RING_INDEX = 29;
var fightingShips = "11111011100101101111";
var shipValues = new Array(5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000);
var shipHangarValues = new Array(0,0,0,0,0,0,0,4,4,0,0,4,60,8,40,400,200,1000,4000,10000);

/*
==========================================
Sums values and modifies fleet table
==========================================
*/
function sumShips(rows){

	var tables = document.evaluate(
	    "//table",
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
    var rows = document.evaluate(
	    ".//tr",
	    tables.snapshotItem(3),
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
    
	if(rows.snapshotLength == 1)
		return;

    var sums = new Array(20);
    var totalMobileSums = new Array(20);
	//var galaxyFleets = new Array();
	
    for(var i = 0; i < 20;i++)
    {
        sums[i] = 0;
        totalMobileSums[i] = 0;
    }
    if(getSetting(SHOW_ATTACK_SIZE_KEY,true))
		rows.snapshotItem(0).lastChild.innerHTML = "<a href='empire.aspx?view=fleets&order=size'>Attack Size / Size</a>";
    var cells;
    var mobileFleetCount = 0,currentFleetTotal,overallFleetTotal = 0,overallFightingFleetTotal = 0, overallMobileFleetTotal = 0,overallMobileFightingFleetTotal = 0;;
    var fleetUrl;
    for (var i = 1; i < rows.snapshotLength; i++) {
        var row = rows.snapshotItem(i);
        currentFleetTotal = parseInt(rows.snapshotItem(i).lastChild.textContent);
        overallFleetTotal += currentFleetTotal;
        //console.log('Summing fleet '+i);
        cells = document.evaluate(
		        ".//td[@style]",
		        row,
		        null,
		        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		        null);
        //console.log('Found '+cells.snapshotLength+' cells');
        var location = row.childNodes[1].textContent;
		var galaxy = row.childNodes[1].firstChild.firstChild.href.split("=")[1].match(/(A|B|C|D|E)(\d\d)/)[2];
		//console.log(galaxy);
		var galaxyInfoArray = getGalaxyInfoArray(galaxy);
        //console.log('FT: '+cells.snapshotItem(FT_INDEX).textContent);
        var currentFightingFleetTotal = 0,shipTotal;
        
		//Iterate over all ship amounts in this row and add value to all sums that apply (total,fighting,galaxymobile,mobile)
		for (var j = 0; j < cells.snapshotLength; j++)
        {
            //console.log(cells.snapshotItem(j).textContent);
            if(cells.snapshotItem(j).textContent.length > 0){
                //console.log(sums[j]+' + '+parseInt(cells.snapshotItem(j).textContent));
                shipTotal = parseInt(cells.snapshotItem(j).textContent);
                sums[j] = sums[j]+shipTotal;
                if(isFightingShip(j))
					currentFightingFleetTotal += shipValues[j] * shipTotal;
                if(!isBase(location))
				{
					//increment galaxy info numbers
					galaxyInfoArray[2][j] = galaxyInfoArray[2][j]+shipTotal;
					
					//increment total mobile numbers
					totalMobileSums[j] = totalMobileSums[j]+shipTotal;
				}
            }
        }
		
		//Add total row fleet size to overall total count
        overallFightingFleetTotal += currentFightingFleetTotal;
        
		//if fleet is mobile add total row fleet size to overall total mobile count
		if(!isBase(location))
        {
			//increment galaxy info numbers
			galaxyInfoArray[4] += currentFleetTotal;
			galaxyInfoArray[3] += currentFightingFleetTotal;
			galaxyInfoArray[1] += 1;
            //console.log(location + ": "+isBase(location));
            overallMobileFleetTotal += currentFleetTotal;
            overallMobileFightingFleetTotal += currentFightingFleetTotal;
            mobileFleetCount+= 1;
        }
        //console.log(rows.snapshotItem(i).lastChild.textContent);
        if(getSetting(SHOW_ATTACK_SIZE_KEY,true))
        rows.snapshotItem(i).lastChild.textContent =currentFightingFleetTotal  +" / "+ rows.snapshotItem(i).lastChild.textContent;
        fleetUrl = rows.snapshotItem(i).firstChild.firstChild.href;
        //console.log(fleetUrl);
        if(getSetting(ADD_FLEET_MOVE_LINK_KEY,true))
        {
            if(rows.snapshotItem(i).firstChild.nextSibling.firstChild.textContent.charAt(0)!="*")
            {
                var moveLink = document.createElement("a");
                moveLink.setAttribute("href",fleetUrl+"&view=move");
                moveLink.textContent = rows.snapshotItem(i).lastChild.textContent;
                rows.snapshotItem(i).lastChild.textContent = "";
                rows.snapshotItem(i).lastChild.appendChild(moveLink);
            }
        }
    }
    //console.log('Ship Sums: '+sums);
    //console.log('Mobile ship Sums: '+mobileSums);
    //console.log("Mobile fleet "+overallMobileFleetTotal);
    //console.log("Mobile attack fleet "+overallMobileFightingFleetTotal);
    if(getSetting(SHOW_TOTAL_FLEET_ROW_KEY,true))
    {
        insertTotalsRow(rows.snapshotItem(0).parentNode,sums,totalMobileSums,rows.snapshotLength - 1,mobileFleetCount,overallFleetTotal,overallFightingFleetTotal,overallMobileFleetTotal,overallMobileFightingFleetTotal);
    }
    //console.log(prepareTotalsRow(sums));
	
	
}

var galaxyInfoArrays = new Array();
function getGalaxyInfoArray(galaxy){
	if(galaxyInfoArrays[galaxy]==undefined)
	{
		var newArray = new Array(20);
		for(var i = 0; i < 20;i++)
		{
			newArray[i] = 0;
		}
		galaxyInfoArrays[galaxy] = new Array(galaxy,0,newArray,0,0);//[galaxy number],[mobile fleet count],[mobilefleetarray],[total fighting fleet],[total fleet], 
	}
	return galaxyInfoArrays[galaxy];
}

/*
==========================================
Determines if supplied ship type is a fighting ship
==========================================
*/
function isFightingShip(shipIndex){
    return fightingShips.charAt(shipIndex)=="1";
}

/*
==========================================
Inserts totals row in fleet table
==========================================
*/
function insertTotalsRow(node,sums,mobileSums,fleetCount,mobileFleetCount,overallFleetTotal,overallFightingFleetTotal,overallMobileFleetTotal,overallMobileFightingFleetTotal){
    
	//GALAXY ROWS
	for(var i = 0;i<galaxyInfoArrays.length;i++)
	{
		var galaxyInfoArray = galaxyInfoArrays[i];
		if(galaxyInfoArray==undefined || galaxyInfoArray[1] == 0)
			continue;
		
		var sumRow = document.createElement("tr");
	    sumRow.setAttribute('align','center');
	    
	    var element = sumRow.insertCell(0);
	    element.textContent = "Mobile Fleets ("+i+")";
	    element = sumRow.insertCell(1);
	    element.textContent = galaxyInfoArray[1];
	    
		var galaxyFleetSums = galaxyInfoArray[2];
		for(var k = 0; k < 20; k++)
	    {
	        //console.log(sums[k]);
	        var cell = document.createElement("td");
	        cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
	        if(galaxyFleetSums[k] > 0)
				cell.innerHTML = "<small>"+galaxyFleetSums[k]+"</small>";
	        //console.log(element);
	        sumRow.insertBefore(cell,null);
	    }
	    //Add totals cell
	    var cell = document.createElement("td");
	    //cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
	    cell.innerHTML =galaxyInfoArray[3] +" / "+ galaxyInfoArray[4];
	    //console.log(element);
	    sumRow.insertBefore(cell,null);
	    node.insertBefore(sumRow,null);
	}
	//MOBILE ROW
	var sumRow = document.createElement("tr");
    sumRow.setAttribute('align','center');
    var element = sumRow.insertCell(0);
    element.textContent = "Total Mobile Fleets";
    element = sumRow.insertCell(1);
    element.textContent = mobileFleetCount;
    for(var k = 0; k < 20; k++)
    {
        //console.log(sums[k]);
        var cell = document.createElement("td");
        cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
        if(mobileSums[k] > 0)
			cell.innerHTML = "<small>"+mobileSums[k]+"</small>";
        //console.log(element);
        sumRow.insertBefore(cell,null);
    }
    //Add totals cell
    var cell = document.createElement("td");
    //cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
    cell.innerHTML =overallMobileFightingFleetTotal +" / "+ overallMobileFleetTotal;
    //console.log(element);
    sumRow.insertBefore(cell,null);
    node.insertBefore(sumRow,null);
    //TOTAL ROW
    sumRow = document.createElement("tr");
    sumRow.setAttribute('align','center');
    element = sumRow.insertCell(0);
    element.textContent = "Total Fleets";
    element = sumRow.insertCell(1);
    element.textContent = fleetCount;
    for(var k = 0; k < 20; k++)
    {
        //console.log(sums[k]);
        var cell = document.createElement("td");
        cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
        if(sums[k] > 0)
			cell.innerHTML = "<small>"+sums[k]+"</small>";
        //console.log(element);
        sumRow.insertBefore(cell,null);
    }
    //Add totals cell
    var cell = document.createElement("td");
    //cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
    cell.innerHTML =overallFightingFleetTotal +" / "+ overallFleetTotal;
    //console.log(element);
    sumRow.insertBefore(cell,null);
    node.insertBefore(sumRow,null);
}
/*
==========================================
---------Trade Utilities-----------
==========================================
*/
var tradeNames = new Array(); //string names of all trade partners
var tradeNodes = new Array(); //element object of all trade partners
/*
==========================================
This function finds all nodes for the supplied player name and
highlights it and appends '(Duplicate)' to the name
==========================================
*/
function highlightTrade(nameToFind){
    var item;
    //alert('Searching ' + tradeNodes.length + ' routes');
    for (var i = 0; i < tradeNodes.length; i++) {
        item = tradeNodes[i];
        //console.log(item.innerHTML + " " + nameToFind);
        if(item.innerHTML == nameToFind)
        {
            //alert('Found node: ' + item.innerHTML);
            item.style.color = 'red';
            item.innerHTML = item.innerHTML + ' (Duplicate)';
        }
    }
}
/*
==========================================
Finds all 'small' elements with 'gray' style and determines if
there are any duplicates. If any are found they are highlighted.
Two arrays are used. One to hold string names of trade partners in order
to be sortable. The second holds the actual element objects.
==========================================
*/
function checkTradePage(){
    //alert('Checking trade page');
    var allNames, thisName, lastName;
    //Find all trade name elements
    allNames = document.evaluate(
    "//small[@class='gray']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //Iterate through all and add only odd ones to name and node arrays.
    for (var i = 0; i < allNames.snapshotLength; i++)
    {
        if(i%2==1)
        {
            thisName = allNames.snapshotItem(i);
            tradeNames.push(thisName.innerHTML);
            tradeNodes.push(thisName);
        }
    }
    tradeNames.sort();
    saveTradePartners();
    //alert('Found ' + tradeNodes.length + ' trades.');
    //Iterate through sorted names and compare each to the one before it.
    //If a duplicate is found pass the name to the highlight method to find
    // all element objects and apply highlight.
    for (var i = 1; i < tradeNames.length; i++)
    {
        thisName = tradeNames[i];
        lastName = tradeNames[i-1];
        //console.log(thisName + " " + lastName);
        if(thisName == lastName)
        {
            //alert('Found duplicate: ' + thisName + " == " + lastName);
            highlightTrade(thisName);
        }
    }
}
/*
==========================================
Persist Trade Partners
==========================================
*/
function saveTradePartners(){
    var saveData = tradeNames[0];
    for (var i = 1; i < tradeNames.length; i++)
    {
        saveData = saveData+";"+tradeNames[i];
    }
    setSetting('tradePartners',escape(saveData));
    //console.log("Saved Data:<br>"+escape(saveData));
    //saveData = unescape(getSetting('tradePartners'));
    //log("<BR>Check saved Data:<br>"+saveData);
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    setSetting('lastTradeCheck', currentTime);
}
/*
==========================================
Load Trade Partners
==========================================
*/
function getTradePartners(){
    var saveData = getSetting('tradePartners');
    var tradePartners = null;
    if(saveData != null)
    {
        saveData = unescape(saveData);
        //console.log("Check saved Data:"+saveData);
        tradePartners = saveData.split(";");
    }
    //alert('Loaded ' + tradePartners.length + ' trade partners');
    tradeNames = tradePartners;
    return tradePartners;
}
/*
==========================================
Check Trade Partners Data Age
==========================================
*/
function checkTradeDataAge(){
    if(getSetting('tradePartners') == null)
	{	
		insertNotification('Trade partner data has not been set.<br>'
        +'    Visit the trade page to set the information.<br><br><br>');
		return;
	}	
    //console.log('Trade data check.');
    var lastTradeCheck = parseInt(getSetting('lastTradeCheck', 0));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    //console.log('lastTradeCheck: '+lastTradeCheck);
    //console.log('currentTime: '+currentTime);
    //console.log('Need fresh trade data: ' + (currentTime > (lastTradeCheck + (86400*3))));
    //console.log('Next Check (minutes): '+ ( (lastTradeCheck + (86400*3)) - currentTime)/60 );
    if (currentTime > (lastTradeCheck + (86400*3)))
    {
        insertNotification('Trade partner data has not been updated in over three days.<br>'
        +'    Visit the empire trade page to refresh the information.<br><br><br>');
    }
}

/*
==========================================
Check Tech Data Age
==========================================
*/
function checkTechDataAge(){
    //console.log("Checking tech data age.");
	if(getSetting('techData') == null)
	{	
		insertNotification('Technology data has not been set.<br>'
        +'    Visit the technologies page to set the information.<br><br><br>');
		return;
	}	
    //console.log('Trade data check.');
    var lastTechCheck = parseInt(getSetting('lastTechCheck', 0));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    //console.log('lastTechCheck: '+lastTechCheck);
    //console.log('currentTime: '+currentTime);
    //console.log('Need fresh tech data: ' + (currentTime > (lastTechCheck + (86400*3))));
    //console.log('Next Check (minutes): '+ ( (lastTradeCheck + (86400*3)) - currentTime)/60 );
    if (currentTime > (lastTechCheck + (86400*3)))
    {
        insertNotification('Technology data has not been updated in over three days.<br>'
        +'    Visit the empire trade page to refresh the information.<br><br><br>');
    }
}

function getHighlightColorForGuild(guild){
    var myGuildColor = getSetting(MY_GUILD_COLOR_KEY,null);
    var myGuild = getSetting(MY_GUILD_KEY,null);
    if(myGuild != null && myGuildColor != null)
    {
        myGuild = unescape(myGuild);
        myGuildColor = unescape(myGuildColor);
    }
    //console.log("myguild: "+myGuild+" colour:"+ myGuildColor);
    if(myGuild != null && myGuildColor != null)
    {
        if(myGuild == guild)
        return myGuildColor;
    }
    var guilds = getSetting(ALLIED_GUILDS_KEY,null);
    var guildColor = getSetting(ALLIED_GUILDS_COLOR_KEY,null);
    if(guilds != null && guildColor != null)
    {
        guilds = unescape(guilds);
        guildColor = unescape(guildColor);
        //console.log("guilds: "+guilds);
        var guildArray = guilds.split(",");
        //console.log("guildArray: "+guildArray);
        for(var i = 0; i < guildArray.length;i++)
        {
            //console.log(guildArray[i].split("=")[0] +" = "+ guild);
            if(guildArray[i].split("=")[0] == guild)
            return guildColor;
        }
    }
    guilds = getSetting(ENEMY_GUILDS_KEY,null);
    guildColor = getSetting(ENEMY_GUILDS_COLOR_KEY,null);
    if(guilds != null && guildColor != null)
    {
        guilds = unescape(guilds);
        guildColor = unescape(guildColor);
        //console.log("guilds: "+guilds);
        var guildArray = guilds.split(",");
        //console.log("guildArray: "+guildArray);
        for(var i = 0; i < guildArray.length;i++)
        {
            //console.log(guildArray[i].split("=")[0] +" = "+ guild);
            if(guildArray[i].split("=")[0] == guild)
            return guildColor;
        }
    }
    return null;
}

//Input is player name without guild name
function getHighlightColorForPlayer(player){
    var playerColors = getSetting(PLAYER_COLORS_KEY,null);
    if(playerColors == null)
    return;
    playerColors = unescape(playerColors);
    //console.log("colors: "+playerColors);
    var playerArray = playerColors.split(",");
    //console.log("playerArray: "+playerArray);
    for(var i = 0; i < playerArray.length;i++)
    {
        //console.log(playerArray[i].split("=")[0] +" = "+ player);
        if(playerArray[i].split("=")[0] == player)
		{
			//console.log(playerArray[i].split("=")[0] +" = "+ player);
			return playerArray[i].split("=")[1];
		}
    }
    return null;
}
/*
==========================================
Checks if supplied name is a trade partner
==========================================
*/
function isTradePartner(name){
    //alert("Checking trade partner "+ name);
    if(tradeNames && tradeNames.length == 0)
    {
        tradeNames = getTradePartners();
        //alert('Searching through ' + tradeNames.length + ' trade partners');
    }
	if(tradeNames == null)
		return false;
    //alert('Searching through ' + tradeNames.length + ' trade partners');
    for (var i = 0; i < tradeNames.length; i++)
    {
        //document.body.appendChild('Name: '+name + ' + loaded name: '+getPlayerName(tradeNames[i]));
        var strippedName = getPlayerName(tradeNames[i]);
        //console.log('Name: ' +name  + 'loaded name: '+ strippedName);
        if(name.indexOf(strippedName)!=-1)
        {
            //console.log("MATCH");
            return true;
        }
    }
    return false;
}
/*
==========================================
Inserts Empire sub menu on all pages
==========================================
*/
function insertEmpireMenu(){
    var html = '<tbody><tr><th width="11%" id="bases_events"><a href="empire.aspx?view=bases_events">Events</a></th><th width="11%" id="bases_capacities"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th width="11%" id="economy"><a href="empire.aspx?view=economy">Economy</a></th><th width="11%" id="trade"><a href="empire.aspx?view=trade">Trade</a></th><th width="11%" id="structures"><a href="empire.aspx?view=structures">Structures</a></th><th width="11%" id="fleets"><a href="empire.aspx?view=fleets">Fleets</a></th><th width="11%" id="units"><a href="empire.aspx?view=units">Units</a></th><th width="12%" id="technologies"><a href="empire.aspx?view=technologies">Technologies</a></th><th width="11%" id="scanners"><a href="empire.aspx?view=scanners">Scanners</a></th></tr></tbody>';
    var tables = document.evaluate(
    "//table[@class='top']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if(tables.snapshotLength==0)
    return;
    var topTable = tables.snapshotItem(0);
    var empireMenu = document.createElement('table');
    empireMenu.setAttribute('width',topTable.getAttribute("width"));
    empireMenu.setAttribute('align','center');
    empireMenu.setAttribute('class','header');
    empireMenu.innerHTML = html;
    if(topTable)
    {
        topTable.parentNode.insertBefore(empireMenu,topTable.nextSibling);
        var lineBreak = document.createElement('br');
        topTable.parentNode.insertBefore(lineBreak,empireMenu);
    }
}
/*
==========================================
Highlight Poor Trade Values
==========================================
*/
function findPoorTrades(){
    var rows = document.evaluate(
    "//table[4]//tr[@align='center']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log('Found '+ rows.snapshotLength + 'rows.');
    var upperThreshold = getSetting(POOR_TRADE_UPPER_THRESHOLD_KEY,10);
    var lowerThreshold = getSetting(POOR_TRADE_LOWER_THRESHOLD_KEY,10);
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var eco1Cell = document.evaluate(
        "td[3]",
        rows.snapshotItem(i),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0);
        var eco2Cell = document.evaluate(
        "td[4]",
        rows.snapshotItem(i),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0);
        var eco1 = parseInt(eco1Cell.innerHTML);
        var eco2 = parseInt(eco2Cell.innerHTML);
        //console.log(eco1 + ' / ' + eco2);
        if(eco2 - eco1 > upperThreshold)
        {
            eco2Cell.style.color = "orange";
        }
        if(eco2 - eco1 < -1*lowerThreshold)
        {
            eco2Cell.style.color = "red";
        }
    }
}

function insertNotification(message){
    GM_addStyle('#gm_update_alert {'
        +'    position: relative;'
        +'    z-index: 99;'
        +'    top: 0px;'
        +'    left: 0px;'
        +'    width: 100%;'
        +'    background-color: Black;'
        +'    text-align: center;'
        +'    font-size: 11px;'
        +'    font-family: Tahoma;'
        +'    border: solid 1px;'
        +'    margin-bottom: 10px;'
        +'}'
    +'#gm_update_alert_buttons {'
        +'    position: relative;'
        +'    top: -5px;'
        +'    margin: 7px;'
        +'}'
    +'#gm_update_alert_button_close {'
        +'    position: absolute;'
        +'    right: 0px;'
        +'    top: 0px;'
        +'    padding: 3px 5px 3px 5px;'
        +'    border-style: outset;'
        +'    border-width: thin;'
        +'    z-index: inherit;'
        +'    background-color: #FF0000;'
        +'    color: #FFFFFF;'
        +'    cursor:pointer'
        +'}'
    +'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
        +'    text-decoration:underline;'
        +'    color: #003399;'
        +'    font-weight: bold;'
        +'    cursor:pointer'
        +'}'
    +'#gm_update_alert_buttons span a:hover  {'
        +'    text-decoration:underline;'
        +'    color: #990033;'
        +'    font-weight: bold;'
        +'    cursor:pointer'
        +'}'
    +'#gm_update_title {'
        +'    weight:bold;'
        +'    color:orange;'
        +'}');
    var notification = document.createElement("div");
    notification.setAttribute('id', 'gm_update_alert');
    notification.innerHTML = ''
    +'    <div id="gm_update_title">Astro Empires Extras Notification</div>'
    + '<br>' + message
    +'';
    document.body.insertBefore(notification, document.body.firstChild);
}

/*
==========================================
Handle Trade Board Page
==========================================
*/
function highlightTradePartners(){
    //alert('Checking trade page');
    
	//if on the main empire page, only check links in the marquee
	//this saves time checking all the other links on the page that are useless
	var query = "//a[contains(@href,'profile.aspx') or contains(@href,'base.aspx') and not(contains(@class,'header'))]";
	if(window.location.href.indexOf("empire.aspx")!=-1 && (getView()=="" || getView()=="Structures"))
		query = "//marquee"+query;
	//console.info(query);
	
	var allLinks,item;
	    allLinks = document.evaluate(
	    query,
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
    //Iterate through all and add only odd ones to name and node arrays.
    var highlightPlayers = (getSetting(PLAYER_COLORS_KEY,null) != null) && getSetting(HIGHLIGHT_PLAYERS_KEY,true);
    //console.log("highlight players: "+highlightPlayers);
    for (var i = 0; i < allLinks.snapshotLength; i++)
    {
        //alert(allLinks.snapshotItem(i).href);
        item = allLinks.snapshotItem(i);
		//console.log(item);
        if( getSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true) && isTradePartner(item.innerHTML))
        {
            item.style.color = unescape(getSetting(HIGHLIGHT_TRADE_COLOR_KEY,"#8B0000"));
            //console.log(item.innerHTML+" (trade)");
        }
        if(highlightPlayers)
        {
            var guild = getGuild(item.innerHTML);
            //Highlight by guild
            var color = getHighlightColorForGuild(guild);
            //console.log(guild+": "+color);
            if(color != null)
            {
                item.style.color = color;
            }
            //Apply overrides
            var color = getHighlightColorForPlayer(getPlayerName(item.innerHTML));
            if(color != null)
            {
				//console.log(getPlayerName(item.innerHTML)+": "+color);
                item.style.color = color;
            }
        }
    }
}
/*
==========================================
Update Checking Code
==========================================
*/
function checkForUpdates(forceCheck){
    //console.log('New version check.');
    var lastCheck = parseInt(getSetting('lastCheck', 0));
    var lastVersion = getSetting('lastVersion', 0);
    var needUserAction = getSetting('needUserAction',false);
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    //console.log('lastCheck: '+lastCheck);
    //console.log('currentTime: '+currentTime);
    //console.log('Check Online: '+ (currentTime < (lastCheck + 86400) || needUserAction));
    //console.log('Next Check (minutes): '+ ( (lastCheck + 86400) - currentTime)/60 );
    //console.log('needUserAction: '+needUserAction);
    //setSetting('lastCheck', currentTime - 86500);
    //return;
    if (forceCheck || currentTime > (lastCheck + (2 * 3600)) || needUserAction) {
        //2 hours after last check
        setSetting('lastCheck', currentTime);    //Set time of check
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',
            }
            ,
            onload: function(responseDetails) {
                var text = responseDetails.responseText;
                var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
                var onSiteUpdateText = text.substring(text.indexOf("==UpdateText==")+14,text.indexOf("==/UpdateText=="));
                //console.log('OnSite Version: '+parseFloat(onSiteVersion));
                //console.log('Script Version: '+parseFloat(scriptVersion));
                //console.log("Need update: "+parseInt(onSiteVersion) < parseInt(scriptVersion));
                //console.log('Last Version: '+lastVersion);
                //console.log('text: '+text);
                //console.log('onSiteUpdateText: '+onSiteUpdateText);
                if(parseFloat(onSiteVersion) > scriptVersion && parseFloat(onSiteVersion) > parseFloat(lastVersion)) {
                    console.log("Found newer version");
                    setSetting('needUserAction', true);
                    var message = '    There is an update available for &quot;'+scriptName+'&quot; <br>'
                    +'    You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
                    +'    <br>'
                    + onSiteUpdateText +'<br>'
                    +'    <div id="gm_update_alert_buttons">'
                    +'        <span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go To Script Homepage</a></span>&nbsp;&nbsp;'
                    +'        <span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade to version '+onSiteVersion+'</a></span>&nbsp;&nbsp;'
                    +'        <span id="gm_update_alert_button_wait"><a href="#">Don&#39;t remind me again until tomorrow</a></span>&nbsp;&nbsp;'
                    +'        <span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t remind me again'
                    +'        until the next new version</a></span> </div>'
                    +'</div>';
                    insertNotification(message);
                    document.getElementById('gm_update_alert_button_upgrade').addEventListener('click', function(event) {
                        setSetting('needUserAction',false); document.body.removeChild(document.getElementById('gm_update_alert'));
                    }
                    , true);
                    document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {
                        setSetting('needUserAction',false); setSetting('lastCheck', currentTime); alert("You will not be reminded again until tomorrow."); document.body.removeChild(document.getElementById('gm_update_alert'));
                    }
                    , true);
                    document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {
                        setSetting('needUserAction',false); setSetting('lastVersion', onSiteVersion); alert("You will not be reminded again until the next new version is released."); document.body.removeChild(document.getElementById('gm_update_alert'));
                    }
                    , true);
                }
                else{
                    console.log('Running latest version');
					if(forceCheck)
						notify("Running latest version ("+scriptVersion+").");
                }
            }
        }
        );
    }
}


function getTableWidth(){
var tables = document.evaluate(
    "//table[@class='top']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if(tables.snapshotLength==0)
		return 900;
    var topTable = tables.snapshotItem(0);
    return topTable.getAttribute("width");
}

/*
==========================================
Insert Production Presets
==========================================
*/
function insertProductionPresetsButtons()
{
    var preset1Name = getSetting(PRESET_1_NAME_KEY,DEFAULT_PRESET_NAME_1);
    var preset2Name = getSetting(PRESET_2_NAME_KEY,DEFAULT_PRESET_NAME_2);
    var preset3Name = getSetting(PRESET_3_NAME_KEY,DEFAULT_PRESET_NAME_3);
    var preset4Name = getSetting(PRESET_4_NAME_KEY,DEFAULT_PRESET_NAME_4);
    //Insert Preset Buttons
    var buttons = '<div id="gm_update_alert_buttons">'
    +'        <span id="presetButton1"><a href="javascript:void(0)">'+preset1Name+'</a></span> - '
    +'        <span id="presetButton2"><a href="javascript:void(0)">'+preset2Name+'</a></span> - '
    +'        <span id="presetButton3"><a href="javascript:void(0)">'+preset3Name+'</a></span> - '
    +'        <span id="presetButton4"><a href="javascript:void(0)">'+preset4Name+'</a></span>'
	+'        <div><a href="javascript:void(0)" id="fillHangars">Fill hangar space</a></div>'
    +'</div>';
    var table;
    table = document.evaluate(
	    "//input[@name='Fighters']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue.parentNode.parentNode.parentNode.parentNode;
    //console.log(table);
    var buttonElement = document.createElement("div");
    buttonElement.innerHTML = buttons;
    buttonElement.setAttribute("align","center");
	//buttonElement.setAttribute("width",getTableWidth());
    table.parentNode.insertBefore(buttonElement,table);
    document.getElementById('presetButton1').addEventListener('click', function(event) {
        applyProductionPreset(1);
    }
    , true);
    document.getElementById('presetButton2').addEventListener('click', function(event) {
        applyProductionPreset(2);
    }
    , true);
    document.getElementById('presetButton3').addEventListener('click', function(event) {
        applyProductionPreset(3);
    }
    , true);
    document.getElementById('presetButton4').addEventListener('click', function(event) {
        applyProductionPreset(4);
    }
    , true);
	document.getElementById('fillHangars').addEventListener('click', function(event) {
        queueFullHangarSpace();
    }
    , true);
    //Insert Set Preset Buttons
    buttons = '    <div id="gm_update_alert_buttons">'
    +'        <span id="setButton1"><a href="javascript:void(0)">Set Preset 1</a></span>&nbsp;&nbsp;'
    +'        <span id="setButton2"><a href="javascript:void(0)">Set Preset 2</a></span>&nbsp;&nbsp;'
    +'        <span id="setButton3"><a href="javascript:void(0)">Set Preset 3</a></span>&nbsp;&nbsp;'
    +'        <span id="setButton4"><a href="javascript:void(0)">Set Preset 4</a></span>&nbsp;&nbsp;'
    +'</div>';
    //console.log(table);
    buttonElement = document.createElement("div");
    buttonElement.innerHTML = buttons;
    buttonElement.setAttribute("align","center");
    var submitButton = document.evaluate(
	    "//input[@type='submit']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue;
    //table.parentNode.insertBefore(buttonElement,table);
    //console.log(submitButton.parentNode.parentNode.parentNode.parentNode);
    document.body.insertBefore(buttonElement, submitButton.parentNode.parentNode.parentNode.parentNode.nextSibling);
    document.getElementById('setButton1').addEventListener('click', function(event) {
        saveProductionPreset(1);
    }
    , true);
    document.getElementById('setButton2').addEventListener('click', function(event) {
        saveProductionPreset(2);
    }
    , true);
    document.getElementById('setButton3').addEventListener('click', function(event) {
        saveProductionPreset(3);
    }
    , true);
    document.getElementById('setButton4').addEventListener('click', function(event) {
        saveProductionPreset(4);
    }
    , true);
}
/*
==========================================
Apply Production Presets
==========================================
*/
function applyProductionPreset(preset){
    var presetArray;
    switch(preset)
    {
        case 1:{
            presetArray = getSetting(PRESET_1_VALUE_KEY,DEFAULT_PRESET_1).split(",");break;
        }
        case 2:{
            presetArray = getSetting(PRESET_2_VALUE_KEY,DEFAULT_PRESET_2).split(",");break;
        }
        case 3:{
            presetArray = getSetting(PRESET_3_VALUE_KEY,DEFAULT_PRESET_3).split(",");break;
        }
        case 4:{
            presetArray = getSetting(PRESET_4_VALUE_KEY,DEFAULT_PRESET_4).split(",");break;
        }
    }
    //console.log("Preset: "+presetArray);
    var countTextBox, timeTextBox;
    var shipName;
    var value, presetText, textBoxName;
	
    for(var i = 0;i < presetArray.length;i++)
    {
		var count = 0;
		var time = 0;
        shipName = PRESET_KEYS[i];
        presetText = presetArray[i];
		//console.log(presetArray[i]);
		
		if(presetText.charAt(0) == "t")
		{
			time = parseInt(presetText.substring(1));
			//console.log(parseInt(presetText.substring(1)));
		}
        else
		{
			count = parseInt(presetText);
		}
		
		countTextBox = document.evaluate(
		        "//input[@name='" + shipName + "']",
		        document,
		        null,
		        XPathResult.FIRST_ORDERED_NODE_TYPE,
		        null).singleNodeValue;
	        //console.log(textBox);
			
		timeTextBox = document.evaluate(
		        "//input[@name='" + shipName + " - Time']",
		        document,
		        null,
		        XPathResult.FIRST_ORDERED_NODE_TYPE,
		        null).singleNodeValue;
	        //console.log(textBox);
		
		if(timeTextBox != null)
        {
			if(time>0)
				value = time;
	        else
				value = null;
			timeTextBox.value = value;
        }
		if(countTextBox != null)
        {
			if(count>0)
				value = count;
	        else 
				value = null;
			countTextBox.value = value;
        }
		
		//console.log("Preset Text: "+presetText+" Time: "+time+" Count: "+count+" Value: "+value);
			
		
        //console.log("Setting production count for "+shipName+" to "+value+".");
       
		if(countTextBox != null)
		{
			var row = countTextBox.parentNode.parentNode;
			convertTimeToQuantity(row);
		}
    }
    onProductionTextBoxKeyUp();
}
/*
==========================================
Save Production Preset
==========================================
*/
function saveProductionPreset(preset){
    //console.log("Saving preset " + preset);
    var shipName;
    var count;
    var presetArray = new Array();
    for(var i = 0;i < PRESET_KEYS.length;i++)
    {
        shipName = PRESET_KEYS[i];
        
		//Check time textbox
		textBox = document.evaluate(
	        "//input[@name='" + shipName + " - Time']",
	        document,
	        null,
	        XPathResult.FIRST_ORDERED_NODE_TYPE,
	        null).singleNodeValue;
		
		//If time is not set, check quantity
		if(textBox == null || textBox.value == "" || textBox.value == "0")
		{
		
			textBox = document.evaluate(
		        "//input[@name='" + shipName + "']",
		        document,
		        null,
		        XPathResult.FIRST_ORDERED_NODE_TYPE,
		        null).singleNodeValue;
				
				if(textBox == null || textBox.value == "")
		        {
		            //console.log("Failed to find textBox for "+shipName+".");
		            count = 0;
		        }
		        else
		        {
		            //console.log(textBox.value);
		            //console.log(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
		            count = parseInt(textBox.value);
		        }
				//console.log(count + " " + shipName);
				presetArray[i] = count;
		}
		else
		{
			//console.log(textBox.value);
			//console.log(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
			time = parseInt(textBox.value);
			console.log(time + " (time) " + shipName);
			presetArray[i] = "t"+time;
		}
        
        
    }
    var name = prompt("Enter preset name.");
    if(name == null)
    return;
    //console.log(name +": "+presetArray);
    switch(preset)
    {
        case 1:{
            setSetting(PRESET_1_VALUE_KEY,presetArray.join());setSetting(PRESET_1_NAME_KEY,name);document.getElementById('presetButton1').firstChild.innerHTML = name;break;
        }
        case 2:{
            setSetting(PRESET_2_VALUE_KEY,presetArray.join());setSetting(PRESET_2_NAME_KEY,name);document.getElementById('presetButton2').firstChild.innerHTML = name;break;
        }
        case 3:{
            setSetting(PRESET_3_VALUE_KEY,presetArray.join());setSetting(PRESET_3_NAME_KEY,name);document.getElementById('presetButton3').firstChild.innerHTML = name;break;
        }
        case 4:{
            setSetting(PRESET_4_VALUE_KEY,presetArray.join());setSetting(PRESET_4_NAME_KEY,name);document.getElementById('presetButton4').firstChild.innerHTML = name;break;
        }
    }
	
	notify("'"+name +"' preset saved.");
}

/*
==========================================
Queues fighters to fill queued ships hangar space
==========================================
*/
function queueFullHangarSpace(){
	//shipHangarValues
	var totalHangarSpace = 0;
	for(var i = 0;i < PRESET_KEYS.length;i++)
    {
		var shipName = PRESET_KEYS[i];
		var textBox = document.evaluate(
			"//input[@name='" + shipName + "']",
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null).singleNodeValue;
		//console.log(textBox);	
		if(textBox != null && textBox.value != "")
		{
			//console.log(textBox.value);
			//console.log(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
			totalHangarSpace += parseInt(textBox.value) * shipHangarValues[i];
		}
	}
	console.log("Total hangar space: "+totalHangarSpace);
	
	var textBox = document.evaluate(
			"//input[@name='" + PRESET_KEYS[FT_INDEX] + "']",
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null).singleNodeValue;
		//console.log(textBox);	
		if(textBox != null)
		{
			//console.log(textBox.value);
			//console.log(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
			textBox.value = totalHangarSpace;
		}
		
	onProductionTextBoxKeyUp();
}

/*
==========================================
Calculates total cost of production and sets Submit button label with amount
==========================================
*/
function onProductionTextBoxKeyUp(){
    var shipName;
    var count=0,cost=0;
    var productionCost = 0;
    var totalTime = 0;
    for(var i = 0;i <PRESET_KEYS.length;i++)
    {
        shipName = PRESET_KEYS[i];
        textBox = document.evaluate(
        "//input[@name='" + shipName + "']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
        //console.log(textBox);
        if(textBox == null)
        {
            //console.log("Failed to find textBox for "+shipName+".");
            continue;
        }
		
		if(textBox.value != "")
        {
            var row = textBox.parentNode.parentNode;
            var time = row.childNodes[4].textContent;
            //console.log(textBox.value);
            count = parseInt(textBox.value);
            cost = parseInt(textBox.parentNode.previousSibling.previousSibling.previousSibling.innerHTML);
            totalTime+= getSeconds(time) * count;
            //console.log(count + " " + shipName + "s @ " + cost);
            productionCost += (cost * count);
			//textBox.parentNode.nextSibling.value = "";
        }
    }
    //console.log("total Time: "+getTimeDisplay(totalTime));
    var fastProduction = document.evaluate("//input[@class='check' and @name='fast']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.checked;
    //console.info(fastProduction);
    if(fastProduction)
	{
		productionCost *= 2;
		totalTime /= 2;
	}
    //console.log("Text changed. Total production cost: " +productionCost);
    var submitButton = document.evaluate(
	    "//input[@type='submit']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue;
    if(productionCost > 0)
		submitButton.value = "Submit ("+productionCost+") - "+getTimeDisplay(totalTime);
    else
		submitButton.value = "Submit";
}

function registerTextBoxEventListeners(){
    for(var i = 0;i < PRESET_KEYS.length;i++)
    {
        shipName = PRESET_KEYS[i];
        textBox = document.evaluate(
        "//input[@name='" + shipName + "']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
        //console.log(textBox);
        if(textBox == null)
        {
            //console.info("Failed to find textBox for "+shipName+".");
            continue;
        }
        textBox.addEventListener('keyup',onProductionTextBoxKeyUp,false);
		//textBox.addEventListener('blur',onProductionTextBoxChanged,true);
    }
    document.evaluate("//input[@class='check' and @name='fast']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('change',onProductionTextBoxKeyUp,false);
    //document.evaluate("//input[@type='reset']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('click',onProductionTextBoxKeyUp,true);
    document.evaluate("//form[@method='post']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('reset',onProductionTextBoxKeyUp,false);
}

function poorTradesChanged(){
    var isChecked = document.getElementById('highlightPoorTrades').checked;
    //console.log("Poor trades changed." + isChecked);
    document.getElementById('poorTradeUpperThreshold').disabled = !isChecked;
    document.getElementById('poorTradeLowerThreshold').disabled = !isChecked;
}

/*
==========================================
Add finishing times
Based on code from FlxGrey on AE Forums. Thanks!
"Mostly based off the code from spectre3ooo, but edited to be a little more sturdy." - FlxGrey
==========================================
*/
function zeroPad(num){
    if(num <= 9)
    return "0" + num;
    return num;
}

function addFinishTimes(singleLine){
    var id, time, date, day = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    var now = new Date(), future = new Date();
    var separator = singleLine? " ":"<br>";
    var td_list = document.getElementsByTagName('td');
    for(var i = 0; i < td_list.length; i++)
    {
        var style = "font-size:8pt";
        if(td_list[i].id.indexOf('time') !== -1 && parseInt(td_list[i].title) >= 0)
        {
            id = td_list[i].id;
            time = td_list[i].title;
            future.setTime(now.getTime() + (time * 1000));
            if(future.getDate() == now.getDate() && future.getMonth() == now.getMonth() && future.getYear() == now.getYear())
            {
                date = "";
                style = style+";color:"+unescape(getSetting(HIGHLIGHT_TODAY_COLOR_KEY,"#9999FF"));
            }
            else if(future.getDate() - now.getDate() == 1 && !singleLine)
            {
                date = "Tomorrow @ ";
            }
            else
            {
                date = day[future.getDay()] + " " + future.getDate() + " @ ";
            }
            if(getSetting("24hourDisplay",false))
            {
                date += future.getHours() + ":" + zeroPad(future.getMinutes()) + ":" + zeroPad(future.getSeconds());
            }
            else
            {
                if(future.getHours() >= 12)
                {
                    if(future.getHours() > 12)
						future.setHours(future.getHours()-12);
                    date += (future.getHours()) + ":" + zeroPad(future.getMinutes()) + ":" + zeroPad(future.getSeconds()) + " pm";
                }
                else
                {
                    if(future.getHours() ==0)
						future.setHours(12);
                    date += future.getHours() + ":" + zeroPad(future.getMinutes()) + ":" + zeroPad(future.getSeconds()) + " am";
                }
            }
            td_list[i].id = "checked";
            td_list[i].innerHTML = '<span id="' + id + '" title="' + time + '" style="font-size:8pt">-</span>'+separator+'<span style="'+style+'">' + date + '</span>';
        }
    }
    if(window.location.href.indexOf("fleet.aspx")!=-1)
    {
        var links = document.evaluate("//td[@id='checked']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i = 0; i < links.snapshotLength; i++) {
            links.snapshotItem(i).width="9%"
            //console.log(links.snapshotItem(i).innerHTML);
        }
    }
}

function getView(){
    var view = window.location.href.split("view=",2);
    if(view.length<=1)
		return "";
    view = view[1].split("&")[0];
    view = view.substring(0,1).toUpperCase() + view.substring(1);
    //console.info(view);
    return view;
}
/*
==========================================
Shorten Page Titles
Uses code from FlxGrey on AE Forums. Thanks!
==========================================
*/
function adjustTitles(){
    //console.log("Adjust titles");
	var view = getView();
    var server = getServer();
    
    if(view != "")
        document.title = server + " - " + getView();
    else
		document.title = document.title.replace("Astro Empires - ",server+" - ");
}

/*
==========================================
Returns the full server name
==========================================
*/
var _server = null;
function getServer(){
	//console.log("retreiving server. Server: "+_server);
	if(_server == null)
	{
		//console.log("setting server. Location: "+window.location);
		var regex = /http:\/\/(alpha|beta|ceti|delta|epsilon).astroempires.com/;
		var result = regex.exec(document.referrer);
		//console.log("Result: "+result);
		if(result == null)
		{
			//console.log(document.referrer);
			var regex = /http:\/\/(alpha|beta|ceti|delta|epsilon).astroempires.com/;
			result = regex.exec(document.referrer);
		}
		_server = result[1];
		//console.log("set server");
		
	}
	//console.log("Server: "+_server);
	return _server;
}

/*
==========================================
Enhanced Queue Display
==========================================
*/
function fixQueues(){
    if(document.evaluate('//a[text()="Cancel Production"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength > getSetting(MAX_QUEUES_KEY,5))
		return;
		
    var queueTitle = getView();
    //console.log("Fixing queues :" +queueTitle);
    if(queueTitle == "Structures" || queueTitle == "Defenses")
    queueTitle = "Construction Queue";
    if(queueTitle == "Research")
    queueTitle = "Research Queue";
    GM_addStyle('#queueFooter {'
        +'    position: fixed;'
        +'    clear: both;'
        + 'width: 100%;'
        +'    bottom: 0px;'
        +'    left: 0px;'
        +'    align: center;'
        +'}');
		
    var queues = document.evaluate('//th[text()="'+queueTitle+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
    if(queues)
    {
        queues = queues.parentNode.parentNode.parentNode
        var fixedDiv = document.createElement("div");
        fixedDiv.setAttribute("id","queueFooter");
        //console.log(queues);
        fixedDiv.appendChild(queues);
        document.body.appendChild(fixedDiv);
  
  /*        var button = document.evaluate("//input[@value='Submit']",document,null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        var formElement = document.forms[1];
        var tbody = button.parentNode.parentNode.parentNode;
        console.log(tbody);
        if(button)
        {
            var buttonRow = button.parentNode.parentNode;
            var th = buttonRow.firstChild;
            //buttonRow.setAttribute("colspan",3);
            buttonRow.removeChild(th);
            button.addEventListener("click",function(event){
                productionSubmit();
            }
            ,true);
            buttonRow.appendChild(th);
            //console.log(buttonRow);
            //queues.firstChild.insertBefore(buttonRow,queues.firstChild.firstChild);
            //queues.firstChild.insertBefore(formElement,buttonRow);
            var newRow = document.createElement("tr");
            newRow.appendChild(document.createElement("th"));
            var newSubmit = document.createElement("input");
            newSubmit.type = "button";
            newSubmit.value = "New Submit";
            newSubmit.name = "New Submit";
            newSubmit.addEventListener("click",function(event){
                productionSubmit();
            }
            ,true);
            //tbody.insertBefore(newSubmit,tbody.firstChild);
            th.appendChild(newSubmit);
        }
        */
        var spacer = document.createElement('div');
        spacer.style.position="absolute";
        spacer.style.height = fixedDiv.offsetHeight;
        spacer.innerHTML = "&nbsp;";
        document.body.appendChild(spacer);
    }
}

function productionSubmit(){
    console.log("Click!");
    document.forms[1].submit();
}

/*
==========================================
Insert Config Link
==========================================
*/
function insertConfigLink(){
    var logoutLink = document.evaluate("//a[contains(.,'Logout')]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    //console.info(logoutLink);
    if(!logoutLink)
    return;
    var configLink = document.createElement("a");
    var appendString;
    if(window.location.href.indexOf("?")!=-1)
    appendString = "&config=1";
    else
    appendString = "?config=1";
    configLink.setAttribute("href",window.location.href+appendString);
    configLink.innerHTML = "AE Extras";
    //console.log(configLink);
    logoutLink.parentNode.insertBefore(configLink,logoutLink);
    var innerHTML = logoutLink.parentNode.innerHTML;
    //console.log(logoutLink.parentNode.innerHTML.replace("Config </a>","Config </a> - "));
    innerHTML = logoutLink.parentNode.innerHTML.replace("Extras</a>","Extras </a> - ");
    //console.log(innerHTML);
    logoutLink.parentNode.innerHTML = innerHTML;
}

/*
==========================================
Inserts Battle Calculator Link
==========================================
*/
function insertBattleCalcLink(){
    var bookmarkLink = document.getElementById("bookmarks");
    if(!bookmarkLink)
    return;
    var th = document.createElement("th");
    th.setAttribute("width","11%");
    th.setAttribute("id","battlecalc");
    th.innerHTML = "<a href='http://corentin.jarnoux.free.fr/aecproject/bcproject.php?id=gaa3c210l9uhhx9wsxs8&al=' target='_new'>Battle Calc</a>";
    bookmarkLink.parentNode.insertBefore(th,bookmarkLink);
    document.getElementById("base").setAttribute("width","11%");
    document.getElementById("map").setAttribute("width","11%");
    document.getElementById("fleet").setAttribute("width","11%");
    document.getElementById("empire").setAttribute("width","11%");
    document.getElementById("commander").setAttribute("width","12%");
    document.getElementById("guild").setAttribute("width","11%");
    document.getElementById("notes").setAttribute("width","11%");
    document.getElementById("bookmarks").setAttribute("width","11%");
    var otherRows = document.evaluate("/html/body/table/tbody/tr/td",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
    otherRows.setAttribute("colspan",5);
}

/*
==========================================
Battle Calculator Functions
==========================================
*/
function insertAttackBattleCalcLink(){
    console.log("inserting battle calc link on attack page");
    var button = '    <div id="gm_update_alert_buttons">'
    +'        <span id="openCalc"><a href="http://corentin.jarnoux.free.fr/aecproject/bcproject.php?id=gaa3c210l9uhhx9wsxs8&al=" target="_new">Open in battle calculator</a></span>&nbsp;&nbsp;'
    +'</div>';
    var buttonElement = document.createElement("div");
    buttonElement.innerHTML = button;
    buttonElement.setAttribute("align","center");
    var cancelLink = document.evaluate(
    "//a[text()='Cancel Attack']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    //console.log(cancelLink);
    document.body.insertBefore(buttonElement, null);
    document.getElementById('openCalc').addEventListener('click', function(event) {
        saveBattleData();setSetting("attacking",true);
    }
    , true);
}

function saveBattleData(){
    saveFleetQuantities(2);
    saveFleetQuantities(3);
    saveDefensivePlayerName();
    saveFleetTech();
}

function saveTechData(){
    //console.log("Saving tech data");
    var techData = new Array();
    var rows = document.evaluate(
    "//tr[@align='center']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("Tech rows: "+ rows.snapshotLength);
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var techNameCell = document.evaluate(
        "th[1]",
        rows.snapshotItem(i),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
        var techValueCell = document.evaluate(
        "td[4]",
        rows.snapshotItem(i),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
        if(techNameCell.snapshotLength > 0)
        {
            var techValue = parseInt(techValueCell.snapshotItem(0).innerHTML);
            var techName = techNameCell.snapshotItem(0).innerHTML;
            //console.log(techName +": "+techValue);
            techData[i] = techValue;
        }
    }
    setSetting("techData",techData.join());
	
	var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	setSetting('lastTechCheck', currentTime);
}
function saveFleetQuantities(tableIndex){
    //console.log("Saving fleet quantities");
    var rows = document.evaluate(
    "//table["+tableIndex+"]//tr[@align='center']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("Attack fleet: "+rows.snapshotLength);
    var fleetArray = new Array();
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var row = rows.snapshotItem(i);
        //console.log(row);
        var ship = row.childNodes[0].innerHTML;
        var quantity = row.childNodes[1].innerHTML;
        console.log(ship +": "+quantity +": "+getShipIndex(ship));
        fleetArray[getShipIndex(ship)] = quantity;
    }
    if(tableIndex == 2)
    setSetting("attackFleet",fleetArray.join());
    if(tableIndex == 3)
    setSetting("defenseFleet",fleetArray.join());
}
function insertFleetToBattleCalcLink() {
    if(document.evaluate("//select",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
		return;
    if(document.evaluate("//map",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
		return;
    //console.log("inserting battle calc link on fleet page");
    var button = '    <div id="gm_update_alert_buttons">'
    +'        <span id="openCalc"><a href="http://corentin.jarnoux.free.fr/aecproject/bcproject.php?id=gaa3c210l9uhhx9wsxs8&al=" target="_new">Open in battle calculator</a></span>&nbsp;&nbsp;'
    +'</div>';
    var buttonElement = document.createElement("div");
    buttonElement.innerHTML = button;
    buttonElement.setAttribute("align","center");
    //console.log(cancelLink);
    document.body.insertBefore(buttonElement, null);
    document.getElementById('openCalc').addEventListener('click', function(event) {
        saveFleetQuantitiesFromFleetScreen();saveDefensivePlayerName();setSetting("previewing",true);
    }
    , true);
}
function saveFleetQuantitiesFromFleetScreen(){
    console.log("Saving fleet quantities");
    var rows = document.evaluate(
	    "//body/table[last()]//tr",
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
    //console.log("Attack fleet: "+(rows.snapshotLength));
    var fleetArray = new Array();
    for (var i = 2; i < (rows.snapshotLength); i++)
    {
		
        var row = rows.snapshotItem(i);
		console.log(row.childNodes.length);
		if(row.childNodes.length==1)
			break;
        //console.log(row);
        var ship = row.childNodes[0].firstChild.innerHTML;
        var quantity = row.childNodes[1].innerHTML;
        //console.log(ship +": "+quantity +": "+getShipIndex(ship));
        fleetArray[getShipIndex(ship)] = quantity;
    }
	setSetting("fleetToAddToCalculator",fleetArray.join());
}
function getShipIndex (shipName){
    switch(shipName)
    {
        case "Fighters": {
            return FT_INDEX;
        }
        case "Bombers": {
            return BO_INDEX;
        }
        case "Heavy Bombers": {
            return HB_INDEX;
        }
        case "Ion Bombers": {
            return IB_INDEX;
        }
        case "Corvette": {
            return CV_INDEX;
        }
        case "Recycler": {
            return RC_INDEX;
        }
        case "Destroyer": {
            return DE_INDEX;
        }
        case "Frigate": {
            return FR_INDEX;
        }
        case "Ion Frigate": {
            return IF_INDEX;
        }
        case "Scout Ship": {
            return SS_INDEX;
        }
        case "Outpost Ship": {
            return OS_INDEX;
        }
        case "Cruiser": {
            return CR_INDEX;
        }
        case "Carrier": {
            return CA_INDEX;
        }
        case "Heavy Cruiser": {
            return HC_INDEX;
        }
        case "Battleship": {
            return BC_INDEX;
        }
        case "Fleet Carrier": {
            return FC_INDEX;
        }
        case "Dreadnought": {
            return DN_INDEX;
        }
        case "Titan": {
            return TI_INDEX;
        }
        case "Leviathan": {
            return LE_INDEX;
        }
        case "Death Star": {
            return DS_INDEX;
        }
        case "Barracks": {
            return BARRACKS_INDEX;
        }
        case "Laser Turrets": {
            return LASER_TURRETS_INDEX;
        }
        case "Missle Turrets": {
            return MISSLE_TURRETS_INDEX;
        }
        case "Plasma Turrets": {
            return PLASMA_TURRENTS_INDEX;
        }
        case "Ion Turrets": {
            return ION_TURRETS_INDEX;
        }
        case "Photon Turrets": {
            return PHOTON_TURRETS_INDEX;
        }
        case "Disruptor Turrets": {
            return DISRUPTOR_TURRETS_INDEX;
        }
        case "Deflection Shields": {
            return DEFLECTION_SHIELDS_INDEX;
        }
        case "Planetary Shield": {
            return PLANETARY_SHIELD_INDEX;
        }
        case "Planetary Ring": {
            return PLANETARY_RING_INDEX;
        }
    }
}
function saveDefensivePlayerName(){
    console.log("saving player name");
    var playerName = "N/A";
    if(window.location.href.indexOf("attack")!=-1)
    {
        var playerLink = document.evaluate("//a",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(2);
        //console.log("link: "+playerLink);
        playerName = playerLink.innerHTML;
    }
    else
    {
        var playerLink = document.evaluate("//th[text()='Player']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
        //console.log("link: "+playerLink.parentNode.nextSibling.firstChild.textContent);
        playerName = playerLink.parentNode.nextSibling.firstChild.textContent;
    }
    setSetting("defendPlayer",escape(playerName));
}
function saveCommandCenterAndCommanderCount(){
    console.log("Saving command centers and commanders");
    var rows = document.evaluate(
    "//table[1]//tr",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    console.log("Rows: "+rows.snapshotLength);
    var defenseFound = false;
    var attackCommandCenters = 0;
    var attackCommanders = "";
    var defendCommandCenters = 0;
    var defendCommanders = "";
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var row = rows.snapshotItem(i);
        //console.log(row.firstChild.nodeName);
        if(row.firstChild.nodeName == "TH")
        {
            if(row.firstChild.textContent == "Defense Force")
            defenseFound == true;
        }
        else
        {
            if(row.firstChild.textContent == "Command Centers")
            {
                if(defenseFound)
                defendCommandCenters = row.childNodes[1].textContent;
                else
                attackCommandCenters = row.childNodes[1].textContent;
            }
            else if(row.firstChild.textContent == "Commander")
            {
                if(defenseFound)
                defendCommanders = row.childNodes[1].textContent;
                else
                attackCommanders = row.childNodes[1].textContent;
            }
        }
    }
    console.log("Defend Commander: " + defendCommanders);
    console.log("Attack Commander: " + attackCommanders);
    console.log("Defend Command centers: " + defendCommandCenters);
    console.log("Attack Command centers: " + attackCommandCenters);
    if(attackCommanders != "")
    {
        getCommanderLevel(attackCommanders);
    }
    if(defendCommanders != "")
    {
    }
    setSetting("CommandValues","1,2,3,4");
}
function getCommanderLevel(commanderString)
{
    var space = attackCommanders.lastIndexOf(" ");
    console.log(space);
    attackCommanders = attackCommanders.substring(space,attackCommanders.length-1);
    console.log("Attack Commander: " + attackCommanders);
}
function saveFleetTech(){
    console.log("Saving fleet tech");
    var rows = document.evaluate(
    "//table[3]//tr[@align='center']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("Defense fleet: "+rows.snapshotLength);
    var fleetPowerArray = new Array();
    var fleetArmourArray = new Array();
    var fleetShieldArray = new Array();
    for (var i = 0; i < rows.snapshotLength; i++)
    {
        var row = rows.snapshotItem(i);
        //console.log(row);
        var ship = row.childNodes[0].innerHTML;
        var power = row.childNodes[3].innerHTML;
        var armour = row.childNodes[4].innerHTML;
        var shield = row.childNodes[5].innerHTML;
        //console.log(ship +": "+quantity +": "+getShipIndex(ship));
        fleetPowerArray[getShipIndex(ship)] = power;
        fleetArmourArray[getShipIndex(ship)] = armour;
        fleetShieldArray[getShipIndex(ship)] = shield;
    }
    setSetting("defenseFleetPower",fleetPowerArray.join());
    setSetting("defenseFleetArmour",fleetArmourArray.join());
    setSetting("defenseFleetShield",fleetShieldArray.join());
}
function fillEnemyFleetBattleCalc(attacking){
    if(attacking)
    {
        var fleet = getSetting("defenseFleet","");
        var fleetPower = getSetting("defenseFleetPower","");
        var fleetArmour = getSetting("defenseFleetArmour","");
        var fleetShield = getSetting("defenseFleetShield","");
        fleet = fleet.split(",");
        fleetPower = fleetPower.split(",");
        fleetArmour = fleetArmour.split(",");
        fleetShield = fleetShield.split(",");
    }
    else
    {
        var fleet = getSetting("fleetToAddToCalculator","");
        fleet = fleet.split(",");
    }
    //console.log(fleetPower);
    var rows = document.evaluate(
    "//body[1]//table[1]//tr[3]//td[2]//table//tr[@align='center']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("enemy fleet rows: "+ rows.snapshotLength);
    for (var i = 0; i < rows.snapshotLength; i++) {
        var row = rows.snapshotItem(i);
        //row.style.color = "red";
        //console.log(row);
        var ship = row.childNodes[0].firstChild.firstChild.innerHTML;
        var quantityTextBox = document.evaluate(".//input[@name='qt']",row,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        var quantity = fleet[i];
        if(quantity)
        {
            quantityTextBox.value = quantity;
        }
        if(attacking)
        {
            var powerTextBox = document.evaluate(".//input[@name='pw']",row,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
            var power = fleetPower[i];
            if(power)
            {
                //console.log(powerTextBox.name +": "+power);
                powerTextBox.value = power;
                //powerTextBox.style.color = "red";
            }
            var armourTextBox = document.evaluate(".//input[@name='ar']",row,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
            var armour = fleetArmour[i];
            if(armour)
            {
                //console.log(armourTextBox.name +": "+armour);
                armourTextBox.value = armour;
                //armourTextBox.style.color = "red";
            }
            var shieldTextBox = document.evaluate(".//input[@name='sh']",row,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
            var shield = fleetShield[i];
            if(shield && shieldTextBox)
            {
                //console.log(armourTextBox.name +": "+armour);
                shieldTextBox.value = shield;
                //shieldTextBox.style.color = "red";
            }
        }
        //console.log(ship +": "+quantity +": "+power);
    }
    unsafeWindow.calc(this,1,2);
    var title = document.evaluate(
    "//html/body/table/tbody/tr[3]/td[2]/table/tbody/tr/th",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    //console.log(title.innerHTML);
    title.innerHTML = title.innerHTML + "( "+unescape(getSetting("defendPlayer",""))+" )";
}
function fillAttackFleetBattleCalc(){
    var fleet = getSetting("attackFleet","");
    if(!fleet)
    return;
    fleet = fleet.split(",");
    var cells = document.evaluate(
    "//body[1]//table[1]//tr[3]//td[1]//table//tr[@align='center']//input[@name='qt']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log(rows);
    for (var i = 0; i < cells.snapshotLength; i++)
    {
        var quantityTextBox = cells.snapshotItem(i);
        //console.log(quantityTextBox);
        var quantity = fleet[i];
        if(quantity)
        {
            quantityTextBox.value = quantity;
            quantityTextBox.style.color = "red";
        }
    }
}
function fillTechDataOnBattleCalc(){
    //setSetting("techData","");
    //console.info("filling tech data");
    var techData = getSetting("techData","");
    //console.info("techData:" +techData);
    if(techData == "" || !techData)
    {
        return;
    }
    techData = techData.split(",");
    //console.log(techData);
    var cells = document.evaluate(
    "//form[@name='t1']//input[not(@readonly='true') and @type='text']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("fleet cells: "+ cells.snapshotLength);
    for (var i = 0; i < cells.snapshotLength; i++) {
        var textBox = cells.snapshotItem(i);
        //textBox.style.color = "red";
        //console.log(textBox.name);
        if(textBox.name == "al")
        textBox.value = techData[2];
        else if(textBox.name == "ll")
        textBox.value = techData[3];
        else if(textBox.name == "ml")
        textBox.value = techData[4];
        else if(textBox.name == "pl")
        textBox.value = techData[6];
        else if(textBox.name == "sl")
        textBox.value = techData[8];
        else if(textBox.name == "il")
        textBox.value = techData[9];
        else if(textBox.name == "hl")
        textBox.value = techData[10];
        else if(textBox.name == "dl")
        textBox.value = techData[12];
    }
}
/*
==========================================
Sum Fleets
==========================================
*/
var fleetData = new Array(); //[guild],[incoming],[landed],[incoming today]
var guildSummed = false;
function sumFleets()
{
    var rows = document.evaluate(
	    "//th[@colspan='4' and text()='Fleets']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue;
	    //console.log(rows);
    if(!rows)
		return;
    rows = rows.parentNode.parentNode.childNodes;
    var formatNumbers = getSetting(FORMAT_NUMBERS_KEY,true);
    var addFleets = getSetting(SUM_FLEETS_KEY,true);
    var now = new Date(), future = new Date();
    for(var i=2;i<rows.length;i++)
    {
        //console.log(rows[i]);
        var row = rows[i];
        var size = parseInt(row.childNodes[3].firstChild.textContent);
        if(formatNumbers)
        row.childNodes[3].firstChild.textContent = commaFormat(size);
        if(addFleets)
        {
            var player = row.childNodes[1].firstChild.textContent;
            var arrivalTimeCell = row.childNodes[2];
            var guild = getGuild(player);
            var incoming = (arrivalTimeCell.childNodes.length > 0);
            var incomingToday = false;
            //console.log(arrivalTimeCell);
            //console.log(arrivalTimeCell.id.indexOf('time') +": "+ parseInt(arrivalTimeCell.title)+"-<"+((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) && (parseInt(arrivalTimeCell.title) <= 0)));
            row.setAttribute("guild",guild);
            if((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) && (parseInt(arrivalTimeCell.title) >= 0) )
            {
                var time = arrivalTimeCell.title;
                future.setTime(now.getTime() + (time * 1000));
                incomingToday = (future.getDate() - now.getDate() == 0);
                //console.log("date diff: "+ (future.getDate() - now.getDate()));
                //if(incomingToday)
                //console.log("Incoming today");
            }
            //console.log(player +": "+size);
            var incomingSize = incoming? size:0;
            var incomingTodaySize = incomingToday? size:0;
            addFleetSize(guild,size,incomingSize,incomingTodaySize);
        }
    }
    if(addFleets)
    {
        if(guildSummed)
        insertFleetSummary();
    }
    //console.log(fleetData);
}
function addFleetSize(guild,size,incomingSize,incomingTodaySize)
{
    //console.log("adding fleet size " +guild +" size: "+size+" incomingSize: "+incomingSize+" incomingToday: "+incomingTodaySize);
    for(var i=0;i<fleetData.length;i++)
    {
        //console.log("Searching... "+fleetData[i][0]);
        if(fleetData[i][0]==guild)
        {
            //console.log("Found "+fleetData[i][0]);
            if(incomingSize==0)
            fleetData[i][1] = (fleetData[i][1] + size);
            fleetData[i][2] = (fleetData[i][2] + incomingSize);
            fleetData[i][3] = (fleetData[i][3] + incomingTodaySize);
            guildSummed = true;
            return;
        }
    }
    //console.log("adding guild "+guild+" at index "+fleetData.length);
    if(incomingSize==0)
    fleetData[fleetData.length] = new Array(guild,size,0,0);
    else
    fleetData[fleetData.length] = new Array(guild,0,incomingSize,incomingTodaySize);
}
function insertFleetSummary()
{
    var html = "<tr><th colspan='5'>Fleet Summary</th></tr><tr><th style='color:gold'>Guild</th><th style='color:gold'>Incoming (Today)</th><th style='color:gold'>Landed</th><th style='color:gold'>Total Fleet Size</th><th/></tr>"
    var style="";
    var incoming,arrived,incomingToday,total;
    var formatNumbers = getSetting(FORMAT_NUMBERS_KEY,true);
    for(var i=0;i<fleetData.length;i++)
    {
        incoming = fleetData[i][2];
        arrived = fleetData[i][1];
        total = fleetData[i][1] + fleetData[i][2];
        incomingToday = fleetData[i][3];
        var color = getHighlightColorForPlayer(getPlayerName(fleetData[i][0]));
        if(color==null)
        color = getHighlightColorForGuild(fleetData[i][0]);
        if(getSetting(HIGHLIGHT_PLAYERS_KEY,true))
        style = "style='color:"+color+"'";
        if(formatNumbers)
        {
            incoming = commaFormat(incoming);
            arrived = commaFormat(arrived);
            incomingToday = commaFormat(incomingToday);
            total = commaFormat(total);
        }
        html = html+"<tr align='center' "+style+"><td>"+fleetData[i][0]+"</td><td>"+incoming+" ("+incomingToday+")</td><td>"+arrived+"</td><td>"+total+"</td><td><a id='showHide"+fleetData[i][0]+"' href='javascript: void(0)'>Hide</a></td></tr>";
        //href='#showHide"+fleetData[i][0]+"'
    }
    var newTable = document.createElement("table");
    newTable.setAttribute("width","600");
    newTable.setAttribute("align","center");
    newTable.innerHTML = html;
    var table = document.evaluate(
    "//th[@colspan='4' and text()='Fleets']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue.parentNode.parentNode.parentNode;
    //console.log(table);
    //table.setAttribute("name","fleetTable");
    document.body.insertBefore(newTable,table);
    var br = document.createElement("br");
    document.body.insertBefore(br,table);
    //console.log("registering events");
    for(var i=0;i<fleetData.length;i++)
    {
        var link = document.getElementById("showHide"+fleetData[i][0]);
        link.addEventListener('click',getShowHideFleetClosure(fleetData[i][0]),true);
        //console.log(link);
        //console.log(getShowHideFleetClosure(fleetData[i][0]));
    }
}




function getShowHideFleetClosure(guild)
{
    function func(){
        toggleFleetVisibility(guild);
    }
    ;
    return func;
}
function toggleFleetVisibility(guild)
{
    //console.log("Toggle visibility for :" +guild);
    var guildRows = document.evaluate(
    "//tr[@guild='"+guild+"']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("Found " + guildRows.snapshotLength + " fleet(s)");
    for (var i = 0; i < guildRows.snapshotLength; i++)
    {
        var row = guildRows.snapshotItem(i);
        row.style.display = (row.style.display=="none")? "":"none";
        row.style.visibility = (row.style.visibility=="hidden")? "":"hidden";
    }
    var link = document.getElementById("showHide"+guild);
    link.textContent= (link.textContent=="Show")? "Hide":"Show";
    //document.body.scrollTop += 200;
}
/*
==========================================
Map Enhancements
==========================================
*/
function moveGalaxyList()
{
    var centerElement = document.evaluate(
    "//center",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    var canvasElement = document.evaluate(
    "//div[@id='myCanvas']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    centerElement.parentNode.removeChild(centerElement.previousSibling);
    centerElement.parentNode.appendChild(centerElement);
    centerElement.parentNode.insertBefore(document.createElement("br"),centerElement);
    var linksElement = document.getElementById("linksClones");
    if(linksElement)
    centerElement.setAttribute("style","position: relative; bottom: "+linksElement.offsetHeight);
}
function copyBaseLinks()
{
    var canvasElement = document.evaluate(
    "//div[@id='myCanvas']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    if(!canvasElement)
    return;
    var baseLinks = document.evaluate(
    "//a[@onmouseout][contains(@href,'base')]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("Found "+baseLinks.snapshotLength+" base(s).");
    if(baseLinks.snapshotLength ==0)
    return;
    var divElement = document.createElement("div");
    divElement.setAttribute("style","position: relative; left: 10%;border:2px ridge #9999FF;width:150;text-align:center;background-color:#000000");
    divElement.setAttribute("id","linksClones");
    var titleElement = document.createElement("center");
    titleElement.textContent = "Bases";
    //titleElement.setAttribute("text-align","center");
    divElement.appendChild(titleElement);
    for (var i = 0; i < baseLinks.snapshotLength; i++) {
        //console.log(baseLinks.snapshotItem(i));
        var clone = baseLinks.snapshotItem(i).cloneNode(true);
        divElement.appendChild(clone);
        divElement.appendChild(document.createElement("br"));
    }
    canvasElement.parentNode.insertBefore(divElement,canvasElement);
    canvasElement.setAttribute("style",canvasElement.getAttribute("style")+"bottom: "+divElement.offsetHeight);
    divElement.setAttribute("style",divElement.getAttribute("style")+"top: "+canvasElement.offsetHeight/4);
}
function copyFleetLinks()
{
    var canvasElement = document.evaluate(
    "//div[@id='myCanvas']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    if(!canvasElement)
    return;
    var fleetLinks = document.evaluate(
    "//a[@onmouseout][contains(@href,'fleet')][not(contains(@href,'edit'))]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log("Found "+fleetLinks.snapshotLength+" fleet(s).");
    if(fleetLinks.snapshotLength ==0)
    return;
    var divElement = document.createElement("div");
    divElement.setAttribute("style","position: relative; left: 10%;border:2px ridge #9999FF;width:150;text-align:center;background-color:#000000");
    divElement.setAttribute("id","linksClones");
    var titleElement = document.createElement("center");
    titleElement.textContent = "Fleets";
    //titleElement.setAttribute("text-align","center");
    divElement.appendChild(titleElement);
    for (var i = 0; i < fleetLinks.snapshotLength; i++) {
        //console.log(baseLinks.snapshotItem(i));
        var clone = fleetLinks.snapshotItem(i).cloneNode(true);
        divElement.appendChild(clone);
        divElement.appendChild(document.createElement("br"));
    }
    canvasElement.parentNode.insertBefore(divElement,canvasElement);
    canvasElement.setAttribute("style",canvasElement.getAttribute("style")+"bottom: "+divElement.offsetHeight);
    divElement.setAttribute("style",divElement.getAttribute("style")+"top: "+canvasElement.offsetHeight/4);
}
/*
==========================================
Base Default Presets
==========================================
*/
var DEFAULT_BASE_PRESET_1 = "0,0,0,0,0,0,17,10,5,4,0,20,10,10,5,10,0,0,0,0,0,-1,0,0,0,0,0,2,2,0,2,2";
var DEFAULT_BASE_PRESET_2 = "0,0,0,0,0,0,20,0,5,4,0,20,10,10,5,0,0,0,0,0,0,-1,0,0,0,0,0,2,2,0,2,2";
var DEFAULT_BASE_PRESET_3 = "0,0,0,0,0,22,15,0,5,4,0,15,10,10,5,0,0,0,0,0,0,-1,0,0,0,0,0,2,2,0,2,2";
var DEFAULT_BASE_PRESET_4 = "0,0,0,0,0,22,15,0,5,4,0,15,10,10,5,0,0,0,0,0,0,-1,0,0,0,0,0,2,2,0,2,2";
var DEFAULT_BASE_PRESET_NAME_1 = "E";
var DEFAULT_BASE_PRESET_NAME_2 = "P";
var DEFAULT_BASE_PRESET_NAME_3 = "R";
var DEFAULT_BASE_PRESET_NAME_4 = "JG";
var BASE_PRESET_1_NAME_KEY = "BASE_PRESET_1_NAME";
var BASE_PRESET_2_NAME_KEY = "BASE_PRESET_2_NAME";
var BASE_PRESET_3_NAME_KEY = "BASE_PRESET_3_NAME";
var BASE_PRESET_4_NAME_KEY = "BASE_PRESET_4_NAME";
var BASE_PRESET_1_VALUE_KEY = "BASE_PRESET_1_VALUE";
var BASE_PRESET_2_VALUE_KEY = "BASE_PRESET_2_VALUE";
var BASE_PRESET_3_VALUE_KEY = "BASE_PRESET_3_VALUE";
var BASE_PRESET_4_VALUE_KEY = "BASE_PRESET_4_VALUE";
/*
==========================================
Advanced Structures Page
==========================================
*/
function insertBaseSettingLinks()
{
    loadBaseTypes();
    GM_addStyle('.settingsLink {'
        +'    color: gold;'
        +'    font-weight: bold;'
        +'    font-size: x-small;'
        +'    background-color: #333399;'
        +'    border: solid 1px none;'
        +'  padding-left: 2px;'
        +'  padding-right: 2px;'
        +'  margin-left: 2px;'
        +'  margin-right: 2px;'
        +'}'
    +' .settingsLinkSelected {'
        +'    color: black;'
        +'    font-weight: bold;'
        +'    font-size: x-small;'
        +'    background-color: #gold;'
        +'    border: solid 1px none;'
        +'  padding-left: 2px;'
        +'  padding-right: 2px;'
        +'  margin-left: 2px;'
        +'  margin-right: 2px;'
        +'}'
    );
	
    var baseLinks = document.evaluate(
		    "//a[contains(@href,'base.aspx?base=')]",
		    document,
		    null,
		    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		    null);
    //console.log("Found "+baseLinks.snapshotLength +" base(s).");
    var fillerTd = document.createElement("td");
    fillerTd.setAttribute("align","center");
    fillerTd.innerHTML = "<a href='"+window.location.href+"&mode=edit' id='editLink'>Edit Goals</a>";
    //fillerTd.setAttribute("width","*");
    //fillerTd.setAttribute("colspan","3");
    
	var topRow = baseLinks.snapshotItem(0).parentNode.parentNode.previousSibling;
    var fillerTd2 = document.createElement("td");
    fillerTd2.setAttribute("width","*");
    //    fillerTd2.innerHTML = "--";
   
	var instructionTd = document.createElement("td");
    instructionTd.setAttribute("width",18);
    instructionTd.setAttribute("align","center");
    instructionTd.setAttribute("style","border-style: solid; border-color: rgb(0, 0, 102); border-width: 0pt 1px 1px; font-family: verdana,arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 8px; line-height: normal; font-size-adjust: none; font-stretch: normal;padding-bottom:12px");
    instructionTd.innerHTML = "<font style='color:red;font-size: large;'>&#x25CF;</font><br> <br>N<br>O<br>T<br> <br>S<br>T<br>A<br>R<br>T<br>E<br>D<br>";
    topRow.replaceChild(instructionTd,topRow.firstChild);
    instructionTd = document.createElement("td");
    instructionTd.setAttribute("width",18);
    instructionTd.setAttribute("align","center");
    instructionTd.setAttribute("style","border-style: solid; border-color: rgb(0, 0, 102); border-width: 0pt 1px 1px; font-family: verdana,arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 8px; line-height: normal; font-size-adjust: none; font-stretch: normal;padding-bottom:12px");
    instructionTd.innerHTML = "<font style='color:blue;font-size: large;'>&#x25CF;</font><br> <br>P<br>R<br>O<br>G<br>R<br>E<br>S<br>S<br>I<br>N<br>G";
    topRow.insertBefore(instructionTd,topRow.firstChild);
    topRow.insertBefore(fillerTd2,topRow.firstChild);
    topRow.insertBefore(fillerTd,topRow.firstChild);
    
	var preset1Name = getSetting(BASE_PRESET_1_NAME_KEY,DEFAULT_BASE_PRESET_NAME_1);
    var preset2Name = getSetting(BASE_PRESET_2_NAME_KEY,DEFAULT_BASE_PRESET_NAME_2);
    var preset3Name = getSetting(BASE_PRESET_3_NAME_KEY,DEFAULT_BASE_PRESET_NAME_3);
    var preset4Name = getSetting(BASE_PRESET_4_NAME_KEY,DEFAULT_BASE_PRESET_NAME_4);
    //var lastElement;
    
	for(var i = 0;i<baseLinks.snapshotLength;i++)
    {
        var link = baseLinks.snapshotItem(i);
		row = link.parentNode.parentNode;
        row.firstChild.setAttribute("colspan","3");
        
		var baseId = link.href.substring(link.href.indexOf("=")+1);
        var settingsTd = document.createElement("td");
        var html = "<a class='settingsLink' href='#"+baseId+"' id='1-"+baseId+"'>"+preset1Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='2-"+baseId+"'>"+preset2Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='3-"+baseId+"'>"+preset3Name+"</a>"+
        "<a class='settingsLink' href='#"+baseId+"' id='4-"+baseId+"'>"+preset4Name+"</a>";
        settingsTd.innerHTML = html;
        row.insertBefore(settingsTd,row.firstChild);
        //console.log(document.getElementById("E"+baseId));
        var baseType = getBaseType(baseId);
        //console.log("Base Type: "+baseType);
        
		//Modify base link to go directly to structures page
		link.href = link.href + "&view=structures";
		
		if(baseType)
			onBaseTypeSet(baseId,baseType);
        
		document.getElementById("1-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"1"),true);
        document.getElementById("2-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"2"),true);
        document.getElementById("3-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"3"),true);
        document.getElementById("4-"+baseId).addEventListener('click', getSetBaseClosure(baseId,"4"),true);
    }
}

function getSetBaseClosure(baseId,type)
{
    function func(){
        setBase(baseId,type);
    }
    ;
    return func;
}
var bases;
var baseTypes = new Array();
function setBase(baseId,type)
{
    //console.log(baseId +": "+type);
    for(var i=0;i<baseTypes.length;i++)
    {
        //console.log("Searching... "+fleetData[i][0]);
        if(baseTypes[i].split("=")[0]==baseId)
        {
            //console.log("Found "+fleetData[i][0]);
            baseTypes[i] = baseId+"="+type;
            saveBaseTypes();
            onBaseTypeSet(baseId,type);
            return;
        }
    }
    baseTypes[baseTypes.length] = baseId+"="+type;
    saveBaseTypes();
    onBaseTypeSet(baseId,type);
}

function getBaseType(baseId)
{
    for(var i=0;i<baseTypes.length;i++)
    {
        //console.log("Searching... "+baseTypes[i][0]);
        if(baseTypes[i].split("=")[0]==baseId)
        {
            //console.log("Found base type: "+baseTypes[i].split("=")[1]);
            return baseTypes[i].split("=")[1];
        }
    }
    return null;
}

function getBaseTypeValues(type)
{
    //console.log("Finding array for "+type);
    var array;
    switch(type)
    {
        case "1":{
            array = getSetting(BASE_PRESET_1_VALUE_KEY,DEFAULT_BASE_PRESET_1);break;
        }
        case "2":{
            array = getSetting(BASE_PRESET_2_VALUE_KEY,DEFAULT_BASE_PRESET_2);break;
        }
        case "3":{
            array = getSetting(BASE_PRESET_3_VALUE_KEY,DEFAULT_BASE_PRESET_3);break;
        }
        case "4":{
            array = getSetting(BASE_PRESET_4_VALUE_KEY,DEFAULT_BASE_PRESET_4);break;
        }
        default:{
            return null;
        }
        ;
    }
    array = array.split(",");
    return array;
}

function saveBaseTypeValues(array,type)
{
    switch(type)
    {
        case "1":{
            setSetting(BASE_PRESET_1_VALUE_KEY,array.join(","));break;
        }
        case "2":{
            setSetting(BASE_PRESET_2_VALUE_KEY,array.join(","));break;
        }
        case "3":{
            setSetting(BASE_PRESET_3_VALUE_KEY,array.join(","));break;
        }
        case "4":{
            setSetting(BASE_PRESET_4_VALUE_KEY,array.join(","));break;
        }
    }
}

function onBaseTypeSet(baseId,type)
{
    //console.log(type+"-"+baseId);
    if(document.getElementById(type+"-"+baseId).getAttribute("class") =="settingsLinkSelected")
    {
        //Clear
        document.getElementById(type+"-"+baseId).setAttribute("class","settingsLink");
        fillCells(baseId,"clear");
    }
    else
    {
        //apply
        document.getElementById(type+"-"+baseId).setAttribute("class","settingsLinkSelected");
        //console.log(baseTypes);
        switch(type)
        {
            case "1":{
                document.getElementById("2-"+baseId).setAttribute("class","settingsLink");document.getElementById("3-"+baseId).setAttribute("class","settingsLink");document.getElementById("4-"+baseId).setAttribute("class","settingsLink");break;
            }
            case "2":{
                document.getElementById("1-"+baseId).setAttribute("class","settingsLink");document.getElementById("3-"+baseId).setAttribute("class","settingsLink");document.getElementById("4-"+baseId).setAttribute("class","settingsLink");break;
            }
            case "3":{
                document.getElementById("1-"+baseId).setAttribute("class","settingsLink");document.getElementById("2-"+baseId).setAttribute("class","settingsLink");document.getElementById("4-"+baseId).setAttribute("class","settingsLink");break;
            }
            case "4":{
                document.getElementById("1-"+baseId).setAttribute("class","settingsLink");document.getElementById("2-"+baseId).setAttribute("class","settingsLink");document.getElementById("3-"+baseId).setAttribute("class","settingsLink");break;
            }
        }
        fillCells(baseId,type);
    }
}

function fillCells(baseId,type)
{
    var targetValues = getBaseTypeValues(type);
    //console.log("//a[contains(@href,'base.aspx?base="+baseId+"')]");
    var baseLink = document.evaluate(
    "//a[contains(@href,'base.aspx?base="+baseId+"')]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    //console.log("Found "+baseLink.singleNodeValue +" base.");
    var row = baseLink.parentNode.parentNode;
    //console.log(row);
    for(var i=2;i<row.childNodes.length;i++)
    {
        var cell = row.childNodes[i];
        //Reset
        if(cell.childNodes.length ==1)
        {
            var small = cell.childNodes[0];
            if(small.style.color=="blue")
            small.style.color="white";
            if(small.style.color == "red")
            cell.removeChild(small);
        }
        if(type=="clear")
        {
            //console.log("resetting cell");
            continue;
        }
        var targetValue = targetValues[i-2];
        if(targetValue == "-1")
        continue;
        //console.log(cell);
        //console.log(i+": "+targetValue);
        if(cell.childNodes.length ==1)
        {
            var count = parseInt(small.textContent);
            if(count < targetValue)
            small.style.color = "blue";
        }
        else
        {
            if(targetValue > 0)
            {
                var small = document.createElement("small");
                small.style.color = "red";
                small.textContent = targetValue;
                cell.appendChild(small);
            }
        }
    }
}

function insertEditRows()
{
    var table = document.evaluate(
    "//table[not(@class)]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    //console.log(table);
    var typeArray = new Array("1","2","3","4");
    var typeNameArray = new Array(getSetting(BASE_PRESET_1_NAME_KEY,DEFAULT_BASE_PRESET_NAME_1),
    getSetting(BASE_PRESET_2_NAME_KEY,DEFAULT_BASE_PRESET_NAME_2),
    getSetting(BASE_PRESET_3_NAME_KEY,DEFAULT_BASE_PRESET_NAME_3),
    getSetting(BASE_PRESET_4_NAME_KEY,DEFAULT_BASE_PRESET_NAME_4));
    for(var j = 0;j<typeArray.length;j++)
    {
        var newRow = document.createElement("tr");
        newRow.setAttribute("align","center");
        newRow.setAttribute("id",typeArray[j]);
        var newCell = document.createElement("td");
        newCell.setAttribute("align","right");
        newCell.setAttribute("style","padding-right:5px");
        newCell.colspan = 2;
        newCell.innerHTML = "<input type='text' size='1.5' value='"+typeNameArray[j]+"'/>";
        newRow.appendChild(newCell);
        var typeValues = getBaseTypeValues(typeArray[j]);
        //console.log(typeValues);
        for(var i = 0;i<=31;i++)
        {
            newCell = document.createElement("td");
            if(i!=21)
            {
                //console.log(typeValues[i]);
                newCell.innerHTML ="<input type='text' size='1.5' value='"+typeValues[i]+"'/>";
            }
            newRow.appendChild(newCell);
        }
        table.firstChild.appendChild(newRow);
    }
    var center = document.createElement("center");
    center.setAttribute("style","margin-top: 5px;");
    var button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value","Save");
    button.setAttribute("id","save");
    center.appendChild(button);
    document.body.appendChild(center);
    var href = window.location.href.replace("&mode=edit","");
    button.addEventListener('click',function(event){
        saveNewBaseTypeValues();    window.location = href;
    }
    ,true);
    button = document.createElement("input");
    button.setAttribute("type","button");
    button.setAttribute("value","Cancel");
    button.setAttribute("id","Cancel");
    button.setAttribute("style","margin-left: 5px;");
    center.appendChild(button);
    button.addEventListener('click',function(event){
        window.location = href;
    }
    ,true);
}

function saveNewBaseTypeValues()
{
    //console.log("Saving new base type values");
    var rows = document.evaluate(
    "//tr[@id='1' or @id='2' or @id='3' or @id='4']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log(rows.snapshotLength);
    setSetting(BASE_PRESET_1_NAME_KEY,rows.snapshotItem(0).childNodes[0].firstChild.value);
    setSetting(BASE_PRESET_2_NAME_KEY,rows.snapshotItem(1).childNodes[0].firstChild.value);
    setSetting(BASE_PRESET_3_NAME_KEY,rows.snapshotItem(2).childNodes[0].firstChild.value);
    setSetting(BASE_PRESET_4_NAME_KEY,rows.snapshotItem(3).childNodes[0].firstChild.value);
    //console.log(rows[0].childNodes[0].firstChild.value);
    for(var j=0;j<rows.snapshotLength;j++)
    {
        var array = new Array();
        var row = rows.snapshotItem(j);
        var type = row.getAttribute("id");
        //console.log(row);
        for(var i=1;i<row.childNodes.length;i++)
        {
            var structureId = (i-1);
            if(i!=22)
            {
                //console.log(row.childNodes[i].firstChild.value);
                array[structureId]=row.childNodes[i].firstChild.value;
            }
            else
            array[structureId]="-1";
        }
        saveBaseTypeValues(array,type);
    }
}

function saveBases()
{
    //console.log("Saving bases");
    var links = document.evaluate(
    "//a[contains(@href,'base.aspx?base=')]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log(links.snapshotLength);
    bases = new Array();
    for(var i=0;i<links.snapshotLength;i++)
    {
        var link = links.snapshotItem(i);
        //console.log(link);
        bases[i] = link.textContent+ "=" +link.href.split("=")[1];
    }
    //console.log(bases);
    setSetting("bases",escape(bases.join(",")));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    setSetting('lastBaseCheck', currentTime);
}

function loadBases()
{
    var loaded = getSetting("bases",null);
    if(!loaded)
    return;
    loaded = unescape(loaded);
    bases = loaded.split(",");
    //console.log(bases);
}

function isBase(base)
{
    if(bases==null)
    loadBases();
    if(bases==null)
    return false;
    for(var i=0;i<bases.length;i++)
    {
        if(base == bases[i].split("=")[0])
        return true;
    }
    return false;
}

function checkBaseDataAge()
{
    if(getSetting('bases',null) == null)
    return;
    //console.log('Base data check.');
    var lastBaseCheck = parseInt(getSetting('lastBaseCheck', 0));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    //console.log('lastBaseCheck: '+lastBaseCheck);
    //console.log('currentTime: '+currentTime);
    //console.log('Need fresh trade data: ' + (currentTime < (lastBaseCheck + (86400*3))));
    //console.log('Next Check (minutes): '+ ( (lastBaseCheck + (86400*3)) - currentTime)/60 );
    if (currentTime > (lastBaseCheck + (864000*3)))
    {
        insertNotification('Base data has not been updated in over three days.<br>'
        +'    Visit the empire structures page to refresh the information.<br><br><br>');
    }
}

function saveBaseTypes()
{
    //console.log(baseTypes);
    setSetting("newBaseTypes",escape(baseTypes.join(",")));
}

function loadBaseTypes()
{
    var loaded = getSetting("newBaseTypes",null);
    if(!loaded)
    return;
    loaded = unescape(loaded);
    baseTypes = loaded.split(",");
    //console.log(baseTypes);
}

/*
==========================================
Fleet movement links
==========================================
*/
var supportShips = new Array("Recycler","Scout Ship","Outpost Ship","Carrier","Fleet Carrier");
var attackShips = new Array("Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Destroyer","Frigates","Ion Frigate","Cruiser","Heavy Cruiser","Battleship","Dreadnought","Titan","Leviathan","Death Star");
var availableShips = new Array();
function setAvailableShips()
{
    var ships = document.evaluate(
	    "//td/b",
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
    //console.log("Found "+ships.snapshotLength+" ships types.");
    for(var i=0;i<ships.snapshotLength;i++)
    {
        //console.log(ships.snapshotItem(i));
        availableShips[i] = ships.snapshotItem(i).textContent;
    }
    //console.log(availableShips);
}

function isAvailableShip(ship)
{
    for(var i=0;i<availableShips.length;i++)
    {
        //console.log(ship+" = "+availableShips[i]);
        if(ship == availableShips[i])
        {
            //console.log(ship+" = "+availableShips[i]);
            return true;
        }
    }
    return false;
}

function createSupportMovementHref()
{
    var href = "";
    for(var i=0;i<supportShips.length;i++)
    {
        if(isAvailableShip(supportShips[i]))
        href = href + "javascript:maxquant('"+supportShips[i]+"');";
    }
    for(var i=0;i<attackShips.length;i++)
    {
        if(isAvailableShip(attackShips[i]))
        href = href + "javascript:zero('"+attackShips[i]+"');";
    }
    //console.log("support href: "+href);
    return href;
}

function createAttackMovementHref(includeFighters)
{
    var href = "";
    for(var i=0;i<supportShips.length;i++)
    {
        if(isAvailableShip(supportShips[i]))
        href = href + "javascript:zero('"+supportShips[i]+"');";
    }
    var i=0;
    if(!includeFighters)
    {
        href = href+"javascript:zero('Fighters');";
        i = 1;
    }
    for(i;i<attackShips.length;i++)
    {
        if(isAvailableShip(attackShips[i]))
        href = href + "javascript:maxquant('"+attackShips[i]+"');";
    }
    //console.log("attack href ("+includeFighters+"): "+href);
    return href;
}

function createAllMovementNoFTHref()
{
    var href = "";
    href = href+"javascript:zero('Fighters');";
    for(var i=0;i<supportShips.length;i++)
    {
        if(isAvailableShip(supportShips[i]))
        href = href + "javascript:maxquant('"+supportShips[i]+"');";
    }
    for(var i=1;i<attackShips.length;i++)
    {
        if(isAvailableShip(attackShips[i]))
        href = href + "javascript:maxquant('"+attackShips[i]+"');";
    }
    return href;
}

function insertMoveFleetLinks()
{
    setAvailableShips();
    //"javascript:zero('Fighters');javascript:zero('Bombers');javascript:zero('Heavy Bombers');javascript:zero('Corvette');javascript:zero('Recycler');javascript:zero('Destroyer');javascript:zero('Scout Ship');javascript:zero('Cruiser');javascript:zero('Carrier');javascript:zero('Heavy Cruiser');javascript:zero('Battleship');javascript:zero('Fleet Carrier');javascript:zero('Dreadnought');"
    //"javascript:maxquant('Fighters');javascript:maxquant('Bombers');javascript:maxquant('Heavy Bombers');javascript:maxquant('Corvette');javascript:maxquant('Recycler');javascript:maxquant('Destroyer');javascript:maxquant('Scout Ship');javascript:maxquant('Cruiser');javascript:maxquant('Carrier');javascript:maxquant('Heavy Cruiser');javascript:maxquant('Battleship');javascript:maxquant('Fleet Carrier');javascript:maxquant('Dreadnought');"
    var allNoFTHref = createAllMovementNoFTHref();
    var supportHref = createSupportMovementHref();
    var attackHref = createAttackMovementHref(true);
    var attackNoFTHref = createAttackMovementHref(false);
    var cell = document.evaluate(
    "//a[text()='all']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue.parentNode;
    var noneLink = cell.childNodes[2];
    cell.removeChild(noneLink);
    cell.innerHTML = cell.innerHTML+' <a href="'+allNoFTHref+'">all(no FT)</a> - <a href="'+supportHref+'">support</a> - <a href="'+attackHref+'">attack</a> - <a href="'+attackNoFTHref+'">attack(no FT)</a> - ';
    cell.setAttribute("colspan","3");
    cell.parentNode.removeChild(cell.nextSibling);
    cell.parentNode.removeChild(cell.previousSibling);
    cell.appendChild(noneLink);
}

/*
==========================================
Create Trade Message
==========================================
*/
/*
function createTradeMessage()
{
    var table = document.evaluate(
    "//th[@class='th_header2']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue.parentNode.parentNode;
    //console.log(table);
    var string = "";
    rows = table.childNodes;
    for(var i=2;i<rows.length - 1;i++)
    {
        //console.log(rows[i]);
        var location = rows[i].childNodes[1].firstChild.textContent;
        var economy = rows[i].childNodes[2].textContent;
        var routesString = rows[i].childNodes[3].firstChild.textContent;
        var routes = parseInt(routesString.split(" / ")[0]);
        var totalRoutes = parseInt(routesString.split(" / ")[1]);
        routes = routes - 1;
        if(routes != totalRoutes)
        {
            string = string + location +" "+economy+" "+" "+routes+" / "+totalRoutes + "<br>";
            //console.log(location +" ("+economy+")"+" "+routes+" of "+totalRoutes);
        }
    }
    //Insert Div
    var divElement = document.createElement("div");
    divElement.setAttribute("style","border:2px ridge #9999FF;font-weight:normal;width:200;background-color:#000000");
    divElement.innerHTML = string;
    //console.log(table.parentNode.nextSibling);
    var center = document.createElement("center");
    center.appendChild(divElement);
    document.body.insertBefore(center,table.parentNode.nextSibling);
    document.body.insertBefore(document.createElement("br"),center);
    //console.log(string);
}
*/

/*
==========================================
Hide Bases with Full Trade Routes
==========================================
*/
var hideTradeRows = false;
function toggleBasesWithFullTrades()
{
    if(hideTradeRows)
    {
        window.location.reload();
        return;
    }
    var table = document.evaluate(
    "//th[@class='th_header2']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue.parentNode.parentNode;
    //console.log(table);
    var string = "";
    rows = table.childNodes;
    var i = 2;
    do
    {
        //console.log(rows[i]);
        var location = rows[i].childNodes[1].firstChild.textContent;
        var economy = rows[i].childNodes[2].textContent;
        var routesString = rows[i].childNodes[3].firstChild.textContent;
        var routes = parseInt(routesString.split(" / ")[0]);
        var totalRoutes = parseInt(routesString.split(" / ")[1]);
        //console.log(location +" ("+economy+")"+" "+routes+" of "+totalRoutes);
        //if(i<4 && i<14)
        //    routes-=1;
        //This line hides the base names as well.
        //rows[i].childNodes[0].firstChild.style.display= hideTradeRows?  "":"none";
        if(routes == totalRoutes)
        {
            //console.log("hide");
            rows[i].style.display = hideTradeRows?  "":"none";
            rows[i].style.visibility = hideTradeRows?  "":"hidden";
            rows[i].parentNode.removeChild(rows[i]);
            i-=1;
        }
        i++;
    }
    while(rows[i] != null && rows[i].getAttribute("align")=="center")
    hideTradeRows = !hideTradeRows;
    document.getElementById("hideTradesLink").textContent = hideTradeRows? "Show all":"Hide full trades";
}

function insertToggleLink()
{
    var lastRow = document.evaluate(
    "//th[@class='th_header2']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue.parentNode.parentNode.lastChild;
    //console.log(lastRow);
    var a = document.createElement("a");
    a.href = "javascript:void(0)";
    a.setAttribute("id","hideTradesLink");
    a.textContent = "Hide full trades";
    a.addEventListener('click',function(event){
        toggleBasesWithFullTrades();
    }
    ,true);
    lastRow.firstChild.appendChild(a);
    //removeBasesWithFullTrade();
}


/*
==========================================
Format Numbers
==========================================
*/
function formatVariousNumbers()
{
    
	var debrisElement = document.evaluate(
    "//center[contains(text(),'Debris')]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    if(debrisElement !=null)
    {
        var debrisMessage = debrisElement.textContent;
        console.log(debrisMessage);
        var indexOfText = debrisMessage.indexOf(" credits");
        var valueText = debrisMessage.substring(0,indexOfText);
        var value = commaFormat(parseInt(valueText));
        //console.log(valueText+" new value:" +value.toString());
        //console.log(debrisElement.textContent + " -< " + debrisElement.textContent.replace(valueText,value.toString()));
        debrisElement.textContent = debrisElement.textContent.replace(valueText,value.toString());
    }
	
	/*regex = />(\d*?)</ig;
	var source = document.body.innerHTML, result;
	
	do
	{
		result = regex.exec(source);
		if(result)
		{
			if(result[1] != "")
			{
				//console.log(result);
				document.body.innerHTML = document.body.innerHTML.replace(result[1],commaFormat(result[1]));
			}
		}
	}
	while(result)
	*/
}

function sumSingleFleet(){
	var regex = /<td><b>(.*?)<\/b><\/td><td align=.*?>(\d*?)<\/td>/ig;
	var source = document.body.innerHTML, result;
	var fightingSize = 0, totalSize = 0;
	do
	{
		result = regex.exec(source);
		
		if(result)
        {
			console.log(result);
			var shipName = result[1];
			var shipIndex = getShipIndex(shipName);
			var shipSize =  shipValues[shipIndex] * parseInt(result[2]);
			console.log(parseInt(result[2]) + " "+ shipName +"(s) ("+shipSize+") is fighting ship: "+isFightingShip(shipIndex));
			
			totalSize += shipSize;
			if(isFightingShip(shipIndex))
				fightingSize += shipSize;
		}
	}
	while(result)
	
	console.log("Fighting Size: "+fightingSize);
	console.log("Total Size: "+totalSize);
	
	var table = document.evaluate(
	    "//th[@colspan='3' and @class='th_header2']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue;
	    //console.log(rows);
    console.log(table);
	if(!table)
		return;
    table = table.parentNode.parentNode;
	console.log(table);
	
	table.innerHTML = table.innerHTML + "<tr><td><b>Fighting Size</b></td><td align='center'>"+fightingSize+"</td></tr>"+
										"<tr><td><b>Total Size</b></td><td align='center'>"+totalSize+"</td></tr>";

}


/*
==========================================
Sum Credits Page
==========================================
*/
function sumCreditsPage()
{
    /* Code runs on credits.aspx and sums up values.
    * The main usefulness is to figure how much debris you picked up. */
    var regex = /<td>(.+?)<\/td><td>(.\d+?)<\/td>/ig;
    var source = document.body.innerHTML, result, debris = 0, income = 0, otherIncome = 0, pillage = 0, loss = 0, production = 0, construction = 0,research = 0; tradeRoutes = 0, plunderedRoutes = 0, goodsSale = 0;
    do
    {
        result = regex.exec(source);
		//console.log(result);
        if(result)
        {
            //console.log(result[1]+": "+parseInt(result[2]));
            if(result[1].indexOf('Pillage of') !== -1)
				pillage += parseInt(result[2]);
            else if(result[1].indexOf('Empire Income') !== -1)
				income += parseInt(result[2]);
			else if(result[1].indexOf('Debris Collect') !== -1)
				debris += parseInt(result[2]);
            else if(result[1].indexOf('Production') !== -1)
				production += parseInt(result[2]);
            else if(result[1].indexOf('Construction') !== -1)
				construction += parseInt(result[2]);
            else if(result[1].indexOf('Research of') !== -1)
				research += parseInt(result[2]);
            else if(result[1].indexOf('New Trade Route') !== -1)
				tradeRoutes += parseInt(result[2]);
			else if(result[1].indexOf('Plunder of Trade Route') !== -1)
				plunderedRoutes += parseInt(result[2]);
			else if(result[1].indexOf('Sale of') !== -1)
				goodsSale += parseInt(result[2]);
            else if(parseInt(result[2]) > 0)
				otherIncome += parseInt(result[2]);
            else
				loss += parseInt(result[2]);
        }
    }
    while(result)
    //alert("Debris: " + debris + "\nPillage: " + pillage + "\nIncome: " + income + "\nSpendings: " + loss + "\n\nNet Income: " + (debris + pillage + income));
    var html = "<table width='300'>"+
	    "<tr><th align='center' colspan='2'>Credit Summary</th></tr>"+
	    "<tr><td>Income:</td><td align='center'>"+commaFormat(income)+"</td></tr>"+
		"<tr><td>Debris Collect:</td><td align='center'>"+commaFormat(debris)+"</td></tr>"+
	    "<tr><td>Pillage:</td><td align='center'>"+commaFormat(pillage)+"</td></tr>"+
		"<tr><td>Sale of goods:</td><td align='center'>"+commaFormat(goodsSale)+"</td></tr>"+
	    "<tr><td>Production:</td><td align='center'>"+commaFormat(production)+"</td></tr>"+
	    "<tr><td>Construction:</td><td align='center'>"+commaFormat(construction)+"</td></tr>"+
	    "<tr><td>Research:</td><td align='center'>"+commaFormat(research)+"</td></tr>"+
	    "<tr><td>New Trade Routes:</td><td align='center'>"+commaFormat(tradeRoutes)+"</td></tr>"+
		"<tr><td>Plundered Trade Routes:</td><td align='center'>"+commaFormat(plunderedRoutes)+"</td></tr>"+
	    "<tr><td>Other Income:</td><td align='center'>"+commaFormat(otherIncome)+"</td></tr>"+
		"<tr><td>Other Expenditures:</td><td align='center'>"+commaFormat(loss)+"</td></tr>"+
	    "<tr><td>Total In/Out:</td><td align='center'>"+commaFormat((income+debris+pillage+goodsSale+production+construction+research+tradeRoutes+plunderedRoutes+otherIncome+loss))+"</td></tr>"+
	    "</table>";
    var newRow = document.createElement("tr");
    var newCell = document.createElement("td");
    newCell.setAttribute("align","center");
    newCell.innerHTML = html;
    newRow.appendChild(newCell);
    var tbody = document.evaluate(
	    "//th[text()='Description']",
	    document,
	    null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE,
	    null).singleNodeValue.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    //console.log(tbody.firstChild);
    tbody.insertBefore(newRow,tbody.childNodes[1]);
}

/*
==========================================
Production Quantities by Time 
==========================================
*/
function clearProductionZeros(){
    var inputs = document.forms[1].elements;
    for(var i = 0; i < inputs.length; i++)
    {
        if(inputs[i].value == 0 && inputs[i].className == 'quant')
        inputs[i].value = null;
    }
}

function insertTimeTextBoxes(){
    var inputs = document.forms[1].elements;
    for(var i = 0; i < inputs.length; i++)
    {
        if(inputs[i].value == 0 && inputs[i].className == 'quant')
        {
            var row = inputs[i].parentNode.parentNode;
            //console.log(row);
            var cell = document.createElement("td");
            cell.setAttribute("align","center");
            cell.innerHTML = '<input type="text" value="" maxlength="5" size="5" name="'+inputs[i].name+' - Time" class="quant"/>';
            row.appendChild(cell);
            cell.addEventListener('keyup',getConvertTimeToQuantityClosure(row),true);
			//cell.addEventListener('blur',onProductionTextBoxChanged,true);
        }
    }
    var tbody = inputs[0].parentNode.parentNode.parentNode;
    //console.log(tbody.childNodes[0].firstChild);
    //Adjust colspan for top row and third row
    tbody.childNodes[0].firstChild.setAttribute("colspan",7);
    tbody.childNodes[2].firstChild.setAttribute("colspan",7);
    //console.log(tbody.childNodes[1].firstChild);
    //Insert column title
    var titleCell = document.createElement("th");
    titleCell.setAttribute("width","10%");
    titleCell.textContent = "Time (h)"
    tbody.childNodes[1].appendChild(titleCell);
	
	titleCell.previousSibling.setAttribute("width","10%");
    //adjust colspan for all help rows
    var helpCells = document.evaluate(
    "//td[@class='help']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log(helpCells.snapshotLength);
    for(var i=0;i<helpCells.snapshotLength;i++)
    {
        helpCells.snapshotItem(i).setAttribute("colspan",6);
    }
    //adjust colspan for all red rows
    var redCells = document.evaluate(
    "//td[@class='red']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    //console.log(redCells.snapshotLength);
    for(var i=0;i<redCells.snapshotLength;i++)
    {
        redCells.snapshotItem(i).setAttribute("colspan",2);
    }
    //adjust colspan for last two rows
    tbody.childNodes[tbody.childNodes.length-1].firstChild.setAttribute("colspan",7);
    tbody.childNodes[tbody.childNodes.length-2].firstChild.setAttribute("colspan",7);
}

function getConvertTimeToQuantityClosure(row){
    function func(){
        convertTimeToQuantity(row);
    }
    ;
    return func;
}

function convertTimeToQuantity(row){
	//console.log(row);
    var credits = row.childNodes[2].textContent;
    var time = row.childNodes[4].textContent;
    var qtyInput = row.childNodes[5].firstChild;
    var enteredTime;
    try{
        enteredTime = parseFloat(row.childNodes[6].firstChild.value);
    }
    catch(Exception)
    {
        return;
    }
    if(isNaN(enteredTime))
    return;
    //console.log("Credits: "+credits+" Time: "+time+" qtyInput: "+ qtyInput.value);
    //console.log("entered time: "+isNaN(enteredTime));
    var totalSeconds = getSeconds(time);
    if(totalSeconds != -1)
    {
        //console.log("Time " +getTimeDisplay(totalSeconds));
        var enteredTimeInSeconds = enteredTime*60*60;
        //console.log(enteredTimeInSeconds+" / " +totalSeconds);
        if(enteredTimeInSeconds < totalSeconds)
			qtyInput.value = "";
        else
			qtyInput.value = Math.round(enteredTimeInSeconds / totalSeconds)
    }
    onProductionTextBoxKeyUp();
}

function getSeconds(timeString){
    var regex = /(\d*h)?\W?(\d*m)?\W?(\d*s)?/;
    var result = regex.exec(timeString);
    if(result)
    {
        //console.log(result);
        var h = 0;var m=0;var s=0;
        if(result[1] != null)
        h = result[1].substring(0,result[1].indexOf("h"));
        if(result[2] != null)
        m = result[2].substring(0,result[2].indexOf("m"));
        if(result[3] != null)
        s = result[3].substring(0,result[3].indexOf("s"));
        return h*60*60 + m*60 + s*1;
    }
    else return -1;
}

function getTimeDisplay(seconds){
    var h = Math.floor(seconds/3600);
    var m = Math.floor((seconds % 3600)/60);
    var s = Math.floor((seconds % 3600) % 60);
    var string = s+"s";
    if(m>0 || h>0)
		string = m+"m "+string;
    if(h>0)
		string = h+"h "+string;
    return string;
}


/*
==========================================
Swap Location Names
==========================================
*/
function replaceLocationNames(){

	 
    if(getSetting(LOCATION_NAMES_KEY,null) == null)
		return;
    
	//select all links without img child nodes
	var links = document.evaluate(
		    "//a[contains(@href,'loc=') and (count(img) = 0)]",
		    document,
		    null,
		    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		    null);
			
    console.log("Links: "+links.snapshotLength);
	
	for(var i=0;i<links.snapshotLength;i++)
    {
		//console.log(links.snapshotItem(i));
		
		links.snapshotItem(i).textContent = getLocationName(links.snapshotItem(i).textContent);
	}
}

var names = null;
function getLocationName(location){
	
	
	
	if(names == null)
		var names = getSetting(LOCATION_NAMES_KEY,null);
    if(names == null)
		return;
    names = unescape(names);
    //console.log("names: "+names);
    var namesArray = names.split(",");
	
	for(var i = 0;i<namesArray.length;i++)
	{
		var def = namesArray[i].split("=");
		//console.log(def);
		if(def[0] == location)
			return def[1];
	}
	return location;
}


/*
==========================================
Calculate Depart Time
==========================================
*/
function insertArriveTimeTextBox(){
	
	//console.log("arrival time");
	var moveButton = document.evaluate(
    "//input[@value='Move']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
	
	var th = moveButton.parentNode.parentNode.nextSibling.firstChild;
	//console.log(th);
	
	var textBox = document.createElement("input");
	textBox.setAttribute("class","quant");
	textBox.setAttribute("type","text");
	textBox.setAttribute("style","width:200px;margin-top:5px;margin-bottom:5px;");
	textBox.setAttribute("id","arrivalTime");
	textBox.value = getCurrentServerTime();
	th.appendChild(textBox);
	
	var calculateButton = document.createElement("input");
	calculateButton.setAttribute("value","Calculate Depart Time");
	calculateButton.setAttribute("type","submit");
	calculateButton.setAttribute("id","calculateButton");
	calculateButton.setAttribute("style","margin-left:5px;margin-top:5px;margin-bottom:5px;");
	th.appendChild(calculateButton);
	
	document.getElementById("calculateButton").addEventListener("click",function(event){getLaunchTime();},true);
	document.getElementById("duration").addEventListener("click",function(event){getLaunchTime();},true);
	
	
	var departDateSpan = document.createElement("span");
	departDateSpan.setAttribute("id","departDateSpan");
		
		
	document.getElementById("calculateButton").parentNode.appendChild(departDateSpan);
		
}

function getLaunchTime(){

	try{
		
		var departDate = calculateLaunchTime();
		
		//console.log(departDate.getYear());
	
		resultString = (zeroPad(departDate.getDate()) +"-"+ zeroPad(departDate.getMonth()) +"-"+ departDate.getFullYear() +" "+ zeroPad(departDate.getHours()) +":"+ zeroPad(departDate.getMinutes()) +":"+ zeroPad(departDate.getSeconds()));
		
		var departDateSpan = document.getElementById("departDateSpan");
			departDateSpan.innerHTML = "<br/>Depart Time: "+resultString;
			
		//var launchTime = arrivalTime - (travelSeconds * 1000)

		if(getSetting(FLEET_REMINDER_KEY,true))
		{
			var reminderButton = document.getElementById("setReminder");
			
			if(reminderButton == null)
			{
				reminderButton = document.createElement("input");
				reminderButton.setAttribute("id","setReminder");
				reminderButton.setAttribute("type","button");
				reminderButton.setAttribute("value","Set Reminder");	
				reminderButton.setAttribute("style","margin-left:5px;");
				
				departDateSpan.parentNode.appendChild(reminderButton);
				document.getElementById("setReminder").addEventListener("click",function(event){saveReminder();},true);
			}
		}
	}
	catch(e)
	{
		notify(e,MESSAGE_CLASS_ERROR);
		return;
	}
	
}

function calculateLaunchTime(){

	var currentTime = getCurrentServerTime();
	var durationString = document.getElementById('duration').textContent;
	var arrivalString = document.getElementById('arrivalTime').value;

	//console.log(currentTime +" + "+durationString+" = "+arrivalString);
	
	if(durationString =="")
	{
		throw "No duration. Set fleet and destination.";
	}
	
	var durationSeconds = getSeconds(durationString);
	var arrivalDate = getDateObject(arrivalString);
	
	var departDate = new Date();
	departDate.setTime(arrivalDate.getTime() - (durationSeconds * 1000));
	
	//console.log(departDate);
	return departDate;
	
}

function saveReminder(){
	//console.log("Save remindeR");
	try{
		
		var departDate = calculateLaunchTime();
		
		
		console.log("Saving depart date: "+departDate+ " -> "+departDate.getTime());
		setSetting("FleetReminders",""+departDate.getTime());
		notify("Launch reminder set");
	}
	catch(e)
	{
		notify(e,MESSAGE_CLASS_ERROR);
	}
	
	
	
}

function insertFleetReminderCountdowns(){

	var departDateString = getSetting("FleetReminders","-");
	if(departDateString == "-")
		return;
		
	//console.log(parseInt(departDateString));
	var departDate = new Date();
	departDate.setTime(parseInt(departDateString));
	
	//console.log(departDate);
	
	var currentTime = getDateObject(getCurrentServerTime());
	var timeRemaining = (departDate.getTime() - currentTime.getTime())/1000;
	
	if(timeRemaining > 0)
	{
		var id = unsafeWindow.q ==undefined? 1:unsafeWindow.q+1;
		var countDownDiv = document.createElement("div");
		countDownDiv.innerHTML = "<span style='font-size: 8pt;'>Launch Reminder: "+getDateString(departDate)+"</span> <span style='font-size: 8pt;' title='"+timeRemaining+"' id='time"+(id)+"'>-</span>";
		document.body.firstChild.appendChild(countDownDiv);
	}
	else
	{
		setSetting("FleetReminders","-");
		console.log("Reminder expired. Cleared.");
	}
	
	if(unsafeWindow.t == undefined)
	{
		console.log(localTFunction);
		localTFunction();
	}
}

//15-05-2008 4:37:00
function getDateObject(dateString){

	var regex = /(\d+)-(\d+)-(\d+)+\W(\d+):(\d+):(\d+)/;
	var result = regex.exec(dateString);
	
	if(result)
	{
		//year,month,day,hr,min,sec
		//console.log(result[3]+" "+result[2]+" "+result[1]+" "+result[4]+" "+result[5]+" "+result[6]);
		return new Date(result[3],(result[2]-1),result[1],result[4],result[5],result[6]);
	}
	else throw "Invalid arrival input. Ensure arrival time is in the following format. MM-DD-YYYY HH:MM:SS";
}

function getCurrentServerTime(){

	var regex = /<small>Server Time: ((\d+)-(\d+)-(\d)+\W(\d+):(\d+):(\d+))<\/small>/;
    var source = document.body.innerHTML;
    var result = regex.exec(source);
    
	if(result)
	{
		//console.log(result[1]);
		return result[1];
	}
	else
	{
		//console.log("can't find server time");
		return "";
	}
		
}

//15-05-2008 4:37:00
function getDateString(date){

	return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+zeroPad(date.getHours())+":"+zeroPad(date.getMinutes())+":"+zeroPad(date.getSeconds());
}

var numberReminders = 1;
var tFunction = function t(){

 for(n=1;n<=unsafeWindow.q+numberReminders;n++)
 {
	elem=document.getElementById('time'+n);
	
	s=elem.title;
	m=0;h=0;
	if(s<=0){ elem.innerHTML="-" }
	else
	{
	if(s>59){ m=Math.floor(s/60); s=s-m*60 }
	if(m>59){ h=Math.floor(m/60); m=m-h*60 }
	if(s<10){ s="0"+s }
	if(m<10){ m="0"+m }
		elem.innerHTML=h+":"+m+":"+s;
	}
	elem.title-=1;
 }
 window.setTimeout("t();",1000);
};

function localTFunction(){

	//console.log("localt");
	elem=document.getElementById('time1');
	
	//console.log(elem);
	s=elem.title;
	m=0;h=0;
	if(s<=0){ elem.innerHTML="-" }
	else
	{
		if(s>59){ m=Math.floor(s/60); s=s-m*60 }
		if(m>59){ h=Math.floor(m/60); m=m-h*60 }
		if(s<10){ s="0"+s }
		if(m<10){ m="0"+m }
			elem.innerHTML=h+":"+m+":"+s;
		elem.title-=1;
	 
		window.setTimeout(localTFunction,1000);
	}
}


/*
==========================================
Next Feature
==========================================
*/

/*
==========================================
Config Page
==========================================
*/
var HIGHLIGHT_TRADE_PARTNERS_KEY = "config_highlightTradePartners";
var HIGHLIGHT_POOR_TRADES_KEY = "config_highlightPoorTrades";
var POOR_TRADE_UPPER_THRESHOLD_KEY = "config_poorTradeUpperThreshold";
var POOR_TRADE_LOWER_THRESHOLD_KEY = "config_poorTradeLowerThreshold";
var HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY = "config_highlightDuplicateTradePartners";
var SHOW_TOTAL_FLEET_ROW_KEY = "config_showTotalFleetRow";
var SHOW_ATTACK_SIZE_KEY = "config_showFleetAttackSize";
var ENABLE_PRODUCTION_PRESETS_KEY = "config_enableProductionPresets";
var ADD_EMPIRE_SUBMENU_KEY = "config_addEmpireSubmenu";
var INSERT_BATTLECALC_LINK_KEY = "config_insertBattleCalcLink";
var PREFILL_BATTLE_CALC_KEY = "config_prefillBattleCalc";
var ADD_FINISH_TIMES_KEY = "config_addFinishTimes";
var ADD_FINISH_TIMES_EMPIRE_KEY = "config_addFinishTimesEmpire";
var FINISH_TIMES_SINGLE_LINE_KEY = "config_finishTimesSingleLine";
var FILL_TECH_DATA_KEY = "config_fillTechData";
var ADJUST_TITLES_KEY = "config_adjustTitles";
var FIX_QUEUES_KEY = "config_fixQueues";
var HOUR_24_DISPLAY_KEY = "config_24hourDisplay";
var HIGHLIGHT_PLAYERS_KEY = "config_highlightPlayers";
var PLAYER_COLORS_KEY = "config_playerColors";
var MY_GUILD_KEY = "config_myGuild";
var MY_GUILD_COLOR_KEY = "config_myGuildColour";
var ENEMY_GUILDS_KEY = "config_enemyGuilds";
var ALLIED_GUILDS_KEY = "config_alliedGuilds";
var ENEMY_GUILDS_COLOR_KEY = "config_enemyGuildColour";
var ALLIED_GUILDS_COLOR_KEY = "config_alliedGuildColour";
var HIGHLIGHT_TRADE_COLOR_KEY = "config_highlightPlayerColor";
var HIGHLIGHT_TODAY_COLOR_KEY = "config_highlightTodayColor";
var ADD_FLEET_MOVE_LINK_KEY = "config_addFleetMoveLink";
var SUM_FLEETS_KEY = "config_sumFleets";
var SUM_CREDITS_KEY = "config_sumCredits";
var FORMAT_NUMBERS_KEY = "config_formatNumbers";
var NUMBER_DELIMETER_KEY = "config_numberDelimeter";
var CLONE_BASE_LINKS_KEY = "config_cloneBaseLinks";
var CLONE_FLEET_LINKS_KEY = "config_cloneFleetLinks";
var MOVE_GALAXY_LINKS_KEY = "config_moveGalaxyLinks";
var STRUCTURES_GOALS_KEY = "config_structuresGoals";
var INSERT_MOVE_PRESETS_KEY = "config_insertMovePresets";
var MAX_QUEUES_KEY = "config_maxQueues";
var SHOW_EXECUTION_TIME_KEY = "config_showExecutionTime";
var CLEAR_ZEROS_KEY = "config_clearZeros";
var ENTER_PRODUCTION_TIME_KEY = "config_enterProductionTime";
var NAME_LOCATIONS_KEY = "config_nameLocations";
var LOCATION_NAMES_KEY = "config_locationNames";
var TIME_HELPER_KEY = "config_timeHelper";
var FLEET_REMINDER_KEY = "config_fleetReminders";

function showConfig()
{
    var url = window.location.href;
    url = url.replace("&config=1","");
    url = url.replace("?config=1","");
    GM_addStyle('.configHeading {'
        +'    color: gold;'
        +'    font-weight: bold;'
        +'}'
    +'.featureName {'
        +'    color: #EEDC82;'
        +'}'
    +'.subFeatureName {'
        +'    color: #8B814C;'
        +'    padding-left:20'
        +'}'
    +'.footnote {'
        +'    color: gold;'
        +'    font-weight: bold;'
        +'}');
		
    var newBody = "<html><body><div align='center'>"+
    "<div><h1>Astro Empires Extras Configuration</h1></div>"+
	"<small>Script Version: "+scriptVersion+"</small>"+
	"<p><div>Release notes, information, and feedback/request forums are available <a href='http://www.sea-of-lost-souls.net/forum/index.php?showforum=44' target='_new'> here</a>."+
	"<div>If you find this script helpful, show your love by <a href='https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=kareemsultan%40gmail%2ecom&item_name=AE%20Extras&amount=5%2e00&no_shipping=1&no_note=1&tax=0&currency_code=CAD&lc=CA&bn=PP%2dDonationsBF&charset=UTF%2d8'>making a donation</a> using paypal, or upgrading me on AE(<a href='http://delta.astroempires.com/profile.aspx?player=56770'>knubile</a>).</p></div>"+
    "<table width='900'>"+
    "<tr><td></td><th width='230'>Feature</th><th>Description</th><th>Applied to page(s)</th></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>General</td></tr>"+
    "<tr><td><input type='checkbox' id='config_adjustTitles'/></td><td class='featureName'>Adjust Page Titles</td><td style='padding-left:20'>Shortens page titles for better viewing with multiple tabs. Prefixes page titles with server.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td><input type='checkbox' id='config_addEmpireSubmenu'/></td><td class='featureName'>Add empire sub-menu</td><td style='padding-left:20'>Inserts the empire sub menu.</td><td style='padding-left:20'>All except fleet movement</td></tr>"+
    "<tr><td><input type='checkbox' id='config_insertBattleCalcLink'/></td><td class='featureName'>Add battle calc link</td><td style='padding-left:20'>Inserts a link to the AstroEmpires Calculator Project by Guillaume Leonhart.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td colspan='2' style='padding-left:10' class='featureName'>Enhanced count down timers.</td><td style='padding-left:20'>Shows dates and times for completion of work in progress. Highlights work to be completed today.</td><td style='padding-left:20'></td></tr>"+
    "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_addFinishTimesEmpire'/> Empire Page</td><td style='padding-left:20'>Enable this feature for empire events pages.</td><td style='padding-left:20'>Empire events</td></tr>"+
    "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_addFinishTimes'/> Other Pages</td><td style='padding-left:20'>Enable this feature for construction and production pages.</td><td style='padding-left:20'>All pages except empire</td></tr>"+
    "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_finishTimesSingleLine'/> Single line</td><td style='padding-left:20'>Display times on a single line.</td><td style='padding-left:20'>Empire</td></tr>"+
    "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_24hourDisplay'/> 24 Hour Clock</td><td style='padding-left:20'>Display times in 24 hour format.</td><td></td></tr>"+
    "<tr><td colspan='3' class='subfeatureName'>Highlight Colour<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTodayColor'style='width:100;'/></td><td></td></tr>"+
    "<tr><td><input type='checkbox' id='config_formatNumbers'/></td><td class='featureName'>Format numbers</td><td style='padding-left:20'>Formats fleet size numbers for better readability.</td><td style='padding-left:20'>Base pages</td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'>Delimeter: <input type='text' id='config_numberDelimeter' style='width:25;'/></td><td style='padding-left:20'></td><td></td></tr>"+
	"<tr><td><input type='checkbox' id='config_timeHelper'/></td><td class='featureName'>Time Helper</td><td style='padding-left:20'>Enter time you want to arrive at a location to be informed of the right time to leave.</td><td style='padding-left:20'>fleet move</td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'><input type='checkbox' id='config_fleetReminders'>Departure Countdown</td><td style='padding-left:20'>Shows countdown until departure time beneath server time.</td><td style='padding-left:20'>All pages</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Player Highlights</td></tr>"+
    "<tr><td><input type='checkbox' id='config_highlightPlayers'/></td><td class='featureName'>Highlight players</td><td style='padding-left:20'>Highlights players according to guild.<br><b>Note:</b>This overrides colour from the player highlight feature.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td colspan='3' class='subfeatureName'>My Guild Tag<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_myGuild' style='width:100;'/></td><td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_myGuildColour' style='width:100;'/></td></tr>"+
    "<tr><td colspan='3' class='subfeatureName'>Allied/Pact Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_alliedGuilds' style='width:90%;'/></td><td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_alliedGuildColour' style='width:100;'/></td></tr>"+
    "<tr><td colspan='3' class='subfeatureName'>Enemy Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_enemyGuilds' style='width:90%;'/></td><td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_enemyGuildColour' style='width:100;'/></td></tr>"+
    "<tr><td colspan='4' class='subfeatureName'>Individual Player Colour Overrides<a href='#foot2'><sup class='footnote'>3</sup></a>: <input type='text' id='config_playerColors' style='width:90%;'/></td></tr>"+
	"<tr><td><input type='checkbox' id='config_nameLocations'/></td><td class='featureName'>Name Locations</td><td style='padding-left:20'>Replaces location link text with location names.</td><td style='padding-left:20'>All Except bookmarks</td></tr>"+
    "<tr><td colspan='4' class='subfeatureName'>Base Names<a href='#foot2'><sup class='footnote'>4</sup></a>: <input type='text' id='config_locationNames' style='width:90%;'/></td></td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Map Enhancements</td></tr>"+
    "<tr><td><input type='checkbox' id='config_cloneBaseLinks'/></td><td class='featureName'>Insert base links by map</td><td style='padding-left:20'>Displays base links next to galaxy map so both are visible simultaneously.</td><td style='padding-left:20'>Bases</td></tr>"+
    "<tr><td><input type='checkbox' id='config_cloneFleetLinks'/></td><td class='featureName'>Insert fleet links by map</td><td style='padding-left:20'>Displays fleet links next to galaxy map so both are visible simultaneously.</td><td style='padding-left:20'>Fleets</td></tr>"+
    "<tr><td><input type='checkbox' id='config_moveGalaxyLinks'/></td><td class='featureName'>Move galaxy links</td><td style='padding-left:20'>Moves the galaxy links above the galaxy maps to the bottom of the page.</td><td style='padding-left:20'>Fleets & Bases</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Trade</td></tr>"+
    "<tr><td><input type='checkbox' id='config_highlightTradePartners'/></td><td class='featureName'>Highlight trade partners</td><td style='padding-left:20'>Highights all links to trade partners in blue.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td colspan='3' class='subfeatureName'>Highlight Colour<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightPlayerColor'style='width:100;'/></td><td></td></tr>"+
    "<tr><td><input type='checkbox' id='config_highlightDuplicateTradePartners'/></td><td class='featureName'>Highlight duplicate trade partners</td><td style='padding-left:20'>Highlights duplicate trade partners.</td><td style='padding-left:20'>Empire trade</td></tr>"+
    "<tr><td><input type='checkbox' id='config_highlightPoorTrades'/></td><td class='featureName'>Highlight unbalanced trades</td><td style='padding-left:20'>Highlights eco values that are outside of the set thresholds.</td><td style='padding-left:20'>Empire trade</td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'>Upper threshold: <input type='text' id='config_poorTradeUpperThreshold'style='width:25;'/></td><td style='padding-left:20'>Trades with eco bases greater than this amount above your own are highlighted in orange.</td><td></td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'>Lower threshold: <input type='text' id='config_poorTradeLowerThreshold' style='width:25;'/></td><td style='padding-left:20'>Trades with eco bases lower than this amount below your own are highlighted in red.</td><td></td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Structures / Bases</td></tr>"+
    "<tr><td><input type='checkbox' id='config_structuresGoals'/></td><td class='featureName'>Advanced structures page</td><td style='padding-left:20'>Colour codes structure values based on progress.</td><td style='padding-left:20'>Empire structures</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Credits History</td></tr>"+
    "<tr><td><input type='checkbox' id='config_sumCredits'/></td><td class='featureName'>Credits Summary</td><td style='padding-left:20'>Displays a summary of credits.</td><td style='padding-left:20'>Credits History</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Fleet</td></tr>"+
    "<tr><td><input type='checkbox' id='config_insertMovePresets'/></td><td class='featureName'>Extra movement presets</td><td style='padding-left:20'>Adds extra presets to existing 'all' and 'none'.</td><td style='padding-left:20'>Fleet move</td></tr>"+
    "<tr><td><input type='checkbox' id='config_showTotalFleetRow'/></td><td class='featureName'>Show total fleet row</td><td style='padding-left:20'>Adds a row totalling quantities of each ship.</td><td style='padding-left:20'>Empire fleet</td></tr>"+
    "<tr><td><input type='checkbox' id='config_showFleetAttackSize'/></td><td class='featureName'>Show fleet attack size</td><td style='padding-left:20'>Attack fleet size exludes carriers,fleet carriers,recyclers,outpost ships, and scout ships.</td><td style='padding-left:20'>Empire fleet</td></tr>"+
    "<tr><td><input type='checkbox' id='config_addFleetMoveLink'/></td><td class='featureName'>Insert fleet move link</td><td style='padding-left:20'>Makes fleet size(s) a link directly to the fleet movement screen.</td><td style='padding-left:20'>Empire fleet</td></tr>"+
    "<tr><td><input type='checkbox' id='config_sumFleets'/></td><td class='featureName'>Sum guild fleets</td><td style='padding-left:20'>Inserts a table with fleet totals by guild.</td><td style='padding-left:20'>Base pages</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Construction / Production</td></tr>"+
    "<tr><td><input type='checkbox' id='config_enableProductionPresets'/></td><td class='featureName'>Production presets</td><td style='padding-left:20'>This feature allows production values to be filled with customizable preset values. Time values override quantity values.</td><td style='padding-left:20'>Production</td></tr>"+
    "<tr><td><input type='checkbox' id='config_enterProductionTime'/></td><td class='featureName'>Enter production times</td><td style='padding-left:20'>Allows entry of productiontime. Quantities are then calculated and filled in.</td><td style='padding-left:20'>Production</td></tr>"+
    "<tr><td><input type='checkbox' id='config_clearZeros'/></td><td class='featureName'>Clear zeros</td><td style='padding-left:20'>Clears zeros to help avoid accidently building too much fleet.</td><td style='padding-left:20'>Production</td></tr>"+
    "<tr><td><input type='checkbox' id='config_fixQueues'/></td><td class='featureName'>Enhanced queue display</td><td style='padding-left:20'>Fixes queues footer of screen so it is always visible.</td><td style='padding-left:20'>Structures, Defenses, Production, and Research</td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'>Max queue size: <input type='text' id='config_maxQueues' style='width:25;'/></td><td style='padding-left:20'>Queue list will not be fixed when queues size is greater than this number.</td><td></td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Battle Calculator (Experimental) <b></b></td></tr>"+
    "<tr><td><input type='checkbox' id='config_fillTechData'/></td><td class='featureName'>Pre-fill tech data</td><td style='padding-left:20'>Fills attack tech data in AstroEmpires Calculator Project by Guillaume Leonhart. Tech data is updated with every visit to the empire technologies page.</td><td style='padding-left:20'>Battle Calculator</td></tr>"+
    "<tr><td><input type='checkbox' id='config_prefillBattleCalc'/></td><td class='featureName'>Pre-fill fleet data</td><td style='padding-left:20'>Adds link to attack screen and enemy fleet screen that opens up and fills in all data in AstroEmpires Calculator Project by Guillaume Leonhart. Should be used along with Pre-fill tech data feature. <br><b>Caution:</b>This feature does not support playing on multiple servers. It will use the tech from the last tech page visited regardless of server.</td><td style='padding-left:20'>Attack / Enemy fleet</td></tr>"+
    "<tr height='15px'><td colspan='4'/></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Debug</td></tr>"+
    "<tr><td><input type='checkbox' id='config_debug'/></td><td class='featureName'>Console log</td><td style='padding-left:20'>Logs to FireBug console. Must have Firebug extension installed.</td><td style='padding-left:20'>All</td></tr>"+
	"<tr><td colspan='5' class='subfeatureName'>"+
	"<Input type = radio Name ='logLevel' Value = '1'>Debug</input><br/>"+
	"<Input type = radio Name ='logLevel' Value = '2'>Info</input><br/>"+
	"<Input type = radio Name ='logLevel' Value = '3'>Warn</input><br/>"+
	"<Input type = radio Name ='logLevel' Value = '4'>Error</input><br/>"+
	"</tr></td>"+
    "<tr><td><input type='checkbox' id='config_showExecutionTime'/></td><td class='featureName'>Show Execution Time</td><td style='padding-left:20'>Shows script execution time at bottom of page.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr height='15px'><td colspan='4'/></tr>"+
    "<tr><td colspan='4' align='center'><input id='saveButton' type=submit name='Save' value='Save'/></td></tr>"+
    "</table>"+
    "<small>This configuration screen is for the Astro Empires Extras Greasemonkey script.</small><br><br>"+
    "<table>"+
    "<tr><td><a name='foot1'>1.</a> Colour definitions must be in valid css colour formats. See CSS colour samples <a href='http://www.somacon.com/p142.php' target='_new'>here</a>.</td></tr>"+
    "<tr><td><a name='foot2'>2.</a> Guild definitions must be in the following format: <b>[Guildname],[Guildname2],...</b><br>Include the square brackets</td></tr>"+
    "<tr><td><a name='foot2'>3.</a> Colour definitions must be in the following format: <b>player1=csscolour,player2=csscolour2</b><br>Do NOT include player's guild tag and DO include the '#' with css hex values.</td></tr>"+
	"<tr><td><a name='foot2'>4.</a> Location name definitions must be in the following format: <b>location=name,location2=name2</b></td></tr>"+
    "</table>"+
    "<br><br><a id='backLink' href='"+url+"'>Return to Astro Empires</a> - <a id='updateCheck' href='#'>Check For Update</a> "+
    "</div></body><html>";
    window.addEventListener(
    'load',
    function() {
        document.body.innerHTML = newBody;loadConfig();
        document.getElementById('saveButton').addEventListener('click', function(event) {
            saveConfig();
        }
        , true);
		document.getElementById('updateCheck').addEventListener('click', function(event) {
            checkForUpdates(true);
        }
        , true);
        document.getElementById('config_highlightPoorTrades').addEventListener('change', function(event) {
            poorTradesChanged();
        }
        , true);
		document.getElementById('config_fleetReminders').addEventListener('click', function(event) {
            if(document.getElementById('config_fleetReminders').checked)
				document.getElementById('config_timeHelper').checked = true;
        }
        , true);
		document.getElementById('config_timeHelper').addEventListener('click', function(event) {
            if(!document.getElementById('config_timeHelper').checked)
				document.getElementById('config_fleetReminders').checked = false;
        }
        , true);
    }
    ,true);
}
/*
==========================================
Save/Load Config
==========================================
*/
function saveConfig()
{
    //console.log("Saving config");
    setSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,document.getElementById(HIGHLIGHT_TRADE_PARTNERS_KEY).checked);
    setSetting(HIGHLIGHT_POOR_TRADES_KEY,document.getElementById(HIGHLIGHT_POOR_TRADES_KEY).checked);
    setSetting(POOR_TRADE_UPPER_THRESHOLD_KEY,document.getElementById(POOR_TRADE_UPPER_THRESHOLD_KEY).value);
    setSetting(POOR_TRADE_LOWER_THRESHOLD_KEY,document.getElementById(POOR_TRADE_LOWER_THRESHOLD_KEY).value);
    setSetting(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY,document.getElementById(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY).checked);
    setSetting(SHOW_TOTAL_FLEET_ROW_KEY,document.getElementById(SHOW_TOTAL_FLEET_ROW_KEY).checked);
    setSetting(SHOW_ATTACK_SIZE_KEY,document.getElementById(SHOW_ATTACK_SIZE_KEY).checked);
    setSetting(ADD_FLEET_MOVE_LINK_KEY,document.getElementById(ADD_FLEET_MOVE_LINK_KEY).checked);
    setSetting(ENABLE_PRODUCTION_PRESETS_KEY,document.getElementById(ENABLE_PRODUCTION_PRESETS_KEY).checked);
    setSetting(ADD_EMPIRE_SUBMENU_KEY,document.getElementById(ADD_EMPIRE_SUBMENU_KEY).checked);
    setSetting(INSERT_BATTLECALC_LINK_KEY,document.getElementById(INSERT_BATTLECALC_LINK_KEY).checked);
    setSetting(FILL_TECH_DATA_KEY,document.getElementById(FILL_TECH_DATA_KEY).checked);
    setSetting(PREFILL_BATTLE_CALC_KEY,document.getElementById(PREFILL_BATTLE_CALC_KEY).checked);
    setSetting(ADD_FINISH_TIMES_KEY,document.getElementById(ADD_FINISH_TIMES_KEY).checked);
    setSetting(ADD_FINISH_TIMES_EMPIRE_KEY,document.getElementById(ADD_FINISH_TIMES_EMPIRE_KEY).checked);
    setSetting(FINISH_TIMES_SINGLE_LINE_KEY,document.getElementById(FINISH_TIMES_SINGLE_LINE_KEY).checked);
    setSetting(ADJUST_TITLES_KEY,document.getElementById(ADJUST_TITLES_KEY).checked);
    setSetting(FIX_QUEUES_KEY,document.getElementById(FIX_QUEUES_KEY).checked);
    setSetting(MAX_QUEUES_KEY,document.getElementById(MAX_QUEUES_KEY).value);
    setSetting(HOUR_24_DISPLAY_KEY,document.getElementById(HOUR_24_DISPLAY_KEY).checked);
    setSetting(HIGHLIGHT_PLAYERS_KEY,document.getElementById(HIGHLIGHT_PLAYERS_KEY).checked);
    setSetting(PLAYER_COLORS_KEY,escape(document.getElementById(PLAYER_COLORS_KEY).value));
    setSetting(MY_GUILD_KEY,escape(document.getElementById(MY_GUILD_KEY).value));
    setSetting(ALLIED_GUILDS_KEY,escape(document.getElementById(ALLIED_GUILDS_KEY).value));
    setSetting(ENEMY_GUILDS_KEY,escape(document.getElementById(ENEMY_GUILDS_KEY).value));
    setSetting(MY_GUILD_COLOR_KEY,escape(document.getElementById(MY_GUILD_COLOR_KEY).value));
    setSetting(ENEMY_GUILDS_COLOR_KEY,escape(document.getElementById(ENEMY_GUILDS_COLOR_KEY).value));
    setSetting(ALLIED_GUILDS_COLOR_KEY,escape(document.getElementById(ALLIED_GUILDS_COLOR_KEY).value));
    setSetting(HIGHLIGHT_TRADE_COLOR_KEY,escape(document.getElementById(HIGHLIGHT_TRADE_COLOR_KEY).value));
    setSetting(HIGHLIGHT_TODAY_COLOR_KEY,escape(document.getElementById(HIGHLIGHT_TODAY_COLOR_KEY).value));
    setSetting(SUM_FLEETS_KEY,document.getElementById(SUM_FLEETS_KEY).checked);
    setSetting(SUM_CREDITS_KEY,document.getElementById(SUM_CREDITS_KEY).checked);
    setSetting(FORMAT_NUMBERS_KEY,document.getElementById(FORMAT_NUMBERS_KEY).checked);
    setSetting(NUMBER_DELIMETER_KEY,escape(document.getElementById(NUMBER_DELIMETER_KEY).value));
    setSetting(CLONE_BASE_LINKS_KEY,document.getElementById(CLONE_BASE_LINKS_KEY).checked);
    setSetting(CLONE_FLEET_LINKS_KEY,document.getElementById(CLONE_FLEET_LINKS_KEY).checked);
    setSetting(MOVE_GALAXY_LINKS_KEY,document.getElementById(MOVE_GALAXY_LINKS_KEY).checked);
    setSetting(STRUCTURES_GOALS_KEY,document.getElementById(STRUCTURES_GOALS_KEY).checked);
    setSetting(INSERT_MOVE_PRESETS_KEY,document.getElementById(INSERT_MOVE_PRESETS_KEY).checked);
    setSetting(CLEAR_ZEROS_KEY,document.getElementById(CLEAR_ZEROS_KEY).checked);
    setSetting(SHOW_EXECUTION_TIME_KEY,document.getElementById(SHOW_EXECUTION_TIME_KEY).checked);
    setSetting(ENTER_PRODUCTION_TIME_KEY,document.getElementById(ENTER_PRODUCTION_TIME_KEY).checked);
    
	setSetting(TIME_HELPER_KEY,document.getElementById(TIME_HELPER_KEY).checked);
    setSetting(FLEET_REMINDER_KEY,document.getElementById(FLEET_REMINDER_KEY).checked);
	
	setSetting(NAME_LOCATIONS_KEY,document.getElementById(NAME_LOCATIONS_KEY).checked);
    setSetting(LOCATION_NAMES_KEY,escape(document.getElementById(LOCATION_NAMES_KEY).value));
	
	setSetting(DEBUG_KEY,document.getElementById(DEBUG_KEY).checked);
	
	var logLevel = LOG_LEVEL_WARN;
	var radioButtons = document.evaluate(
	    "//input[@type='radio']",
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
    //console.log(redCells.snapshotLength);
    for(var i=0;i<radioButtons.snapshotLength;i++)
    {
		//console.log(radioButtons.snapshotItem(i));
		if (radioButtons.snapshotItem(i).checked==true) {
			logLevel = radioButtons.snapshotItem(i).value;
		}
        
    }
	setSetting(LOG_LEVEL_KEY,logLevel);
	
	
	
	notify("Settings successfully saved.");
}
function loadConfig()
{
    //console.log("Loading config");
    document.getElementById(HIGHLIGHT_TRADE_PARTNERS_KEY).checked = getSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true);
    document.getElementById(HIGHLIGHT_POOR_TRADES_KEY).checked = getSetting(HIGHLIGHT_POOR_TRADES_KEY,true);
    document.getElementById(POOR_TRADE_UPPER_THRESHOLD_KEY).value = getSetting(POOR_TRADE_UPPER_THRESHOLD_KEY,10);
    document.getElementById(POOR_TRADE_LOWER_THRESHOLD_KEY).value = getSetting(POOR_TRADE_LOWER_THRESHOLD_KEY,10);
    document.getElementById(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY).checked = getSetting(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY,true);
    document.getElementById(SHOW_TOTAL_FLEET_ROW_KEY).checked = getSetting(SHOW_TOTAL_FLEET_ROW_KEY,true);
    document.getElementById(SHOW_ATTACK_SIZE_KEY).checked = getSetting(SHOW_ATTACK_SIZE_KEY,true);
    document.getElementById(ADD_FLEET_MOVE_LINK_KEY).checked = getSetting(ADD_FLEET_MOVE_LINK_KEY,true);
    document.getElementById(ENABLE_PRODUCTION_PRESETS_KEY).checked = getSetting(ENABLE_PRODUCTION_PRESETS_KEY,true);
    document.getElementById(ADD_EMPIRE_SUBMENU_KEY).checked = getSetting(ADD_EMPIRE_SUBMENU_KEY,true);
    document.getElementById(INSERT_BATTLECALC_LINK_KEY).checked = getSetting(INSERT_BATTLECALC_LINK_KEY,true);
    document.getElementById(FILL_TECH_DATA_KEY).checked = getSetting(FILL_TECH_DATA_KEY,true);
    document.getElementById(PREFILL_BATTLE_CALC_KEY).checked = getSetting(PREFILL_BATTLE_CALC_KEY,true);
    document.getElementById(ADD_FINISH_TIMES_KEY).checked = getSetting(ADD_FINISH_TIMES_KEY,true);
    document.getElementById(ADD_FINISH_TIMES_EMPIRE_KEY).checked = getSetting(ADD_FINISH_TIMES_EMPIRE_KEY,true);
    document.getElementById(FINISH_TIMES_SINGLE_LINE_KEY).checked = getSetting(FINISH_TIMES_SINGLE_LINE_KEY,false);
    document.getElementById(ADJUST_TITLES_KEY).checked = getSetting(ADJUST_TITLES_KEY,true);
    document.getElementById(FIX_QUEUES_KEY).checked = getSetting(FIX_QUEUES_KEY,true);
    document.getElementById(MAX_QUEUES_KEY).value = getSetting(MAX_QUEUES_KEY,5);
    document.getElementById(HOUR_24_DISPLAY_KEY).checked = getSetting(HOUR_24_DISPLAY_KEY,false);
    document.getElementById(HIGHLIGHT_PLAYERS_KEY).checked = getSetting(HIGHLIGHT_PLAYERS_KEY,true);
    document.getElementById(PLAYER_COLORS_KEY).value = unescape(getSetting(PLAYER_COLORS_KEY,"Drekons=#FF82AB,United Colonies=#7FFF00"));
    document.getElementById(MY_GUILD_KEY).value = unescape(getSetting(MY_GUILD_KEY,"[MyGuild]"));
    document.getElementById(MY_GUILD_COLOR_KEY).value = unescape(getSetting(MY_GUILD_COLOR_KEY,"#9999FF"));
    document.getElementById(ENEMY_GUILDS_KEY).value = unescape(getSetting(ENEMY_GUILDS_KEY,"[Enemy1],[Enemy2]"));
    document.getElementById(ALLIED_GUILDS_KEY).value = unescape(getSetting(ALLIED_GUILDS_KEY,"[Ally1],[Ally2]"));
    document.getElementById(ENEMY_GUILDS_COLOR_KEY).value = unescape(getSetting(ENEMY_GUILDS_COLOR_KEY,"red"));
    document.getElementById(ALLIED_GUILDS_COLOR_KEY).value = unescape(getSetting(ALLIED_GUILDS_COLOR_KEY,"#9999FF"));
    document.getElementById(HIGHLIGHT_TRADE_COLOR_KEY).value = unescape(getSetting(HIGHLIGHT_TRADE_COLOR_KEY,"#8B0000"));
    document.getElementById(HIGHLIGHT_TODAY_COLOR_KEY).value = unescape(getSetting(HIGHLIGHT_TODAY_COLOR_KEY,"#59718A"));
    document.getElementById(SUM_FLEETS_KEY).checked = getSetting(SUM_FLEETS_KEY,true);
    document.getElementById(SUM_CREDITS_KEY).checked = getSetting(SUM_CREDITS_KEY,true);
    document.getElementById(FORMAT_NUMBERS_KEY).checked = getSetting(FORMAT_NUMBERS_KEY,true);
    document.getElementById(NUMBER_DELIMETER_KEY).value = unescape(getSetting(NUMBER_DELIMETER_KEY,","));
    document.getElementById(CLONE_BASE_LINKS_KEY).checked = getSetting(CLONE_BASE_LINKS_KEY,true);
    document.getElementById(CLONE_FLEET_LINKS_KEY).checked = getSetting(CLONE_FLEET_LINKS_KEY,true);
    document.getElementById(MOVE_GALAXY_LINKS_KEY).checked = getSetting(MOVE_GALAXY_LINKS_KEY,false);
    document.getElementById(STRUCTURES_GOALS_KEY).checked = getSetting(STRUCTURES_GOALS_KEY,true);
    document.getElementById(INSERT_MOVE_PRESETS_KEY).checked = getSetting(INSERT_MOVE_PRESETS_KEY,true);
    document.getElementById(CLEAR_ZEROS_KEY).checked = getSetting(CLEAR_ZEROS_KEY,true);
    document.getElementById(SHOW_EXECUTION_TIME_KEY).checked = getSetting(SHOW_EXECUTION_TIME_KEY,false);
    document.getElementById(ENTER_PRODUCTION_TIME_KEY).checked = getSetting(ENTER_PRODUCTION_TIME_KEY,true);
	
	document.getElementById(TIME_HELPER_KEY).checked = getSetting(TIME_HELPER_KEY,true);
    document.getElementById(FLEET_REMINDER_KEY).checked = getSetting(FLEET_REMINDER_KEY,true);
	
	document.getElementById(NAME_LOCATIONS_KEY).checked = getSetting(NAME_LOCATIONS_KEY,false);
    document.getElementById(LOCATION_NAMES_KEY).value = unescape(getSetting(LOCATION_NAMES_KEY,"A12:12:12:12=my home base,A13:13:13:13=my other base"));
	
	document.getElementById(DEBUG_KEY).checked = getSetting(DEBUG_KEY,false);
	var logLevel = getSetting(LOG_LEVEL_KEY,LOG_LEVEL_WARN);
		//console.info("Log level: "+logLevel);
	var radioButtons = document.evaluate(
	    "//input[@type='radio']",
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
    //console.log(redCells.snapshotLength);
    for(var i=0;i<radioButtons.snapshotLength;i++)
    {
		//console.log(radioButtons.snapshotItem(i));
		if (radioButtons.snapshotItem(i).value==logLevel) {
			radioButtons.snapshotItem(i).checked = true;
		}
        
    }
	
	
    console.log("Config loaded");
}

/*
==========================================
Get/Set Functions
Prefixes server name to settings
==========================================
*/
function getSetting(key,defaultValue){
		return GM_getValue(getServer()+"_"+key,defaultValue);
}

function setSetting(key,value){
		return GM_setValue(getServer()+"_"+key,value);
}

var totalStart = new Date();
var startTime = totalStart;
var endTime;
var timerMessage = "";

function onFeatureComplete(name){
	
	var startMilliseconds = startTime.getTime();
    var endMilliseconds = new Date().getTime();
    var difference = endMilliseconds - startMilliseconds;
    //console.log("Execution time: "+ difference +" milliseconds");
	if(difference > 0)
		timerMessage = timerMessage + "<br/>"+name+": "+difference;
	startTime = new Date();
}

function displayTimes(){
	var startMilliseconds = totalStart.getTime();
    var endMilliseconds = new Date().getTime();
	var difference = endMilliseconds - startMilliseconds;
	timerMessage = timerMessage + "<br/>Total Time: &cong; "+difference;
	//console.info(timerMessage);
	var center = document.createElement("center");
    center.setAttribute("style","font-size:xx-small;");
	center.innerHTML = timerMessage;
    document.body.appendChild(center);
}




/*
==========================================
Main Script
==========================================
*/
onFeatureComplete("Initialization");
/************************
Insert config link
*************************/
if(window.location.href.indexOf("corentin.jarnoux.free.fr")==-1)
{
    try
    {
        insertConfigLink();
    }
    catch(Exception)
    {
        console.info("Failed to insert config link.");
    }
	onFeatureComplete("Insert config link");
}

/************************
Advanced Fleet Page
*************************/
if(window.location.href.indexOf('empire.aspx?view=fleets')!=-1)
{
    if(getSetting(SHOW_TOTAL_FLEET_ROW_KEY,true) || getSetting(SHOW_ATTACK_SIZE_KEY,true) || getSetting(ADD_FLEET_MOVE_LINK_KEY,true))
    {
        sumShips();
    }
	onFeatureComplete("Advanced Fleet Page");
}

/************************
Advanced Trade Page
*************************/
if(window.location.href.indexOf('empire.aspx?view=trade')!=-1)
{
    if(getSetting(HIGHLIGHT_DUPLICATE_TRADE_PARTNERS_KEY,true))
		checkTradePage();
    if(getSetting(HIGHLIGHT_POOR_TRADES_KEY,true))
		findPoorTrades();
    insertToggleLink();
	onFeatureComplete("Advanced Trade Page");
}

/************************
Insert Empire Menu
*************************/
if(window.location.href.indexOf('empire.aspx')==-1 && window.location.href.indexOf('view=move')==-1 && window.location.href.indexOf("corentin.jarnoux.free.fr")==-1)
{
    if(getSetting(ADD_EMPIRE_SUBMENU_KEY,true))
    {
        try
        {
            insertEmpireMenu();
        }
        catch(Exception)
        {
            console.info("Failed to insert empire menu.");
        }
    }
	onFeatureComplete("Insert Empire Menu");
}

/************************
Show Config Page
*************************/
if(window.location.href.indexOf('config')!=-1)
{
    showConfig();
	onFeatureComplete("Show config");
}

/************************
Save Tech Data
*************************/
if(window.location.href.indexOf('view=technologies')!=-1)
{
    saveTechData();
}

/************************
Insert Battle Calc Link
*************************/
if(window.location.href.indexOf("corentin.jarnoux.free.fr")==-1)
{
    if(getSetting(INSERT_BATTLECALC_LINK_KEY,true))
    {
        try
        {
            insertBattleCalcLink();
        }
        catch(Exception)
        {
            console.info("Failed to insert battle calc link.");
        }
    }
	onFeatureComplete("Insert Battle Calc Link");
}

/************************
Battle Calculator
*************************/
if(window.location.href.indexOf("corentin.jarnoux.free.fr")!=-1)
{
    //console.log("On battle calc page");
    if(getSetting(PREFILL_BATTLE_CALC_KEY,true))
    {
        if(getSetting("attacking",false))
        {
            window.addEventListener(
            'load',
            function() {
                fillAttackFleetBattleCalc();
                fillEnemyFleetBattleCalc(true);
                setSetting("attacking",false);
            }
            ,true);
			onFeatureComplete("Fill Enemy & Attack Fleet Quantities");
        }
        else if(getSetting("previewing",false))
        {
            window.addEventListener(
            'load',
            function() {
                fillEnemyFleetBattleCalc(false);
                setSetting("previewing",false);
            }
            ,true);
			onFeatureComplete("Fill Enemy Fleet");
        }
    }
    if(getSetting(FILL_TECH_DATA_KEY,true))
    {
        window.addEventListener(
        'load',
        function() {
            fillTechDataOnBattleCalc();
        }
        ,true);
		onFeatureComplete("Fill Attack Tech Data");
    }
	
}
if(getSetting(PREFILL_BATTLE_CALC_KEY,true))
{
    if(window.location.href.indexOf("attack=")!=-1)
		insertAttackBattleCalcLink();
    else if(window.location.href.indexOf("fleet.aspx")!=-1)
		insertFleetToBattleCalcLink();
	onFeatureComplete("Insert Battle Calc Link");
}


/************************
Finish Times
*************************/
if(window.location.href.indexOf("empire.aspx")==-1)
{
    if(getSetting(ADD_FINISH_TIMES_KEY,true))
		addFinishTimes(false);
}
else
{
    if(getSetting(ADD_FINISH_TIMES_EMPIRE_KEY,true))
    {
        var singleLine = getSetting(FINISH_TIMES_SINGLE_LINE_KEY,false);
        addFinishTimes(singleLine);
    }
	onFeatureComplete("Add Finish Times");
}

/************************
Adjust Page Titles
*************************/
if(getSetting(ADJUST_TITLES_KEY,true))
{
    adjustTitles();
	onFeatureComplete("Adjust Page Titles");
}

/************************
Advanced Production Features
*************************/
if(window.location.href.indexOf("base.aspx")!=-1 &&
(getView()=="Production" || getView()=="Structures" || getView()=="Defenses" || getView()=="Research"))
{
	if(getSetting(FIX_QUEUES_KEY,true)){
		fixQueues();
		onFeatureComplete("Fix Queues");
	}
    if(getView()=="Production")
    {
        if(getSetting(ENABLE_PRODUCTION_PRESETS_KEY,true))
        {
            registerTextBoxEventListeners();
            insertProductionPresetsButtons();
			onFeatureComplete("Production Presets");
        }
        if(getSetting(ENTER_PRODUCTION_TIME_KEY,true)){
			insertTimeTextBoxes();
			onFeatureComplete("Production Time Feature");
		}
    }
}

/************************
Clear Production Zeros
*************************/
if(window.location.href.indexOf('base.aspx') != -1 && window.location.href.indexOf('view=production') != -1 && getSetting(CLEAR_ZEROS_KEY,true))
{
    clearProductionZeros();
	onFeatureComplete("Clear Production Zeros");
}

/************************
Fleet Summary
*************************/
if(window.location.href.indexOf("base.aspx?base=")!=-1 || window.location.href.indexOf("map.aspx?loc=")!=-1)
{
    if(getSetting(SUM_FLEETS_KEY,true))
	{
		sumFleets();
		onFeatureComplete("Fleet Summary");
	}
}

if(window.location.href.indexOf("fleet.aspx?fleet=")!=-1 && window.location.href.indexOf('view=attack') == -1)
{
    if(getSetting(SUM_FLEETS_KEY,true))
	{
		sumSingleFleet();
		onFeatureComplete("Single Fleet Summary");
	}
}


/************************
Fleet/Base Page Features
*************************/
if(window.location.href.indexOf("base.aspx")!=-1 && getView() == "" && getSetting(CLONE_BASE_LINKS_KEY,true))
{
    copyBaseLinks();
	onFeatureComplete("Copy Base Links");
}
if(window.location.href.indexOf("fleet.aspx")!=-1 && getView() == "" && getSetting(CLONE_FLEET_LINKS_KEY,true))
{
    copyFleetLinks();
	onFeatureComplete("Copy Fleet Links");
}
if((window.location.href.indexOf("base.aspx")!=-1 || window.location.href.indexOf("fleet.aspx")!=-1) && getView() == "" && window.location.href.indexOf("?base=")==-1 && window.location.href.indexOf("?fleet=")==-1 && getSetting(MOVE_GALAXY_LINKS_KEY,false))
{
    moveGalaxyList();
	onFeatureComplete("Move Galaxy Links");
}

/************************
Advanced Structures Page
*************************/
if(window.location.href.indexOf('empire.aspx?view=structures')!=-1)
{
    saveBases();
	onFeatureComplete("Save Base Data");
    if(getSetting(STRUCTURES_GOALS_KEY,true))
    {
        if(window.location.href.indexOf("mode=edit")!=-1)
        insertEditRows();
        else
        insertBaseSettingLinks();
		onFeatureComplete("Advanced Structures Page");
    }
}

/************************
Sum Credits
*************************/
if(window.location.href.indexOf('credits.aspx')!=-1 && getSetting(SUM_CREDITS_KEY,true))
{
    sumCreditsPage();
	onFeatureComplete("Credits Summary");
}

/************************
Site-wide Features
*************************/
if(window.location.href.indexOf('view=move')==-1)
{
    if(getSetting(HIGHLIGHT_TRADE_PARTNERS_KEY,true) || getSetting(HIGHLIGHT_PLAYERS_KEY,true))
    {
        checkTradeDataAge();
		onFeatureComplete("Check Trade Data Age");
		if((window.location.href.indexOf('base.aspx')!=-1) || getView()!="Trade" || getView()!="Fleet")
		{
			highlightTradePartners();
			onFeatureComplete("Highlight Links");
		}
    }
    checkForUpdates(false);
	onFeatureComplete("Update Check");
	checkBaseDataAge();
	onFeatureComplete("Check Base Data Age");
	checkTechDataAge();
	onFeatureComplete("Check Tech Data Age");
	
    
	if(window.location.href.indexOf('bookmarks.aspx')==-1 && window.location.href.indexOf('empire.aspx')==-1 && getSetting(NAME_LOCATIONS_KEY,false))
	{
		replaceLocationNames();
		onFeatureComplete("Named Locations");
	}
}
else
{
    if(getSetting(INSERT_MOVE_PRESETS_KEY,true))
	{
		insertMoveFleetLinks();
		onFeatureComplete("Insert Move Fleet Presets");
	}
}

/************************
Fleet Movement Reminder
*************************/
if(getSetting(TIME_HELPER_KEY,true))
{
	if(window.location.href.indexOf('view=move')!=-1)
	{
		insertArriveTimeTextBox();
	}
	
	
	if(getSetting(FLEET_REMINDER_KEY,true) && (getSetting("FleetReminders","-") != "-"))
	{
		insertFleetReminderCountdowns();
		console.log("swapping tFunction");
		if(unsafeWindow.t != undefined)
		{
			unsafeWindow.t = tFunction;
		}
	}
	onFeatureComplete("Fleet reminder");
}

/************************
Format Numbers
*************************/
if(getSetting(FORMAT_NUMBERS_KEY,true))
{
	if(window.location.href.indexOf('view=move')==-1 && window.location.href.indexOf('view=fleets')==-1 && 
		window.location.href.indexOf('view=production')==-1 && window.location.href.indexOf('view=structures')==-1 &&
		window.location.href.indexOf('view=trade')==-1 && window.location.href.indexOf('view=research')==-1)
	{
		formatVariousNumbers();
		onFeatureComplete("Format Numbers");
	}
}

/************************
Show Execution Times
*************************/
if(getSetting(SHOW_EXECUTION_TIME_KEY,true))
	displayTimes();


/************************
Notifier Utility Code
http://javascript.nwbox.com/asyncAlert/
*************************/
function notify(m,c){
				//console.log("notify");
				
				// create a block element
				var b=document.createElement('div');
				b.id='Message';
				b.className=c||'';
	//			b.style.cssText='top:-9999px;left:-9999px;position:absolute;white-space:nowrap;';
				b.style.cssText='position:absolute;white-space:nowrap;';
				// classname not passed, set default classname
				if(b.className.length==0){
					b.className = "notifier";
				}
				// insert block in to body
				b=document.body.insertBefore(b,document.body.firstChild);
				// write HTML fragment to it
				b.innerHTML=m;
				// save width/height before hiding
				var bw=b.offsetWidth;
				var bh=b.offsetHeight;
				// hide, move and then show
				b.style.display='none';
				
				b.style.top = document.body.clientHeight/2 + document.body.scrollTop - bh/2;
				b.style.left = document.body.clientWidth/2 + document.body.scrollLeft - bw/2;
				
	//			console.log("window height: "+document.body.clientHeight);
	//			console.log("window width: "+document.body.clientWidth);
	//			console.log("window scroll x: "+document.body.scrollLeft);
	//			console.log("window scroll y: "+document.body.scrollTop);

				b.style.display='block';
				
				var duration = 2000;
				var endOpacity = 0;
				if(c==MESSAGE_CLASS_ERROR)
				{
					duration = 4000;
					endOpacity = 50;
				}
				// fadeout block if supported
				setFading(b,100,endOpacity,duration,function(){document.body.removeChild(b);});
}
	

// apply a fading effect to an object
// by applying changes to its style
// @o = object style
// @b = begin opacity
// @e = end opacity
// @d = duration (millisec)
// @f = function (optional)
function setFading(o,b,e,d,f){
	var t=setInterval(
		function(){
			b=stepFX(b,e,2);
			setOpacity(o,b/100);
			if(b==e){
				if(t){clearInterval(t);t=null;}
				if(typeof f=='function'){f();}
			}
		},d/50
	);
}

// set opacity for element
// @e element
// @o opacity
function setOpacity(e,o){
	// for IE
	e.style.filter='alpha(opacity='+o*100+')';
	// for others
	e.style.opacity=o;
}

// increment/decrement value in steps
// checking for begin and end limits
//@b begin
//@e end
//@s step
function stepFX(b,e,s){
	return b>e?b-s>e?b-s:e:b<e?b+s<e?b+s:e:b;
}

var MESSAGE_CLASS = "notifier";
var MESSAGE_CLASS_ERROR = "notifierError";
GM_addStyle('.notifier {'
        +'    background-color: Black;'
        +'    border: solid 1px;'
		+'    padding: 10px 10px 10px 10px;'
        +'}');
GM_addStyle('.notifierError {'
        +'    background-color: Black;'
        +'    border: solid 2px;'
		+'    color: red;'
		+'    padding: 10px 10px 10px 10px;'
        +'}');

//notify("test error","notifierError");
//notify("test","notifier");