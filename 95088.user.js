// ==UserScript==
// @name           Custom Espionage Button
// @description    by Darth Brunus
// @version        1.0
// @include        http://uni2.playstarfleet.com/galaxy*
// @include        http://playstarfleet.com/galaxy*
// @include        http://uni2.playstarfleetextreme.com/galaxy*
// @include        http://playstarfleetextreme.com/galaxy*
// ==/UserScript==

var elemSelected = document.getElementsByClassName("colony selected")[0];
var m;

if(elemSelected == null) {
	// Moon
	elemSelected = document.getElementsByClassName("moon selected")[0];
	m = elemSelected.firstChild.nextSibling.getAttribute("href").match(/activate_planet=(\d+)/);
	var currentPlanetId = m[1];
	elemSelected = elemSelected.parentNode;
}
else {
	// Planet
	m = elemSelected.getElementsByClassName("planet_coordinates")[0].firstChild.nextSibling.getAttribute("href").match(/activate_planet=(\d+)/);
	var currentPlanetId = m[1];
}

// Current planet coordinates
m = elemSelected.getElementsByClassName("planet_coordinates")[0].textContent.match(/(\d+):(\d+):(\d+)/);
var currentPlanetGalaxy = m[1];
var currentPlanetSystem = m[2];
var currentPlanetSlot = m[3];

// Galaxy screen coordinates
m = document.getElementsByClassName("current_solar_system")[0].textContent.match(/Solar System (\d+):(\d+)/);
var galaxy = m[1];
var system = m[2];

for(var i = 1; i < 16; i++) {
	var elemPlanet = document.getElementById("planet_" + i);
	var defaultEspLink = document.getElementById("select_fleet_link_espionage_" + galaxy + "." + system + "." + i);
	var defaultEspLinkStyle = defaultEspLink != null ? defaultEspLink.parentNode.getAttribute("style") : "";
	if(elemPlanet.getElementsByClassName("attackable").length > 0 && defaultEspLinkStyle != "display: none;") {
		// Create Elements
		var spanAjaxLink = document.createElement("span");
		var spanActive = document.createElement("span");
		var spanActiveEnabled = document.createElement("span");
		var spanActiveDisabled = document.createElement("span");
		var spanWaiting = document.createElement("span");
		var imgEspionageEnabled = document.createElement("img");
		var imgEspionageDisabled = document.createElement("img");
		var ajaxLink = document.createElement("a");
		
		// Set link attributes
		ajaxLink.setAttribute("href", "#");
		ajaxLink.setAttribute("id", "select_fleet_link_espionage_" + i);
		ajaxLink.setAttribute("onclick", "disable_ajax_links();; new Ajax.Request('/fleet/assign?current_planet=" + currentPlanetId + "&amp;distance=" + calcDistance(currentPlanetGalaxy, currentPlanetSystem, currentPlanetSlot, galaxy, system, i) + "&amp;opts%5Bmission_type%5D=espionage&amp;parent_id=select_fleet_link_espionage_" + i + "&amp;target_url%5Baction%5D=espionage&amp;target_url%5Bcontroller%5D=espionage&amp;target_url%5Bcoords%5D=" + galaxy + "." + system + "." + i + "', {asynchronous:true, evalScripts:true}); return false;");
		
		// Set images attributes
		imgEspionageEnabled.setAttribute("alt", "Espionage");
		imgEspionageEnabled.setAttribute("title", "Espionage");
		imgEspionageEnabled.setAttribute("src", "/images/starfleet/galaxy/espionage_icon.png");
		imgEspionageDisabled.setAttribute("alt", "Espionage");
		imgEspionageDisabled.setAttribute("title", "Espionage");
		imgEspionageDisabled.setAttribute("src", "/images/starfleet/galaxy/espionage_icon_disabled.png");
		
		// Set spans atributes
		spanAjaxLink.setAttribute("class", "ajax_link");
		spanActive.setAttribute("class", "active");
		spanActiveEnabled.setAttribute("class", "enabled");
		spanActiveDisabled.setAttribute("class", "disabled");
		spanActiveDisabled.setAttribute("style", "display: none");
		spanWaiting.setAttribute("class", "waiting");
		spanWaiting.setAttribute("style", "display: none");
		
		// Build DOM tree
		ajaxLink.appendChild(imgEspionageEnabled);
		spanActiveEnabled.appendChild(ajaxLink);
		spanActiveDisabled.appendChild(imgEspionageDisabled);
		spanWaiting.appendChild(imgEspionageDisabled);
		spanActive.appendChild(spanActiveEnabled);
		spanActive.appendChild(spanActiveDisabled);
		spanAjaxLink.appendChild(spanActive);
		spanAjaxLink.appendChild(spanWaiting);
		
		// Put the link
		elemPlanet.getElementsByClassName("actions")[0].appendChild(spanAjaxLink);
		
		// Try moon
		var elemMoon = document.getElementById("planet_" + i + "m");
		if(elemMoon != null) {
			var moonAjaxLink = spanAjaxLink.cloneNode(true);
			moonAjaxLink.firstChild.firstChild.firstChild.setAttribute("onclick", "disable_ajax_links();; new Ajax.Request('/fleet/assign?current_planet=" + currentPlanetId + "&amp;distance=" + calcDistance(currentPlanetGalaxy, currentPlanetSystem, currentPlanetSlot, galaxy, system, i) + "&amp;opts%5Bmission_type%5D=espionage&amp;parent_id=select_fleet_link_espionage_" + i + "m&amp;target_url%5Baction%5D=espionage&amp;target_url%5Bcontroller%5D=espionage&amp;target_url%5Bcoords%5D=" + galaxy + "." + system + "." + i + "m', {asynchronous:true, evalScripts:true}); return false;");
			moonAjaxLink.firstChild.firstChild.firstChild.setAttribute("id", "select_fleet_link_espionage_" + i + "m");
			elemMoon.getElementsByClassName("actions")[0].appendChild(moonAjaxLink);
		}
	}
	
}

// Calculate distance between planets
function calcDistance(g1, s1, p1, g2, s2, p2) {
	if(p1 == p2 && s1 == s2 && g1 == g2) {
		return 5
	}
	else if(s1 == s2 && g1 == g2) {
		return 1000 + Math.abs(p1 - p2) * 5
	}
	else if(g1 == g2) {
		return 2700 + Math.abs(s1 - s2) * 95
	}
	else {
		return Math.abs(g1 - g2) * 20000
	}
}