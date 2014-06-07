// AuctionSearchKit - "Holiday-Rentals on Google Maps" User Script
// Version 1.2
// 2010-07-13
// Copyright (c) 2010, Auction Search Kit. All rights reserved.
// Feedback to auctionsearchkit@gmail.com is welcome.
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
// select "Holiday Rentals on Google Maps", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Holiday-Rentals on Google Maps
// @namespace     http://www.auctionsearchkit.co.uk
// @description   Show HomeAway Holiday-Rentals properties on a Google Map. Links from search results and individual properties.
// @include       http://www.holiday-rentals.co.uk/*
// ==/UserScript==

// Constants
var DEBUG_MODE = true;
var CHAR_CODE_A = 65; // The ASCII code for A, which will be the first marker on the map
var LAT_LNG_DP = 3;
var MAX_BING_MARKERS = 25; // Bing only supports up to 25 markers using its "Get Directions" feature
var MAX_GOOGLE_MAPS_MARKERS = 25; // Google Maps only supports up to 25 markers using its "Get Directions" feature
var MAX_MARKERS = 25; // Max total number of markers to create markers for
var MAX_YAHOO_MAPS_MARKERS = 10; // Yahoo Maps only supports up to 10 markers using its "Get Directions" feature
var MAX_TITLE_LENGTH = 50; // Max length of each property title to ensure the URL is not too long

var ABOUT_MY_PLACE_URL_BASE = 'http://www.aboutmyplace.co.uk/showmap?mt=i&type=property&poi=property&id=';
var GOOGLE_MAP_URL_BASE = 'http://maps.google.co.uk/maps?t=m&f=q';
var MULTIMAP_SINGLE_URL_BASE = 'http://www.multimap.com/maps/?zoom=16';
var BING_MULTI_URL_BASE = 'http://www.bing.com/maps/default.aspx?rtp=';
var BING_SINGLE_URL_BASE = 'http://www.bing.com/maps/?v=2&style=r&where1=';
var BING_3D_URL_BASE = 'http://www.bing.com/maps/?v=2&style=b&cp=';
var HACIENDA_URL_BASE = 'http://www.hacienda.co.uk/map.aspx?zoom=15&t=s0&r=0&l=0&u=200000000';
var HOLIDAY_RENTALS_URL_BASE = 'http://www.holiday-rentals.co.uk';
var NEIGHBOURHOODSTATS_URL_BASE = 'http://www.neighbourhood.statistics.gov.uk/dissemination/NeighbourhoodSummary.do?width=1280&a=7&r=1&i=1001&m=0&s=1254947383742&enc=1&profileSearchText=';
var ORDNANCE_SURVEY_URL_BASE = 'http://getamap.ordnancesurvey.co.uk/getamap/frames.htm?mapAction=gaz&gazName=g&gazString=';
var STREETMAP_REV_GEO_URL = 'http://www.streetmap.co.uk/streetmap.dll';
var STREETMAP_REV_GEO_PARAMS = 'MfcISAPICommand=GridConvert&type=LatLong&name=';
var STREETMAP_REV_GEO_PC_REGEXP = /<strong>Nearest Post Code<\/strong> <\/td> <td width="50%" align="center" valign="middle">\s*([^<]*)/i;
var STREETMAP_SINGLE_URL_BASE = 'http://www.streetmap.co.uk/map.srf?';
var UPMYSTREET_URL_BASE = 'http://www.upmystreet.com/properties/house-prices/search?year=2000&location=';
var UKLOCALAREA_URL_BASE = 'http://www.uklocalarea.com/index.php?q=';
var YAHOO_MAP_URL_BASE = 'http://uk.maps.yahoo.com/#mvt=m';

// If in DEBUG mode and FireBug is installed, define a logging function using the FireBug console
if ((DEBUG_MODE === true) && (unsafeWindow.console)) {
  // Log a variable's value via the Firebug console (if debug mode is turned on)
  function fbLog(name, value) {
    if (DEBUG_MODE === true) {
      switch (typeof value) {
        case 'undefined':
          unsafeWindow.console.log(name + ' is undefined');
          break;
        case 'object':
          if (value === null) {
            unsafeWindow.console.log(name + ' is null');
          } else {
            if (value.constructor === Date) {
              unsafeWindow.console.log(name + ' = ' + value);
            } else if (typeof value.length == 'undefined') {
              unsafeWindow.console.log(name + ':');
            } else if (value.length === 0) {
              unsafeWindow.console.log(name + ' is empty (length = 0)');
            } else {
              unsafeWindow.console.log(name + ' (length = ' + value.length + '):');
            }
            unsafeWindow.console.dir(value);
          }
          break;
        case 'string':
          unsafeWindow.console.log(name + ' = "' + value + '"');
          break;
        default:
          unsafeWindow.console.log(name + ' = ' + value);
          break;
      }
    }
  }
} else {
  // Assign a function that does nothing whenever a logging call is made
  function fbLog() {}
}

// Enclose everything in a try...catch block for ease of debugging
try {

  // Initialise globals
  var propertyLinks = [];
  var coordsToIdMap = [];
  var mapLinksReceived = 0;

  // Helper functions for converting latitude/longitude to OS Grid References below.
  // Taken from http://www.bdcc.co.uk/LatLngToOSGB.js
  // Linked to from http://mapki.com/wiki/Tools:Snippets

  function OGBLatLng(lat, lon)
  {
    this.lat = lat;
    this.lon = lon;
  }

  function OGBNorthEast(east, north)
  {
    this.north = north;
    this.east = east;
  }

  //convert WGS84 Latitude and Longitude to Ordnance Survey 1936 Latitude Longitude

  function WGS84ToOGB(WGlat, WGlon, height)
  {
  var deg2rad = Math.PI / 180;
  var rad2deg = 180.0 / Math.PI;

  //first off convert to radians
  var radWGlat = WGlat * deg2rad;
  var radWGlon = WGlon * deg2rad;
  //these are the values for WGS84(GRS80) to OSGB36(Airy)
  var a = 6378137; // WGS84_AXIS
  var e = 0.00669438037928458; // WGS84_ECCENTRIC
  var h = height; // height above datum (from $GPGGA sentence)
  var a2 = 6377563.396; // OSGB_AXIS
  var e2 = 0.0066705397616; // OSGB_ECCENTRIC 
  var xp = -446.448;
  var yp = 125.157;
  var zp = -542.06;
  var xr = -0.1502;
  var yr = -0.247;
  var zr = -0.8421;
  var s = 20.4894;

  // convert to cartesian; lat, lon are in radians
  var sf = s * 0.000001;
  var v = a / (Math.sqrt(1 - (e * (Math.sin(radWGlat) * Math.sin(radWGlat)))));
  var x = (v + h) * Math.cos(radWGlat) * Math.cos(radWGlon);
  var y = (v + h) * Math.cos(radWGlat) * Math.sin(radWGlon);
  var z = ((1 - e) * v + h) * Math.sin(radWGlat);

  // transform cartesian
  var xrot = (xr / 3600) * deg2rad;
  var yrot = (yr / 3600) * deg2rad;
  var zrot = (zr / 3600) * deg2rad;
  var hx = x + (x * sf) - (y * zrot) + (z * yrot) + xp;
  var hy = (x * zrot) + y + (y * sf) - (z * xrot) + yp;
  var hz = (-1 * x * yrot) + (y * xrot) + z + (z * sf) + zp;

  // Convert back to lat, lon
  var newLon = Math.atan(hy / hx);
  var p = Math.sqrt((hx * hx) + (hy * hy));
  var newLat = Math.atan(hz / (p * (1 - e2)));
  v = a2 / (Math.sqrt(1 - e2 * (Math.sin(newLat) * Math.sin(newLat))));
  var errvalue = 1.0;
  var lat0 = 0;
  while (errvalue > 0.001)
  {
  lat0 = Math.atan((hz + e2 * v * Math.sin(newLat)) / p);
  errvalue = Math.abs(lat0 - newLat);
  newLat = lat0;
  }

  //convert back to degrees
  newLat = newLat * rad2deg;
  newLon = newLon * rad2deg;

  return new OGBLatLng(newLat, newLon);

  }

  //converts lat and lon (OSGB36) to OS northings and eastings
  function LLtoNE(lat, lon)
  {
  var deg2rad = Math.PI / 180;
  var rad2deg = 180.0 / Math.PI;

  var phi = lat * deg2rad; // convert latitude to radians
  var lam = lon * deg2rad; // convert longitude to radians
  var a = 6377563.396; // OSGB semi-major axis
  var b = 6356256.91; // OSGB semi-minor axis
  var e0 = 400000; // easting of false origin
  var n0 = -100000; // northing of false origin
  var f0 = 0.9996012717; // OSGB scale factor on central meridian
  var e2 = 0.0066705397616; // OSGB eccentricity squared
  var lam0 = -0.034906585039886591; // OSGB false east
  var phi0 = 0.85521133347722145; // OSGB false north
  var af0 = a * f0;
  var bf0 = b * f0;

  // easting
  var slat2 = Math.sin(phi) * Math.sin(phi);
  var nu = af0 / (Math.sqrt(1 - (e2 * (slat2))));
  var rho = (nu * (1 - e2)) / (1 - (e2 * slat2));
  var eta2 = (nu / rho) - 1;
  var p = lam - lam0;
  var IV = nu * Math.cos(phi);
  var clat3 = Math.pow(Math.cos(phi), 3);
  var tlat2 = Math.tan(phi) * Math.tan(phi);
  var V = (nu / 6) * clat3 * ((nu / rho) - tlat2);
  var clat5 = Math.pow(Math.cos(phi), 5);
  var tlat4 = Math.pow(Math.tan(phi), 4);
  var VI = (nu / 120) * clat5 * ((5 - (18 * tlat2)) + tlat4 + (14 * eta2) - (58 * tlat2 * eta2));
  var east = e0 + (p * IV) + (Math.pow(p, 3) * V) + (Math.pow(p, 5) * VI);

  // northing
  var n = (af0 - bf0) / (af0 + bf0);
  var M = Marc(bf0, n, phi0, phi);
  var I = M + (n0);
  var II = (nu / 2) * Math.sin(phi) * Math.cos(phi);
  var III = ((nu / 24) * Math.sin(phi) * Math.pow(Math.cos(phi), 3)) * (5 - Math.pow(Math.tan(phi), 2) + (9 * eta2));
  var IIIA = ((nu / 720) * Math.sin(phi) * clat5) * (61 - (58 * tlat2) + tlat4);
  var north = I + ((p * p) * II) + (Math.pow(p, 4) * III) + (Math.pow(p, 6) * IIIA);

  // make whole number values
  east = Math.round(east); // round to whole number of meters
  north = Math.round(north); 

  return new OGBNorthEast(east, north);
  }

  //convert northing and easting to letter and number grid system
  function NE2NGR( east,  north)
  {
  east = Math.round(east);
  north = Math.round(north);
  var eX = east / 500000;
  var nX = north / 500000;
  var tmp = Math.floor(eX) - 5.0 * Math.floor(nX) + 17.0; 
  nX = 5 * (nX - Math.floor(nX));
  eX = 20 - 5.0 * Math.floor(nX) + Math.floor(5.0 * (eX - Math.floor(eX)));
  if (eX > 7.5) eX = eX + 1; // I is not used
  if (tmp > 7.5) tmp = tmp + 1; // I is not used

  var eing = east - (Math.floor(east / 100000)*100000);
  var ning = north - (Math.floor(north / 100000)*100000);
  var estr = eing.toString();
  var nstr = ning.toString();
  while(estr.length < 5)
    estr = "0" + estr;
  while(nstr.length < 5)
    nstr = "0" + nstr;

  var ngr = String.fromCharCode(tmp + 65) + 
            String.fromCharCode(eX + 65) + 
            estr + nstr; // Note: Spaces removed here for compatibility with Ordnance Survery URL

  return ngr;
  }

  //helper
  function Marc( bf0,  n,  phi0,  phi)
  {
  return bf0 * (((1 + n + ((5 / 4) * (n * n)) + ((5 / 4) * (n * n * n))) * (phi - phi0))
  - (((3 * n) + (3 * (n * n)) + ((21 / 8) * (n * n * n))) * (Math.sin(phi - phi0)) * (Math.cos(phi + phi0)))
  + ((((15 / 8) * (n * n)) + ((15 / 8) * (n * n * n))) * (Math.sin(2 * (phi - phi0))) * (Math.cos(2 * (phi + phi0))))
  - (((35 / 24) * (n * n * n)) * (Math.sin(3 * (phi - phi0))) * (Math.cos(3 * (phi + phi0)))));
  }

  // My own helper function for easily converting from latitude/longitude to OS grid Eastings/Northings
  function WGS84ToOGBNorthEast(lat, lon) {
    var ogbLatLng = WGS84ToOGB(lat, lon, 0);
    var ogbNorthEast = LLtoNE(ogbLatLng.lat, ogbLatLng.lon);
    return ogbNorthEast;
  }

  // Convert a lat/lng string by decoding it, converting it to a float and rounding it
  function ConvertLatLng(latLng) {
    return parseFloat(decodeURIComponent(latLng)).toFixed(LAT_LNG_DP);
  }
  
  // Strip all HTML tags, characters except for A-Z, 0-9, hyphen or comma, leading/trailing spaces,
  // repeated spaces and non-essential words from the given text.
  function TrimTitleText(titleText) {
    if (typeof titleText == 'undefined') {
      titleText = '';
    }
    return titleText.replace(/<[^>]*>/g, ' ')
                    .replace(/[^-\.\/, A-Z0-9]/gi, '')
                    .replace(/minute/gi, 'min')
                    .replace(/ and /gi, ' ')
                    .replace(/ of /gi, ' ')
                    .replace(/ for /gi, ' ')
                    .replace(/ from /gi, ' ')
                    .replace(/ in /gi, ' ')
                    .replace(/ just /gi, ' ')
                    .replace(/ the /gi, ' ')
                    .replace(/ near /gi, ' nr ')
                    .replace(/new listing\s*/gi, '')
                    .replace(/ one /gi, ' 1 ')
                    .replace(/ two /gi, ' 2 ')
                    .replace(/ three /gi, ' 3 ')
                    .replace(/ four /gi, ' 4 ')
                    .replace(/ five /gi, ' 5 ')
                    .replace(/ six /gi, ' 6 ')
                    .replace(/ seven /gi, ' 7 ')
                    .replace(/ eight /gi, ' 8 ')
                    .replace(/ nine /gi, ' 9 ')
                    .replace(/ ten /gi, ' 10 ')
                    .replace(/ eleven /gi, ' 11 ')
                    .replace(/ twelve /gi, ' 12 ')
                    .replace('bedroom', 'bed')
                    .replace('semi-detached', 'semi')
                    .replace(/Apartment/g, 'Apmt')
                    .replace(/apartment/gi, 'apmt')
                    .replace(/century/gi, 'C')
                    .replace(/conditioning/gi, 'con')
                    .replace(/, /g, ',')
                    .replace(/\. /g, '.')
                    .replace(/\s+/g, ' ')
                    .substring(0, MAX_TITLE_LENGTH)
                    .replace(/^\s+|\s+$/g, '');
  }
  
  // Strip all HTML tags, characters except for 0-9, hyphen or comma, leading/trailing spaces
  // and repeated spaces from the given text.
  function TrimPriceText(priceText) {
    return priceText.replace(/<[^>]*>/g, ' ')
                    .replace(/[^-, 0-9]/gi, '')
                    .replace(/^\s+|\s+$/g, '')
                    .replace(/\s+/g, ' ');
  }
  
  // Find all map and property links
  for (var linkIndex = 0; linkIndex < document.links.length; linkIndex++) {
    var link = document.links[linkIndex];
    
    // Find Holiday Rentals property links.
    // Look for a Holiday Rentals property ID at the end of the URL
    var matches = /(.*)(\/p[0-9]+[0-9A-Z]*($|(\.htm)?(\?uni_id=[0-9A-Z]*)?$))/i.exec(link.href);
    if (matches != null) { 
      var url = matches[2];
      if (matches[1] == '') {
        url = HOLIDAY_RENTALS_URL_BASE + url;
      }
      
      // Avoid repeated links
      var isRepeated = false;
      for (propertyLinkIndex = 0; propertyLinkIndex < propertyLinks.length; propertyLinkIndex++) {
        if (propertyLinks[propertyLinkIndex].url == url) {
          isRepeated = true;
          break;
        }
      }
      
      if (isRepeated == false) {
        propertyLinks[propertyLinks.length] = {
            element: link,
            url: url};
      }
    }
  }

  fbLog('propertyLinks', propertyLinks);
  
  var rbInnerDivs = document.getElementsByClassName('rbinner');
  if (rbInnerDivs != null) {
    // Look in page source for latitude/longitude
    var pageSource = document.body.innerHTML;
    var matches = /a:\s*'([^']*)'/i.exec(pageSource);
    var lat = (matches == null) ? '' : ConvertLatLng(matches[1]);
    matches = /b:\s*'([^']*)'/i.exec(pageSource);
    var lng = (matches == null) ? '' : ConvertLatLng(matches[1]);
    
    // If lat/lng found, create links
    if ((lat !== '') && (lng !== '')) {
      for (rbceIndex = 0; rbceIndex < rbInnerDivs.length; rbceIndex++) { 
        rbInnerDiv = rbInnerDivs[rbceIndex];
        var tabsElements = rbInnerDiv.getElementsByClassName('tabs');
        if (tabsElements.length == 0) {
          continue;
        }

        fbLog('rbInnerDiv', rbInnerDiv);

        var newUl = document.createElement('ul');
        newUl.className = 'tabs';
        rbInnerDiv.insertBefore(newUl, tabsElements[0].nextSibling);
        fbLog('newUl', newUl);
          
        // Create new link to Bing Map
        var newLink = document.createElement('a');
        newLink.href = BING_SINGLE_URL_BASE + lat + ',' + lng;
        newLink.innerHTML = 'Bing Map';
        newLink.rel = 'nofollow';
        newLink.style.margin = '0';
        newLink.target = 'bingMapWindow';
        newLink.title = 'View this property on a Bing Map (opens new window)';
        
        // Add new link to Bing Maps
        var newLi = document.createElement('li');
        newLi.className = 'location-link';
        newLi.appendChild(newLink);
        newUl.appendChild(newLi);
        
        // Create new link to Google Maps
        var newLink = document.createElement('a');
        newLink.href = GOOGLE_MAP_URL_BASE + '&z=15&q='
                     + document.title + '@'
                     + lat + ',' + lng;
        newLink.innerHTML = 'Google Map';
        newLink.rel = 'nofollow';
        newLink.style.margin = '0';
        newLink.target = 'googleMapWindow';
        newLink.title = 'View this property on a Google Map (opens new window)';
        
        // Add new link to Google Maps
        var newLi = document.createElement('li');
        newLi.className = 'location-link';
        newLi.appendChild(newLink);
        newUl.appendChild(newLi);
        
        // Create new link to Hacienda
        var newLink = document.createElement('a');
        newLink.href = HACIENDA_URL_BASE + '&lat=' + lat + '&lng=' + lng;
        newLink.innerHTML = 'Hacienda';
        newLink.rel = 'nofollow';
        newLink.style.margin = '0';
        newLink.target = 'haciendaWindow';
        newLink.title = 'View this property on a Hacienda Amenities Map (opens new window)';
        
        // Add new link to Hacienda
        var newLi = document.createElement('li');
        newLi.className = 'location-link';
        newLi.appendChild(newLink);
        newUl.appendChild(newLi);
        
        // Create new link to Multimap
        var newLink = document.createElement('a');
        newLink.href = MULTIMAP_SINGLE_URL_BASE + '&qs=' + lat + ',' + lng;
        newLink.innerHTML = 'Multimap';
        newLink.rel = 'nofollow';
        newLink.style.margin = '0';
        newLink.target = 'multimapWindow';
        newLink.title = 'View this property on a Multimap (opens new window)';
        
        // Add new link to Multimap
        var newLi = document.createElement('li');
        newLi.className = 'location-link';
        newLi.appendChild(newLink);
        newUl.appendChild(newLi);
        
        // As I'm relying on code I haven't tested I'll put this in a try...catch
        try {
          var ogbNorthEast = WGS84ToOGBNorthEast(lat, lng);
          var ngr = NE2NGR(ogbNorthEast.east, ogbNorthEast.north);

          // Create new link to Ordnance Survery
          var newLink = document.createElement('a');
          newLink.href = ORDNANCE_SURVEY_URL_BASE + ngr;
          newLink.innerHTML = 'OS Map';
          newLink.rel = 'nofollow';
          newLink.style.margin = '0';
          newLink.target = 'ordnanceSurveyWindow';
          newLink.title = 'View this property on an Ordnance Survey map (opens new window)';
          
          // Add new link to Ordnance Survey
          var newLi = document.createElement('li');
          newLi.className = 'location-link';
          newLi.appendChild(newLink);
          newUl.appendChild(newLi);

          // Create new link to Streetmap
          var newLink = document.createElement('a');
          newLink.href = STREETMAP_SINGLE_URL_BASE + 'x=' + ogbNorthEast.east + '&y=' + ogbNorthEast.north;
          newLink.innerHTML = 'Streetmap';
          newLink.rel = 'nofollow';
          newLink.style.margin = '0';
          newLink.target = 'streetmapWindow';
          newLink.title = 'View this property on Streetmap (opens new window)';
          
          // Add new link to Streetmap
          var newLi = document.createElement('li');
          newLi.className = 'location-link';
          newLi.appendChild(newLink);
          newUl.appendChild(newLi);
        } catch(err) {
          fbLog('Error', err);
        }
        
        // Create new link to Yahoo Maps
        var newLink = document.createElement('a');
        newLink.href = YAHOO_MAP_URL_BASE + '&zoom=16&q1=' + lat + ',' + lng + '&lat=' + lat + ',' + '&lon=' + lng;
        newLink.innerHTML = 'Yahoo Map';
        newLink.rel = 'nofollow';
        newLink.style.margin = '0';
        newLink.target = 'yahooMapWindow';
        newLink.title = 'View this property on a Yahoo Map (opens new window)';
        
        // Add new link to Yahoo Maps
        var newLi = document.createElement('li');
        newLi.className = 'location-link';
        newLi.appendChild(newLink);
        newUl.appendChild(newLi);
      }
      
      // Get nearest postal code to the latitude/longitude.
      GM_xmlhttpRequest({
        method:	'POST',
        url: STREETMAP_REV_GEO_URL,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data: encodeURI(STREETMAP_REV_GEO_PARAMS + lat + ',' + lng),
        onload: function(responseDetails) {
          var postalCodeUpdated = false;
          if (responseDetails != null) {
            var postcodeMatches = STREETMAP_REV_GEO_PC_REGEXP.exec(responseDetails.responseText);
            if (postcodeMatches != null) {
              // Trim all leading/trailing spaces from the postal code
              var postalCode = postcodeMatches[1].toUpperCase().replace(/^\s+|\s+$/g, '');

              document.title = document.title + ', ' + postalCode;
              
              // Replace any double commas with single commas
              document.title = document.title.replace(/,\s*,/g, ',');

              postalCodeUpdated = true;

              // Strip space(s) from postal code
              var postalCodeNoSpace = postalCode.replace(' ', '');
              
              for (rbceIndex = 0; rbceIndex < rbInnerDivs.length; rbceIndex++) { 
                var rbInnerDiv = rbInnerDivs[rbceIndex];
                var tabsElements = rbInnerDiv.getElementsByClassName('tabs');
                if (tabsElements.length == 0) {
                  continue;
                }
                var newUl = tabsElements[tabsElements.length - 1];

                // Create new link to Neighbourhood Statistics
                var newLink = document.createElement('a');
                newLink.href = NEIGHBOURHOODSTATS_URL_BASE + postalCodeNoSpace;
                newLink.innerHTML = 'Neighbourhood Stats';
                newLink.rel = 'nofollow';
                newLink.target = 'neighbourhoodStatsWindow';
                newLink.title = 'View neighbourhood statistics for this postal code (opens new window)';
                
                // Add new link to Neighbourhood Statistics
                var newLi = document.createElement('li');
                newLi.className = 'location-link';
                newLi.appendChild(newLink);
                newUl.appendChild(newLi);

                // Create new link to UK Local Area
                var newLink = document.createElement('a');
                newLink.href = UKLOCALAREA_URL_BASE + postalCodeNoSpace;
                newLink.innerHTML = 'UK Local Area';
                newLink.rel = 'nofollow';
                newLink.target = 'ukLocalAreaWindow';
                newLink.title = 'View local area statistics for this postal code (opens new window)';
                
                // Add new link to UK Local Area
                var newLi = document.createElement('li');
                newLi.className = 'last';
                newLi.appendChild(newLink);
                newUl.appendChild(newLi);
              }
            }
          }
        }
      });
    }

    var compareButtonElement = document.getElementById('compare-button');
    if (compareButtonElement != null) {
      var newDiv = document.createElement('div');
      newDiv.className = 'pages-per';

      var spacer = document.createElement('span');
      spacer.innerHTML = '&nbsp;&nbsp;';
      newDiv.appendChild(spacer);

      compareButtonElement.parentNode.parentNode.insertBefore(newDiv, compareButtonElement.parentNode.nextSibling);
    }
    if ((newDiv != null) && (propertyLinks.length > 0)) {
      // Set base Yahoo Map URL
      var propertyYahooMapUrl = YAHOO_MAP_URL_BASE;

      // Set base Google Map URL
      var propertyGoogleMapUrl = GOOGLE_MAP_URL_BASE;
      
      // Set base Bing Map URL depending on whether there are one or more properties
      var propertyBingUrl = (propertyLinks.length > 1) ? 
                            BING_MULTI_URL_BASE : 
                            BING_SINGLE_URL_BASE;

      // Create Bing Map link placeholder
      var bingPropsElement = document.createElement('a');
      bingPropsElement.innerHTML = '';
      newDiv.appendChild(bingPropsElement);

      spacer = document.createElement('span');
      spacer.innerHTML = '&nbsp;';
      newDiv.appendChild(spacer);

      // Create Google Maps link placeholder
      var googleMapPropsElement = document.createElement('a');
      googleMapPropsElement.innerHTML = '[Mapping properties...0/' + propertyLinks.length + ']';
      newDiv.appendChild(googleMapPropsElement);
      
      spacer = document.createElement('span');
      spacer.innerHTML = '&nbsp;';
      newDiv.appendChild(spacer);

      // Create Yahoo Map link placeholder
      var yahooMapPropsElement = document.createElement('a');
      yahooMapPropsElement.innerHTML = '';
      newDiv.appendChild(yahooMapPropsElement);

      for (var linkIndex = 0; linkIndex < propertyLinks.length; linkIndex++) {
        (function(linkObj) {
          GM_xmlhttpRequest({
            method:	'GET',
            url: linkObj.url,
            onload: function(responseDetails) {
              mapLinksReceived++;
              googleMapPropsElement.innerHTML = '[Mapping properties...' + mapLinksReceived + '/' + propertyLinks.length + ']';
              
              // Get the average review rating
              var matches = /rating([0-9\.]+)/i.exec(responseDetails.responseText);
              if ((matches != null) && (matches.length > 1)) {
                var avgRating = matches[1].replace(/\.0*$/, '').substring(0, 4);
                linkObj.element.innerHTML += ' (' + avgRating + '/5)';
              }
              
              // Add the map coordinates to the link object
              matches = /a:\s*'([^']*)',\s*b:\s*'([^']*)'/.exec(responseDetails.responseText);
              if ((matches != null) && (matches.length > 2)) {
                linkObj.coords = ConvertLatLng(matches[1]) + ',' + ConvertLatLng(matches[2]);
              }
              
              // If this is the last property link, create a link to display all the properties on Google Maps
              if (mapLinksReceived == propertyLinks.length) {
                // Add the coordinates for each link to the Google Maps URL
                var coordsToMarkerNum = [];
                var numOfMarkers = 0;
                for (var linkIndex = 0; linkIndex < propertyLinks.length; linkIndex++) {
                  if ((typeof propertyLinks[linkIndex].coords != 'undefined') && (numOfMarkers < MAX_MARKERS)) {
                    // Find out whether these coordinates have already been seen. If not, add them
                    // to the Google Maps URL and increment the current marker number
                    var markerNum = coordsToMarkerNum[propertyLinks[linkIndex].coords];
                    if (typeof markerNum == 'undefined')  {
                      markerNum = numOfMarkers;
                      coordsToMarkerNum[propertyLinks[linkIndex].coords] = markerNum;
                      var propertyTitle = '';
                      var propertyPrice = '';
                      try {
                        // Get the property title and strip all unwanted characters / words.
                        propertyTitle = TrimTitleText(propertyLinks[linkIndex].element.innerHTML);

                        // Get the property price and strip all unwanted characters.
                        propertyPrice = ''; //TODO
                      } catch(err) {
                        fbLog('Error', err);
                      }
                      
                      // Update Bing URL
                      if (numOfMarkers < MAX_BING_MARKERS) {
                        if (propertyLinks.length > 1) {
                          var titleForBing = propertyPrice === '' ? propertyTitle : propertyPrice + ': ' + propertyTitle;
                          propertyBingUrl += ((numOfMarkers > 0) ? '~' : '') + 'pos.'
                          propertyBingUrl += propertyLinks[linkIndex].coords.replace(',', '_')
                                           + '_' + titleForBing;
                        } else {
                          propertyBingUrl += propertyLinks[linkIndex].coords;
                        }
                      }

                      // Update Google Map URL
                      if (numOfMarkers < MAX_GOOGLE_MAPS_MARKERS) {
                        var titleForGoogle = propertyPrice === '' ? propertyTitle : '£' + propertyPrice + ': ' + propertyTitle;
                        if (numOfMarkers == 0) {
                          propertyGoogleMapUrl += '&saddr=' + titleForGoogle + '@' + propertyLinks[linkIndex].coords;
                        } else if (numOfMarkers == 1) {
                          propertyGoogleMapUrl += '&daddr=' + titleForGoogle + '@' + propertyLinks[linkIndex].coords;
                        } else {
                          propertyGoogleMapUrl += '+to:' + titleForGoogle + '@' + propertyLinks[linkIndex].coords;
                        }
                      }

                      // Update Yahoo Map URL
                      if (numOfMarkers < MAX_YAHOO_MAPS_MARKERS) {
                        propertyYahooMapUrl += '&q' + (numOfMarkers + 1) + '=' + propertyLinks[linkIndex].coords;
                      }
                      
                      numOfMarkers++;
                    }

                    if (typeof markerNum != 'undefined')  {
                      // Add marker reference to property link text
                      propertyLinks[linkIndex].element.innerHTML += 
                          ' <font color="red">[' + String.fromCharCode(CHAR_CODE_A + markerNum) + ']</font>';
                    }
                  }
                }

                // Create new link to Bing
                bingPropsElement.href = propertyBingUrl;
                bingPropsElement.innerHTML = '[Bing Map]';
                bingPropsElement.rel = 'nofollow';
                bingPropsElement.target = 'bingWindow';
                bingPropsElement.title = 'View all these properties on a Bing Map (opens new window)';
                
                // Create new link to Google Maps
                googleMapPropsElement.href = propertyGoogleMapUrl;
                googleMapPropsElement.innerHTML = '[Google Map]';
                googleMapPropsElement.rel = 'nofollow';
                googleMapPropsElement.target = 'googleMapWindow';
                googleMapPropsElement.title = 'View all these properties on a Google Map (opens new window)';

                // Create new link to Yahoo Maps
                yahooMapPropsElement.href = propertyYahooMapUrl;
                yahooMapPropsElement.innerHTML = '[Yahoo Map]';
                yahooMapPropsElement.rel = 'nofollow';
                yahooMapPropsElement.target = 'yahooMapWindow';
                yahooMapPropsElement.title = 'View all these properties on a Yahoo Map (opens new window)';
              }
            }
          });
        })(propertyLinks[linkIndex]);
      };
    }
  }
} catch(err) {
  fbLog('Error', err);
}
