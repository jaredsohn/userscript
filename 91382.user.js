// ==UserScript==
// @name			Ikariam Görsel Harita
// @namespace		userscripts.org
// @homepage		http://userscripts.org/scripts/show/90744
// @description		İkariam oyuncularını veya ittifakları kolay ve hızlı bir şekilde kordinat ve diger bütün özellikleri ile aramanıza yarıyacak güzel bir harita...(www.ikariam.forumm.biz) 
// @version			1.0.3
// @include			http://s*.ikariam.*/*
// @exclude			http://support*.ikariam.*/*
// @license        
	// ==/UserScript==
// Version history:
// 1.0.3/25.11.2010 Feature: All city names in preview act as links to city's island view.
// 1.0.2/24.11.2010	Change: New look and feel for the UI
// 1.0.1/23.11.2010	Feature: Keyboard 'enter' activates search
//					Feature: Zoom map with mouse wheel, zoom centers on mouse cursor location
//					Change: Visual Map icon as an inline smaller image
// 1.0.0/22.11.2010	Feature: Status bar at the bottom which contains statistics on the shown data
//					Change: Unlimited zoom with proper view location maintanance
//					Feature: Pan the map by dragging with mouse
// 0.0.5/21.11.2010	Feature: Player status and city townhall size added to preview
//					Feature: Selectable highlighting of inactive/vacation status
//					Feature: New report types: "Islands - Gold", "Players - Generals", "Players - Score", "Players - Gold"
// 0.0.4/20.11.2010	Feature: Koordinat formatting enhanced
//					Feature: Color coded legend of displayed alliances
//					Change: Maximum supported number of alliances is changed from 10 to 15
//					Fix: UI elements flicker when opening the window
// 0.0.3/18.11.2010 Feature: Zoom-selection (1-4x)
//					Feature: Search by player name
//					Feature: Added two basic reports "Islands - Generals", "Islands - Score"
//					Feature: More information fields for mouse over preview (alliance, score, gold)
//					Feature: Resizable map window
//					Feature/fix: Smaller items placed on top of larger ones to gain mouse hover access
// 0.0.2/17.11.2010	First release

/* 
Potential todos:
- Show travel times from current own city
- Store and restore multiple search criterias
- Highlight own islands
- Remove highlight colors from used alliance colors
- Rescale elements instead of redrawing them when zooming
- Show/highligh player cities on map when hoovering over player's info
- More search criteria (actually all supported should be somehow provided)
- Grouping by other fields in addition to alliance
- Highlight alliance's map elements when hoovering over corresponding legend item
- Make grid ticks visible when zooming
- Export retrieved data to other formats (merge Ika Core Export)
- Make containers "dockable" or at least their visibility selectable
- Define and restrict minimum size of window to prevent misaligned/overlapping ui elements)
- Make map container its own class and script file so it could be utilised in other scripts
*/


var syslogLogLevel = 4;  // Higher number results in finer logging, 1-4
var syslogJavaConsoleEnabled = true;
var syslogFirebugEnabled = true;

const defaultWindowWidth = 1024;
const defaultWindowHeight = 810;

const mapXOffset = 20;
const mapYOffset = 45;
const defaultMapScaleRatio = 55;
var mapScaleRatio = defaultMapScaleRatio;
var mapScale = 1;

var windowResizeTimeOut = null;
var windowRef = null;

var mapContainer = null;
var statusContainer = null;
var legendContainer = null;
var previewContainer = null;
var searchContainer = null;
var ikaCoreAddContainer = null;

var dragMouseDown = false;
var dragPrevX = 0;
var dragPrevY = 0;

var allianceInput = null;
var playerInput = null;
var reportSelect = null;
var highlightInactiveCheckbox = null;
var highlightVacationCheckbox = null;

var cities = [];
var alliances = [];
var players = [];
var islands = [];


const HTML_ELEMENT =
{
	br:			'br',
	div:		'div',
	tbody: 		'tbody',
	tr:			'tr',
	th:			'th',
	td:			'td',
	img:		'img',
	button:		'input',
	a:			'a',
	h1:			'h1',
	h2:			'h2',
	h3:			'h3',
	h4:			'h4',
	h5:			'h5'
};

const ALLIANCE_COLOR =
{
	0: 			'green',
	1: 			'red',
	2:			'blue',
	3:			'olive',
	4:			'grey',
	5:			'yellow',
	6:			'aqua',
	7:			'purple',
	8:			'fuchsia',
	9:			'orange',
	10:			'orchid',
	11:			'peru',
	12:			'rosybrown',
	13:			'salmon',
	14:			'skyblue'
}

const ALLIANCE_TEXT_COLOR =
{
	0: 			'white',
	1: 			'white',
	2:			'white',
	3:			'white',
	4:			'white',
	5:			'black',
	6:			'black',
	7:			'white',
	8:			'white',
	9:			'white',
	10:			'white',
	11:			'white',
	12:			'white',
	13:			'white',
	14:			'white'
}

const REPORT_TYPE = {
	rtIslandsGenerals: 	'Islands - Generals',
	rtIslandsScore: 	'Islands - Score',
	rtIslandsGold:		'Islands - Gold',
	rtPlayersGenerals: 	'Players - Generals',
	rtPlayersScore: 	'Players - Score',
	rtPlayersGold:		'Players - Gold'
	
};

const REPORT_TYPE_INDEX = [
	REPORT_TYPE.rtIslandsGenerals,
	REPORT_TYPE.rtIslandsScore,
	REPORT_TYPE.rtIslandsGold,
	REPORT_TYPE.rtPlayersGenerals,
	REPORT_TYPE.rtPlayersScore,
	REPORT_TYPE.rtPlayersGold
];

const PLAYER_STATUS = {
	0:			'Aktif',
	1:			'Tatilde',
	2:			'İnaktif'
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

function removeElementsByClassname(root, className, parent) {
	var elems = root.getElementsByClassName(className);
	while(elems.length > 0) {
		parent.removeChild(elems[0]);
	}
}

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



/*
 *  Firebug console log
 */
function consoleLog(object){
	if(unsafeWindow.console){
		unsafeWindow.console.log(object);	
	}	
}

/*
 *  Firebug console dir
 */
function consoleDir(object){
	syslog('ConsoleDir: ' + arguments.callee.caller.name,1);
	if(unsafeWindow.console){
		unsafeWindow.console.dir(object);	
	}
}

/*
 *  Generic syslog targeting Java and/or Firebug console 
 */
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


function removeAllChildElements(item) {
	while(item.hasChildNodes()) {
		item.removeChild(item.firstChild);
	}
}

function visualMapHeading(text) {
	result = document.createElement('div');
	result.setAttribute('class', 'visualMap_heading');
	result.innerHTML = text;
	return result;
}

function visualMapCaption(text) {
	result = document.createElement('div');
	result.setAttribute('class', 'visualMap_caption');
	result.innerHTML = text;
	return result;
}

function visualMapButton(text) {
	result = document.createElement('input');
	result.setAttribute('class', 'visualMap_button');
	result.setAttribute('type', 'button');
	result.setAttribute('name', text);
	result.setAttribute('value', text);
	return result;
}

function visualMapInput() {
	result = document.createElement('input');
	result.setAttribute('class', 'visualMap_input');
	return result;
}

function visualMapSelect() {
	result = document.createElement("select");
	result.setAttribute('class', 'visualMap_select');
	return result;
}

function visualMapCheckbox() {
	result = document.createElement("input");
	result.setAttribute('class', 'visualMap_checkbox');
	result.setAttribute('type', 'checkbox');
	return result;
}
function visualMapLabel(text) {
	result = document.createElement("label");
	result.setAttribute('class', 'visualMap_label');
	result.textContent = text;
	return result;
}


function htmlElement(element, childElement){
	result = document.createElement(element);
	result.setAttribute('class', 'visualMap_' + element);
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
		result.setAttribute('type', 'button');
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

function getDomain(){
	return document.domain;
}

function ikariamGetServer() {
	var domain = getDomain();
	return domain.substring(domain.indexOf('.') + 1, domain.length);
}

function ikariamGetWorld() {
	var domain = getDomain();
	return domain.substring(1, domain.indexOf('.'));
}


function getArrayItemByName(array, name) {
	for (var i = 0; i < array.length; i++) {
		if(array[i].name == name) return array[i];
	}
	return null;
}


function coordinates() {
	this.x = 0;
	this.y = 0;
}

coordinates.prototype.asString = function() {
	return '[' + this.x + ':' + this.y + ']';
}


function islandInfo() {
	this.name = '';
	this.coords = new coordinates();
	this.cities = [];
}


islandInfo.prototype.draw = function(alliances, parent, reportType, highlightInactive, highlightVacation) {
	var containsInactive = false;
	var containsVacation = false;
	// create and initialise an array to hold the values per alliance
	var islandValues = new Array(alliances.length);
	for (var i = 0; i < islandValues.length; i++) {islandValues[i] = 0};
	for (var i = 0; i < this.cities.length; i++) {
		allianceIndex = alliances.indexOf(this.cities[i].player.alliance);
		playerNumberOfCities = this.cities[i].player.cities.length;
		if(this.cities[i].player.status == 'inactive') containsInactive = true;
		if(this.cities[i].player.status == 'vacation') containsVacation = true;
		var playerValue = 0;
		switch (reportType)
		{
			case REPORT_TYPE.rtIslandsGenerals:
			  playerValue = this.cities[i].player.generals;
			  break;
			case REPORT_TYPE.rtIslandsScore:
			  playerValue = this.cities[i].player.score;
			  break;
			case REPORT_TYPE.rtIslandsGold:
			  playerValue = this.cities[i].player.gold;
			  break;
			default:
			  syslog('Unknown report type' + reportType);
			  return;
		}
		islandValues[allianceIndex] += playerValue/playerNumberOfCities;
	}

	// display a separate box for each alliance (if present on that island)
	for (var i = 0; i < islandValues.length; i++) {
		if(islandValues[i] == 0) continue;
		var size = 0;
		switch (reportType)
		{
			case REPORT_TYPE.rtIslandsGenerals:
			  size = Math.round(islandValues[i]/1000)*mapScale;
			  break;
			case REPORT_TYPE.rtIslandsScore:
			  size = Math.round(islandValues[i]/50000)*mapScale;
			  break;
			case REPORT_TYPE.rtIslandsGold:
			  size = Math.round(islandValues[i]/1000000)*mapScale;
			  break;
			default:
			  syslog('Unknown report type' + reportType);
			  return;
		}
		// to put larger boxed on the bottom...
		var zindex = (5000 - size);
		var left = mapXOffset + (this.coords.x*mapScaleRatio*mapScale/10)-Math.round(size/2);
		var top = mapYOffset + (this.coords.y*mapScaleRatio*mapScale/10)-Math.round(size/2);
		if (left < 0) left = 0;
		if (top < 0) top = 0;
		var color = ALLIANCE_COLOR[i];
		var islandBox = htmlDiv();
		islandBox.setAttribute('class', 'islandInfo');
		islandBox.setAttribute('id', this.name);
		islandBox.setAttribute('title', this.name + ' ' + this.coords.asString());
		islandBox.setAttribute('style', 'z-index:'+zindex+';opacity:.60; left:' + left + 'px; top:' + top + 'px; height:' + size + 'px; width:' + size + 'px; background-color:' + color);
		// highligh inactive 
		if ((highlightInactive && containsInactive) || (highlightVacation && containsVacation)) {
			islandBox.style.border = '2px solid yellow';
		}
		islandBox.addEventListener('mouseover', onIslandInfoMouseOver, false);
		parent.appendChild(islandBox);
	}
}

islandInfo.prototype.preview = function(parent) {
	// Table body
	var tblBody = htmlTableBody();
	// Header row
	var tblHeader = htmlTableRow();
	tblHeader.appendChild(htmlTableHeaderCell('Oyuncu'));
	tblHeader.appendChild(htmlTableHeaderCell('Durumu'));
	tblHeader.appendChild(htmlTableHeaderCell('İttifak'));
	tblHeader.appendChild(htmlTableHeaderCell('General'));
	tblHeader.appendChild(htmlTableHeaderCell('Puan'));
	tblHeader.appendChild(htmlTableHeaderCell('Altın'));
	tblHeader.appendChild(htmlTableHeaderCell('Şehri'));
	tblHeader.appendChild(htmlTableHeaderCell('Şehir Boyutu'));
	tblBody.appendChild(tblHeader);	
	for (var i = 0; i < this.cities.length; i++) {
		var tr = htmlTableRow();
		tr.appendChild(htmlTableCell(this.cities[i].player.name));
		tr.appendChild(htmlTableCell(this.cities[i].player.status));
		tr.appendChild(htmlTableCell(this.cities[i].player.alliance));
		tr.appendChild(htmlTableCell(intToString(this.cities[i].player.generals)));
		tr.appendChild(htmlTableCell(intToString(this.cities[i].player.score)));
		tr.appendChild(htmlTableCell(intToString(this.cities[i].player.gold)));
		var cityLink = htmlAHref('?view=island&cityId=' + this.cities[i].id, this.cities[i].name);
		cityLink.addEventListener('click', onCityLinkClick, false);
		
		tr.appendChild(htmlTableCell(cityLink));
		tr.appendChild(htmlTableCell(intToString(this.cities[i].townHallSize)));
		tblBody.appendChild(tr);
	}
	parent.appendChild(tblBody);
}

function onCityLinkClick(e) {
	// navigate the main (calling) browser window to chose city's island view
	window.location = this.href;
	// prevent loading the page to the map window
	e.preventDefault();
}

islandInfo.prototype.getPreviewHeading = function() {
	return this.name + ' ' + this.coords.asString();
}


function playerInfo() {
	this.name = '';
	this.status ='';
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

playerInfo.prototype.draw = function(alliances, parent, reportType, highlightInactive, highlightVacation) {
	var isInactive = false;
	var isOnVacation = false;
	var valueScale = 0;
	if(this.status == 'inactive') isInactive = true;
	if(this.status == 'vacation') isOnVacation = true;
	var playerValue = 0;
	switch (reportType)	{
		case REPORT_TYPE.rtPlayersGenerals:
		  playerValue = this.generals;
		  valueScale = 1000;
		  break;
		case REPORT_TYPE.rtPlayersScore:
		  playerValue = this.score;
		  valueScale = 50000;
		  break;
		case REPORT_TYPE.rtPlayersGold:
		  playerValue = this.gold;
		  valueScale = 1000000;
		  break;
		default:
		  syslog('playerInfo: Unknown report type ' + reportType);
		  return;
	}
	var size = Math.round(playerValue/valueScale)*mapScale;
	// to put larger boxed on the bottom...
	var zindex = (5000 - size);
	// use the average of city coordinates as the reporting center
	var coords = this.getCenterOfCities();
	var left = mapXOffset + (coords.x*mapScaleRatio*mapScale/10)-Math.round(size/2);
	var top = mapYOffset + (coords.y*mapScaleRatio*mapScale/10)-Math.round(size/2);
	if (left < 0) left = 0;
	if (top < 0) top = 0;
	var color = ALLIANCE_COLOR[alliances.indexOf(this.alliance)];
	var playerBox = htmlDiv();
	playerBox.setAttribute('class', 'playerInfo');
	playerBox.setAttribute('id', this.name);
	playerBox.setAttribute('title', this.name + ' ' + coords.asString());
	playerBox.setAttribute('style', 'z-index:'+zindex+';opacity:.60; left:' + left + 'px; top:' + top + 'px; height:' + size + 'px; width:' + size + 'px; background-color:' + color);
	// highligh inactive 
	if ((highlightInactive && isInactive) || (highlightVacation && isOnVacation)) {
		playerBox.style.border = '2px solid yellow';
	}
	playerBox.addEventListener('mouseover', onPlayerInfoMouseOver, false);
	parent.appendChild(playerBox);
}

function onPlayerInfoMouseOver() {
	updatePreview(getArrayItemByName(players, this.getAttribute('id')));
}

playerInfo.prototype.preview = function(parent) {
	// Table body
	var tblBody = htmlTableBody();
	// Header row for player info
	var tblHeader = htmlTableRow();
	tblHeader.appendChild(htmlTableHeaderCell('Player'));
	tblHeader.appendChild(htmlTableHeaderCell('Status'));
	tblHeader.appendChild(htmlTableHeaderCell('Alliance'));
	tblHeader.appendChild(htmlTableHeaderCell('Generals'));
	tblHeader.appendChild(htmlTableHeaderCell('Score'));
	tblHeader.appendChild(htmlTableHeaderCell('Gold'));
	tblBody.appendChild(tblHeader);
	// Player info content
	var tr = htmlTableRow();
	tr.appendChild(htmlTableCell(this.name));
	tr.appendChild(htmlTableCell(this.status));
	tr.appendChild(htmlTableCell(this.alliance));
	tr.appendChild(htmlTableCell(intToString(this.generals)));
	tr.appendChild(htmlTableCell(intToString(this.score)));
	tr.appendChild(htmlTableCell(intToString(this.gold)));
	tblBody.appendChild(tr);
	// Header row for city information
	var tblHeader = htmlTableRow();
	tblHeader.appendChild(htmlTableHeaderCell('City'));
	tblHeader.appendChild(htmlTableHeaderCell('TH'));
	tblHeader.appendChild(htmlTableHeaderCell('Island'));
	tblBody.appendChild(tblHeader);
	// City info content
	for (var i = 0; i < this.cities.length; i++) {
		var tr = htmlTableRow();
		var cityLink = htmlAHref('?view=island&cityId=' + this.cities[i].id, this.cities[i].name);
		cityLink.addEventListener('click', onCityLinkClick, false);
		tr.appendChild(htmlTableCell(cityLink));
		tr.appendChild(htmlTableCell(intToString(this.cities[i].townHallSize)));
		tr.appendChild(htmlTableCell(this.cities[i].island.name + ' ' + this.cities[i].island.coords.asString()));
		tblBody.appendChild(tr);
	}
	parent.appendChild(tblBody);
}

playerInfo.prototype.getPreviewHeading = function() {
	return this.name + ' ' + this.getCenterOfCities().asString();
}



// Compare function for player sorting
function playerInfoCompareByGenerals(a,b) {
	return (b.generals - a.generals);
}

// Compare function for city sorting (city name)
function cityInfoCompareByName(a,b) {
	return a.name.localeCompare(b);
}

// Compare function for city sorting (player name)
function cityInfoCompareByPlayerName(a,b) {
	return a.player.name.localeCompare(b.player.name);
}

// Compare function for city sorting (player generals)
function cityInfoCompareByPlayerGenerals(a,b) {
	return (b.player.generals - a.player.generals);
}

function cityInfo() {
	this.id = '';
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


function ikaCoreSearchParams () {
	this.server = '';
	this.world = '';
	this.player = '';
	this.city = '';
	this.status = '';
	this.alliance = '';
	this.militaryScoreLow = 0;
	this.militaryScoreHigh = 99999;
	this.goldScoreLow = 0;
	this.goldScoreHigh = 99999999;
	this.townHallLevelLow = 0;
	this.townHallLevelHigh = 50;
}


ikaCoreSearchParams.prototype.toString = function() {
	result = 's=' + this.server;
	result += '&w=' + this.world;
	result += '&p='+ this.player; 
	result += '&c='+ this.city;
	result += '&st=' + this.status;
	result += '&a=' + this.alliance;
	result += '&msl=' + this.militaryScoreLow;
	result += '&msh=' + this.militaryScoreHigh;
	result += '&gsl=' + this.goldScoreLow;
	result += '&gsh=' + this.goldScoreHigh;
	result += '&thl=' + this.townHallLevelLow;
	result += '&thh=' + this.townHallLevelHigh;
	result += '&sea=13';
	return result;
}


// example: http://www.ika-core.org/icore/searchbar.php?s=fi.ikariam.com&w=2&p=bt_viper&c=&st=&a=&msl=0&msh=99999&gsl=0&gsh=99999999&thl=0&thh=50&sea=13
// example: http://www.ika-core.org/icore/searchbar.php?s=fi.ikariam.com&w=2&p=bt_viper&sea=13
function searchIkaCore(searchParams, callback){
	syslog('searchIkaCore starting');
	var  url = 'http://www.ika-core.org/icore/searchbar.php?' + searchParams.toString();
	// use GM_xmlhttpRequest to get over the site boundary
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(xhr) {
					var data = eval("(" + xhr.responseText + ")");
					callback(data);
				}
	});
	syslog('searchIkaCore finished');
}
/*
[["bt_viper","0","457414","10601","1558335","BHS","Vipers Lair","25","Bontaos","33","43","23","29","8","165808","618","2","0"],
["bt_viper","0","457414","10601","1558335","BHS","Vipers Nest","25","Rekoios","33","44","21","27","6","164607","620","4","0"]]
*/
function ikaCoreSearchResultHandler(data) {
	for (var i = 0; i < data.length; i++) {
		// get a reference to an existing player or create a new player if necessary
		var player = getArrayItemByName(players, data[i][0]);
		if (!player) {
			player = new playerInfo();
			player.name = data[i][0];
			player.status = PLAYER_STATUS[parseInt(data[i][1])];
			player.alliance = data[i][5];
			if(player.alliance == '') player.alliance = '-';
			player.score = parseInt(data[i][2]);
			player.gold = parseInt(data[i][4]);;
			player.generals = parseInt(data[i][3]);
			players.push(player);
			// add the alliace to the alliances list of not already there
			if(alliances.indexOf(player.alliance) == -1) alliances.push(player.alliance);
		}
		
		// get a reference to an existing island or create a new one if necessary
		var island = getArrayItemByName(islands, data[i][8]);
		if(!island) {
			island = new islandInfo();
			island.name = data[i][8];
			island.coords.x = parseInt(data[i][9]);
			island.coords.y = parseInt(data[i][10]);
			islands.push(island);
		}
		
		// add the city
		var city = new cityInfo();
		city.id = data[i][14];
		city.name = data[i][6];
		city.townHallSize = parseInt(data[i][7]);
		city.player = player;
		city.island = island;
		cities.push(city);
		
		// add the city to the current players city list
		player.cities.push(city);
		
		// add the city to the island's city list
		island.cities.push(city);
	}
	
	// sort cities by player name
	cities.sort(cityInfoCompareByPlayerName);
	
	// sort all islands citylists
	for (var i = 0; i < islands.length; i++){
		islands[i].cities.sort(cityInfoCompareByPlayerGenerals);
	}
	
	// Check that the number of alliances is less than 15
	if(alliances.length > 15) {
		alert('Maximum number of supported simultaneously displayed alliances (15) exceeded. Additional alliances will no be displayed correctly.');
	}
	
	// draw the map
	drawMap();
}


function drawMap() {
	// first clear the old elements from the map
	removeElementsByClassname(windowRef.document, 'islandInfo', mapContainer);
	removeElementsByClassname(windowRef.document, 'playerInfo', mapContainer);
	// draw the data to the map
	var reportType = REPORT_TYPE_INDEX[parseInt(reportSelect.options[reportSelect.selectedIndex].value)];
	switch (reportType) {
		case REPORT_TYPE.rtIslandsGenerals: case REPORT_TYPE.rtIslandsScore: case REPORT_TYPE.rtIslandsGold: 
			for (var i = 0; i < islands.length; i++) { 
				islands[i].draw(alliances, mapContainer, reportType, highlightInactiveCheckbox.checked, highlightVacationCheckbox.checked);
			}
			break;
		case REPORT_TYPE.rtPlayersGenerals: case REPORT_TYPE.rtPlayersScore: case REPORT_TYPE.rtPlayersGold: 
			for (var i = 0; i < players.length; i++) { 
				players[i].draw(alliances, mapContainer, reportType, highlightInactiveCheckbox.checked, highlightVacationCheckbox.checked);
			}
			break;

		default: 
			syslog('drawMap: Unknown report type ' + reportType);
			break;
	}
	
	// update legend
	updateLegend(alliances);
	
	// update status
	updateStatus(alliances, players, islands, cities);
}

exportButtonOnClickHandler = function() {
	displayMapWindow();
}

function onIslandInfoMouseOver() {
	updatePreview(getArrayItemByName(islands, this.getAttribute('id')));
}

function updatePreview(item) {
	removeAllChildElements(previewContainer);
	// Heading
	previewContainer.appendChild(visualMapHeading('Koordinat - ' + item.getPreviewHeading()));
	item.preview(previewContainer);
}

function updateLegend(alliances) {
	removeAllChildElements(legendContainer);
	// Table body
	var tblBody = htmlTableBody();
	// Header row only
	var tblHeader = htmlTableRow();
	for (var i = 0; i < alliances.length; i++) {
		var th = htmlTableHeaderCell(alliances[i]);
		th.setAttribute('style', 'opacity:0.8;background:none;background-color:'+ ALLIANCE_COLOR[i] + ';color:' +  ALLIANCE_TEXT_COLOR[i]);
		tblHeader.appendChild(th);
		
	}
	tblBody.appendChild(tblHeader);
	legendContainer.appendChild(tblBody);
}

function updateStatus(alliances, players, islands, cities) {
	removeAllChildElements(statusContainer);
	// Table body
	var tblBody = htmlTableBody();
	// Header row only
	var tblHeader = htmlTableRow();
	tblHeader.appendChild(htmlTableHeaderCell('Server/world: ' + ikariamGetServer() + '/' + ikariamGetWorld()));
	tblHeader.appendChild(htmlTableHeaderCell('Alliances: ' + alliances.length));
	tblHeader.appendChild(htmlTableHeaderCell('Players: ' + players.length));
	tblHeader.appendChild(htmlTableHeaderCell('Islands: ' + islands.length));
	tblHeader.appendChild(htmlTableHeaderCell('Cities: ' + cities.length));
	tblHeader.appendChild(htmlTableHeaderCell('Zoom: ' + mapScale));
	tblBody.appendChild(tblHeader);
	statusContainer.appendChild(tblBody);
}
function createSearchContainer(parent) {
	var result = htmlDiv();
	result.setAttribute('class', 'searchContainer');
	result.setAttribute('style', 'display:none');
	parent.appendChild(result);
	// Heading
	result.appendChild(visualMapHeading('Arama'));
	// Alliance input (input field is stored in a global variable)
	result.appendChild(visualMapCaption('İttifak İsmi'));
	allianceInput = visualMapInput();
	result.appendChild(allianceInput);
	// Player input (input field is stored in a global variable)
	result.appendChild(visualMapCaption('Oyuncu Adı:'));
	playerInput = visualMapInput();
	result.appendChild(playerInput);
	result.appendChild(htmlBr());
	// Search button
	var searchButton = visualMapButton('Arama Yap');
	searchButton.addEventListener('click', onSearchClick, false);
	result.appendChild(searchButton);
	// result.appendChild(htmlBr());
	// Clear map button
	var clearButton = visualMapButton('Haritayı Temizle');
	clearButton.addEventListener('click', onClearMapClick, false);
	result.appendChild(clearButton);
	result.appendChild(htmlBr());
	// Map settings
	result.appendChild(visualMapHeading('Harıta Ayarları'));
	// Zoom buttons
	result.appendChild(visualMapLabel('Zoom'));
	var zoomInButton = visualMapButton('+');
	zoomInButton.addEventListener('click', onZoomInClick, false);
	result.appendChild(zoomInButton);
	var zoomOutButton = visualMapButton('-');
	zoomOutButton.addEventListener('click', onZoomOutClick, false);
	result.appendChild(zoomOutButton);
	
	// Report drop down (stored as a global variable)
	reportSelect = visualMapSelect();
	reportSelect.text = 'Report';
	reportSelect.value = 'Report';
	for(i=0; i < REPORT_TYPE_INDEX.length; i++ ) {
		reportSelect.appendChild(new Option(REPORT_TYPE_INDEX[i],i));
	}
	reportSelect.addEventListener('change', onReportSelectChange, false);
	result.appendChild(reportSelect);
	result.appendChild(htmlBr());
	// Highlight inactive/vacation checkboxes
	result.appendChild(visualMapLabel('Vurgula: Inaktif'));
	highlightInactiveCheckbox = visualMapCheckbox();
	highlightInactiveCheckbox.checked = true;
	highlightInactiveCheckbox.addEventListener('change', onHighlightCheckboxChange, false);
	result.appendChild(highlightInactiveCheckbox);
	result.appendChild(visualMapLabel('Tatilde'));
	highlightVacationCheckbox = visualMapCheckbox();
	highlightVacationCheckbox.checked = true;
	highlightVacationCheckbox.addEventListener('change', onHighlightCheckboxChange, false);
	result.appendChild(highlightVacationCheckbox);

	return result;
}

function onSearchClick() {
	syslog('Ikariam Visual Map - Search activated',1);
	var searchParams = new ikaCoreSearchParams();
	searchParams.server = ikariamGetServer();
	searchParams.world = ikariamGetWorld();
	searchParams.alliance = allianceInput.value;
	searchParams.player = playerInput.value;
	searchIkaCore(searchParams, ikaCoreSearchResultHandler);
	syslog('Ikariam Visual Map - Search finished',1);
}

function onClearMapClick() {
	syslog('Ikariam Visual Map - Clear Map activated',1);
	cities = [];
	players = [];
	alliances = [];
	islands = [];
	drawMap();
	syslog('Ikariam Visual Map - Clear Map finished',1);
}

function onZoomInClick() {
	syslog('onZoomInClick');
	mapScale += 1;
	onZoomChange();
}

function onZoomOutClick() {
	syslog('onZoomOutClick');p
	mapScale -= 1;
	if(mapScale < 1) mapScale = 1;
	onZoomChange();
}

function onZoomChange() {
	// calculate the current center position as factor
	var xFactor = (mapContainer.scrollLeft + mapContainer.clientWidth/2) / mapContainer.scrollWidth;
	var yFactor = (mapContainer.scrollTop + mapContainer.clientHeight/2) / mapContainer.scrollHeight;
	drawGrid();
	drawMap();
	// re-position the scrollbars to get a real zoom effect
	mapContainer.scrollLeft = xFactor * mapContainer.scrollWidth - mapContainer.clientWidth/2;
	mapContainer.scrollTop = yFactor * mapContainer.scrollHeight - mapContainer.clientHeight/2;
}

function onReportSelectChange() {
	drawMap();
}

function onHighlightCheckboxChange() {
	drawMap();
}

function createLegendContainer(parent) {
	var result = htmlDiv();
	result.setAttribute('class', 'legendContainer');
	result.setAttribute('style', 'display:none;overflow:auto');
	parent.appendChild(result);
	return result;
}

function createStatusContainer(parent) {
	var result = htmlDiv();
	result.setAttribute('class', 'statusContainer');
	result.setAttribute('style', 'display:none;overflow:auto');
	parent.appendChild(result);
	return result;
}

function createPreviewContainer(parent) {
	var result = htmlDiv();
	result.setAttribute('class', 'previewContainer');
	result.setAttribute('style', 'display:none;overflow:auto');
	parent.appendChild(result);
	result.appendChild(visualMapHeading('Koordinat'));
	return result;
}

function createMapContainer(parent) {
	var result = htmlDiv();
	result.setAttribute('class', 'mapContainer');
	result.setAttribute('style', 'display:none;overflow:auto');
	result.addEventListener('dragstart', onMapContainerDragStart, false);
	parent.appendChild(result);
	// Heading
	result.appendChild(visualMapHeading('Ikariam Görsel Harita - Powered By CEDRIC'));
	return result;
}


function onGridSurroundMouseDown(e) {
	if(!e) return;
	var currentX = mapContainer.scrollLeft + e.clientX;
	var currentY = mapContainer.scrollTop + e.clientY;
	dragPrevX = currentX;
	dragPrevY = currentY;
	return false;
}

function onGridSurroundMouseUp(e) {
	if(!e) return;
	var currentX = mapContainer.scrollLeft + e.clientX;
	var currentY = mapContainer.scrollTop + e.clientY;
	mapContainer.scrollLeft = mapContainer.scrollLeft + (dragPrevX-currentX);
	mapContainer.scrollTop = mapContainer.scrollTop + (dragPrevY-currentY);
	return false;
}

// Zoom with mousewheel (center on mouse cursor location)
function onGridSurroundMouseScroll(e) {
	var delta = 0;
	if (e.detail) { 
		delta = -e.detail/3;
	}
	// delta is positive on scroll up and vice versa
	if (delta > 0) mapScale += 1;
	else if (delta < 0) mapScale -= 1;
	if(mapScale < 1) mapScale = 1;
	
	// zoom on mouse cursor location (make it the new center)
	var xFactor = (mapContainer.scrollLeft + e.clientX) / mapContainer.scrollWidth;
	var yFactor = (mapContainer.scrollTop + e.clientY) / mapContainer.scrollHeight;
	drawGrid();
	drawMap();
	// re-position the scrollbars to get a real zoom effect
	mapContainer.scrollLeft = xFactor * mapContainer.scrollWidth - mapContainer.clientWidth/2;
	mapContainer.scrollTop = yFactor * mapContainer.scrollHeight - mapContainer.clientHeight/2;
	
	e.preventDefault();
	return false;
}

function onMapContainerDragStart(e) {
	syslog('onMapContainerDragStart');
	e.preventDefault();
	return false;
}


function drawGrid () {
	// first remove previous grid elements
	removeElementsByClassname(windowRef.document, 'gridElem', mapContainer);
	removeElementsByClassname(windowRef.document, 'gridSurroundingBox', mapContainer);
	removeElementsByClassname(windowRef.document, 'hTick', mapContainer);
	removeElementsByClassname(windowRef.document, 'vTick', mapContainer);
	
	// vertical grid lines
	for (var i = 0; i < 5; i++) {
		var gridVert = htmlDiv();
		var top = mapYOffset;
		var left = mapXOffset + (i*mapScale*mapScaleRatio)*2;
		var width = mapScale*mapScaleRatio-1;
		var height = mapScale*mapScaleRatio*10-1;
		gridVert.setAttribute('class', 'gridElem');
		gridVert.setAttribute('style', 'z-index:5;width:'+width+'px; height:'+height+'px; top:'+top+'px; left:'+left+'px');
		//gridVert.addEventListener('selectstart', onMapContainerSelectStart, false);
		mapContainer.appendChild(gridVert);
	}
	
	// horizontal grid lines
	for (var i = 0; i < 5; i++) {
		var gridHoriz = htmlDiv();
		var top = mapYOffset + (i*mapScale*mapScaleRatio)*2;
		var left = mapXOffset;
		var width = mapScale*mapScaleRatio*10-1;
		var height = mapScale*mapScaleRatio-1;
		gridHoriz.setAttribute('class', 'gridElem');
		gridHoriz.setAttribute('style', 'z-index:5;width:'+width+'px; height:'+height+'px; top:'+top+'px; left:'+left+'px');
		//gridHoriz.addEventListener('selectstart', onMapContainerSelectStart, false);
		mapContainer.appendChild(gridHoriz);
	}
	
	// Surrounding box
	var gridSurr = htmlDiv();
	var top = mapYOffset;
	var left = mapXOffset;
	var width = mapScale*mapScaleRatio*10-2;
	var height = mapScale*mapScaleRatio*10-2;
	gridSurr.setAttribute('class', 'gridSurroundingBox');
	gridSurr.setAttribute('style', 'cursor:all-scroll;z-index:10;width:'+width+'px; height:'+height+'px; top:'+top+'px; left:'+left+'px');
	gridSurr.addEventListener('mousedown', onGridSurroundMouseDown, false);
	gridSurr.addEventListener('mouseup', onGridSurroundMouseUp, false);
	gridSurr.addEventListener('DOMMouseScroll', onGridSurroundMouseScroll, false);
	mapContainer.appendChild(gridSurr);	
	
	// h-ticks
	for (var i = 1; i < 11; i++) {
		var hTick = htmlDiv();
		var height = 15;
		var top = mapYOffset-height-3;
		var left = mapXOffset + i*mapScale*mapScaleRatio-(mapScale*mapScaleRatio/2);
		var width = mapScale*mapScaleRatio-1;
		hTick.setAttribute('class', 'hTick');
		hTick.textContent = i*10;
		hTick.setAttribute('style', 'z-index:5;width:'+width+'px; height:'+height+'px; top:'+top+'px; left:'+left+'px');
		//hTick.addEventListener('selectstart', onMapContainerSelectStart, false);
		mapContainer.appendChild(hTick);
	}
	
	// v-ticks
	for (var i = 1; i < 11; i++) {
		var vTick = htmlDiv();
		var height = 15;
		var top = mapYOffset + i*mapScale*mapScaleRatio-height/2;
		var left = mapXOffset + mapScale*mapScaleRatio*10+5;
		var width = 15;
		vTick.setAttribute('class', 'vTick');
		vTick.textContent = i*10;
		vTick.setAttribute('style', 'z-index:5;width:'+width+'px; height:'+height+'px; top:'+top+'px; left:'+left+'px');
		//vTick.addEventListener('selectstart', onMapContainerSelectStart, false);
		mapContainer.appendChild(vTick);
	}
}

function createIkaCoreAddContainer(parent) {
	var ikaCoreAddFrame = windowRef.document.createElement('iframe');
	ikaCoreAddFrame.setAttribute('id', 'ikaCoreAddContainer');
	ikaCoreAddFrame.setAttribute('scrolling', 'NO');
	ikaCoreAddFrame.setAttribute('src', 'http://internettenparakazan.forum.st');
	ikaCoreAddFrame.setAttribute('disabled', 'true');
	parent.appendChild(ikaCoreAddFrame);
	return ikaCoreAddFrame;
}

function refreshSizesAndPositions() {
	// calculate new map scale ratio
	xRatio = defaultMapScaleRatio * windowRef.outerWidth/defaultWindowWidth;
	yRatio = defaultMapScaleRatio * windowRef.outerHeight/defaultWindowHeight;
	mapScaleRatio = Math.min(xRatio, yRatio);
	// reposition and resize mapContainer
	mapContainer.style.top = 10 + 'px';
	mapContainer.style.left = 10 + 'px';
	mapContainer.style.width = mapScaleRatio*10 + mapXOffset*3 + 'px';
	mapContainer.style.height = mapContainer.style.width;
	mapContainer.style.display = 'block';
	// reposition and resize previewContainer
	previewContainer.style.top = mapContainer.offsetTop + 'px';
	previewContainer.style.height = mapContainer.offsetHeight*0.5 + 'px';
	previewContainer.style.left = mapContainer.offsetLeft + mapContainer.offsetWidth + 5 + 'px';
	previewContainer.style.width = windowRef.outerWidth - mapContainer.offsetLeft - mapContainer.offsetWidth - 35 + 'px';
	previewContainer.style.display = 'block';
	// reposition and resize searchContainer
	searchContainer.style.top = previewContainer.offsetTop + previewContainer.offsetHeight + 0 + 'px';
	searchContainer.style.height = mapContainer.offsetHeight*0.5 - 7 + 'px';
	searchContainer.style.left = previewContainer.offsetLeft + 'px';
	searchContainer.style.width = previewContainer.style.width;
	searchContainer.style.display = 'block';
	// reposition and resize legendContainer
	legendContainer.style.top = mapContainer.offsetTop + mapContainer.offsetHeight + 0 + 'px';
	//legendContainer.style.height = '20px';
	legendContainer.style.left = mapContainer.offsetLeft + 'px';
	legendContainer.style.width = mapContainer.offsetWidth + searchContainer.offsetWidth + 2 + 'px';
	legendContainer.style.display = 'block';
	// reposition and resize statusContainer
	statusContainer.style.top = legendContainer.offsetTop + legendContainer.offsetHeight + 0 + 'px';
	//statusContainer.style.height = '20px';
	statusContainer.style.left = mapContainer.offsetLeft + 'px';
	statusContainer.style.width = legendContainer.style.width;
	statusContainer.style.display = 'block';
	// reposition (and resize) ikaCoreAddContainer
	ikaCoreAddContainer.style.top = statusContainer.offsetTop + statusContainer.offsetHeight + 5 + 'px';
	ikaCoreAddContainer.style.display = 'block';
	// re-draw grid and map items
	drawGrid();
	drawMap();
}

function onWindowResize() {
   if(windowResizeTimeOut != null) clearTimeout(windowResizeTimeOut);
   windowResizeTimeOut = setTimeout(refreshSizesAndPositions, 300);
}

function onWindowKeypress(e) {
	switch (e.keyCode)	{
		case 13:
		  onSearchClick();
		  break;
		default:
		  return;
	}
}


function displayMapWindow () {
    var windowName  = 'ICE';
	var windowWidth = defaultWindowWidth;
	var windowHeight = defaultWindowHeight;
    var windowOptions  = 'outerWidth='+windowWidth+',outerHeight='+windowHeight+',status=no,toolbar=0,copyhistory=no,';
    windowOptions += 'location=no,scrollbars=yes,menubar=no,directories=no';
    windowRef = window.open('', windowName, windowOptions);
	
	windowRef.document.write((<r><![CDATA[
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
                "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
        <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Ikariam.Forumm.Biz (Powered By Cedric)</title>
        
    ]]></r>).toString());
	
	windowRef.document.write((<r><![CDATA[
        <style type="text/css">
					table { border-collapse: collapse; }
					
					.visualMap_heading {
						color: #d9eef7;
						background: -moz-linear-gradient(top,  #00adee,  #0078a5);
						outline: none;
						text-align: center;
						text-decoration: none;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
						font: 16px/100% Arial, Helvetica, sans-serif;
						font-weight:bold;
						height: 15px;
						padding: .3em 1em .3em;
						margin: 0px;
						-moz-border-radius: 7px 7px 0 0;
					}
					
					.visualMap_caption, .visualMap_label {
						color: black;
						background-color: white;
						text-align: left;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
						font: 14px/100% Arial, Helvetica, sans-serif;
						padding: 3px;
						margin: 0px;
					}
			
					.visualMap_button {
						color: #e9e9e9;
						border: solid 1px #555;
						background: -moz-linear-gradient(top,  #888,  #575757);
						display: inline-block;
						outline: none;
						cursor: pointer;
						text-align: center;
						text-decoration: none;
						font: 14px/100% Arial, Helvetica, sans-serif;
						font-weight:bold;
						padding: .3em 1em .3em;
						margin: 5px;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
						-moz-border-radius: .5em;
						-moz-box-shadow: 0 2px 4px rgba(0,0,0,.4);
					}
					.visualMap_button:hover {
						text-decoration: none;
						background: -moz-linear-gradient(top,  #757575,  #4b4b4b);
					}
					.visualMap_button:active {
						color: #afafaf;
						background: -moz-linear-gradient(top,  #575757,  #888);
						position: relative;
						top: 1px;
					}
					
					.visualMap_input {
						background-color: white;
						color: black;
						padding: 3px;
						margin: 5px;
						font: 12px/100% Arial, Helvetica, sans-serif;
                        font-weight:normal;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
						-moz-border-radius: 4px;
						-moz-box-shadow: 0 2px 4px rgba(0,0,0,.4);
					}
										
					.visualMap_select, .visualMap_checkbox {
						background-color: white;
						color: black;
						padding: 3px;
						margin: 5px;
						font: 12px/100% Arial, Helvetica, sans-serif;
                        font-weight:normal;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
						-moz-border-radius: 4px;
						-moz-box-shadow: 0 2px 4px rgba(0,0,0,.4);
					}

					.visualMap_th {
						color: #e9e9e9;
						//background-color: lightgrey;
						background: -moz-linear-gradient(top,  #888,  #575757);
						//color: black;
						height: 15px;
						padding: 2px;
						margin: 1px;
						font: 12px/100% Arial, Helvetica, sans-serif;
						font-weight:normal;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
					}
					.visualMap_td {
						background-color: white;
						color: black;
						padding: 3px;
						margin: 1px;
						font: 12px/100% Arial, Helvetica, sans-serif;
						font-weight:normal;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
					}
					
					.playerInfo {
                        position: absolute;
                        width: 5px;
                        height: 5px;
                        border: 1px solid black;
                    }
					.islandInfo {
                        position: absolute;
                        border: 1px solid black;
                    }
					.searchContainer, .previewContainer {
                        position: absolute;
						padding: 0px;
						margin: 0px;
						border: 2px solid grey;
						-moz-border-radius: 6px;
						-moz-box-shadow: 0 2px 4px rgba(0,0,0,.4);
					}
					.statusContainer, .legendContainer {
						color: #e9e9e9;
						border: solid 1px #555;
						background: -moz-linear-gradient(top,  #888,  #575757);
						//background-color: lightgrey;
						font: 10px/100% Arial, Helvetica, sans-serif;
                        font-weight:normal;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
					    position: absolute;
						height: 15px;
						padding: 0px;
						margin: 0px;
						border: 1px solid grey;
						-moz-border-radius: 4px;
						-moz-box-shadow: 0 2px 4px rgba(0,0,0,.4);
					}
					
					#ikaCoreAddContainer {
						position: absolute;
						width: 732px;
						height: 91px;
						left: 10px;
						display: none;
						border: medium none;
						-moz-border-radius: 4px;
						-moz-box-shadow: 0 2px 4px rgba(0,0,0,.4);
					}
					
					.mapContainer {
                        position: absolute;
						padding: 0px;
						margin: 0px;
						border: 3px solid grey;
						-moz-border-radius: 10px;
						-moz-box-shadow: 0 2px 4px rgba(0,0,0,.4);
					}
					
					.gridSurroundingBox {
                        position: absolute;
						padding: 0px;
						margin: 0px;
						border: 2px solid grey;
					}
					
					.gridElem {
                        position: absolute;
						padding:0px;
						margin:0px;
						border: 1px dashed gray;
                    }

					.hTick {
                        position: absolute;
						padding:0px;
						margin:0px;
						font-size: 15px;
                        font-weight:bold;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
						text-align: center;
						border: none;
                    }
					.vTick {
                        position: absolute;
						padding:0px;
						margin:0px;
						font-size: 15px;
                        font-weight:bold;
						text-shadow: 0 1px 1px rgba(0,0,0,.3);
						text-align: left;
						border: none;
                    }
	       </style>
    ]]></r>).toString());
	windowRef.document.write('</head><body></div></div></body></html>');
	
	// create the containers
	searchContainer = createSearchContainer(windowRef.document.body);
	previewContainer = createPreviewContainer(windowRef.document.body);
	mapContainer = createMapContainer(windowRef.document.body);
	legendContainer = createLegendContainer(windowRef.document.body);
	statusContainer = createStatusContainer(windowRef.document.body);
	ikaCoreAddContainer = createIkaCoreAddContainer(windowRef.document.body);
	
	// draw the grid
	// drawGrid();
	
	windowRef.document.close();
	
	// add a listener for browser window resize
	windowRef.addEventListener('resize', onWindowResize, false);
	
	// add a listener for key presses
	windowRef.addEventListener('keypress', onWindowKeypress, false);
	
	// set the correct sizes and positions to the elementsa
	refreshSizesAndPositions();
}


syslog('Ikariam Visual Map initialisation',1);

// add Visual Map icon to top left corner
var button = htmlImg('data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAOtElEQVR4nO2ZSYxcx3nHq9579fa111l6hrORHJJDzZAUtdCKKFqmLMdWElsxEAd2YgtRDkmki3MJkEsuCQIkQYIcDOQQI0iQwEsgy1ZEKyLDTZRIU+JwONxmhrP3TO/dr9++VuUwlu3YWilagYH5XRp9+er/K3yFqv4agG222WabbbbZZpttttlmm48BCIHAoXtc896We4cFICwVtQMTw4emdk7sGZIE9vee+/t6y7ln9e9VoZ+Doak9oz1HHxz/1NEDE1N7BVHEGDuW7TlWo1L7s7/+1vTN8j1Z6B4LQAjGBvLHH5349NHJ/lKB43nE8a5tI46PwzjXW6yWy4AWAs/7y7/7t1fO3/zoKzIfvcQWhYxy7OHxp544PDm5S5IVAIHZagdB1DUtRdNpmjH6smurVUxoq92mKfiF4wfXN9s3F6sfcd2PKiCL3ENTw089cf+jjxwwcjnEsnbX8vwAQqBoOoBQkERCSBTFm+ubnuOqmmpWy8ND+fGdxd98fMJQhbdurgdhctcB7rKFVIm/f/+OY0f2fuLwuJ7RjEKREOg5Dk6xKEuYYIQQy3EAAAjB6VOXRZHPZLQoTlzXz+rCxsqqyBGeQwRSt5aaf/63Lzhe+HEIFDLyA5MjTxw7eOTBCSOrUxSNcdpuNBHLYUJyhbzvB92u5/sBw9AURbVaXY5FiipRFEQIBWFE01RWl3hJ+p+XT/XkZZoTUkz+4m++/dqVpbsTeP8WomlqpJR7+ODo8WOHpiZ3Z/J5SEEAYLfdCQOX5TlelIxsFuM0DON2y87mtP5SAQCwtLgWdBuULNsQ7N03SgjZKpgk6YXzV1QZKZpKAECS8eyXHrs8u0ZR0A/jeyagyfz+3QOfOnb/sUemRsYGcZKwPA8p6Dmu73mEAEmWXNthWUQzqNsxeYFfulOemNxJCCGEzE7fdNo1UZYTDEAcAwAoiiIEEwJmr97u0QgAEq9lKRohVhif2Pv8Vx/PGdJffeOEafsfSuCnLQQhMBRhbKj3yENTjz5yaKAoy4pY6B/ESUhw6jhO4HmAAAKInjFc21Z0DRAAwI/3tbJZS6JIkkVCME3TZtcVJVGWRYQYioLLi+Xq2griRFGRm/VmX56XtAzDCXp+kGFQ4FmtetmzuydOXnnl3PVrcxsfWuD5P/j81772u739vZphEJLgJCY4CVzLMltx4AIAIIQczzGIoWmaomiylZu8bUDIwvzq6FgJUhQEIE0S27IxTl87fYlDACEmiKHEgeHRAYZl4zBAgswKiihpLC8BAKxO1fdst2sGQdA17f948eKLJ2fw2y333vy4hcZKxsShB0iaxHHQqdeSKCQ49VxL1wRIOAYhURIBABjjWqWxtrx68IEpmqYJIAQQ+PZGJAlmORoQQDMMRaOrl2fGhjIcx0RRkiQYQGDbjpItioYGAGAQt5UeACDKBiEEsUK93hob7/v6YGmolP/Hfz2VJPh9Beitj4xMH/3kUV6UW7UNSVbDwMv19LIshxDgeJ5l2VdfevX6W9ODoyMnXzqR0XmAxJs3FgGAmqZACCCAHIsc25MVCQLg++Hi3BKIHUURAAA0TSFES4pGgxRA4LlukgIAmTiMGIQomk7TOI4C1/UMQ6VohuOFsZH+mZm5zXr3gwo4brizQLKFYqF/R7O6wQsiL0qIRTgJASAAUqt3FopZdnm12Tc0UugfKJV6GYbJ5QyGoSGEEABO4FuNjq6rkIIXzr0Jwk4+p/5kGSRIolEkGDMM8/rFuf1Tk4LAer7V7TS6nVbXbAWe7ziebmiipDOIjezm/fv6BIa6tlAh79lLPxbo2n5R51UUmPV1SNEUgxRVhwBgnJI0AQDwsrp8Z7U/z3u22Wl3Wy1rcLCf5zkIIYQpomsUmauW3wzcO759u1hILTeOgeG4McAxQjTLSwzLI148e3bm2swCQqBcriwulhVFSjFOMZEV2XE8kqZJTJIkbdfKssgNFMUgSG8v195fAACwXulMjfcWivn9Rz5dWVuqldcIxr7ruLbpOu76yjqJLJZjNU02DFlT2JXlctdy+vrxzdlz5c2kYZa0wkOivi+BQ6aFPeuW1TqvKLSklEQty4oKgJAQ8r0XzpQGerwg8vxwYLDY35fXjCzHCb4XOLYvKRnEciIHfKvZ7do0QuNjfa+/tWi773pP/1TA8cIkjkdKmZ7SYO/AqO/ZxdKgrBkCj0RZihPcbVZFkQ+ipNV2EKKNnKbm2NmbyZ6DX9yx6xODI/uKfSNGbke+Z6Q0cmB035OCNn5j9g1dXpC0PZBiAQDz82vj40MHD+3x/GhoqGdstKRoWUnWRUk2stnAj4dGBqMobjZMSFEiB3ieYxg6CKLhUk4S2M3GOxwJ+me/rGy2e3Re4XBpdDcvyq1aJfBcSVFJEuqGJhvFjbW1CKOxfZN+GOg92UpNmTr8qKYXIMWGvsmLWhw5cdixOtXQd2TFkIzSyy+dHSouMNyuwDILvYVc3lBUva80KCuKKPK8oESRTzMIEOBaHUmWRVE08llJMeZvLwaep2niwYnBhw+NDRS1etPa+IVj/X8ECCFzy/WBHC9xYHBs39aVRAhkGAgIkSVxZaWsGNmdu0f6+pOLF9uHHn5MUY0Up3Hot+tLbueaY7lx6PCiFEcBxAmDRDVTmP7Rmazqdk0uTnAUY9d1CU5FScQ49b1OmiaI5W2zXqlUWIRb63NpHMp6ThFpkPrdrtcxvShwOQYf/7UJkiQ3lmo/e6rpnxMKo2RxtdGn06rEDY7t8RzHMjuCJFMgBQD29vf3D/RRMFlauNAz/ISeyVIUJpjUy/PTF19L/JmlW+UghqsLcxTE2b5hBsaamnUDKiPdIniEgamkqrKq4NC2WjWna/ph4rlet93yPM807dR3At+LPMftVOPQAwQLAitwtB8mFMNlMlp/np+dqzVN910FAACWG6yUm1k+yWS10siuOArTJO122pIk0gwDIaSp8p2FxT2Tn0UsC0Hq2a1qebG8Vm5Urj9wOLh04Y2EFPI9RUQDSdNTwCmS0Sif8GK11UEIRJCkgW1CgimQ8hwrCJykyIIg0DSj6SrLsRjSnhcGYRr4YRjFUYIpmnGckKJgHHphlOqK0Oh4cZK+swAAoN31VjeaEnB7+nr7Bod916FoBtGQZmgAIEinW426qE9ZXTNOiNXaaFXXQ7vWalUhdBybzqjZJCGCpGCAwsCLI8+qv9LTqw+OPbFSbtiWncYJzzEAgCQKYt/FSYQEmRfYet3M5HOCJCMK68U+RddoEnOIFnlWENhatUXScKhPPTBeGC3lzk+vvqsAAKBluktrdSZoFoo9A8MjURia7XaaxryAnM7pTFa4dMksDIwhBniuE8X46rXlIJIrG5SkoaV1etfecSWTZxEtKsaV0/9EkWWWJYA50NvXO7JzTM31dp2kbScsFVMUJGlCMCZJ7HiRpisAAIYTIaTcVgWnCQCga3Y8u5smQasbeSHu2Onqpj19u/xeAgCAju3fWqwQu8rzaOfefWmShr7juxbPLlTKNcR4jbaCGOhFoNtp7RjqN3IFzTBSgkfHpATzSMwGvrt8ZzYxv2M7vigJGE5CCGVF0jSl2FuAFFXZ2PSCxLQiBsYkCWkSWT6WZXErAMZJGoUAALNje360Ug0X1zqz87XXp5fPXVmM4ndvoZ/g+tG1+Y3UaQVWTZORlu/z7K4kbKwvzeyeOGh3128vJaKAOFFRc/2SImHAmJbHsExp+D7b9Z3OKuh8s972kjhlGBYwUwQA3VARy1AUrRva8M6dI7t2I17a3GxUa21DFcKUlhURQpjEEU4Ts9W+Ob85faOystE9cf7GqUvzN5drlUZ3Kz34gD8pEUN//pOTTx5/4HNPP03RrFX9Z4qyzObq8N7P+HHfzGxnfZNkcjlF0wghgsCvLa9m9BhFl/N667/PrHfazQN7ONsvUPzxXD4zNNS/9RCHAC7dWfRsExDsubahChSDeNWoVxppEsZR0un6y2uN16/cub5YSfE7v4g+0FQiTtL/PHk1SVII6ae//GWaHdQzMAxTp/0mJ2Tun5x85Ohkp+3VNxbTpMNT4a6Hgeu0fnS58d3v3XK94PEjqh+lIR7p0fX99+3RDRUAQABotzog9foLAiDEc7EfRCtrHUF02h1ns9Jer3RuLG4sldtJmr5Htg86VkkxfvHMLICAF4SnfvsL1ZV/2LHr8Xp1uVq5zlLf71z9F8clCcjFCdcxu9VqpdV2XR+wiP7MZ0umlc4v4eGRkaHhkqarOMU0w2CML5w5L7K4HuJG0wI4Xd0wL7x1h+fQwmp9o9GN4g80a/kQc6EU4++fuc4iRjMyR44+uzT3jXxxVN/zzPLitU5wuVa5Hfg1PwSuR6KE6es3du0sFAqFl344v7nhTux7curQxNDIIE3TttP0bLvZNDlBXFnbvH17+c5aHWN85VbZ8cP3fjz/Ih96LsSzzJd+/fAfPffs+N7RuevfbVfP9pYmpex+Wc2nGMSRzTEBojrtZvXa9ZULF27w/O6jR39j4r69siykSRwG7syV2aWltVNnp1c3W5t1s9l1w+jjHWypEv/7v3Xk+T99rr+vYFmtsye/RfC6Y64wTMRyDMOwgFYhXVKNvePjD8UxDoOwUNBc2/6vl07yPPeDly/Mr9ZuLdc+7GbfMwEAQE9WfeaLjz339T9WFdGy7MAPIAAcz0AKcCwPAPRsS5BlXpAIIZX1tUsXL68sb3zz26dVWZieK9+T6Fvc5Wy02rK+8/Ibuq7+4Z88q6pKEicQQllRcYoRi6qV2rnT5xbml3KFvK5p16/fnl8sX7q20jCdexh9i7sfr0MID+8dfOYrn/vKV38HAFDZrNm2vba81mp1Xj15Yeb2eq1tazLPIbRSaQVRcs+jb/E+N/F7s9m0QttWZHbX7rHQ6Vx9c/rED8//+wtnzk8v1ju2H8Yd22+aTpK+/3TkrvlI43VCyOk350XhB2azWa+3Tp2fee3q4tYr91cJnkUP7hvqyaoQ/tL/cful8SscfZttttlmm23+P/lfRwDHaskfohoAAAAASUVORK5CYII=', 64,64);
button.setAttribute('style', 'position: absolute; top: 5px; left: 30px; cursor: pointer');
button.setAttribute('title', 'Ikariam Görsel Harita By_CEDRİC');
button.addEventListener('click', exportButtonOnClickHandler, false);
var header = document.getElementById('GF_toolbar');
header.appendChild(button);

syslog('Ikariam Visual Map initialisation finished',1);