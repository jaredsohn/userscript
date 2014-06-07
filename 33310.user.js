// ==UserScript==
// @name			DSsendTroupsFaster
// @author			Heinzel
// @description		Dieses Script ermoeglicht es, durch drücken und halten verschiedener Tasten auf der Karte, die auf dieser sich befindenden Links zu verändern
// @namespace		none
// @include		http://de*.die-staemme.de/game.php*screen=map*
// ==/UserScript==


/* 	
Die ASCII-Werte finden sich hier: 
http://de.selfhtml.org/cgi-bin/812/zeichenketten4.pl  
*/

function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

document.addEventListener('keypress', function(event) {
	if(event.which != 120 && event.which != 121 && event.which != 118 && event.which != 97 && event.which != 115) {
		return;
	}
	
	var links = document.getElementById("mapOld").getElementsByTagName("a");
	var sitterParam = (location.href.match(/[?&](t=\d+)($|\&)/)) ? RegExp.$1 + "&" : "";
	var baseLink = location.href.split("?")[0] + "?" + sitterParam;
	
	for(var x = 0; x < links.length; x++) {
		if(!links[x].href.match(/[&?]village=(\d+)($|\&)/)) {
			continue;
		}
		var id1 = RegExp.$1;
		
		if(!links[x].href.match(/[&?]id=(\d+)($|\&)/)) {
			continue;
		}
		var id2 = RegExp.$1;
		
		if(event.which == 120) {		// x
			links[x].href = baseLink + "village=" + id1 + "&target=" + id2 + "&screen=place";
		} else if(event.which == 121) {	// y
			links[x].href = baseLink + "village=" + id1 + "&target=" + id2 + "&screen=market&mode=send";
		} else if(event.which == 118) {	// v
			links[x].href = baseLink + "village=" + id2 + "&target=" + id1 + "&screen=overview&id=switch";
		} else if(event.which == 97) {	// a
			links[x].href = baseLink + "village=" + id2 + "&target=" + id1 + "&screen=place&id=switch";
		} else if(event.which == 115) {	//s
			links[x].href = baseLink + "village=" + id2 + "&target=" + id1 + "&screen=market&mode=send&id=switch";
		}
	}
}, true);

document.addEventListener('keyup', function(event) {
	var links = document.getElementById("mapOld").getElementsByTagName("a");
	var sitterParam = (location.href.match(/[?&](t=\d+)($|\&)/)) ? RegExp.$1 + "&" : "";
	var baseLink = location.href.split("?")[0] + "?" + sitterParam;
	
	for(var x = 0; x < links.length; x++) {
		if(!links[x].href.match(/[&?]village=(\d+)($|\&)/)) {
			continue;
		}
		var id1 = RegExp.$1;
		
		if(!links[x].href.match(/[&?]target=(\d+)($|\&)/)) {
			continue;
		}
		var id2 = RegExp.$1;
		
		if(links[x].href.match(/[&?]id=switch($|\&)/)) {
			links[x].href = baseLink + "village=" + id2 + "&id=" + id1 + "&screen=info_village";
		} else {
			links[x].href = baseLink + "village=" + id1 + "&id=" + id2 + "&screen=info_village";
		}
	}
}, true);

function addCaption() {
	if(document.getElementById("map_big")) {	// Version 6.x
		var tab = _evaluate('//td[@id="map_big"]/table/tbody/tr[@class="nowrap"]/parent::tbody/parent::table')[0];
	} else {
		var tab = _evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr[@class="nowrap"]/parent::tbody/parent::table')[0];
	}
	var newTab = tab.cloneNode(false);
	
	var newTr = document.createElement("tr");
	newTr.className = "nowrap";
	
	var newTd = document.createElement("td");
	newTd.className = "small";
	
	newTd.innerHTML = "\"x\": Truppen vom aktuellen Dorf zum angeklickten schicken &nbsp;";
	newTr.appendChild(newTd.cloneNode(true));
	
	newTd.innerHTML = "\"y\": Ressies vom aktuellen Dorf zum angeklickten schicken &nbsp;";
	newTr.appendChild(newTd.cloneNode(true));
	
	newTab.appendChild(newTr.cloneNode(true));
	newTr.innerHTML = "";
	
	newTd.innerHTML = "\"a\": Truppen vom angeklickten Dorf zum aktuellen schicken &nbsp;";
	newTr.appendChild(newTd.cloneNode(true));
	
	newTd.innerHTML = "\"s\": Ressies vom angeklickten Dorf zum aktuellen schicken &nbsp;";
	newTr.appendChild(newTd.cloneNode(true));
	
	newTab.appendChild(newTr.cloneNode(true));
	newTr.innerHTML = "";
	
	newTd.innerHTML = "\"v\": Dorfübersicht des angeklickten Dorfes &nbsp;";
	newTr.appendChild(newTd);
	
	newTab.appendChild(newTr);
	tab.parentNode.insertBefore(newTab, tab.previousSibling);
	tab.parentNode.insertBefore(tab.previousSibling.cloneNode(false), newTab);
}

addCaption();