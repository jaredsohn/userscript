// Hello World! example user script
// version 0.1 BETA!
// 2009-01-25
// Copyright (c) 2009, Lucas Heuvelmann
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "nextEarthScript", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name	nextEarthScript
// @namespace	http://nextearth.lucash.de/script/download
// @description	script to extend functionality of next-earth
// @include	http://nextearth.de/*
// @include	http://81.169.174.248/*
// @include	http://www.nextearth.de/*
// @include	http://www.next-earth.de/*
// @include	http://next-earth.de/*
// @exclude	http://*/forum/
// ==/UserScript==

config = {
	'beruf': 'spion', // spion, haendler, krieger, broker
	'weightReduction': 1
};

lucash_de = {};
var console = unsafeWindow.console;
if (console == undefined) {
	console = {};
	console.log = function(){}
}

(function(){

    var s = window.location.search.substring(1).split('&');

    if(!s.length) return;

    window.$_GET = {};

    for(var i  = 0; i < s.length; i++) {

        var parts = s[i].split('=');

        window.$_GET[unescape(parts[0])] = unescape(parts[1]);

    }

}())

console.log($_GET);

lucash_de.units = {};
lucash_de.elements = {};
lucash_de.functions = {};
lucash_de.config = config;

lucash_de.units.speed = new Array();
lucash_de.units.speed['Erkundungsfahrzeug'] = 2000;
lucash_de.units.speed['Transportflugzeug'] = 20;
lucash_de.units.speed['Baufahrzeug'] = 1;
lucash_de.units.speed['Großer_Truck'] = 7;
lucash_de.units.speed['Kleiner_Truck'] = 7;
lucash_de.units.speed['Panzerwagen'] = 6;
lucash_de.units.speed['Mech'] = 7;
lucash_de.units.speed['Plasma_Mech'] = 7;
lucash_de.units.speed['Schwerer_Panzerwagen'] = 6;
lucash_de.units.speed['Tank'] = 6;
lucash_de.units.speed['Plasma_Tank'] = 6;
lucash_de.units.speed['Gepanzerter_Hovertank'] = 10;
lucash_de.units.speed['Jagdtank'] = 6;
lucash_de.units.speed['Hoverjagdtank'] = 10;
lucash_de.units.speed['Jagdflugzeug'] = 20;
lucash_de.units.speed['Vernichter'] = 2;
lucash_de.units.speed['Kampfjet'] = 20;
lucash_de.units.speed['Bomber'] = 15;

lucash_de.units.usage = new Array();
lucash_de.units.usage['Erkundungsfahrzeug'] = 0.1;
lucash_de.units.usage['Transportflugzeug'] = 80;
lucash_de.units.usage['Baufahrzeug'] = 8;
lucash_de.units.usage['Großer_Truck'] = 16;
lucash_de.units.usage['Kleiner_Truck'] = 1.6;
lucash_de.units.usage['Panzerwagen'] = 3.2;
lucash_de.units.usage['Mech'] = 1.2;
lucash_de.units.usage['Plasma_Mech'] = 1.2;
lucash_de.units.usage['Schwerer_Panzerwagen'] = 16;
lucash_de.units.usage['Tank'] = 3.2;
lucash_de.units.usage['Plasma_Tank'] = 3.2;
lucash_de.units.usage['Gepanzerter_Hovertank'] = 24;
lucash_de.units.usage['Jagdtank'] = 12;
lucash_de.units.usage['Hoverjagdtank'] = 32;
lucash_de.units.usage['Jagdflugzeug'] = 48;
lucash_de.units.usage['Vernichter'] = 160;
lucash_de.units.usage['Kampfjet'] = 200;
lucash_de.units.usage['Bomber'] = 250;

lucash_de.units.storage = new Array();
lucash_de.units.storage['Erkundungsfahrzeug'] = 4;
lucash_de.units.storage['Transportflugzeug'] = 500000;
lucash_de.units.storage['Baufahrzeug'] = 5000;
lucash_de.units.storage['Großer_Truck'] = 50000;
lucash_de.units.storage['Kleiner_Truck'] = 5000;
lucash_de.units.storage['Panzerwagen'] = 200;
lucash_de.units.storage['Mech'] = 100;
lucash_de.units.storage['Plasma_Mech'] = 100;
lucash_de.units.storage['Schwerer_Panzerwagen'] = 600;
lucash_de.units.storage['Tank'] = 200;
lucash_de.units.storage['Plasma_Tank'] = 200;
lucash_de.units.storage['Gepanzerter_Hovertank'] = 800;
lucash_de.units.storage['Jagdtank'] = 200;
lucash_de.units.storage['Hoverjagdtank'] = 1000;
lucash_de.units.storage['Jagdflugzeug'] = 1500;
lucash_de.units.storage['Vernichter'] = 20000;
lucash_de.units.storage['Kampfjet'] = 5000;
lucash_de.units.storage['Bomber'] = 10000;

lucash_de.functions.isInteger = function(myVar) {
	for(i = 0; i < myVar.length; ++i) {
		if(myVar.charAt(i) < "0" || myVar.charAt(i) > "9") {
			return false;
		}
	}
	return true;
}

lucash_de.functions.getOwnCoordinates = function() {
	var basisString = document.getElementsByName('selectedbase')[0].options[document.getElementsByName('selectedbase')[0].selectedIndex].innerHTML;
	var coordString = basisString.match(/\(\d*,\d*\)/);
	var ownCoords = coordString[0].match(/\d+/g);
	lucash_de.ownCoords['x'] = ownCoords[0];
	lucash_de.ownCoords['y'] = ownCoords[1];

	if (!lucash_de.functions.isInteger(lucash_de.ownCoords['x']) || !lucash_de.functions.isInteger(lucash_de.ownCoords['y'])) {
		lucash_de.elements.ownCoords.style.display = 'block';
	} else {
		lucash_de.elements.ownCoords.style.display = 'none';
	}
}

lucash_de.functions.getTargetCoordinates = function() {
	lucash_de.targetCoords['x'] = document.getElementsByName('posx')[0].value;
	lucash_de.targetCoords['y'] = document.getElementsByName('posy')[0].value;

	if (!lucash_de.functions.isInteger(lucash_de.targetCoords['x']) || !lucash_de.functions.isInteger(lucash_de.targetCoords['y'])) {
		lucash_de.elements.targetCoords.style.display = 'block';
	} else {
		lucash_de.elements.targetCoords.style.display = 'none';
	}
	lucash_de.functions.calculateFlyingTime();
}

lucash_de.functions.calculateSpeed = function() {
	lucash_de.sendFleet.slowestSpeed = 0;
	for (var i in lucash_de.sendFleet.fleet) {
		if (
			lucash_de.sendFleet.fleet[i] > 0 && 
			(lucash_de.units.speed[i] < lucash_de.sendFleet.slowestSpeed
			|| lucash_de.sendFleet.slowestSpeed == 0)
		) {
			lucash_de.sendFleet.slowestSpeed = lucash_de.units.speed[i];
		}
	}
	// speed percentage
	lucash_de.sendFleet.speed = lucash_de.sendFleet.slowestSpeed * document.getElementsByName('prozent')[0].value;
	// spy bonus
	if (lucash_de.config.beruf == 'spion') {
		lucash_de.sendFleet.speed = lucash_de.sendFleet.speed * 1.175;
	}

	if (lucash_de.sendFleet.slowestSpeed == 0) {
		lucash_de.elements.emptyFleet.style.display = 'block';
	} else {
		lucash_de.elements.emptyFleet.style.display = 'none';
	}

	if (lucash_de.sendFleet.slowestSpeed > 0) {
		lucash_de.functions.calculateFlyingTime();
	}
}

lucash_de.functions.setCountOfUnit = function(element) {
	lucash_de.sendFleet.fleet[element.name] = element.value;
	lucash_de.functions.calculateSpeed();
}

lucash_de.functions.calculateFlyingTime = function() {
	var xDiff = Math.abs(lucash_de.ownCoords['x'] - lucash_de.targetCoords['x']);
	var yDiff = Math.abs(lucash_de.ownCoords['y'] - lucash_de.targetCoords['y']);

	var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	var time = (distance/lucash_de.sendFleet.speed);

	// add starting time if speed 1000
	if (lucash_de.sendFleet.slowestSpeed < 1000) {
		time += 0.6;
	}

	// weightReduction
	if (lucash_de.config.weightReduction != 0) {
		weightReductionEffect = Math.pow(0.95, lucash_de.config.weightReduction);
		time = Math.round(time * weightReductionEffect * 100) / 100;
	}

	lucash_de.sendFleet.flyingTime = time * 60 * 60;
	lucash_de.functions.updateArrivalTime();

	// set output
	lucash_de.elements.flyingTimeValue.innerHTML = time + " Stunden";
}

lucash_de.functions.updateArrivalTime = function() {
	var MyDate = new Date();
	var arrival = MyDate.getTime() / 1000 + (lucash_de.sendFleet.flyingTime);
	MyDate.setTime(arrival * 1000);

	var month = MyDate.getMonth() + 1;

	if (MyDate.getSeconds() < 10) {
		var seconds = '0' + MyDate.getSeconds();
	} else {
		var seconds = MyDate.getSeconds();
	}

	if (MyDate.getMinutes() < 10) {
		var minutes = '0' + MyDate.getMinutes();
	} else {
		var minutes = MyDate.getMinutes();
	}

	lucash_de.elements.arrivalTimeValue.innerHTML = 
		MyDate.getDate() + '.' 
		+ month + '.' 
		+ MyDate.getFullYear() + ' ' 
		+ MyDate.getHours() + ':' 
		+ minutes + ':' 
		+ seconds;
	
	unsafeWindow.setTimeout(lucash_de.functions.updateArrivalTime, 1000);
}

lucash_de.functions.changeSpeedPercentage = function() {
	lucash_de.functions.calculateSpeed();
}

// show additional information when sending troops
if ($_GET['section'] == 'auftrag') {

	lucash_de.sendFleet = {};
	lucash_de.sendFleet.slowestSpeed = 0;
	lucash_de.sendFleet.fleet = {};
	lucash_de.ownCoords = new Array();
	lucash_de.targetCoords = new Array();

	var formElement = document.getElementsByName('formular');
	formElement = formElement[0];
	formElement.style.cssFloat = 'left';
	formElement.style.width = 300;

	lucash_de.elements.infoElement = document.createElement('div');
	formElement.parentNode.appendChild(lucash_de.elements.infoElement);
	lucash_de.elements.infoElement.style.cssFloat = 'left';
	
	lucash_de.elements.headline = document.createElement("div");
	lucash_de.elements.headline.appendChild(document.createTextNode('Live-Informationen zur Flotte'))
	lucash_de.elements.headline.style.fontWeight = 'bold';
	lucash_de.elements.infoElement.appendChild(lucash_de.elements.headline);

	lucash_de.elements.warning = document.createElement('div');
	lucash_de.elements.warning.style.color = 'red';
	lucash_de.elements.infoElement.appendChild(lucash_de.elements.warning);
	// warning node for own coordinates
	lucash_de.elements.ownCoords = document.createElement('div');
	lucash_de.elements.ownCoords.appendChild(document.createTextNode('Eigene Koordinaten konnten nicht erkannt werden.'));
	lucash_de.elements.warning.appendChild(lucash_de.elements.ownCoords);
	// warning node for target coordinates
	lucash_de.elements.targetCoords = document.createElement('div');
	lucash_de.elements.targetCoords.appendChild(document.createTextNode('Koordinaten des Ziels konnten nicht erkannt werden.'));
	lucash_de.elements.warning.appendChild(lucash_de.elements.targetCoords);
	// warning node for empty fleet
	lucash_de.elements.emptyFleet = document.createElement('div');
	lucash_de.elements.emptyFleet.appendChild(document.createTextNode('Es sind keine Einheiten eingeteilt.'));
	lucash_de.elements.warning.appendChild(lucash_de.elements.emptyFleet);

	lucash_de.elements.flyingTime = document.createElement('div');
	lucash_de.elements.flyingTime.appendChild(document.createTextNode('Flugzeit: '));
	lucash_de.elements.flyingTimeValue = document.createElement('span');
	lucash_de.elements.flyingTime.appendChild(lucash_de.elements.flyingTimeValue);
	lucash_de.elements.infoElement.appendChild(lucash_de.elements.flyingTime);
	
	lucash_de.elements.arrivalTime = document.createElement('div');
	lucash_de.elements.arrivalTime.appendChild(document.createTextNode('Ungefähre Ankunft: '));
	lucash_de.elements.arrivalTimeValue = document.createElement('span');
	lucash_de.elements.arrivalTime.appendChild(lucash_de.elements.arrivalTimeValue);
	lucash_de.elements.infoElement.appendChild(lucash_de.elements.arrivalTime);

	// analyzing preset values and adding event listener
	lucash_de.functions.getOwnCoordinates();
	lucash_de.functions.getTargetCoordinates();
	var unitSelects = formElement.getElementsByTagName('select');
	for (var i = 0; i < unitSelects.length; i++) {
		if (unitSelects[i].name != 'type' && unitSelects[i].name != 'prozent') {
			lucash_de.functions.setCountOfUnit(unitSelects[i]);
			unitSelects[i].addEventListener('change', function(event){
				lucash_de.functions.setCountOfUnit(event.target);
			}, false);
		}
	}
	document.getElementsByName('posx')[0].addEventListener('change', lucash_de.functions.getTargetCoordinates, false);
	document.getElementsByName('posy')[0].addEventListener('change', lucash_de.functions.getTargetCoordinates, false);
	document.getElementsByName('prozent')[0].addEventListener('change', lucash_de.functions.changeSpeedPercentage, false);
}
