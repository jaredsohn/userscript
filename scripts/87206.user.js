// ==UserScript==
// @name           Bay Rentals Google Map View
// @namespace      brgmv
// @description    Google Maps view of rentals for Bay Rentals subscribers.  Requires Firefox 3.5 or higher.
// @include        http://ssl.accesscom.com/~bar/client/listing.cgi*
// ==/UserScript==

var google;
var bargmv = this;

var mapDiv;
var gc;
var map;

// these are functions we build in the document once the maps API is loaded
// they exist because we don't want to construct maps API objects here in the GM sandbox
var newMarker;
var newInfoWindow;
var newLatLng;

var GEOCODE_DELAY = 1000;

var activeGeocodeRequests = 0;

function geocode(address, callback)
{
    // geocode with caching, only returns the first result's location
    var key = "address-geocode:" + address;
    var latlng = JSON.parse(localStorage.getItem(key));
    if (latlng != null) {
	GM_log("  ...returning cached result for " + key);
	var result = newLatLng(latlng.lat, latlng.lng);
	callback(result, google.maps.GeocoderStatus.OK);
    } else {
	activeGeocodeRequests += 1;
	var delay = GEOCODE_DELAY * activeGeocodeRequests;
	GM_log("  ...querying " + key + " after " + delay + " ms");
	window.setTimeout(function() {
	    GM_log("  ...querying " + key);
	    gc.geocode({address: address}, function(results, status) {
		activeGeocodeRequests -= 1;
		if (status != google.maps.GeocoderStatus.OK) {
		    callback(null, status);
		    return;
		}
		var retval = results[0].geometry.location;
		var storeval = JSON.stringify({ lat: retval.lat(), lng: retval.lng() });
		localStorage.setItem(key, storeval);
		callback(retval, status);
	    });
	}, delay);
    }
}

function addMarker(range, latlng)
{
    var marker = newMarker({
	map: map,
	position: latlng,
	title: range.toString()});

    var infoContents = document.createElement("div");
    var infoFragment = range.cloneContents();
    infoContents.appendChild(infoFragment);

    var infoWindow = newInfoWindow({content: infoContents, maxWidth: 650});
    google.maps.event.addListener(marker, 'click', function() {
	infoWindow.open(map, marker);
    });
}

function buildMarkers()
{
    var	rentHeaders =
	document.evaluate("//b[text()='Rent:']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < rentHeaders.snapshotLength; i++) {
	var f = function() { // wrap for in function to make closure
	    var rentHeader = rentHeaders.snapshotItem(i);
	    var start = document.evaluate("preceding::br[1]", rentHeader, null,
				XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    var end = document.evaluate("following-sibling::hr", start, null,
				XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    var range = document.createRange();
	    range.setStartBefore(start);
	    range.setEndAfter(end);
	    
	    var addressLink = document.evaluate("following-sibling::a", start, null,
				XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href;
	    addressLink = addressLink.split("?")[1];
	    var addressPiecesList = addressLink.split("&");
	    var addressPieces = {};
	    for (var pieceId in addressPiecesList) {
		var piece = addressPiecesList[pieceId];
		var splitPiece = piece.split("=");
		addressPieces[splitPiece[0]] = splitPiece[1];
	    }
	    var addressText = addressPieces.address + ", " + addressPieces.city + ", " + addressPieces.state + " " + addressPieces.zipcode;
	    GM_log("  ...submitting request to find " + addressText + "...");
	    geocode(addressText, function(result, status) {
		if (status != google.maps.GeocoderStatus.OK) {
		    GM_log("WARNING: marker geocoder request failed, error " + status);
		    GM_log("WARNING: failed address was: " + addressText);
		    return;
		}
		GM_log("  ...found " + addressText + ", placing marker...");

		addMarker(range, result);
	    });
	};
	f();
    }
}

function onMapsLoaded() {
    GM_log("  ...maps API loaded, initializing map...");
    google = window.google = unsafeWindow.google;
    
    // now this is a terrible hack to construct a geocoder outside the GM sandbox...
    // we also inject functions to build markers, info windows, and latlng objects
    var scriptText = "gc = new google.maps.Geocoder();" +
	"function newMarker(options) { return new google.maps.Marker(options); }" +
	"function newInfoWindow(options) { return new google.maps.InfoWindow(options); }" + 
	"function newLatLng(lat, lng) { return new google.maps.LatLng(lat, lng); }";
    var scriptElt = document.createElement("script");
    scriptElt.type = "text/javascript";
    scriptElt.textContent = scriptText;
    document.body.appendChild(scriptElt);

    gc = unsafeWindow.gc;
    newMarker = unsafeWindow.newMarker;
    newInfoWindow = unsafeWindow.newInfoWindow;
    newLatLng = unsafeWindow.newLatLng;

    GM_log("newLatLng = " + newLatLng);

    geocode("San Francisco, CA", function(result, status) {
	if (status != google.maps.GeocoderStatus.OK) {
	    GM_log("ERROR: geocoder request failed, error " + status);
	    mapDiv.textContent = "Map view failed to load.";
	    return;
	}
	GM_log("  ...map center found,");

	unsafeWindow.mapDiv = mapDiv.wrappedJSObject;
	unsafeWindow.mapOptions = {
	    zoom: 8, 
	    center: result,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	// now this is a terrible hack to construct a map outside the GM sandbox...
	var scriptElt = document.createElement("script");
	scriptElt.type = "text/javascript";
	scriptElt.textContent = "map = new google.maps.Map(mapDiv, mapOptions);";
	document.body.appendChild(scriptElt);

	map = unsafeWindow.map;
	GM_log("  ...map placed, placing markers...");
	buildMarkers();
    });


}

function initMapView() {
    GM_log("Initializing BAR map view...");

    unsafeWindow.onMapsLoaded = onMapsLoaded;

    mapDiv = document.createElement("div");
    mapDiv.className = "google-map-view";
    mapDiv.style.width = "800px";
    mapDiv.style.height = "600px";

    var afterLastHr = document.evaluate("//hr[last()]/following::*[1]", document, null,
			    XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

    if (afterLastHr == null) {
	GM_log("ERROR: Failed to find where to place map view.");
	return;
    }
    afterLastHr.parentNode.insertBefore(mapDiv, afterLastHr);

    GM_log("  ...map view injected, injecting google maps api js...");

    var scriptElt = document.createElement("script");
    scriptElt.type = "text/javascript";
    scriptElt.src = "http://maps.google.com/maps/api/js?sensor=false&v=3.2&callback=onMapsLoaded";
    document.body.appendChild(scriptElt);

    GM_log("  ...google maps API JS injected, waiting for load...");
}

initMapView();

