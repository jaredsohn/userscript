// ==UserScript==
// @name			Google Maps Current Location
// @author			Erik Vold
// @namespace		gmapCurrentLocation
// @include			http://maps.google.com/
// @include			http://maps.google.com/?*
// @include			http://maps.google.com/#*
// @include			http://maps.google.com/maps
// @include			http://maps.google.com/maps?*
// @include			http://maps.google.com/maps#*
// @include			https://maps.google.com/
// @include			https://maps.google.com/?*
// @include			https://maps.google.com/#*
// @include			https://maps.google.com/maps
// @include			https://maps.google.com/maps?*
// @include			https://maps.google.com/maps#*
// @version			0.3
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-05
// @lastupdated		2009-09-06
// @description		This userscript adds a 'Current Location' button to Google Maps.
// ==/UserScript==

var gmapCurrentLocation = {};
gmapCurrentLocation.go = function( location, inputFld ) {
	gmapCurrentLocation.queryInput.value = location;

	var advancedDropDown = document.getElementById('mrtbox');
	if (advancedDropDown) {
		for (var i = 0; i < advancedDropDown.options.length; i++) {
			if (advancedDropDown.options[i].value == 'loc') {
				advancedDropDown.options[i].selected = 'selected';
				break;
			}
		}
	}

	gmapCurrentLocation.searchMapsBtn.click();
	return true;
},
gmapCurrentLocation.gotoCurrentLocationNavTry = function() {
	navigator.geolocation.getCurrentPosition( function(pos) {
		gmapCurrentLocation.go( pos.coords.latitude + ', ' + pos.coords.longitude );
		return;
	});
	return;
};
gmapCurrentLocation.gotoCurrentLocation1stAjaxTry = function() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://j.maxmind.com/app/geoip.js",
		onerror: function(){
			gmapCurrentLocation.gotoCurrentLocation2ndAjaxTry();
		},
		onload: function(response) {
			if (response.readyState !== 4 || response.status !== 200) {
				gmapCurrentLocation.gotoCurrentLocation2ndAjaxTry();
				return;
			}
			eval(response.responseText); 

			if( !geoip_city || !geoip_region_name || !geoip_country_name || geoip_city() == "" || geoip_region_name() == "" || geoip_country_name() == "" ) {
				gmapCurrentLocation.gotoCurrentLocation2ndAjaxTry();
				return;
			}

			//gmapCurrentLocation.go( geoip_city() + ", " + geoip_region_name() + ", " + geoip_country_name() );
			gmapCurrentLocation.go( geoip_latitude() + ", " + geoip_longitude() );
			return;
		}
	});
};
gmapCurrentLocation.gotoCurrentLocation2ndAjaxTry = function() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.ip2location.com/",
		onload: function(response) {
			if (response.readyState !== 4 || response.status !== 200) {
				return;
			}
			var location = response.responseText.match( /<span([^i]|i[^d]|id[^=])*id="Livedemo1_lblLatitude"[^>]*>([^<]+)<\/span>/i );
			if (!location) {
				return;
			}
			location = location[2].replace( / (LATITUDE|LONGITUDE)/gi , "" );

			gmapCurrentLocation.go( location );
			return;
		}
	});
};
gmapCurrentLocation.setup = function() {
	gmapCurrentLocation.searchMapsBtn = document.getElementById( 'q-sub' );
	if(!gmapCurrentLocation.searchMapsBtn) return;
	gmapCurrentLocation.queryInput = document.getElementById('q_d');
	if(!gmapCurrentLocation.queryInput) return;

	var currentLocBtn = document.createElement( 'input' );
	currentLocBtn.type = "button";
	currentLocBtn.value = "Current Location";
	currentLocBtn.setAttribute( "style", "margin-left:5px;" );
	currentLocBtn.addEventListener( "click", gmapCurrentLocation.gotoCurrentLocation1stAjaxTry, false );

	gmapCurrentLocation.searchMapsBtn.parentNode.insertBefore( currentLocBtn, gmapCurrentLocation.searchMapsBtn.nextSibling );
	return true;
};
gmapCurrentLocation.setup();
