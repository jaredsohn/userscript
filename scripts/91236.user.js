// ==UserScript==
// @name			Ikariam Spy Tracker
// @namespace		userscripts.org
// @homepage		http://userscripts.org/scripts/show/xxxx
// @description		Collects resource and city information from spy reports. Includes a pad interface to display an overview and to pillage.
// @version			0.1.9
// @include			http://s*.ikariam.*/index.php?action=Espionage*
// @include			http://s*.ikariam.*/index.php?view=safehouse*
// @include			http://s*.ikariam.*/index.php?view=safehouseReports*
// @include			http://s*.ikariam.*/index.php?view=plunder*
// @include			http://s*.ikariam.*/index.php?view=city*
// @include			http://s*.ikariam.*/index.php?view=militaryAdvisorMilitaryMovements*
// @include			http://s*.ikariam.*/index.php?view=militaryAdvisorCombatReports*
// @include			http://s*.ikariam.*/index.php?view=premiumDiplomacyAdvisor
// @include			http://s*.ikariam.*/index.php?view=premiumMilitaryAdvisor
// @exclude			http://support*.ikariam.*/*
// @license        	GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html), Copyright (c) 2010, bt_viper
// ==/UserScript==
//
// Version history:
// 0.1.9/5.10.2010	Fix: Calculation of information age should use server time not local
// 0.1.8/4.10.2010	Feature: Multidomain/server support, separate Spy Tracker databases for each.
// 0.1.7/4.10.2010	Fix: Safelevels of ACTIVE cities are slightly incorrect (~1 ship)
// 0.1.6/4.10.2010	Feature: Set city active/inactive by clicking the total lootable value.
//					Inactive city name displayed in italic. Warehouse safelevels 
//					calculated according to this setting.

// 0.1.5/4.10.2010	Feature: Pad displayed in safehouse view
//					Feature: Display time elapsed since last spy report or user performed clearing
//					Fix: Wrong dominant luxury resource image sometimes displayed
//					Fix: Journey time transparent background color wrong
//					Fix: City name too close to table border
//					Fix: Wall icon too wide and unclear
//					Fix: Luxury resource tooltip does not describe the logic
//					Fix: Wood icon displayed even if total lootable = 0
// 0.1.4/4.10.2010	Bug fix: Conflict with "City Select Re-orderer" script. Spy Tracker was unable to 
//					initialise properly if "City Select Re-orderer" was not running.
// 0.1.3/4.10.2010	Some dead code removed and more debugging messages added
// 0.1.2/3.10.2010	Syslogging enabled for beta testing purposes
// 0.1.1/3.10.2010	Fix: Invalid link and journey time displayed if no city information available
// 0.1.0/3.10.2010 	Initial Release 
// 
//
// Known problems:
// - none

/* Todo
- Multidomain and server support
- Mouseover tooltip for displaying details of the city and associated spy reports
- Gather information from Spy house
- Localisation (multilanguage)
- Removal of spy reports based on age of information
- User definable sorting by columns
- Propose needed troops in the pillage view based on the wall level
- Calculation and display of resource growth rate
- Storing of city information when sending a spy to a city
- Storing of island IDs. Possibility to implement "Send spy" and "Spy Mission" buttons to the pad.
 */

var syslogLogLevel = 4;  // Higher number results in finer logging, 1-4
var syslogJavaConsoleEnabled = true;
var syslogFirebugEnabled = true;
var currentDBVersion = 2;

const IMAGES =
{
	abort:				'skin/interface/btn_abort.gif',
	buildingWall:		'data:image/gif;base64,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',
	buildingWarehouse: 	'skin/buildings/y50/y50_warehouse.gif',
	clear: 				'data:image/gif;base64,R0lGODlhIAAgAPcAAAQCBIx+BNzCDOS+fFRCBMy+NJx+bMSiFHxabOzeXOzWNPzuhHRiDCwaRCQiBJSCPPzuXPTidOTSHNTCTLyeTIxuVOTWTIxiHMSWDBwSBFxSBNzKNPTmXDwyBIxelMy2PNzGJLyORLx+HMyiXHxyBNzKRGxCDPzynNSeRPTiVOTKDOTWROzaLDQWBPTmbFQ+LOSuXAwKBOzebFwqBJxyJOTSNGQ6DJR2jIRuFMR+FNzOXMy2FJR2XPzylCwqBJyCRPzudPzqdOTSLPTeTKSWJHRSFPTmZNyqXNymTOTKHGRCFNS+RIRefOzeZPTePPz2jOTOTBwaBDw6BMSaVJyKDGRKBNS+POTWPPzujKyGNOTSJOzWVJRmLPTqXNS6ROTOLNSWNMSGHMymZIR2BGxKDNzKFAwKDOTSPJx2rOzaXMyyNPz2dMyOLOTOVAQGBIx+DExGBHxShHRmFDQiBOzefLSeVJxqJBwWDHReDOTOPIxmnMy6PNzKLHxuDOTSRPz2pMyeVFw+bJx+pLyqNGxeFKyaHDQeBNSybNSyJMyaRJRynOzWbLR6JHxqJPzubPzqTHRqBMy6LDwqDLSaLMymVLyKPOzeRIRahIR2FEQ2DMSCJPTmfEQ+DMyKJNzGFEQSBBwOBJx+TPzyfNSaPHxODNyqVGRSDOzeVHxSHNSqZIxenNSeTJR2lLyGNPTiXCwmBOzaTOTONNSmXOTORBQOBPTibFw+DDQuBOzWLPzqZIxifOziZCQeBEQ+BOzaPOzWJOTOFJSCDLyiVOzaNPzyhBwWBGxGDPz2nPTmVOzeLPTqbIRyFMSCFPzydOTOHOTSTNTCPPzyjOzaVMySLOTSVOzifHxyDOzabPTqfOy+fNS+NOzSHPzmXOzWRKRyJOzSNPzqXNSmZOTKFOzSPAwGBFRGBNS6POTKLPTiZABlHACDFwB8AAG4ZABkZACDgwB8fBoASAAAHAAAFwAAAAAwYQAA/QAAAAAAAAARAAAAAAAAAAAAABVxtgA56gDXRwBaACH5BAEAAAAALAAAAAAgACAABwj/AAEIHEiwoMGDCBMinGPLRguFEAuSIzNFzIAsoCJqNHaIywxK4QxphDhnRCpDhgCFyDBS4YVsq0h5O1KkZcJPFGAgQVGqkkibB03IQjFqVCJjQA/GoIFiGhswdlgmLWioFZswnRhJmjqwA5xbVTTlyCFCCdeBY9AleIYIAzNUtM4CMNOIDpA1RnZpY+BGbiBBNwzUKfEohTQqMbhy4sFKERo9ukJ5KdCLK6RTxHQIq8DEg6pLL7iSkPHEkSMIlvb8QBCnwVQNTZ40A5KryxAnyQo8uJNUyrNoooAYyZWihi9cLPKUA+qgQDRiPdB14dCtxjAtEs4wsBmjEJZoJyK4wwKXIpYCXEmAnVnW0k0wbMc2bZLWBVktPyy0eFJxBdPIGG9scowFMqThCjLKXPMNegKosAIOI5FQyx8b+BGBNBwYUY0fuEjgyTnAWIDHSD5EwgcIF6aQiwxtfPOLOHxQ44w0HbQUQwCuRAALNy5AAwUuzpTRRh6/QFGMTeRYI00QC0BjxTjbiJPHBF/4MkhfQL1CxCw7LOKLBF8soYYQpxByFi99fLCFNFscYI4RUEQhFwAx8JKJKQQsM4kcc/bpZ0EBAQA7',
	city: 				'skin/layout/city.gif',
	crate:				'skin/layout/crate.gif',
	journeyTime: 		'data:image/gif;base64, R0lGODlhJAAWAPcAAP333fa9P8PyXG7bSb2yj2TcL/fVSP///8i2iikcDOjYflVCLXbgN+aqOm3eM6eab4VWH8+aPG4qCrJvJZfoR7XvVYbkP6/tUqDqS37iO4/mQ1XYKH5pT7vwWNz0i6XabqfsTlzaK+Xo6u71yo5BCUzWKb5rF9PDZJB6X+GgMbFkFk3XJOHInfrist3xt0HUHsjDrvLaq9O7k0fVIdnZl63pf6zohpdDDvT20vj21/v329HPwn3gSzvSHO/v8N/gnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAkABYABwj/AAEIHEiwoMGDCBMeDMCwocOGERoEUKhQYoAGDVJEUHFDggQSKlRASEAx4YQUGDNuJOGRhIkJExaUHIjDxcAHCxLo3MlT5wIEMwWOYFAjh0AWHB4QWMp0KU4ZQYUycMDDZgsUB7IeEMFVxI4dC1pEBTDUQYECNnQQeKBVK1cUHAx6EEC3wgUQGChosJBh6tkNA348OKHghGEUaznEkFvXLl69fP2G2LCixIelhSM84IBCLOPGj/f2NTu58osBNAiwQLEAKsK5oPOKlkx5xoseJRAoWPBAIewOjmVHJl37NFsFBHgvPvg7OOTRfytfzoo8+U/msYVDn4waho8DChREV1jKYQGLsWQlp4VBXUEKmOTjji1bFUAL9uDdT4AAYemC5UENVdRRxynQQAT78ZecawHaJNBDED6E3kAYNXSgCR19ZIJIJE0IgEUGXBQBhi29NJKHKAIQEAA7',
	luxuryWorker:		'skin/characters/40h/luxuryworker_r.gif',
	pillage:			'data:image/gif;base64,R0lGODlhMgAiAMQAAOF7WmBLMeiEYvrEg+aBXlMXAbVeQKZRM9x1U24qEpNDJsNlQ71hQM5sSqR9V6aDWUAzH4E3HffCf9NvTXthQoxpR8pnR8loRuR/Xl8cAq9eQKteP6F7VnpgQvvGhEI2ISH5BAAAAAAALAAAAAAyACIAAAX/YOWM5GOeaKqWbNsGlSTPXm3feK4PPO3LnxhlSCwaO8ikcsk8FiVBCYVDrVqv2Kw2G+hAhRwBYYwpm8/otHoNwHS/0jB5Tq+z7+d3tCO3jw0JBm1+dAYRB3d6YGKEBAkZGQoIhA0KkBmDfooDfIyenweXGYJ1BqIKjQKbnZ+tCKKjdKGiDamrfa2eEbCoYpaiEbl0t8KfE7CRAr+0xYzEzYzHp8uXtamqXnu4qQ2XCtSQ1tfP12Pd38jieATEme7vABPgGRfw9m7ZYPf289/777cQCBxIsOCBBch+GThQsOHAgBMiSpwoUUGBQBkKFIikUUGCAgcoiox4a2SDkygbzXy8GApjAY8aE6ScmfKWhQs4b+bceSGCxo0KFuA8sPIiz6M4bQpdynTpt6JBhVr8eUBD06sWlGJ12jFCgoNMvR7SCHbrglsM0qpVe3AqyLVw07o9aCBuWrR2GVz0+Tbv2qkRLOXFW7dw3ZiHDCte7HHq4rqEF/8M9LiyoZ+VIysOxdLy4gM/FWTO54GPAQ2oU6tezbq169W3Xm+YTbu27du4ba+qAOGD79/AgwsfTry3cQikOwRYzry58+fQo0v3EGWH9evYrRffzr178RAAOw%3D%3D',
	remove: 			'data:image/gif;base64,R0lGODlhEAAQAPcAAAQCBDQ2NHwCBGQeHBweHDQGBBQODIQODBwCBJQeHJwODERGRKQmJBwKDJQiJKQWFHQyNHwKDDQSFCwCBBQCBCQODIQSFJwSFFRSVFQaHBwGBKQaHFxKTLQmJIwyNAwGBHwGBFQCBJQODKQiJIwKDEwSFCwSFKwSFLQqLAwCBDw+PHQiJBwiJBQSFIwODCQCBJweHKQODExKTCQKDJwiJKwWFGw2NIQKDCwGBBQGBCwODJQSFKQSFFweHCQGBKQeHGRKTJQyNIQGBFwCBFQSFLwqLJHYAHxaAIWAAedDwoEDQnwAfgAVAAAAABYAAAAAAGAlAQMAAAAAAAAAAMjsATjqABoTAAAAAKgDAHrWABbYAABaAACAAQBDwgADQgAAfn4FBQAAAAAAAMAAAABWWAAF6wCLEwAAAP+Isf9Cwv8D2P8AWv+Ee/8Aw/8A2P8AWgAAAAAAAAABAAAAAAABAAAAAAACAAAAAACgFQAAABYAJQAAAJAfAOkAnxMAgAAAfNIRMOYAHIEAF3wAAKgEAHoAABYAAAAAAEsDB+MAAIEAAHwAAEAAAHgAAFAAAAAAAKgAAHoAEAEAFwAAAGwEAAAAAAAAAAAAAMxQAOjJABMAAAAAAACoAADqAAATAAAAAAi1APwrABODAAB8ACAACOkAn5AAgHwAfGAA/wAA/5EA/3wA//8AAP8An/8AgP8AfF1pKAA8AJGTAHx8AOowKPQcAIAXAHwAAABkWABk8RaDEwB8AAD//wD//wD//wD//6gAAHoAABYAAAAAAACM1AHq6wATEwAAAABkxgBkPACDTAB8APcItPT864ATE3wAALggd+rpEBOQTwB8AKhA6Ho86xaTEwB8AAL/ZAD/ZAD/gwD/fAAwjAAc7QAXEwAAAABk1gBk/wCD/wB8fwDQZADr7QATEwAAAAAXMABlHACDFwB8AAG4ZABkZACDgwB8fBoAMAAAHAAAFwAAAAAwUAAAyQAAAAAAAAARAAAAAAAAAAAAABVxtgA56gDXRwBaACH5BAEAAAAALAAAAAAQABAABwjOAAEAyOBBh8CDABoE6XFwwIYYHSQgrFAkxoYVAHL8uMDjRESBFE884LFhRooLFx7U8KijQZETNXjwuEABAA6OKj2igDnyQoGDN3k8GCm050+EPhTIHDrTJ8KDJRSgnErkKUgGIqZeEDHCxNMZNEjs2CGi7A4SMLwKbJDghou3cN/eSGAQgAMQB9y6wIHg7YEDQhJ8oHCjcOEJAl8UjlAYAYAQIG4I8IFQg4AbIIYINGDDAhAVMjBgkKGCgwUILQQSCKBiQWjRoxeoCMACQEAAOw==',
	reset:				'data:image/gif;base64,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',
	resourceWood:		'skin/resources/icon_wood.gif',
	resourceWine:		'skin/resources/icon_wine.gif',
	resourceMarble:		'skin/resources/icon_marble.gif',
	resourceGlass:		'skin/resources/icon_glass.gif',
	resourceSulfur:		'skin/resources/icon_sulfur.gif',
	sigma:				'skin/layout/sigma.gif',
	spyMission:			'skin/layout/icon-mission.gif',
	time:				'skin/resources/icon_time.gif'
};

const HTML_ELEMENT =
{
	tbody: 		'tbody',
	tr:			'tr',
	th:			'th',
	td:			'td',
	img:		'img',
	a:			'a'
};

const PAD_HEADER_IMAGES = [
	[IMAGES.city, 'City name. Click to jump to island view. Italic = INACTIVE, bold = ACTIVE.', 20],
	[IMAGES.buildingWall, 'Wall level', 15],
	[IMAGES.journeyTime, 'Journey time', 20],
	[IMAGES.sigma, 'Total lootable (in ships). Click value to toggle city ACTIVE/INACTIVE.', 10],
	[IMAGES.luxuryWorker, 'Luxury resource with largest amount (if atleast 50% of wood amount)', 15],
	[IMAGES.time, 'Time since last spy report or user cleared total lootable', 12],
	['', 15],
	['', 15],
	['', 15],
	['', 15]
];

const RESOURCE_IMAGES = [
	[IMAGES.resourceWood],
	[IMAGES.resourceWine],
	[IMAGES.resourceMarble],
	[IMAGES.resourceGlass],
	[IMAGES.resourceSulfur]
];

const SPYTRACKER_PADVIEWS = {
	militaryAdvisorMilitaryMovements: 'militaryAdvisorMilitaryMovements',
	militaryAdvisorCombatReports: 'militaryAdvisorCombatReports',
	plunder: 'plunder',
	safehouse: 'safehouse',
	city:  'city',
	safehouseReports: 'safehouseReports',
	premiumDiplomacyAdvisor: 'premiumDiplomacyAdvisor',
	premiumMilitaryAdvisor: 'premiumMilitaryAdvisor',
	Espionage: 'Espionage'
};

const SPYTRACKER_PADVIEWSIBLINGS = {
	militaryAdvisorMilitaryMovements: 'viewMilitaryImperium',
	militaryAdvisorCombatReports: 'viewMilitaryImperium',
	plunder: 'mainview',
	safehouse: 'reportInboxLeft',
	city: 'information',
	safehouseReports: 'mainview',
	premiumDiplomacyAdvisor: 'mainview',
	premiumMilitaryAdvisor: 'mainview',
	Espionage: 'mainview'
};

function stringToBoolean(str){
	return (str == 'true');
}

function formatTime(time, compact) {
	if (!compact) {
		var h = Math.floor(time / 60);
		var m = Math.floor(time - 60*h);
		var s = Math.floor((time - 60*h-m) * 60);
		// minutes are always present, hours and seconds omitted if zero
		return (h > 0? h+"h ":"")+m+"m"+(s > 0? " "+s+"s":"");
	}
	else {
		// compact format
		// if under a day -> show hours
		if (time < (24*60)) {return Math.round(time/60)+'h';}
		// show days
		else {return Math.round(time/60/24)+'d';}
	}
}

function intToStringWithPad(num, padCount) {
	var result = num + '';
	while(result.length < padCount) {
		result = "0" + result;
	}
	return result;
}
	
function getRequestParam(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec(window.location.href);
  if( results == null )
    return "";
  else
    return results[1];
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

function getDomain(){
	return document.domain;
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

function htmlAHref(url, childElement){
	result = htmlElement(HTML_ELEMENT.a, childElement);
	result.setAttribute('href', url);
	return result;
}

function ikariamGetServerTime(){
	return document.getElementById('servertime').textContent;
}


function ikariamIsSafehouseWarehouseReport()
{
	if(document.body.id == 'safehouseReports') {
		var resourcesTable = document.getElementById('resources');
		return (resourcesTable);
	}
	else {
		return false;
	}
}


/*
 *   Returns an array containing a list of own cities
 *   Reads the information from the city selection drop down
 *   so can be called from any view
 */
function ikariamGetOwnCities(){
	var result = [];
	
	try {
		var tmpElements = document.getElementsByName('cityId');
		var citySelectElement = tmpElements[0];
		var cityElements = citySelectElement.childNodes;
	}
	catch(e) {
		syslog('Error retrieving own cities: "' + e.description + '"',1);
		return result;
	}

	// first two elements are not cities
	for (var i = 0; i < cityElements.length; i++) {
		// elements with no text are ignored
		if(cityElements[i].text) {
			var sc = new spyTrackerCity();
			sc.id = sc.name = cityElements[i].value;
			sc.selected = cityElements[i].selected;
			// depending on the chosen view mode (coordinates or resources) for
			// the city selection
			if (cityElements[i].className=='coords'){
				var str = cityElements[i].text;
				sc.name = str.substring(str.indexOf(']')+2, str.length);
				sc.island.parseCoordinatesFromString(str);
			}
			else {
				sc.name = cityElements[i].text
				sc.island.parseCoordinatesFromString(cityElements[i].title);
			}
			result.push(sc);
		}
	}
	
	return result;
}


function ikariamCityViewGetBuildingLevel(building) {
	var result = "";
	var elements = getElementsByClass(document, building, false);

	if (elements.length > 1) {
		syslog('More than one ' + building + ' building found, all will be processed');
	}
	if (elements.length > 0) {
		// get the building title (eg. "Warehouse Level 10")
		for (var i=0; i<elements.length; i++) {
			var buildingTitleElements = elements[i].getElementsByTagName("a")[0].title.split(" ");
			// read the last item as the level
			if (i>0) result += ",";
			result += buildingTitleElements[buildingTitleElements.length-1].trim();
		}
	}
	syslog('Building level: ' + building + ', ' + result, 4);
	
	return result;
}

function ikariamGetCurrentView(){
	var result = getRequestParam('view');
	if(!result) {
		result = getRequestParam('action');
	}
	return result;
}

function ikariamIsCurrentView(name){	
	var result = name.localeCompare(ikariamGetCurrentView())
	return (result == 0);
}

function spyTrackerIsValidPadView(){
	return (SPYTRACKER_PADVIEWS[ikariamGetCurrentView()] != null);
}

function spyTrackerGetPadSibling(){
	return $(SPYTRACKER_PADVIEWSIBLINGS[ikariamGetCurrentView()]);
}

function ikariamspyTrackerReportTimeStampToDate(ts) {
	var result = new Date();
	var tmpArray = ts.split(' ');
	var tmpDateStr =tmpArray[0];
	var tmpTimeStr = tmpArray[1];
	var tmpDateArray = tmpArray[0].split('.');
	var tmpTimeArray = tmpArray[1].split(':');
	
	// Set day, month, year
	result.setDate(parseInt(tmpDateArray[0],10));
	result.setMonth(parseInt(tmpDateArray[1],10)-1);
	result.setFullYear(parseInt(tmpDateArray[2],10));
	// Set hours, minutes and seconds
	result.setHours(parseInt(tmpTimeArray[0],10));
	result.setMinutes(parseInt(tmpTimeArray[1],10));
	result.setSeconds(parseInt(tmpTimeArray[2],10));
	result.setMilliseconds(0);
	syslog(result);	
	return result;
}


function dateToIkariamSpyTrackerTimeStamp(tsDate) {
	result = intToStringWithPad(tsDate.getDate(), 2) + '.';
	result = result + intToStringWithPad(tsDate.getMonth()+1, 2) + '.';
	result = result + tsDate.getFullYear() + ' ';
	result = result + intToStringWithPad(tsDate.getHours(), 2) + ':';
	result = result + intToStringWithPad(tsDate.getMinutes(), 2) + ':';
	result = result + intToStringWithPad(tsDate.getSeconds(), 2);
	return result;
}

function ikariamCityViewGetCityID(){
	var result = getRequestParam("id");
	syslog(result, 4);
	return result;
}

function ikariamCityViewGetCityName(){
	var elements = getElementsByClass(document, "city", false);
	if (elements[0]){
		var result = elements[0].innerHTML;
		syslog(result, 4);
		return result;
	}
}

function ikariamCityViewGetIsland(){
	var elements = getElementsByClass(document, "island", false);
	if (elements[0]){
		var result = new spyTrackerIsland();
		str = elements[0].innerHTML;
		result.name = str.substring(0, str.indexOf('['));
		result.x = str.substring(str.indexOf('[')+1, str.indexOf(':'));
		result.y = str.substring(str.indexOf(':')+1, str.indexOf(']'));
		syslog(result, 4);
		return result;
	}
}

function ikariamPlunderViewGetTargetCityID(){
	var result = parseInt(getRequestParam("destinationCityId"));
	syslog(result, 4);
	return result;
}



function ikariamspyTrackerReportGetID(){
	var result = getRequestParam("reportId");
	syslog(result, 4);
	return result;}


function ikariamspyTrackerReportGetTargetTownName(){
	var result = getElementsByClass(document, "record", false)[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
	syslog(result, 4);
	return result;
}

function ikariamspyTrackerReportGetTimeStamp(){
	var ikariamTimeStamp = getElementsByClass(document, "record", false)[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
	var result = ikariamTimeStamp;
	syslog(result, 4);
	return result;
}

function ikariamspyTrackerReportGetAvailableResources(resources){
	var resourcesTable = document.getElementById('resources');
	if(resourcesTable)
	{
		var listElements = resourcesTable.getElementsByTagName('tr');
		for (var i = 1; i < listElements.length; i++) {
			if(listElements[i].innerHTML.indexOf('icon_wood.gif') > 0) {
				var res = getElementsByClass(listElements[i], "count", false);
				resources[0] = parseInt(res[0].innerHTML.replace(/,/g,''));
			}
			else if(listElements[i].innerHTML.indexOf('icon_wine.gif') > 0) {
				var res = getElementsByClass(listElements[i], "count", false);
				resources[1] = parseInt(res[0].innerHTML.replace(/,/g,''));
			}
			else if(listElements[i].innerHTML.indexOf('icon_marble.gif') > 0) {
				var res = getElementsByClass(listElements[i], "count", false);
				resources[2] = parseInt(res[0].innerHTML.replace(/,/g,''));
			}
			else if(listElements[i].innerHTML.indexOf('icon_glass.gif') > 0) {
				var res = getElementsByClass(listElements[i], "count", false);
				resources[3] = parseInt(res[0].innerHTML.replace(/,/g,''));
			}
			else if(listElements[i].innerHTML.indexOf('icon_sulfur.gif') > 0) {
				var res = getElementsByClass(listElements[i], "count", false);
				resources[4] = parseInt(res[0].innerHTML.replace(/,/g,''));
			}
		}
		syslog(resources, 4);
	}
}

// Compare function for sorting
function spyTrackerReportCompare(a,b) {
	return (b.ID - a.ID);
}

function spyTrackerReport() {
	this.ID = 0;
	this.timeStamp = dateToIkariamSpyTrackerTimeStamp(new Date());
	this.cityName = '';
	this.resources = [0,0,0,0,0];
}

/* Extracts spy report information from Ikariam spy report page */
spyTrackerReport.prototype.readFromIkariam = function() {
	this.timeStamp = ikariamspyTrackerReportGetTimeStamp();
	// Have to use date/time as ID since the true report ID is not always available
	// Convert date/time to milliseconds to create a unique int ID
	this.ID = ikariamspyTrackerReportTimeStampToDate(this.timeStamp).getTime();
	this.cityName = ikariamspyTrackerReportGetTargetTownName();
	ikariamspyTrackerReportGetAvailableResources(this.resources);
}

spyTrackerReport.prototype.getAgeAsString = function() {
	if(this.timeStamp != '') {
		var ts = ikariamspyTrackerReportTimeStampToDate(this.timeStamp);
		var now = ikariamspyTrackerReportTimeStampToDate(ikariamGetServerTime());
		var age = now.getTime() - ts.getTime();
		age = (age / (1000*60));
		return formatTime(age, true);
	}
	else return '';
}

spyTrackerReport.prototype.toString = function() {
	var tmpArray = [];
	tmpArray.push(this.ID);
	tmpArray.push(this.timeStamp);
	tmpArray.push(this.cityName);
	tmpArray.push(this.resources.join('/R/'));
	result = tmpArray.join('/SR/');
	syslog('spyTrackerReport.toString:'+ result, 4);
	return result;
}	

spyTrackerReport.prototype.fromString = function(str) {
	this.resources = [];
	var tmpArray = str.split('/SR/');
	var tmpArray2 = tmpArray.pop().split('/R/');
	for (i in tmpArray2) {this.resources[i]=parseInt(tmpArray2[i])};
	this.cityName = tmpArray.pop();
	this.timeStamp = tmpArray.pop();
	this.ID = tmpArray.pop();
}


function spyTrackerIsland() {
	this.name = ''; 
	this.x = 0;
	this.y = 0;
}

spyTrackerIsland.prototype.parseCoordinatesFromString = function(str) {
	this.x = parseInt(str.substring(str.indexOf('[')+1, str.indexOf(':')));
	this.y = parseInt(str.substring(str.indexOf(':')+1, str.indexOf(']')));
}

/*
 *  Calculates distance between two islands
 */
spyTrackerIsland.prototype.getDistance = function(target) {
	return Math.sqrt(Math.pow(this.x-target.x,2)+Math.pow(this.y-target.y,2));
}

/*
 *  Returns the travel time in minutes between two islands
 *  If on same island, traveltime is 10
 */
spyTrackerIsland.prototype.getTravelTime = function(target) {
	var result = (1200/60) * this.getDistance(target);
	if (result == 0) {
		return 10;
	}
	else {
		return result;
	}
}

spyTrackerIsland.prototype.getTravelTimeAsString = function(target, compact) {
	if(this.name == ''){return '';}
	var time = this.getTravelTime(target);
	return formatTime(time, compact);
}

spyTrackerIsland.prototype.getTravelTimeAsCompactString = function(target) {
	return this.getTravelTimeAsString(target, true);
}
	
spyTrackerIsland.prototype.toString = function(str) {
	var tmpArray = [];
	tmpArray.push(this.name);
	tmpArray.push(this.x);
	tmpArray.push(this.y);
	var result = tmpArray.join('/SI/');
	syslog('spyTrackerIsland.toString: ' + result,4);
	return result;
}

spyTrackerIsland.prototype.fromString = function(str) {
	if(str.length > 0) {
		var tmpArray = str.split('/SI/');
		this.name = tmpArray[0];
		this.x = parseInt(tmpArray[1]);
		this.y = parseInt(tmpArray[2]);
	}
}


// Compare function for sorting
function spyTrackerCityCompare(a,b) {
	return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
}

function spyTrackerCity() {
	this.ID = '';
	this.name = '';
	this.island = new spyTrackerIsland();
	this.warehouseLevel = "";
	this.wallLevel = 0;
	this.spyTrackerReports = [];
	this.selected = false;
	this.active = true;
}

spyTrackerCity.prototype.addspyTrackerReport = function(sr) {
	// add only if not already stored
	if(this.findIndexByID(sr.ID) == -1) {
		this.spyTrackerReports.push(sr);
	}
}

spyTrackerCity.prototype.findIndexByID = function(ID) {
	for (var i = 0; i < this.spyTrackerReports.length; i++) {
		if(this.spyTrackerReports[i].ID == ID) {
			return i;
			break;
		}
	}
	return -1;
}

spyTrackerCity.prototype.updateBasicData = function(sc) {
	// if source ID exists, then a valid update
	if(sc.ID != 0){
		this.ID = sc.ID;
		this.name = sc.name;
		this.warehouseLevel = sc.warehouseLevel;
		this.wallLevel = sc.wallLevel;
		this.island.name = sc.island.name;
		this.island.x = sc.island.x;
		this.island.y = sc.island.y;
	}
}

spyTrackerCity.prototype.resetSpyReports = function(){
	this.spyTrackerReports = [];
	this.addspyTrackerReport(new spyTrackerReport());
}

spyTrackerCity.prototype.getProtectedResourcesAmount = function(){
	var result = 100;
	var safeQuantity = (this.active) ? 480 : 80;
	var warehousesLevel = this.warehouseLevel.split(",");
	syslog("Number of warehouses: " + warehousesLevel.length, 4);
	warehousesLevel.sort(function(a,b){return b - a});
	for (var i=0; i<warehousesLevel.length && i<4; i++) {
		if (warehousesLevel[i] > 0) {
			result += warehousesLevel[i] * safeQuantity;			
		}
	}
	return result;
}

spyTrackerCity.prototype.getLootableTotal = function(){
	result = 0;
	if(this.spyTrackerReports.length > 0) {
		var sr = sc.spyTrackerReports[0];
		var protectedAmount = this.getProtectedResourcesAmount();
		for (var i in sr.resources) {
			var loot = (sr.resources[i]-protectedAmount)/500
			if(loot < 0) {loot = 0}
			result = result + loot;
		}
		result = Math.ceil(result);
	}
	return result;
}

spyTrackerCity.prototype.getLuxuryResourceImage = function(){
	var luxuryIndex = 0;
	var woodAmount = 0;
	if(this.spyTrackerReports.length > 0) {
		var sr = sc.spyTrackerReports[0];
		var tmpMax = 0;
		woodAmount = sr.resources[0];
		for (var i = 1; i < sr.resources.length; i++) {	
			// luxury amount must atleast 50% of wood amount to override it
			if(((sr.resources[i]) > woodAmount/2) && (sr.resources[i] > tmpMax)) {
				tmpMax = sr.resources[i];
				luxuryIndex = i;
			}
		}
	}
	// no image if no resources
	if((luxuryIndex == 0) && (woodAmount == 0)) {return '';}
	else {return RESOURCE_IMAGES[luxuryIndex][0];}
}


spyTrackerCity.prototype.getAgeAsString = function() {
	if(this.spyTrackerReports.length > 0) {return this.spyTrackerReports[0].getAgeAsString();}
	else {return '';}
}
	
spyTrackerCity.prototype.toggleActive = function() {
	this.active = !this.active;
}
	
spyTrackerCity.prototype.sort = function() {
	this.spyTrackerReports.sort(spyTrackerReportCompare);	
}

spyTrackerCity.prototype.toString = function(str) {
	var tmpArray = [];
	tmpArray.push(this.ID);
	tmpArray.push(this.name);
	tmpArray.push(this.island.toString());
	tmpArray.push(this.warehouseLevel);
	tmpArray.push(this.wallLevel);
	tmpArray.push(this.active);
	for (var i = 0; i < this.spyTrackerReports.length; i++) {
		tmpArray.push(this.spyTrackerReports[i].toString());
	}
	var result = tmpArray.join('/SC/');
	syslog('spyTrackerCity.toString: ' + result,4);
	return result;
}

spyTrackerCity.prototype.fromString = function(str) {
	if(str.length > 0) {
		var tmpArray = str.split('/SC/');
		this.ID = parseInt(tmpArray[0]);
		if(isNaN(this.ID)){this.ID = 0};
		this.name = tmpArray[1];
		this.island.fromString(tmpArray[2]);
		this.warehouseLevel = tmpArray[3];
		this.wallLevel = parseInt(tmpArray[4]);
		this.active = stringToBoolean(tmpArray[5]);
		for (var i = 6; i < tmpArray.length; i++) {
			var sr = new spyTrackerReport();
			sr.fromString(tmpArray[i]);
			this.addspyTrackerReport(sr);
		}
	}
}

spyTrackerCity.prototype.storeToGM = function() {
	GM_setValue(this.name, this.toString());
}

spyTrackerCity.prototype.loadFromGM = function() {
	this.fromString(GM_getValue(this.name,''));
}

function spyTrackerDB() {
	this.version = 'V0.1';
	this.ownCities = [];
	this.spyCities = [];
	this.spyTrackerReports = [];
}

spyTrackerDB.prototype.addCity = function(sc, cities) {
	// add city (own or spy) only if not already in DB
	var result = this.findCityByName(sc.name, cities);
	
	// update information from the new city instance to the existing one 
	if(result != null) {
		result.updateBasicData(sc);
	}
	// if a new city add to the list of cities
	else {
		result = sc;
		cities.push(result);
	}
	return result;
}

spyTrackerDB.prototype.removeSpyCityByName = function(name) {
	this.spyCities.splice(this.spyCities.indexOf(this.findSpyCityByName(name)),1);
}

spyTrackerDB.prototype.findCityByName = function(cityName, cities) {
	for (var i in cities) {
		if(cities[i].name == cityName) {
			return cities[i];
			break;
		}
	}
	return null;
}

spyTrackerDB.prototype.findOwnCityByName = function(cityName) {
	return this.findCityByName(cityName, this.ownCities);
}

spyTrackerDB.prototype.findSpyCityByName = function(cityName) {
	return this.findCityByName(cityName, this.spyCities);
}

spyTrackerDB.prototype.findSpyCityByID = function(ID) {
	for (var i in this.spyCities) {
		if(this.spyCities[i].ID == ID) {
			return this.spyCities[i];
			break;
		}
	}
	return null;
}

spyTrackerDB.prototype.isOwnCity = function(cityName) {
	return (this.findCityByName(cityName, this.ownCities) != null);
}

spyTrackerDB.prototype.isSpyCity = function(cityName) {
	return (this.findCityByName(cityName, this.spyCities) != null);
}

spyTrackerDB.prototype.readOwnCities = function(){
	this.ownCities = ikariamGetOwnCities();
}

spyTrackerDB.prototype.getSelectedOwnCity = function(){
	for (var i = 0; i < this.ownCities.length; i++) {
		if(this.ownCities[i].selected) {
			return this.ownCities[i];
			break;
		}
	}
	return null;
}



/*
 * Replaced by the mechanism to read all the own cities at startup 
spyTrackerDB.prototype.addOwnCity = function(sc) {
	return this.addCity(sc, this.ownCities);
}
*/

spyTrackerDB.prototype.addSpyCity = function(sc) {
	if(!this.isOwnCity(sc.name)){
		return this.addCity(sc, this.spyCities);
	}
	else {
		return null;
	}
	
}

spyTrackerDB.prototype.sort = function() {
	this.spyCities.sort(spyTrackerCityCompare);
	for (var i = 0; i < this.spyCities.length; i++) {
		this.spyCities[i].sort();
	}	
}

spyTrackerDB.prototype.toString = function(str) {
	var tmpArray = [];
	tmpArray.push(this.version);
	
	// spy cities
	var tmpSpyCities = [];
	for (var i = 0; i < this.spyCities.length; i++) {
		tmpSpyCities.push(this.spyCities[i].toString());
	}
	tmpArray.push(tmpSpyCities.join('/DB.1/'));
	
	var result = tmpArray.join('/DB/');
	syslog('spyTrackerDB.toString:' + result, 4);
	return result;
}

spyTrackerDB.prototype.fromString = function(str) {
	if(str.length > 0) {
		var tmpArray = str.split('/DB/');
		// get version stored in db
		var dbVersion = tmpArray[0];
		// if versions do not match, alert user about resetting the db
		// do not load the rest of the db in this case
		if (this.version != dbVersion) {
			msg = 'Spy Tracker database version difference detected due to script update. Resetting the database.';
			alert(msg);
			syslog(msg,1);
			return;
		}
		// spy cities
		if(tmpArray[1]) {
			tmpSpyCities = tmpArray[1].split('/DB.1/')
			for (var i = 0; i < tmpSpyCities.length; i++) {
				var sc = new spyTrackerCity();
				sc.fromString(tmpSpyCities[i]);
				this.addSpyCity(sc);
			}
		}
	}
}
spyTrackerDB.prototype.updateSpyTrackerPad = function() {
	// Get reference to target table in pad
	target = $('SpyTrackerPad');
	// If pad not initialised for some reason, just exit
	if(target == null) {
		syslog('Spy Tracker pad not initialised properly',1);
		return;
	}
	// Clear the table
	target.innerHTML = "";
	// Table body
	var srTableBodyElement = htmlTableBody();
	// Header row
	var srTableHeader = htmlTableRow();
	// Header row images
	for (i in PAD_HEADER_IMAGES){
		img = htmlImg(PAD_HEADER_IMAGES[i][0], PAD_HEADER_IMAGES[i][1], PAD_HEADER_IMAGES[i][2]);
		img.setAttribute('style', 'float:left');
		th = htmlTableHeaderCell(img);
		th.setAttribute('style', 'padding-left:1px');
		srTableHeader.appendChild(th); 
	}
	srTableBodyElement.appendChild(srTableHeader);
	
	// Set selected own city as the source for pillaging
	var sourceCity = this.getSelectedOwnCity();

	// Spy cities		
	for (var i in this.spyCities) {
		sc = this.spyCities[i];
		// city row
		var tr = htmlTableRow();
		// show link to city if city id stored
		var tdName = '';
		if(sc.ID != 0) {tdName = htmlTableCell(htmlAHref('?view=city&id=' + sc.ID, sc.name));}
		else {tdName = htmlTableCell(sc.name);}
		if (!sc.active){
			tdName.setAttribute('style', 'font-style:italic;font-weight:normal');
		}
		tr.appendChild(tdName);
		// wall level
		tr.appendChild(htmlTableCell(intToString(sc.wallLevel)));
		// travel time
		tr.appendChild(htmlTableCell(sc.island.getTravelTimeAsCompactString(sourceCity.island)));
		// total lootable
		var tdLootable = htmlTableCell(intToString(sc.getLootableTotal()));
		tdLootable.setAttribute('id', sc.id);
		tdLootable.setAttribute('name', sc.name);
		if(sc.active) {tdLootable.setAttribute('title', 'City marked as ACTIVE. Click to toggle.');}
		else {tdLootable.setAttribute('title', 'City marked as INACTIVE. Click to toggle.');}
		tdLootable.setAttribute('style', 'cursor:default');
		tdLootable.addEventListener('click', toggleActiveButtonOnClickHandler, false);
		tr.appendChild(tdLootable);
		// luxury resource (as image)
		tr.appendChild(htmlTableCell(htmlImg(sc.getLuxuryResourceImage(), null, 15)));
		// age of information
		tr.appendChild(htmlTableCell(sc.getAgeAsString()));
		// pillage button (show only if target city id known)
		if(sc.ID != 0) {
			var pb = htmlTableCell(htmlAHref('?view=plunder&destinationCityId=' + sc.ID, htmlImg(IMAGES.pillage, 'Pillage', 15)));
			tr.appendChild(pb);
		}
		else {
			tr.appendChild(htmlTableCell(''));
		}
		// Clear total lootable button
		var clearButton = htmlTableCell(htmlImg(IMAGES.clear, 'Clear total lootable', 12));
		clearButton.setAttribute('id', sc.id);
		clearButton.setAttribute('name', sc.name);
		clearButton.addEventListener('click', clearButtonOnClickHandler, false);
		tr.appendChild(clearButton);
		// Remove city button
		var removeButton = htmlTableCell(htmlImg(IMAGES.remove, 'Remove city from Spy Tracker', 10));
		removeButton.setAttribute('id', sc.id);
		removeButton.setAttribute('name', sc.name);
		removeButton.addEventListener('click', removeButtonOnClickHandler, false);
		tr.appendChild(removeButton);
		// append row to table
		srTableBodyElement.appendChild(tr);
	}
	target.appendChild(srTableBodyElement);
}

/*
 * "this" refers to event sender, ResetResources button in 
   the spy tracker pad
*/ 
clearButtonOnClickHandler = function(){
	db.findSpyCityByName(this.attributes[2].value).resetSpyReports();
	db.storeToGM();
	db.updateSpyTrackerPad();
}

removeButtonOnClickHandler = function(){
	db.removeSpyCityByName(this.attributes[2].value);
	db.storeToGM();
	db.updateSpyTrackerPad();
}

toggleActiveButtonOnClickHandler = function(){
	db.findSpyCityByName(this.attributes[2].value).toggleActive();
	db.storeToGM();
	db.updateSpyTrackerPad();
}

spyTrackerDB.prototype.debugPrint = function() {
	syslog('--------           spyTrackerDB debug start       -----------',1);
	syslog('Version: ' + this.version,1);
	syslog('Own cities:',1)
	for (var i = 0; i < this.ownCities.length; i++) {
		syslog(this.ownCities[i].toString(),1);
	}
	syslog('Spy cities:',1)
	for (var i = 0; i < this.spyCities.length; i++) {
		syslog(this.spyCities[i].toString(),1);
	}
	syslog('--------           spyTrackerDB debug end         -----------',1);
}

spyTrackerDB.prototype.storeToGM = function() {
	var key = getDomain() + '.SpyTrackerDB.' + currentDBVersion;
	GM_setValue(key, this.toString());
}

spyTrackerDB.prototype.loadFromGM = function() {
	var key = getDomain() + '.SpyTrackerDB.' + currentDBVersion;
	this.fromString(GM_getValue(key,''));
}


function $(id){
	return document.getElementById(id);
}



function initSpyTrackerPad() 
{
	var container = $("container2");
	if (container == null) {
		syslog('Spy Tracker pad initialisation failed due to missing container',1);
		return;
	}
	// find the correct sibling to attach the pad before
	var sibling = null;
	sibling = spyTrackerGetPadSibling();
	if (!sibling) {
		syslog('Spy Tracker pad initialisation failed to missing sibling',1);
		return;
	}	
	
	// Add styles
	GM_addStyle('#SpyTrackerPad tr td { font-weight:bold; color:#7E4A21; font-size:10px; text-align: left; padding-left:2px }');
	
	// Pad frame div
	var padDiv = document.createElement("div");
	padDiv.setAttribute('class', 'dynamic');
	// Header
	var header = document.createElement('h3');
	header.setAttribute('class', 'header');
	header.innerHTML = 'Spy Tracker';
	padDiv.appendChild(header);
	// Table container div
	var tableDiv = document.createElement("div");
	tableDiv.setAttribute('class', 'content');
	tableDiv.setAttribute('style', 'max-height: 350px; overflow: auto;');
	padDiv.appendChild(tableDiv);
	// Table itself
	var table = document.createElement("table");
	table.setAttribute('id', 'SpyTrackerPad');
	table.setAttribute('width', '100%');
	table.setAttribute('border', '0');
	tableDiv.appendChild(table);
	// Footer
	var footerDiv = document.createElement("div");
	footerDiv.setAttribute('class', 'footer');
	tableDiv.appendChild(footerDiv);
	// Attach to correct place
	container.insertBefore(padDiv, sibling);
}

/*  -----------------------------------------------------------------------------

	This is the SpyTracker "main function" which is executed whenever included 
	Ikariam page is visited:
	- Safehouse spy report (warehouse report)
	- City View
	- Pillage View 

  -----------------------------------------------------------------------------*/
// ####
syslog('Spy Tracker activating',1);
  
// Draw Spy Tracker pad to the valid views (SPYTRACKER_PADVIEWS)
if(spyTrackerIsValidPadView()){
	// ####
	// console.time('SpyTracker-' + ikariamGetCurrentView());

	syslog('SpyTracker started (' + ikariamGetCurrentView() + ')', 2);
	
	// ####
	syslog('Spy Tracker initSpyTrackerPad',1);

	// initialise pad
	initSpyTrackerPad();
	
	
	var db = new spyTrackerDB();

	// ####
	syslog('Spy Tracker readOwnCities',1);

	// Read own city information from city selection drop down
	db.readOwnCities();

	// ####
	syslog('Spy Tracker loadFromGM',1);

	// Initialise spyTrackerDB by loading cached data
	db.loadFromGM();
	
	// #####
	// syslog('DB content after loadFromGM',1);
	// consoleDir(db);
	
	
	// safehouse warehouse spy report view
	// store it to the db (no duplicates added)
	if(ikariamIsSafehouseWarehouseReport()){
		// ####
		syslog('Spy Tracker ikariamIsSafehouseWarehouseReport',1);

		var sr = new spyTrackerReport();
		// Read the content from Ikariam
		sr.readFromIkariam();
		var sc = new spyTrackerCity();
		sc.name = sr.cityName;
		// Add's a new city and/or returns a reference to an existing one
		sc = db.addSpyCity(sc);
		sc.addspyTrackerReport(sr);
		// sort the data
		db.sort();
		// stores the data
		db.storeToGM();
	}
	
	// city view
	if (ikariamIsCurrentView("city")) {
		// ####
		syslog('Spy Tracker city view',1);
		
		// Initialise a city
		var sc = new spyTrackerCity();
		sc.ID = ikariamCityViewGetCityID();
		sc.name = ikariamCityViewGetCityName();
		sc.warehouseLevel = ikariamCityViewGetBuildingLevel('warehouse');
		sc.wallLevel = ikariamCityViewGetBuildingLevel('wall');
		sc.island = ikariamCityViewGetIsland(); 
		
		// Add's a new spy city or returns a reference to an existing one
		if (!db.isOwnCity(sc.name)){
			sc = db.addSpyCity(sc);
		}
		// sort the data
		db.sort();
		// stores the data
		db.storeToGM();
	}
	
	// ####
	syslog('Spy Tracker updateSpyTrackerPad',1);	
	
	// write db contents to Ikariam
	db.updateSpyTrackerPad();
	
	// pillage (plunder) view
	// fill in needed cargo ships
	if (ikariamIsCurrentView('plunder')) {
		var sc = db.findSpyCityByID(ikariamPlunderViewGetTargetCityID());
		if(sc) {
			document.getElementById('extraTransporter').value = sc.getLootableTotal();
		}		
	}
		
	syslog('SpyTracker finished', 2);

	// ####
	//console.timeEnd('SpyTracker-' + ikariamGetCurrentView());
}