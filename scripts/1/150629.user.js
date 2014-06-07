// ==UserScript==
// @name          Craigslist location to googlemap link
// @namespace     imisspell
// @description   Change location text on list and item pages to a clickable link searching googlemaps, autofills From->To for directions also
// @include       http://*.craigslist.*/*
// ==/UserScript==

// Config...
var sourceAddress = 'Encino L.A.'; // Source address for map directions
var destAddressExtra = ',Los Angeles'; // Any extra info you want to add to the destination address (taken from the Craigslist's page)
var searchURL = 'http://maps.google.com/?'; // Search URL incase you want to try something else
var stripFrom=new Array(", LA",",LA","LA"); // ARRAY of text you want to strip out of the location string found on Craigslist page
var targetWindow = '_blank'; // Target window to open search map in

var DEBUG = 'FALSE';

// create the search url here...
function MapSearchString(qString) {

	qString=qString.replace("(",""); 
	qString=qString.replace(")","") ; 

	for (var i = 0; i < stripFrom.length; i++) {
		qString=qString.replace(stripFrom[i],'');
	}
	
	// Link with googlemap query string info:
	// http://asnsblues.blogspot.com/2011/11/google-maps-query-string-parameters.html
	var searchString='daddr=' + qString + destAddressExtra + '&saddr=' + sourceAddress;
	searchString = searchString.replace(" ","+");

	return searchURL + searchString;

}

// create the doc element here
function generateAelement(txt){

	var locationString=txt.match(/\((.*?)\)/);

	var newMapLink=document.createElement('a');
	newMapLink.appendChild(document.createTextNode(locationString[0]));
	var _mapSearchString = MapSearchString(locationString[0]);
	newMapLink.href=_mapSearchString;
	newMapLink.target=targetWindow;

	return newMapLink;

}

// main function to loop through html page info...
function generateMapLinks() {

	var locations = document.getElementsByTagName("FONT");
	for (i=0; i<locations.length; i++) {
		location = locations[i];
		if (location.textContent.match(/(.*)/)) {
			var newMapLink=generateAelement(location.textContent);
			location.parentNode.appendChild(newMapLink)
		}
	}

	locations = document.getElementsByTagName("h2");
	for (i=0; i<locations.length; i++) {
		location = locations[i];
		if (location.textContent.match(/\((.*)/)) {
			var newMapLink=generateAelement(location.textContent);
			document.getElementsByTagName('h2')[0].appendChild(newMapLink);

		}
	}
	
}

function main() {
  generateMapLinks();
}

try {main();} catch (e) { if (DEBUG) alert(e); }
