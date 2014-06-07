// ==UserScript==
// Author          Matt Gleeson <matt@mattgleeson.net>
// Copyright       Matt Gleeson & Jonathan Hunt
// License         GPLv3.
// @name           Translink Geolocation Updated
// @namespace      http://www.mattgleeson.net
// @description    Updated version of Translink Geolocation userscript by Johathan Hunt <jjh@42quarks.com> 
// @description    fixed to work with current version of translink site as of 18/08/2010
// @description    (Original script: http://userscripts.org/scripts/show/53665)
// @description    Uses geolocation (new in Firefox 3.5) to automatically insert the name of your current 
// @description    location when using the Translink (Brisbane public transport) page when planning a journey

// @include        http://*translink.com.au/*
//
// ==/UserScript==

// Parameters
var accuracyrequired = 400; // Location accuracy (in metres) necessary to attempt being helpful
// Google Maps API key (get your own key if you change this script!)
var gkey = 'ABQIAAAAYLdrWWZDQOFvmKhP-Dx35hTmjv-50rV__06f5NHP9FI487i5rRR42ccWieUqBOHSP6arDUap053tPw';

var stBox = document.getElementById('FromStreet');
var suburbBox = document.getElementById('FromSuburb');

// Start of program

// Geolocate as the page loads.
main();

function main()
{
  if(stBox && suburbBox) { // Check the page elements we were expecting are present
    modifyPage();

    // Check that the textbox is empty (if the user has pushed the back button we don't want to keep
    // change the textbox).
    if(suburbBox.value == "" && stBox.value == "") {
      getLocation();
    }
    else {
      GM_log('Text already entered');
    }
  }
  else {
    GM_log('Page has been modified - Greasescript outdated');
  }
}

function modifyPage()
{
  // Add elements to the page that we want.
  var mod = document.createElement('var');
  mod.innerHTML = '<div><p><a id="jjh-location-link"" href="javascript:">Find current location</a></p><p id="jjh-location-status"></p></div>';
  suburbBox.parentNode.insertBefore(mod, suburbBox.nextSibling);
  
  // Add my onClick link
  var curLink = document.getElementById('jjh-location-link');
  curLink.addEventListener("click", getLocation, true);
}

function getLocation()
{
  // Either the page has just loaded or the user has requested we find their location.

  if ( typeof getLocation.inProgress == 'undefined' ) {
    getLocation.inProgress = false;
  }

  if(getLocation.inProgress) {
    GM_log('Get location in progress');
  }
  else {    
    showStatus('Requesting location', true);
    navigator.geolocation.getCurrentPosition(gotLocation, handleError);
  }
}      

function gotLocation(position)
{
  // Callback once geolocation has been successful.
  // We now have an estimate of our position which we need to turn into a street address.
  GM_log('Geolocation successful');
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var accuracy = position.coords.accuracy;
  GM_log('Found my location with accuracy ' + accuracy + 'lat ' + latitude + ' long ' + longitude);
  
  if(accuracy > accuracyrequired) {
    showStatus('Unable to get required accuracy', false);
    return;
  }

  reverseGeocode(position);
}


function reverseGeocode(position)
// Given a position object (geolocation) return the best estimate of a street address
// Currently we use Google Reverse Geocode to achieve this
{
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  showStatus('Reverse geocoding', true);

  qurl = 'http://maps.google.com/maps/geo?q=' + latitude + ',' + longitude + '&output=json&oe=utf8&sensor=true&key=' + gkey;
  // http://code.google.com/apis/maps/documentation/geocoding/index.html for info on API

  GM_xmlhttpRequest({
    method: 'GET',
    url: qurl,
    headers: {
        'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
    },
    onload: 
      function(responseDetails) {
	GM_log('Got reverse geocode response', true);
	var geocodeInfo = JSON.parse(responseDetails.responseText);
	gotAddress(geocodeInfo);
      },
    onerror:
      function(responseDetails) {
	GM_log('Error reverse geocoding: ' + responseDetails.statusText);
	showError('Unable to get street address from location', false);
      }
  });
}

function gotAddress(geocodeInfo)
{
  // Google has successfully found as an address. 
  // If this is accurate enough this needs to be added to the location textbox.

  var locality = geocodeInfo.Placemark[0].AddressDetails.Country.AdministrativeArea.Locality;
  var accuracy = geocodeInfo.Placemark[0].Accuracy;
  var adminarea = geocodeInfo.Placemark[0].AddressDetails.Country.AdministrativeArea.AdminstrativeAreaName;
  var address = geocodeInfo.Placemark[0].address;

  if(accuracy < 6) { // If we can't get street level accuracy
    GM_log('Reverse geocode not accurate enough');
    showStatus('Unable to get accurate geocode', false);
    return;
  }
  // Check if we are in Queensland (otherwise don't bother trying to file in the address)
  if(address.indexOf('QLD') == -1) {
    GM_log('Not in Queensland');
    showStatus('Not in Queensland', false);
	GM_log('address: '+address);
    return;
  }

  var streetaddress = locality.Thoroughfare.ThoroughfareName;
  var suburb = locality.LocalityName;
  GM_log('Got address ' + streetaddress + ' suburb ' + suburb);

  stBox.value = streetaddress; stBox.style.color = 'Black';
  suburbBox.value = suburb; suburbBox.style.color = 'Black';

  showStatus('', false);
}

function handleError(error)
{
  // Unable to find the location for some reason
  GM_log('Unable to get current location: ' + error);
  showError('Error retrieving location', false);
}

function showStatus(status, inProgress)
{
  // Update the user as to what's going on with finding their location
  // inprogress - is this a final status update or is geolocation in progress (used to 
  // stop multiple geolocation requests at the same time.
  getLocation.inProgress = inProgress;
  GM_log('Status: ' + status);

  var statusParagraph = document.getElementById('jjh-location-status');
  statusParagraph.innerHTML = '<p id="jjh-location-status">' + status + '</p>';
}
