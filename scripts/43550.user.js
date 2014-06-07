// ==UserScript==
// @name        	MyGeoPlace
// @namespace   	http://home.fabian.cz/143-nearest-caches-from-my-places
// @description 	This script adds new places for searching nearest caches to your Geocaching.com home. See screenshots on http://home.fabian.cz/143-nearest-caches-from-my-places 
// @include       http://geocaching.com/my/*// @include       http://www.geocaching.com/my/*
// @version			0.4
// @author			Lukas Vana (Fabiancz), THC geoTeam
// @e-mail			fabiancz@geoteam.info
// ==/UserScript==
GM_registerMenuCommand("MyGeoPlace: new place", newPoint);
GM_registerMenuCommand("MyGeoPlace: remove place", removePoint);
GM_registerMenuCommand("MyGeoPlace: check for update", checkForUpdate);
var CurrentVersion = "0.4";
var lnkprofile, title;
lnkprofile = document.getElementById('ctl00_ContentBody_hlNearbyWaymarks');
if (lnkprofile) {
    var coords = GM_getValue('coords');
    coords = coords.split('#');
    var links = '';
    for (x in coords) {
	    if(coords[x].search(',') != -1) {
		    var item = coords[x].split(',');
			 links += '<li><a href="http://www.geocaching.com/seek/nearest.aspx?lat=' + item[0] + '&lon=' + item[1] + '">' + item[2] + '</a>'
			 	+ '(<a href="http://www.geocaching.com/seek/nearest.aspx?lat=' + item[0] + '&lon=' + item[1] + '&f=1">Filter out finds</a>, '
			 	+ '<a href="http://www.geocaching.com/map/default.aspx?lat=' + item[0] + '&lon='+ item[1] + '">Map it</a>)'
			 	+ '</li>';
		 }
	 }
    places = document.createElement('li');
	 places.innerHTML = '<strong>Nearest from my places</strong>' +
    '<ul>' + links + '</ul>';
    lnkprofile.parentNode.parentNode.insertBefore(places, lnkprofile.nextSibling);
}

function newPoint() {
	var coords = GM_getValue('coords', '');
	var newCoords = window.prompt("New coordinates:\nFormat: latitude,longitude,name\nExample: 49.95,14.3154,Home", "");
	var coordsValidation = newCoords.split(',');
	if(!isNaN(coordsValidation[0]) && !isNaN(coordsValidation[1]) && coordsValidation[2]!='') { 
		GM_setValue('coords', coords + '#' + newCoords);
		window.location.href = window.location.href;
	} else {
		alert('Bad format');
	}
}

function removePoint() {
	var coords = GM_getValue('coords', '');
	var textCoords = '';
	coords = coords.split('#');
	for (x in coords) {
	    if(coords[x].search(',') != -1) {
		    var item = coords[x].split(',');
		    textCoords += x + ': ' + item[2] + '(' + item[0] + ',' + item[1] + ")\n";
		 }
	}
	var coordForDel = window.prompt(textCoords + "\nCoordinate ID to delete:", "");
	var newCoords = '';
	for (y in coords) {
		if(y != coordForDel && coords[y]!='') newCoords += '#' + coords[y];
	}
	GM_setValue('coords', newCoords);
	window.location.href = window.location.href; 
}

function checkForUpdate() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://home.fabian.cz/userscripts/myGeoPlaces.version.txt',
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.8.1.14) Gecko/20080404 Firefox/2.0.0.14',
            'Accept': 'text/plain,text/html,text/xml',
        },
        onload: function(responseDetails) {
        NewVersion = responseDetails.responseText;
            if ( NewVersion != CurrentVersion ) {
					alert('This version of the MyGeoPlace script is outdated.');
					if(confirm('Would you like to update the script now?')) {
						window.location="http://home.fabian.cz/userscripts/myGeoPlaces.user.js";
					}
				} else {
					alert('There are no new updates for the MyGeoPlace script available.');
				}
        } 
    })
}