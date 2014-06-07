/*
Geocaching Google Directions - v1.0 2005-09-03
(c) 2005, Prime Suspect Software

Greasemonkey user script: see http://greasemonkey.mozdev.org

Change Log:

* (v1.0) Initial release.

*/

// ==UserScript==
// @name		GC Google Directions
// @description		Shows driving directions from home to cache.
// @namespace       	http://home.earthlink.net/~prime.suspect/gms/
// @include         	http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

(function() {

	// Declare variables.
	var HomeLabel, HomeDdLat, HomeDdLon, e_WaypointName, WaypointId, 
			CoordDdLat, CoordDdLon, CoordDd, CoordFound;
	var Reset = 0;
	
	// Make sure version of Greasemonkey is current. (GM_getValue >= V0.3)
	if (!GM_getValue) {
	    alert('Please upgrade to the latest version of Greasemonkey.');
	    return;
	}

	// Get Waypoint ID.
	e_WaypointName = document.getElementById('WaypointName');
	WaypointId = e_WaypointName.innerHTML + "";

	// Get coordinates in degree.decimal format.
	e_MapLinks_MapLinks = document.getElementById("MapLinks_MapLinks")
	// If no map links (i.e., locationless cache), then exit script.
	if (!e_MapLinks_MapLinks) {return}
	// Otherwise, continue processing.
	CoordDd = e_MapLinks_MapLinks.innerHTML + "";
	CoordFound = CoordDd.match(/lat=\-?[0-9\.]+/);
	CoordFound = CoordFound[0].match(/\-?[0-9\.]+/);
	CoordDdLat = CoordFound[0];
	CoordFound = CoordDd.match(/lon=\-?[0-9\.]+/);
	CoordFound = CoordFound[0].match(/\-?[0-9\.]+/);
	CoordDdLon = CoordFound[0];

	// Get/Set values.
	GetSetValues(0);

	// Update links.
	UpdateMapLinks();


	// Create Greasemonkey Tools menu option to allow user to change settings.
	GM_registerMenuCommand('Change GC Google Directions Settings', function() {
		GetSetValues(1);
		UpdateMapLinks();
	});




	//--------------Functions--------------//


	function GetSetValues(Reset) {
		if (!GM_getValue('HomeLabel') || Reset) {
			if (HomeLabel == null) {HomeLabel = 'My Home'}
			var RtnVar = prompt('Enter label for starting point.\nDirections From...', 
					HomeLabel);
			if ((RtnVar == '') || (RtnVar == null)) {
				if (!Reset) {
					alert('Operation canceled, or entry blank.\nScript aborting. Refresh page to restart');
				} else {
					alert('Operation canceled, or entry blank.\nSelect menu option again to restart');
				}
				return;
			} else {
				HomeLabel = RtnVar;
				GM_setValue('HomeLabel', HomeLabel);
			}
		} else {
			HomeLabel = GM_getValue('HomeLabel');
		}	
	
		if (!GM_getValue('HomeDdLat') || Reset) {
			if (HomeDdLat == null) {HomeDdLat = 'N 00 00.000'}
			var PromptText = 'Enter the LATITUDE for ' + HomeLabel + '.\nCoordinates may be in signed ' +
					'decimal format,\nor degree decimal-minutes format.'
			var RtnVar = prompt(PromptText, HomeDdLat);
			if ((RtnVar == '') || (RtnVar == null)) {
				if (!Reset) {
					alert('Operation canceled, or entry blank.\nScript aborting. Refresh page to restart');
				} else {
					alert('Operation canceled, or entry blank.\nSelect menu option again to restart');
				}
				return;
			} else {
				HomeDdLat = RtnVar;
				GM_setValue('HomeDdLat', HomeDdLat);
			}
		} else {
			HomeDdLat = GM_getValue('HomeDdLat');
		}
	
		if (!GM_getValue('HomeDdLon') || Reset) {
			if (HomeDdLon == null) {HomeDdLon = 'W 000 00.000'}
			var PromptText = 'Enter the LONGITUDE for ' + HomeLabel + '.\nCoordinates must be in ' +
					'the same format\nused for the LATITUDE.'
			var RtnVar = prompt(PromptText, HomeDdLon);
			if ((RtnVar == '') || (RtnVar == null)) {
				if (!Reset) {
					alert('Operation canceled, or entry blank.\nScript aborting. Refresh page to restart');
				} else {
					alert('Operation canceled, or entry blank.\nSelect menu option again to restart');
				}
				return;
			} else {		
				HomeDdLon = RtnVar;
				GM_setValue('HomeDdLon', HomeDdLon);
			}
		} else {
			HomeDdLon = GM_getValue('HomeDdLon');
		}
	}

	
	function UpdateMapLinks() {
		// Declare local variables.
		var MoreMapsURL, CurMaps, MapsPart1, MapsPart2, MapsAll, HomeLableOK;
		// Fix any angle brackets in home label name.
		HomeLabelOK = HomeLabel.replace(/>/g,'&gt;');
		HomeLabelOK = HomeLabelOK.replace(/</g,'&lt;');
		// Create string for new map links.
		MoreMapsURL  = '<a href="http://maps.google.com/maps?q=' + CoordDdLat + '+' + CoordDdLon +
				'+(' + WaypointId +')" target="_blank">Google Maps</a><br>';
		MoreMapsURL += '<a href="http://maps.google.com/maps?q=' + CoordDdLat + '+' + CoordDdLon +
				'+(' + WaypointId +')&t=k" target="_blank">Google Satellite</a><br>';
		MoreMapsURL += '<a href="http://maps.google.com/maps?q=' + CoordDdLat + '+' + CoordDdLon +
				'+(' + WaypointId +')&t=h" target="_blank">Google Hybrid</a><br>';
		MoreMapsURL += '<a href="http://maps.google.com/maps?q=' + HomeDdLat + ',' + HomeDdLon + 
				'+(' + escape(HomeLabel) + ')+to+' + CoordDdLat + ',' + CoordDdLon +
				'+(' + WaypointId +')" target="_blank">Directions From ' + 
				HomeLabelOK + '</a><br>';	
		// Replace existing Google Maps string with MoreMaps string.
		CurMaps = e_MapLinks_MapLinks.innerHTML;
		MapsPart1 = CurMaps.substring(0, CurMaps.indexOf('<a href="http://maps.google'));
		MapsPart2 = CurMaps.substring(CurMaps.indexOf('<a href="http://www.mapquest'));
		MapsAll = MapsPart1 + MoreMapsURL + MapsPart2;
		e_MapLinks_MapLinks.innerHTML = MapsAll;
	}

})();