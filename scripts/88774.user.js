// ==UserScript==
// @name			Ikariam Ika Core Export
// @namespace		userscripts.org
// @homepage		http://userscripts.org/scripts/show/88774
// @description		Exports information from Ika Core Tools search results into different formats
// @version			0.0.4
// @include			http://s*.ikariam.*/*
// @exclude			http://support*.ikariam.*/*
// @license        	GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html), Copyright (c) 2010, bt_viper
// ==/UserScript==

var syslogLogLevel = 4;  // Higher number results in finer logging, 1-4
var syslogJavaConsoleEnabled = true;
var syslogFirebugEnabled = true;

const HTML_ELEMENT =
{
	br:			'br',
	div:		'div',
	tbody: 		'tbody',
	tr:			'tr',
	th:			'th',
	td:			'td',
	img:		'img',
	button:		'button',
	a:			'a',
	h1:			'h1',
	h2:			'h2',
	h3:			'h3',
	h4:			'h4',
	h5:			'h5'
};

// Array.unique( strict ) - Remove duplicate values (have to sort array before using)
Array.prototype.unique = function() {
	var result = [];
	for(i=0; i < this.length; i++ ) {
		if(i==0) result.push(this[i]);
		if((i>0) && (this[i].toCSVString().localeCompare(this[i-1].toCSVString()) != 0)) {
			result.push(this[i]);
		}
	}
	return result;
};

function stringToBoolean(str){
	return (str == 'true');
}

function sumArray(array) {
	var result = 0;
	for (var i in array) {
		if(typeof(array[i] == 'number')){result += array[i];}
	}
	return result;
}

function getElementsByClass (inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++){
    if (findIn == true){
        if (all[e].className.indexOf(className) > 0){
            elements[elements.length] = all[e];
        }
    } 
    else {
        if (all[e].className == className){
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
}

function getTimestamp() {
	var currentTime = new Date();
	var year = currentTime.getFullYear();
	var month = currentTime.getMonth();
	var day = currentTime.getDay();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	var ts = year + '-';
	if(month < 10){ts = ts + '0' + month + '-';}
	else{ts = ts + month + '-';}
	if(day < 10){ts = ts + '0' + day + ' ';}
	else{ts = ts + day + ' ';}
	if(hours < 10){ts = ts + '0' + hours + ':';}
	else{ts = ts + hours + ':';}
	if(minutes < 10){ts = ts + '0' + minutes + ':';}
	else{ts = ts + minutes + ':';}
	if(seconds < 10){ts = ts + '0' + seconds;}
	else{ts = ts + seconds;}
	
	return ts;	
}

function consoleLog(object){
	if(unsafeWindow.console){
		unsafeWindow.console.log(object);	
	}	
}

function consoleDir(object){
	syslog('ConsoleDir: ' + arguments.callee.caller.name,1);
	if(unsafeWindow.console){
		unsafeWindow.console.dir(object);	
	}
}

function syslog(logMessage, logLevel){
	if(logLevel == null){
		logLevel = 4;	
	}
	var syslogMessage = getTimestamp() + ' ' + arguments.callee.caller.name + ' ("' + logMessage + '")';
	// log only if loglevel lower than globally set log level
 	if(logLevel <= syslogLogLevel){
 		// Log into Java Console if enabled
		if(syslogJavaConsoleEnabled){
			GM_log(syslogMessage);	
		}
		// Log into Firebug if enabled
		if(syslogFirebugEnabled){
			consoleLog(syslogMessage);
		}
	}
}

function intToString(num){
	return num + '';
}

function $(id){
	return document.getElementById(id);
}
 
function htmlElement(element, childElement){
	result = document.createElement(element);
	result.setAttribute('class', 'spyTracker_' + element);
	if(childElement) {
		if(typeof childElement == "string") {
			result.innerHTML = childElement;
		}
		else {	
			result.appendChild(childElement);
		}
	}
	return result;
}

function htmlBr(childElement){
	return htmlElement(HTML_ELEMENT.br, childElement);
}

function htmlDiv(childElement){
	return htmlElement(HTML_ELEMENT.div, childElement);
}

function htmlH3(childElement){
	return htmlElement(HTML_ELEMENT.h4, childElement);
}

function htmlH4(childElement){
	return htmlElement(HTML_ELEMENT.h4, childElement);
}

function htmlH5(childElement){
	return htmlElement(HTML_ELEMENT.h5, childElement);
}

function htmlTableBody(childElement){
	return htmlElement(HTML_ELEMENT.tbody, childElement);
}

function htmlTableRow(childElement){
	return htmlElement(HTML_ELEMENT.tr, childElement);
}

function htmlTableHeaderCell(childElement) {
	return htmlElement(HTML_ELEMENT.th, childElement);
}

function htmlTableCell(childElement) {
	return htmlElement(HTML_ELEMENT.td, childElement);
}

function htmlImg(image, title, width, height){
	result = htmlElement(HTML_ELEMENT.img);
	result.setAttribute('src', image);
	if(title) result.setAttribute('title', title);
	if(width) result.setAttribute('width', width);
	if(height) result.setAttribute('height', height);
	return result;
}

function htmlButton(title){
	result = htmlElement(HTML_ELEMENT.button);
	if(title) {
		result.setAttribute('name', title);
		result.setAttribute('value', title);
	}
	return result;
}

function htmlAHref(url, childElement){
	result = htmlElement(HTML_ELEMENT.a, childElement);
	result.setAttribute('href', url);
	return result;
}

function coordinates() {
	this.x = 0;
	this.y = 0;
}

function islandInfo() {
	this.name = '';
	this.coords = new coordinates();
	this.cities = [];
}

function getIslandByName(islands, name) {
	for (var i = 0; i < islands.length; i++) {
		if(islands[i].name == name) return islands[i];
	}
	return null;
}

function playerInfo() {
	this.name = '';
	this.alliance = '';
	this.score = 0;
	this.gold = 0;
	this.generals = 0;
	this.cities = [];
}

// "Player name";"Alliance";score;gold;generals
playerInfo.prototype.toCSVString = function() {
	var result = '"' + this.name + '";';
	result += '"' + this.alliance + '";';
	result += this.score + ';';
	result += this.gold + ';';
	result += this.generals;
	return result;
}

playerInfo.prototype.getCenterOfCities = function() {
	var result = new coordinates();
	for (var i = 0; i < this.cities.length; i++) {
		result.x = result.x + parseInt(this.cities[i].island.coords.x);
		result.y = result.y + parseInt(this.cities[i].island.coords.y);
	}
	result.x = Math.round(result.x / this.cities.length);
	result.y = Math.round(result.y / this.cities.length);
	return result;
}


// Compare function for sorting
function playerInfoCompareByGenerals(a,b) {
	return (b.generals - a.generals);
}

function cityInfo() {
	this.name = '';
	this.townHallSize = 0;
	this.player = null;
	this.island = null;
}

cityInfo.prototype.toThetaAtiensString = function() {
	// format is "// TARGET=alliance,player,city,x-coordinate,y-coordinate,enemy"
	var result = '// TARGET=';
	result = result + this.player.alliance + ',';
	result = result + this.player.name + ',';
	result = result + this.name + ',';
	result = result + this.island.coords.x + ',';
	result = result + this.island.coords.y + ',';
	result = result + 'enemy';
	return result;
}

// "Player";Score;"Alliance";Gold;Generals;City;TownHallSize;Island;X-coordinate;Y-coordinate
cityInfo.prototype.toCSVString = function() {
	var result = '"' + this.player.name + '";';
	result += this.player.score + ';';
	result += '"' + this.player.alliance + '";';
	result += this.player.gold + ';';
	result += this.player.generals + ';';
	result += '"' + this.name + '";';
	result += this.townHallSize + ';';
	result += '"' + this.island.name + '";';
	result += this.island.coords.x + ';';
	result += this.island.coords.y + ';';
	return result;
}


exportButtonOnClickHandler = function() {
	syslog('Ikariam Ika Core Export - export activated',1);
	// get references to all open search result windows
	var nfoframes = getElementsByClass(document, 'nfoframe dragpanel');
	
	if(!nfoframes) return;
	// go through all open search result windows
	var cities = [];
	var players = [];
	var alliances = [];
	var islands = [];
	
	syslog('Ikariam Ika Core Export - Found ' + nfoframes.length + ' search windows.' ,1);
	
	for (var n = 0; n < nfoframes.length; n++) {
		// get reference to Ika Core search results table
		nfoframe = nfoframes[n];
		if(!nfoframe.childNodes[1]) {
			syslog('Ikariam Ika Core Export, nfoframes.childNodes[1] undefined: ' + n,1);
			continue;
		}
		var nfotable = nfoframe.childNodes[1].childNodes[0];
		if(!nfotable) {
			syslog('Ikariam Ika Core Export, unable to find nfoframe: ' + n,1);
			return;
		}
		var rows = getElementsByClass(nfotable, 'nfotr');
		var tmpPlayer = '';
		var tmpAlliance = '';
		var tmpCity = '';
		var tmpIsland = '';
		var tmpCoordX = '';
		var tmpCoordY = '';
		var currentPlayer = null;
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			var cells = getElementsByClass(row, 'nfotd');
			// if a new player, create one and add it to the players list
			if(cells[0].getAttribute('colspan') == null) {
				tmpPlayer = cells[0].childNodes[0].textContent;
				tmpAlliance = cells[1].textContent;
				tmpCity = cells[4].textContent;
				tmpTownHallSize = parseInt(cells[5].textContent);
				tmpIsland = cells[7].textContent;
				tmpCoordX = parseInt(cells[8].textContent);
				tmpCoordY = parseInt(cells[9].textContent);
								
				// add a new alliance if it doesn't already exist
				if(alliances.indexOf(tmpAlliance) == -1) alliances.push(tmpAlliance);
				
				// playerInfo
				currentPlayer = new playerInfo();
				currentPlayer.name = tmpPlayer;
				currentPlayer.alliance = tmpAlliance;
				// :480.287 -> 480287
				var str = cells[0].childNodes[3].textContent;
				currentPlayer.score = parseInt(str.substring(str.indexOf(':') + 1, str.length).replace(/\./g,''));
				// :4.832.534:11.377 -> 4832534 and 11377
				var str = cells[2].textContent;
				currentPlayer.gold = parseInt(str.substring(str.indexOf(':') + 1, str.lastIndexOf(':')).replace(/\./g,''));
				currentPlayer.generals = parseInt(str.substring(str.lastIndexOf(':') + 1, str.length).replace(/\./g,''));
				players.push(currentPlayer);
			}
			// another city of an existing player
			else {
				tmpCity = cells[1].textContent;
				tmpTownHallSize = parseInt(cells[2].textContent);
				tmpIsland = cells[4].textContent;
				tmpCoordX = parseInt(cells[5].textContent);
				tmpCoordY = parseInt(cells[6].textContent);			
			}
			
			// add a new island if it doesn't already exist
			var island = getIslandByName(islands, tmpIsland);
			if(!island) {
				island = new islandInfo();
				island.name = tmpIsland;
				island.coords.x = tmpCoordX;
				island.coords.y = tmpCoordY;
				islands.push(island);
			}
			// add the new city
			var ci = new cityInfo();
			ci.name = tmpCity;
			ci.townHallSize = tmpTownHallSize;
			ci.player = currentPlayer;
			ci.island = island;
			cities.push(ci);
			// add the city to the current players city list
			currentPlayer.cities.push(ci);
			// add the city to the island's city list
			island.cities.push(ci);
		}
	}
	if((cities.length == 0) || (players.lengths == 0)){
		alert('No Ika Core Search Results available');
		return;
	}

	// player list (sorted by generals, only distinct values)
	players.sort(playerInfoCompareByGenerals);
	players = players.unique();
	
	displayExportWindow(cities, alliances, players);
}


function displayExportWindow (cities, alliances, players) {
    var windowName  = 'ICE';
	var windowWidth = 900;
	var windowHeight = 800;
    var windowOptions  = 'width='+windowWidth+',height='+windowHeight+',status=no,toolbar=0,copyhistory=no,';
    windowOptions += 'location=no,scrollbars=yes,menubar=no,directories=no';
    windowRef = window.open('', windowName, windowOptions);
    
	windowRef.document.write((<r><![CDATA[
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
                "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
        <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Ikariam Ika Core Export</title>
        
    ]]></r>).toString());
	
	windowRef.document.write('</head>');
	windowRef.document.write('<body>');
	windowRef.document.write('</div></div></body></html>');
	
	// Theta Atiens text area
	var thetaCaption = windowRef.document.createElement('h3');
	thetaCaption.textContent = "Theta Atien's Alliance Map - Embassy Input format";
	var thetaTextArea = windowRef.document.createElement('textarea');
	thetaTextArea.setAttribute('rows','10');
	thetaTextArea.setAttribute('cols','80');
	var thetaText = '';
	for (var i = 0; i < cities.length; i++) {
		thetaText += cities[i].toThetaAtiensString();
		if(i < cities.length-1) thetaText += '\n';
	}
	thetaTextArea.textContent = thetaText;
	
	// Players in CSV format
	var playersCaption = windowRef.document.createElement('h3');
	playersCaption.textContent = "Player data in CSV format (ready for Excel import)";
	var playersTextArea = windowRef.document.createElement('textarea');
	playersTextArea.setAttribute('rows','10');
	playersTextArea.setAttribute('cols','80');
	var playersText = '"Player name";"Alliance";score;gold;generals\n';
	for (var i = 0; i < players.length; i++) {
		playersText += players[i].toCSVString();
		if(i < players.length-1) playersText += '\n';
	}
	playersTextArea.textContent = playersText;
	
	// Cities in CSV format
	var citiesCaption = windowRef.document.createElement('h3');
	citiesCaption.textContent = "City data in CSV format (ready for Excel import)";
	var citiesTextArea = windowRef.document.createElement('textarea');
	citiesTextArea.setAttribute('rows','10');
	citiesTextArea.setAttribute('cols','80');
	var citiesText = '"Player";Score;"Alliance";Gold;Generals;City;TownHallSize;Island;X-coordinate;Y-coordinate\n';
	for (var i = 0; i < cities.length; i++) {
		citiesText += cities[i].toCSVString();
		if(i < cities.length-1) {
			citiesText += '\n';
		}
	}
	citiesTextArea.textContent = citiesText;

	var body = windowRef.document.body;
	body.appendChild(thetaCaption);
	body.appendChild(thetaTextArea);
	body.appendChild(playersCaption);
	body.appendChild(playersTextArea);
	body.appendChild(citiesCaption);
	body.appendChild(citiesTextArea);
	
	windowRef.document.close();
}




syslog('Ikariam Ika Core Export activating',1);

// add Export button to top left corner
var button = htmlImg('http://www.btbpclaritypro.com/Images/r&d_icons/data_export_icon.png', 50,50);
button.setAttribute('style', 'position: absolute; top: 15px; left: 2px; cursor: pointer');
button.setAttribute('title', 'Ika Core Search Result Export tool. Open one or multiple Ika Core Search result windows. Click this icon. Type Ctrl-A to select all text in alert window and then Ctrl-C to copy to clipboard. Then press enter to close the alert window.');
button.addEventListener('click', exportButtonOnClickHandler, false);
var header = $('GF_toolbar');
header.appendChild(button);

syslog('Ikariam Ika Core Export finished',1);
  