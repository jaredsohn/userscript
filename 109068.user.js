// ==UserScript==
// @name           Auto-Select Next Explorer
// @namespace      apache1990.dod.net
// @description    Auto-selects next available explorer after launch, if any.
// @include        http://*.war-facts.com/fleet_navigation.php*
// @version        1.3
// ==/UserScript==

// Version 1.0 = Original version by apache?
// Version 1.1 = small fixes and improvements for Firefox 3.5+ (by Seko)
// Version 1.2 = fixed for H6 (by Seko)
// Version 1.3 = fixed for H7 on FF12 and Chrome (by Seko)

// Comma separated list of Explorers/Outcast Explorers ids to exclude from rotation
// Example: [3183,3184,3200]
var excludeFleets = [];

//Defines string function
String.prototype.endsWith = function(str){return (this.match(str+"$")==str)}

//Instance location / base / hostname
var base = window.location.href;
var instance = base.substring(base.indexOf("//") + 2);
instance = instance.substring(0, instance.indexOf("."));

//Get fleet ID
var fleetID = parseFleetId(window.location.href);

var isExplorer = false;
var excludeThis = false;

//Return elements specified by XPath
function path(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

//Parses fleetId out of URL/args
function parseFleetId(str) {
  var res = str.match(/fleet=(\d+)/);
  return res ? res[1] : res;
}

//Function used to filter out fleets on a mission
function killActive(element, index, array) {
	if(parseFleetId(element.href) == fleetID){
		//alert("You are an intrepid explorer.");
		isExplorer = true;
	}
	for(var i = 0; i < excludeFleets.length; i++){
		if(parseFleetId(element.href) == excludeFleets[i]){
			var excludeThis = true;
		}
	}
	// we suppose that explorer already on the way has style.color set to something (ie is Active)
	if(element.style.color || excludeThis) {
		excludeThis = false;
		return false;
	}else{
		return true;
	}
}

var fleetList = path("//li[@id='class-258']/a");
fleetList.concat(path("//li[@id='class-399']/a"));
GM_log("fleetList.size before filter: " + fleetList.length);
fleetList = fleetList.filter(killActive);
GM_log("fleetList.size after filter: " + fleetList.length);
var ships = [];
for(var i = 0; i < fleetList.length; i++){
	ships[i] = parseInt(parseFleetId(fleetList[i].href));
}
GM_log("ships.size: " + ships.length);
if(ships[0] != undefined && isExplorer){
	var launchcheck = document.evaluate("//p/text()[contains(.,'Fleet Launched!')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(launchcheck != null && !window.location.href.endsWith('fx=1')){
		window.location.href = 'http://' + instance + '.war-facts.com/fleet_navigation.php?fleet=' + ships[0];
	}
}