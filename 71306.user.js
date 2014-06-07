// ==UserScript==
// @name           Auto-Select Next Explorer
// @namespace      apache1990.dod.net
// @description    Auto-selects next available explorer after launch, if any.
// @include        *war-facts.com/fleet_navigation.php*
// ==/UserScript==
	
	//Comma separated list of Explorers/Outcast Explorers to exclude from rotation
	//e.g. new Array (2566, 582)
	//If you're only excluding one fleet, leave the first null in.
	var excludeFleets = new Array(null, null);
	
	function path(p, context) {
		if (!context) context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
		return arr;
	}
	
	//get fleet ID
	if(document.location.href.indexOf("&") > 0 && document.location.href.lastIndexOf("&") > document.location.href.indexOf("fleet=")){
		fleetID = document.location.href.substring(document.location.href.indexOf("fleet=") + 6, document.location.href.indexOf("&", document.location.href.indexOf("fleet=")));
	}else{
		fleetID = document.location.href.substring(document.location.href.indexOf("fleet=") + 6);
	}
	
	var isExplorer = false;
	var excludeThis = false;
	
	//Function used to filter out fleets on a mission
	function killActive(element, index, array){
		if(element.href.substring(element.href.indexOf("fleet=") + 6) == fleetID){
			//alert("You are an intrepid explorer.");
			isExplorer = true;
		}
		for(var i = 0; i < excludeFleets.length; i++){
			if(element.href.substring(element.href.indexOf("fleet=") + 6) == excludeFleets[i]){
				var excludeThis = true;
			}
		}
		if(getComputedStyle(element, '').color != "rgb(205, 210, 213)" || excludeThis){
			excludeThis = false;
			return false;
		}else{
			return true;
		}
	}
	
	var fleetList = path("//li[@id='class-258']/a");
	fleetList.concat(path("//li[@id='class-399']/a"));
	fleetList = fleetList.filter(killActive);
	var ships = new Array();
	for(var i = 0; i < fleetList.length; i++){
		ships[i] = parseInt(fleetList[i].href.substring(fleetList[i].href.indexOf("fleet=") + 6));
	}
	
	if(ships[0] != undefined && isExplorer){
		xpathstring = "";
		var nothingcheck = document.evaluate("/html/body/div/div/center/p[2]/font/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var launchcheck = document.evaluate("/html/body/div/div/center/p[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(nothingcheck != null){
		}else if(launchcheck != null){
			window.location.href = 'http://www.war-facts.com/fleet_navigation.php?fleet='+ships[0]+'' ;
		}
	}