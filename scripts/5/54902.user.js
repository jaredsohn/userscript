// AuctionSearchKit - "Rightmove on Google Maps" User Script
// Version 3.4
// 2010-08-05
// Copyright (c) 2009, Auction Search Kit. All rights reserved.
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
// select "Rightmove on Google Maps", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Rightmove on Google Maps
// @namespace     http://www.auctionsearchkit.co.uk
// @description   Shows multiple Rightmove properties on a Google Map. Also adds links to other mapping sites and useful tools mentioned in a MoneySavingExpert article. 
// @include       http://www.rightmove.co.uk/*
// ==/UserScript==

// Script version
var SCRIPT_VERSION = 3.4;

// Constants
var DEBUG_MODE = false;
var CHAR_CODE_A = 65; // The ASCII code for A, which will be the first marker on the map

var ABOUT_MY_PLACE_URL_BASE = 'http://www.aboutmyplace.co.uk/showmap?mt=i&type=property&poi=property&id=';
var BING_MULTI_URL_BASE = 'http://www.bing.com/maps/default.aspx?rtp=';
var BING_SINGLE_URL_BASE = 'http://www.bing.com/maps/?v=2&style=r&where1=';
var BING_3D_URL_BASE = 'http://www.bing.com/maps/?v=2&style=b&cp=';
var COUNCIL_TAX_BAND_URL_BASE = 'http://www.auctionsearchkit.com/gettopost.html?src=bookmarklet1&url=http://www.voa.gov.uk/cti/refs.asp?lcn=0&txtPostCode=';
var FLOODINGMAP_URL_BASE = 'http://maps.environment-agency.gov.uk/wiyby/wiybyController?x=<x>&y=<y>&lang=_e&ep=map&topic=floodmap&layerGroups=1&scale=5&textonly=off';
var FLOODRISK_URL_BASE = 'http://maps.environment-agency.gov.uk/wiyby/wiybyController?ep=query&floodrisk=0&lang=_e&topic=floodmap&floodX=<x>&floodY=<y>';
var HACIENDA_URL_BASE = 'http://www.hacienda.co.uk/map.aspx?zoom=15&t=s0&r=0&l=0&u=200000000';
var GOOGLE_MAP_NON_KML_URL_BASE = 'http://maps.google.co.uk/maps?t=m&f=q';
var GOOGLE_MAP_KML_URL_BASE = 'http://www.auctionsearchkit.co.uk/makekml.php?fp=rogm' + SCRIPT_VERSION + '_&gm=true';
var HOMETRACK_URL_BASE = 'http://www.hometrack.co.uk/hometrack/products/property-search/index.cfm?searchKey=';
var HOUSEPRICESCOUK_BASE = 'http://www.houseprices.co.uk/e.php?n=100&q=';
var LANDREG_URL_BASE = 'http://www1.landregistry.gov.uk/houseprices/housepriceindex/report/default.asp?step=2&locationType=0&area=&image3.x=22&image3.y=5&postcode=';
var MOUSEPRICE_URL_START = 'http://www.mouseprice.com/house-prices/land-registry/';
var MOUSEPRICE_URL_END = '?Mode=SP';
var MULTIMAP_SINGLE_URL_BASE = 'http://www.multimap.com/maps/?zoom=16';
var NEIGHBOURHOODSTATS_URL_BASE = 'http://www.neighbourhood.statistics.gov.uk/dissemination/NeighbourhoodSummary.do?width=1280&a=7&r=1&i=1001&m=0&s=1254947383742&enc=1&profileSearchText=';
var NETHOUSEPRICES_URL_BASE = 'http://www.nethouseprices.com/index.php?con=sold_prices_street&cCode=EW'
var OFSTED_URL_START = 'http://www.ofsted.gov.uk/oxcare_providers/postcode_search/%28type%29/1,31/%28typename%29/Childminders/%28typeclass%29/care/%28postcode%29/';
var OFSTED_URL_END = '/%28radius%29/5%20miles/%28object_step%29/10?type=4096|Primary+schools|edu&register=&radius=5+miles&postcode=';
var ORDNANCE_SURVEY_URL_BASE = 'http://getamap.ordnancesurvey.co.uk/getamap/frames.htm?mapAction=gaz&gazName=g&gazString=';
var STREETMAP_REV_GEO_URL = 'http://www.streetmap.co.uk/streetmap.dll';
var STREETMAP_REV_GEO_PARAMS = 'MfcISAPICommand=GridConvert&type=LatLong&name=';
var STREETMAP_REV_GEO_PC_REGEXP = /<strong>Nearest Post Code<\/strong> <\/td> <td width="50%" align="center" valign="middle">\s*([^<]*)/i;
var STREETMAP_SINGLE_URL_BASE = 'http://www.streetmap.co.uk/map.srf?';
var UPMYSTREET_URL_BASE = 'http://www.upmystreet.com/properties/house-prices/search?year=2000&location=';
var UKLOCALAREA_URL_BASE = 'http://www.uklocalarea.com/index.php?q=';
var YAHOO_MAP_URL_BASE = 'http://uk.maps.yahoo.com/#mvt=m';
var ZOOPLA_URL_START = 'http://www.zoopla.co.uk/house-prices/';
var ZOOPLA_URL_END = '/?sold_price_types=all&sold_price_years=all&so=date&sd=desc';

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
  var mapLinks = [];
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

  // Inserts either a space or a line break after the specified link object, depending on context
  function InsertSpaceOrBR(linkObj, useParentsParent) {
    if (linkObj.element.id == 'link-map') {
      var newBr = document.createElement('span');
      newBr.innerHTML = '&nbsp;';
    } else {
      var newBr = document.createElement('br');
    }
    
    if (useParentsParent === true) {
      linkObj.element.parentNode.parentNode.insertBefore(newBr, linkObj.element.parentNode.nextSibling);
    } else {
      linkObj.element.parentNode.insertBefore(newBr, linkObj.element.nextSibling);
    }
  }
  
  // Strip all HTML tags, characters except for A-Z, 0-9, hyphen or comma, leading/trailing spaces,
  // repeated spaces and non-essential words from the given text.
  function TrimTitleText(titleText) {
    if (typeof titleText == 'undefined') {
      titleText = '';
    }
    return titleText.replace(/<[^>]*>/g, ' ')
                    .replace(/[^-, A-Z0-9]/gi, '')
                    .replace(/^\s+|\s+$/g, '')
                    .replace(/\s+/g, ' ')
                    .replace(' house ', ' ')
                    .replace('bedroom', 'bed')
                    .replace('semi-detached', 'semi')
                    .replace(' for sale', '');
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
    // To avoid repeated links, only process those that do not have an image contained within
    if (link.getElementsByTagName('img').length == 0) {
      // Find mapping links using aboutmyplace
      if ((/aboutmyplace\.co\.uk/.test(link.href) == true) &&
          (/type=branch/.test(link.href) == false)) {
        mapLinks[mapLinks.length] = {
            element: link,
            url: link.href};
      // Find Rightmove property links.
      // To avoid repeated links, only process those that have a span contained within them.
      } else if (link.getElementsByTagName('span').length > 0) {
        // Look for a Rightmove property ID in the URL
        var matches = /property-([0-9]+)\.html/.exec(link.href);
        // If the ID was successfully extracted, construct a new map link to aboutmyplace from it
        if ((matches != null) && (matches.length > 1)) { 
          propertyLinks[propertyLinks.length] = {
              element: link,
              url: ABOUT_MY_PLACE_URL_BASE + matches[1],
              id: matches[1]};
        }
      }
    }
  }

  fbLog('mapLinks', mapLinks);
  fbLog('propertyLinks', propertyLinks);

  var googleMapInfoLink = document.getElementById('googlemapinfolink');
  
  var propertyTitleAndPrice = '';
  if ((mapLinks.length > 0) || (googleMapInfoLink != null)) {
    var pageHeaderElement = document.getElementById('pageheader');
    if (pageHeaderElement != null) {
      var priceText = '';
      var bedroomsText = '';
      var spanElements = pageHeaderElement.getElementsByClassName('price');
      if (spanElements.length > 0) {
        var priceElement = spanElements[0];
        priceText = TrimPriceText(priceElement.innerHTML);
      }
      spanElements = pageHeaderElement.getElementsByClassName('bedrooms');
      if (spanElements.length > 0) {
        var bedroomsElement = spanElements[0];
        bedroomsText = TrimTitleText(bedroomsElement.innerHTML);
      }
      spanElements = pageHeaderElement.getElementsByClassName('address');
      if (spanElements.length > 0) {
        var addressElement = spanElements[0];
        var addressText = addressElement.innerHTML;
        var lookingUpElement = document.createElement('span');
        lookingUpElement.className = 'address';
        lookingUpElement.innerHTML += ' [Looking up postcode...]';
        addressElement.parentNode.insertBefore(lookingUpElement, addressElement.nextSibling);
      }
      propertyTitleAndPrice = TrimTitleText(addressText);
      propertyTitleAndPrice = bedroomsText === '' ? propertyTitleAndPrice : bedroomsText + ' ' + propertyTitleAndPrice;
      propertyTitleAndPrice = priceText === '' ? propertyTitleAndPrice : '£' + priceText + ': ' + propertyTitleAndPrice;
    }
  }
  
  var googlemapElement = document.getElementById('googlemap');
  if (googlemapElement != null) {
    googlemapElement.style.width = '130px';
    googlemapElement.style.height = '130px';
  }

  if (googleMapInfoLink != null) {
    // Remove all sibling elements next to the map link
    while (googleMapInfoLink.nextSibling != null) {
      googleMapInfoLink.parentNode.removeChild(googleMapInfoLink.nextSibling);
    }
    
    // Take off the bottom margin so there is no spacing between the map links
    googleMapInfoLink.parentNode.style.margin = '0';

    var linkObj = {
        element: googleMapInfoLink,
        url: googleMapInfoLink.href};
  
    // Look in page source for latitude/longitude
    var pageSource = document.body.innerHTML;
    var matches = /latitude\s*:\s*([^,]*)/i.exec(pageSource);
    var lat = (matches == null) ? '' : matches[1];
    matches = /longitude\s*:\s*([^,]*)/i.exec(pageSource);
    var lng = (matches == null) ? '' : matches[1];
    
    // If lat/lng found, create links
    if ((lat !== '') && (lng !== '')) {
      // Create new link to Yahoo Maps
      var newLink = document.createElement('a');
      newLink.href = YAHOO_MAP_URL_BASE + '&zoom=16&q1=' + lat + ',' + lng + '&lat=' + lat + ',' + '&lon=' + lng;
      newLink.innerHTML = '[Yahoo_Map]';
      newLink.rel = 'nofollow';
      newLink.style.margin = '0';
      newLink.target = 'yahooMapWindow';
      newLink.title = 'View this property on a Yahoo Map (opens new window)';
      
      // Add new link to Yahoo Maps
      googleMapInfoLink.parentNode.insertBefore(newLink, googleMapInfoLink.nextSibling);
      
      // As I'm relying on code I haven't tested I'll put this in a try...catch
      try {
        var ogbNorthEast = WGS84ToOGBNorthEast(lat, lng);
        var ngr = NE2NGR(ogbNorthEast.east, ogbNorthEast.north);

        // Create new link to Streetmap
        var newLink = document.createElement('a');
        newLink.href = STREETMAP_SINGLE_URL_BASE + 'x=' + ogbNorthEast.east + '&y=' + ogbNorthEast.north;
        newLink.innerHTML = '[Streetmap]';
        newLink.rel = 'nofollow';
        newLink.style.margin = '0';
        newLink.target = 'streetmapWindow';
        newLink.title = 'View this property on Streetmap (opens new window)';
        
        // Add new link to Streetmap
        googleMapInfoLink.parentNode.insertBefore(newLink, googleMapInfoLink.nextSibling);

        // Create new link to Ordnance Survery
        var newLink = document.createElement('a');
        newLink.href = ORDNANCE_SURVEY_URL_BASE + ngr;
        newLink.innerHTML = '[OS_Map]';
        newLink.rel = 'nofollow';
        newLink.style.margin = '0';
        newLink.target = 'ordnanceSurveyWindow';
        newLink.title = 'View this property on an Ordnance Survey map (opens new window)';
        
        // Add new link to Ordnance Survey
        googleMapInfoLink.parentNode.insertBefore(newLink, googleMapInfoLink.nextSibling);
      } catch(err) {
        fbLog('Error', err);
      }
      
      // Create new link to Multimap
      var newLink = document.createElement('a');
      newLink.href = MULTIMAP_SINGLE_URL_BASE + '&qs=' + lat + ',' + lng;
      newLink.innerHTML = '[Multimap]';
      newLink.rel = 'nofollow';
      newLink.style.margin = '0';
      newLink.target = 'multimapWindow';
      newLink.title = 'View this property on a Multimap (opens new window)';
      
      // Add new link to Multimap
      googleMapInfoLink.parentNode.insertBefore(newLink, googleMapInfoLink.nextSibling);
      
      // Create new link to Hacienda
      var newLink = document.createElement('a');
      newLink.href = HACIENDA_URL_BASE + '&lat=' + lat + '&lng=' + lng;
      newLink.innerHTML = '[Hacienda]';
      newLink.rel = 'nofollow';
      newLink.style.margin = '0';
      newLink.target = 'haciendaWindow';
      newLink.title = 'View this property on a Hacienda Amenities Map (opens new window)';
      
      // Add new link to Hometrack
      googleMapInfoLink.parentNode.insertBefore(newLink, googleMapInfoLink.nextSibling);

      // Create new link to Google Maps (non-KML)
      var newLink = document.createElement('a');
      newLink.href = GOOGLE_MAP_NON_KML_URL_BASE + '&z=15&q='
                   + (propertyTitleAndPrice == '' ? '' : propertyTitleAndPrice + ' @')
                   + lat + ',' + lng;
      newLink.innerHTML = '[GM_NoKML]';
      newLink.rel = 'nofollow';
      newLink.style.margin = '0';
      newLink.target = 'googleMapWindow';
      newLink.title = 'View this property directly on a Google Map (opens new window)';
      
      // Add new link to Google Maps
      googleMapInfoLink.parentNode.insertBefore(newLink, googleMapInfoLink.nextSibling);

      // Create new link to Google Maps
      var newLink = document.createElement('a');
      var photoElement = document.getElementById('propimg');
      if (photoElement != 'null') {
        var description = '<![CDATA[<a href="' + encodeURIComponent(document.location.href) + '"><img style="width:135px;height:90px;" src="' + encodeURIComponent(photoElement.src) + '"/></a>]]>';
      } else {
        var description = propertyTitleAndPrice;
      }
      newLink.href = GOOGLE_MAP_KML_URL_BASE + '&pm=\\&n=' + propertyTitleAndPrice + '&d=' + description + '&po=\\&c=' + lng + ',' + lat;
      newLink.innerHTML = '[Google_Map]';
      newLink.rel = 'nofollow';
      newLink.style.margin = '0';
      newLink.target = 'googleMapKMLWindow';
      newLink.title = 'View this property on a Google Map via KML (opens new window)';
      
      // Add new link to Google Maps
      googleMapInfoLink.parentNode.insertBefore(newLink, googleMapInfoLink.nextSibling);

      // Create new link to Bing 3D Map
      var newLink = document.createElement('a');
      newLink.href = BING_3D_URL_BASE + lat + '~' + lng;
      newLink.innerHTML = '[Bing_3D_Map]';
      newLink.rel = 'nofollow';
      newLink.style.margin = '0';
      newLink.target = 'bingMapWindow';
      newLink.title = 'View this property on a Bing 3D Map (opens new window)';
      
      // Add new link to Bing 3D Map
      googleMapInfoLink.parentNode.insertBefore(newLink, googleMapInfoLink.nextSibling);
      
      // Get property ID from the URL and plug it into AboutMyPlace
      matches = /property-([0-9]*)\.html/i.exec(location.href);
      if (matches != null) {

        var newLink = document.createElement('a');
        newLink.href = ABOUT_MY_PLACE_URL_BASE + matches[1];
        newLink.innerHTML = '[aboutmyplace]';
        newLink.rel = 'nofollow';
        newLink.style.margin = '0';
        newLink.target = 'aboutMyPlaceWindow';
        newLink.title = 'View this property on an AboutMyPlace Map (opens new window)';
        
        // Add new link to AboutMyPlace
        googleMapInfoLink.parentNode.insertBefore(newLink, googleMapInfoLink.nextSibling);
      }
      
      // Clear the text of the original link to the map on the same page
      googleMapInfoLink.innerHTML = '';
      googleMapInfoLink.style.margin = '0';
      
      // Get nearest postal code to the latitude/longitude.
      GM_xmlhttpRequest({
        method:	'POST',
        url: STREETMAP_REV_GEO_URL,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data: encodeURIComponent(STREETMAP_REV_GEO_PARAMS + lat + ',' + lng),
        onload: function(responseDetails) {
          var postalCodeUpdated = false;
          if (responseDetails != null) {
            var postcodeMatches = STREETMAP_REV_GEO_PC_REGEXP.exec(responseDetails.responseText);
            if (postcodeMatches != null) {
              // Trim all leading/trailing spaces from the postal code
              var postalCode = postcodeMatches[1].toUpperCase().replace(/^\s+|\s+$/g, '');
              if (typeof addressElement == 'object') {
                // Check whether the address text already has the postal code in it
                if (addressText.toUpperCase().indexOf(postalCode) < 0) {
                  // Check whether the current header ends with the first part of the postcode - if so only add on
                  // the end of the postcode, otherwise add on all of it with a comma.
                  if ((postalCode.length > 4) && (addressText.length >= 3) &&
                      (addressText.toUpperCase().substring(addressText.length - (postalCode.length - 4)) ==
                       postalCode.substring(0, postalCode.length - 4))) {
                    addressElement.innerHTML = addressText.substring(0, addressText.length - (postalCode.length - 4)) + postalCode;
                  } else {
                    addressElement.innerHTML = addressText + ', ' + postalCode;
                  }
                  
                  // Replace any double commas with single commas
                  addressElement.innerHTML = addressElement.innerHTML.replace(/,\s*,/g, ',');
                }

                // Check whether the title already has the postal code in it
                if (document.title.toUpperCase().indexOf(postalCode) < 0) {
                  // Check whether the current page title ends with the first part of the postcode - if so only add on
                  // the end of the postcode, otherwise add on all of it with a comma.
                  if ((postalCode.length > 4) && (document.title.length >= 3) &&
                      (document.title.toUpperCase().substring(document.title.length - (postalCode.length - 4)) ==
                       postalCode.substring(0, postalCode.length - 4))) {
                    document.title = document.title.substring(0, document.title.length - (postalCode.length - 4)) + postalCode;
                  } else {
                    document.title = document.title + ', ' + postalCode;
                  }
                  
                  // Replace any double commas with single commas
                  document.title = document.title.replace(/,\s*,/g, ',');
                }
                
                postalCodeUpdated = true;
              }

              // Strip space(s) from postal code
              var postalCodeNoSpace = postalCode.replace(' ', '');
              
              // Create new link to Zoopla
              var newLink = document.createElement('a');
              newLink.href = ZOOPLA_URL_START + postalCodeNoSpace + ZOOPLA_URL_END;
              newLink.innerHTML = '[Zoopla]';
              newLink.rel = 'nofollow';
              newLink.target = 'zooplaWindow';
              newLink.title = 'View past house prices for this postal code (opens new window)';
              
              // Add new link to Zoopla
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              // Create new link to Upmystreet
              var newLink = document.createElement('a');
              newLink.href = UPMYSTREET_URL_BASE + postalCodeNoSpace;
              newLink.innerHTML = '[Upmystreet]';
              newLink.rel = 'nofollow';
              newLink.target = 'upmystreetWindow';
              newLink.title = 'View past house prices etc for this postal code (opens new window)';
              
              // Add new link to Upmystreet
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              // Create new link to UK Local Area
              var newLink = document.createElement('a');
              newLink.href = UKLOCALAREA_URL_BASE + postalCodeNoSpace;
              newLink.innerHTML = '[UK Local Area]';
              newLink.rel = 'nofollow';
              newLink.target = 'ukLocalAreaWindow';
              newLink.title = 'View local area statistics for this postal code (opens new window)';
              
              // Add new link to UK Local Area
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              // Create new link to Ofsted
              var newLink = document.createElement('a');
              newLink.href = OFSTED_URL_START + postalCodeNoSpace + OFSTED_URL_END + postalCodeNoSpace;
              newLink.innerHTML = '[Ofsted Schools]';
              newLink.rel = 'nofollow';
              newLink.target = 'ofstedWindow';
              newLink.title = 'View schools near this postal code (opens new window)';
              
              // Add new link to Ofsted
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              if (postalCodeNoSpace.length > 3) {
                var outcode = postalCodeNoSpace.substring(0, postalCodeNoSpace.length - 3);
                var incode = postalCodeNoSpace.substring(postalCodeNoSpace.length - 3);

                // Create new link to Nethouseprices
                var newLink = document.createElement('a');
                newLink.href = NETHOUSEPRICES_URL_BASE + '&outcode=' + outcode + '&incode=' + incode;
                newLink.innerHTML = '[Nethouseprices]';
                newLink.rel = 'nofollow';
                newLink.target = 'nethousepricesWindow';
                newLink.title = 'View past house prices for roads in this area (opens new window)';
              }
              
              // Add new link to Nethouseprices
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              // Create new link to Neighbourhood Statistics
              var newLink = document.createElement('a');
              newLink.href = NEIGHBOURHOODSTATS_URL_BASE + postalCodeNoSpace;
              newLink.innerHTML = '[Neighbourhood Stats]';
              newLink.rel = 'nofollow';
              newLink.target = 'neighbourhoodStatsWindow';
              newLink.title = 'View neighbourhood statistics for this postal code (opens new window)';
              
              // Add new link to Neighbourhood Statistics
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              // Create new link to Mouseprice
              var newLink = document.createElement('a');
              newLink.href = MOUSEPRICE_URL_START + postalCodeNoSpace + MOUSEPRICE_URL_END;
              newLink.innerHTML = '[Mouseprice]';
              newLink.rel = 'nofollow';
              newLink.target = 'mousepriceWindow';
              newLink.title = 'View past house prices for this postal code (opens new window)';
              
              // Add new link to Mouseprice
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              // Create new link to the Land Registry
              var newLink = document.createElement('a');
              newLink.href = LANDREG_URL_BASE + postalCodeNoSpace;
              newLink.innerHTML = '[Land Registry]';
              newLink.rel = 'nofollow';
              newLink.target = 'landRegistryWindow';
              newLink.title = 'View Land Registry house price index for this region (opens new window)';
              
              // Add new link to the Land Registry
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              // Create new link to houseprices.co.uk
              var newLink = document.createElement('a');
              newLink.href = HOUSEPRICESCOUK_BASE + postalCodeNoSpace;
              newLink.innerHTML = '[Houseprices.co.uk]';
              newLink.rel = 'nofollow';
              newLink.target = 'housepricescoukWindow';
              newLink.title = 'View past house prices for this postal code (opens new window)';
              
              // Add new link to houseprices.co.uk
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              // Create new link to Hometrack
              var newLink = document.createElement('a');
              newLink.href = HOMETRACK_URL_BASE + postalCodeNoSpace;
              newLink.innerHTML = '[Hometrack]';
              newLink.rel = 'nofollow';
              newLink.target = 'hometrackWindow';
              newLink.title = 'View past house prices for this postal code (opens new window)';
              
              // Add new link to Hometrack
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
              
              if ((typeof ogbNorthEast == 'object') && (ogbNorthEast != null)) {
                // Create new link to flooding risk report
                var newLink = document.createElement('a');
                newLink.href = FLOODRISK_URL_BASE.replace(/<x>/g, ogbNorthEast.east).replace(/<y>/g, ogbNorthEast.north);
                newLink.innerHTML = '[Flooding Risk]';
                newLink.rel = 'nofollow';
                newLink.target = 'floodingriskWindow';
                newLink.title = 'View a report of the flooding risk at this postal code (opens new window)';
                
                // Add new link to flooding risk report
                googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
                InsertSpaceOrBR(linkObj, true);

                // Create new link to flooding map
                var newLink = document.createElement('a');
                newLink.href = FLOODINGMAP_URL_BASE.replace(/<x>/g, ogbNorthEast.east).replace(/<y>/g, ogbNorthEast.north);
                newLink.innerHTML = '[Flooding_Map]';
                newLink.rel = 'nofollow';
                newLink.style.margin = '0';
                newLink.target = 'floodingMapWindow';
                newLink.title = 'View a map of flooding risk near this postal code (opens new window)';
                
                // Add new link to flooding map
                googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
                InsertSpaceOrBR(linkObj, true);
              }

              // Create new link to Council Tax Valuation List
              var newLink = document.createElement('a');
              newLink.href = COUNCIL_TAX_BAND_URL_BASE + postalCode;
              newLink.innerHTML = '[Council Tax Band]';
              newLink.rel = 'nofollow';
              newLink.target = 'councilTaxBandWindow';
              newLink.title = 'View council tax valuation list for this postal code (opens new window)';
              
              // Add new link to Council Tax Valuation List
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);

              // Create links title
              var newLink = document.createElement('strong');
              newLink.innerHTML = 'Useful links (see <a target="moneysavingexpert" href="http://www.moneysavingexpert.com/mortgages/free-house-prices">moneysavingexpert</a>):';
              
              // Add links title
              googleMapInfoLink.parentNode.parentNode.insertBefore(newLink, googleMapInfoLink.parentNode.nextSibling);
              InsertSpaceOrBR(linkObj, true);
            }
          }
      
          if (typeof lookingUpElement == 'object') {
            lookingUpElement.parentNode.removeChild(lookingUpElement);
          }
        }
      });
    }
  }

  for (var linkIndex = 0; linkIndex < mapLinks.length; linkIndex++) {
    (function(linkObj) {
      GM_xmlhttpRequest({
        method:	'GET',
        url: linkObj.url,
        onload: function(responseDetails) {
          // Change aboutmyplace link text
          linkObj.element.innerHTML = '[aboutmyplace]';

          var matches = /GetPointMap\('([-.0-9]+)', '([-.0-9]+)'/.exec(responseDetails.responseText);
          if ((matches != null) && (matches.length > 2)) {
            fbLog("matches[2] + ',' + matches[1]", matches[2] + ',' + matches[1]);
            if (linkObj.element.id != 'link-map') {
              // If this is the link object on the right pane of the screen, remove the text after the link.
              // Do this 3 times to remove all the text.
              for (var index = 0; index < 5; index++) {
                try {
                  linkObj.element.parentNode.removeChild(linkObj.element.nextSibling);
                } catch(err) {
                  fbLog('Error', err);
                }
              }
            }

            // Create new link to Yahoo Maps
            var newLink = document.createElement('a');
            newLink.href = YAHOO_MAP_URL_BASE + '&zoom=16&q1=' + matches[2] + ',' + matches[1] + '&lat=' + matches[2] + ',' + '&lon=' + matches[1];
            newLink.innerHTML = '[Yahoo Map]';
            newLink.rel = 'nofollow';
            newLink.target = 'yahooMapWindow';
            newLink.title = 'View this property on a Yahoo Map (opens new window)';
            
            // Add new link to Yahoo Maps
            linkObj.element.parentNode.insertBefore(newLink, linkObj.element.nextSibling);
            InsertSpaceOrBR(linkObj, false);
            
            // As I'm relying on code I haven't tested I'll put this in a try...catch
            try {
              var ogbNorthEast = WGS84ToOGBNorthEast(matches[2], matches[1]);
              var ngr = NE2NGR(ogbNorthEast.east, ogbNorthEast.north);

              // Create new link to Streetmap
              var newLink = document.createElement('a');
              newLink.href = STREETMAP_SINGLE_URL_BASE + 'x=' + ogbNorthEast.east + '&y=' + ogbNorthEast.north;
              newLink.innerHTML = '[Streetmap]';
              newLink.rel = 'nofollow';
              newLink.target = 'streetmapWindow';
              newLink.title = 'View this property on Streetmap (opens new window)';
              
              // Add new link to Streetmap
              linkObj.element.parentNode.insertBefore(newLink, linkObj.element.nextSibling);
              InsertSpaceOrBR(linkObj, false);

              // Create new link to Ordnance Survery
              var newLink = document.createElement('a');
              newLink.href = ORDNANCE_SURVEY_URL_BASE + ngr;
              newLink.innerHTML = '[OS Map]';
              newLink.rel = 'nofollow';
              newLink.target = 'ordnanceSurveyWindow';
              newLink.title = 'View this property on an Ordnance Survey map (opens new window)';
              
              // Add new link to Ordnance Survey
              linkObj.element.parentNode.insertBefore(newLink, linkObj.element.nextSibling);
              InsertSpaceOrBR(linkObj, false);
            } catch(err) {
              fbLog('Error', err);
            }
            
            // Create new link to Multimap
            var newLink = document.createElement('a');
            newLink.href = MULTIMAP_SINGLE_URL_BASE + '&qs=' + matches[2] + ',' + matches[1];
            newLink.innerHTML = '[Multimap]';
            newLink.rel = 'nofollow';
            newLink.target = 'multimapWindow';
            newLink.title = 'View this property on a Multimap (opens new window)';
            
            // Add new link to Multimap
            linkObj.element.parentNode.insertBefore(newLink, linkObj.element.nextSibling);
            InsertSpaceOrBR(linkObj, false);
            
            // Create new link to Hacienda
            var newLink = document.createElement('a');
            newLink.href = HACIENDA_URL_BASE + '&lat=' + matches[2] + '&lng=' + matches[1];
            newLink.innerHTML = '[Hacienda]';
            newLink.rel = 'nofollow';
            newLink.target = 'haciendaWindow';
            newLink.title = 'View this property on a Hacienda Amenities Map (opens new window)';
            
            // Add new link to Hometrack
            linkObj.element.parentNode.insertBefore(newLink, linkObj.element.nextSibling);
            InsertSpaceOrBR(linkObj, false);

            // Create new link to Google Maps
            var newLink = document.createElement('a');
            newLink.href = GOOGLE_MAP_NON_KML_URL_BASE + '&z=15&q='
                         + (propertyTitleAndPrice == '' ? '' : propertyTitleAndPrice + ' @')
                         + matches[2] + ',' + matches[1];
            newLink.innerHTML = '[Google Map]';
            newLink.rel = 'nofollow';
            newLink.target = 'googleMapWindow';
            newLink.title = 'View this property on a Google Map (opens new window)';
            
            // Add new link to Google Maps
            linkObj.element.parentNode.insertBefore(newLink, linkObj.element.nextSibling);
            InsertSpaceOrBR(linkObj, false);
            
            // Create new link to flooding map
            if ((typeof ogbNorthEast == 'object') && (ogbNorthEast != null)) {
              var newLink = document.createElement('a');
              newLink.href = FLOODINGMAP_URL_BASE.replace(/<x>/g, ogbNorthEast.east).replace(/<y>/g, ogbNorthEast.north);
              newLink.innerHTML = '[Flooding Map]';
              newLink.rel = 'nofollow';
              newLink.target = 'floodingMapWindow';
              newLink.title = 'View a map of flooding risk near this postal code (opens new window)';
              
              // Add new link to flooding map
              linkObj.element.parentNode.insertBefore(newLink, linkObj.element.nextSibling);
              InsertSpaceOrBR(linkObj, false);
            }

            // Create new link to Bing 3D Map
            var newLink = document.createElement('a');
            newLink.href = BING_3D_URL_BASE + matches[2] + '~' + matches[1];
            newLink.innerHTML = '[Bing 3D Map]';
            newLink.rel = 'nofollow';
            newLink.target = 'bingMapWindow';
            newLink.title = 'View this property on a Bing 3D Map (opens new window)';
            
            // Add new link to Bing 3D Map
            linkObj.element.parentNode.insertBefore(newLink, linkObj.element.nextSibling);
            InsertSpaceOrBR(linkObj, false);

            // Get nearest postal code to the latitude/longitude.
            // Ensure this is only done once for the page by checking the link ID.
            if (linkObj.element.id != 'link-map') {
              (function(matches) {
                GM_xmlhttpRequest({
                  method:	'POST',
                  url: STREETMAP_REV_GEO_URL,
                  headers:{'Content-type':'application/x-www-form-urlencoded'},
                  data: encodeURIComponent(STREETMAP_REV_GEO_PARAMS + matches[2] + ',' + matches[1]),
                  onload: function(responseDetails) {
                    var postalCodeUpdated = false;
                    if (responseDetails != null) {
                      var postcodeMatches = STREETMAP_REV_GEO_PC_REGEXP.exec(responseDetails.responseText);
                      if (postcodeMatches != null) {
                        // Trim all leading/trailing spaces from the postal code
                        var postalCode = postcodeMatches[1].toUpperCase().replace(/^\s+|\s+$/g, '');
                        if (typeof addressElement == 'object') {
                          // Check whether the address text already has the postal code in it
                          if (addressText.toUpperCase().indexOf(postalCode) < 0) {
                            // Check whether the current header ends with the first part of the postcode - if so only add on
                            // the end of the postcode, otherwise add on all of it with a comma.
                            if ((postalCode.length > 4) && (addressText.length >= 3) &&
                                (addressText.toUpperCase().substring(addressText.length - (postalCode.length - 4)) ==
                                 postalCode.substring(0, postalCode.length - 4))) {
                              addressElement.innerHTML = addressText.substring(0, addressText.length - (postalCode.length - 4)) + postalCode;
                            } else {
                              addressElement.innerHTML = addressText + ', ' + postalCode;
                            }
                            
                            // Replace any double commas with single commas
                            addressElement.innerHTML = addressElement.innerHTML.replace(/,\s*,/g, ',');
                          }

                          // Check whether the title already has the postal code in it
                          if (document.title.toUpperCase().indexOf(postalCode) < 0) {
                            // Check whether the current page title ends with the first part of the postcode - if so only add on
                            // the end of the postcode, otherwise add on all of it with a comma.
                            if ((postalCode.length > 4) && (document.title.length >= 3) &&
                                (document.title.toUpperCase().substring(document.title.length - (postalCode.length - 4)) ==
                                 postalCode.substring(0, postalCode.length - 4))) {
                              document.title = document.title.substring(0, document.title.length - (postalCode.length - 4)) + postalCode;
                            } else {
                              document.title = document.title + ', ' + postalCode;
                            }
                            
                            // Replace any double commas with single commas
                            document.title = document.title.replace(/,\s*,/g, ',');
                          }
                          
                          postalCodeUpdated = true;
                        }

                        // Strip space(s) from postal code
                        var postalCodeNoSpace = postalCode.replace(' ', '');
                        
                        // Create new link to Zoopla
                        var newLink = document.createElement('a');
                        newLink.href = ZOOPLA_URL_START + postalCodeNoSpace + ZOOPLA_URL_END;
                        newLink.innerHTML = '[Zoopla]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'zooplaWindow';
                        newLink.title = 'View past house prices for this postal code (opens new window)';
                        
                        // Add new link to Zoopla
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        // Create new link to Upmystreet
                        var newLink = document.createElement('a');
                        newLink.href = UPMYSTREET_URL_BASE + postalCodeNoSpace;
                        newLink.innerHTML = '[Upmystreet]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'upmystreetWindow';
                        newLink.title = 'View past house prices etc for this postal code (opens new window)';
                        
                        // Add new link to Upmystreet
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        // Create new link to UK Local Area
                        var newLink = document.createElement('a');
                        newLink.href = UKLOCALAREA_URL_BASE + postalCodeNoSpace;
                        newLink.innerHTML = '[UK Local Area]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'ukLocalAreaWindow';
                        newLink.title = 'View local area statistics for this postal code (opens new window)';
                        
                        // Add new link to UK Local Area
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        // Create new link to Ofsted
                        var newLink = document.createElement('a');
                        newLink.href = OFSTED_URL_START + postalCodeNoSpace + OFSTED_URL_END + postalCodeNoSpace;
                        newLink.innerHTML = '[Ofsted Schools]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'ofstedWindow';
                        newLink.title = 'View schools near this postal code (opens new window)';
                        
                        // Add new link to Ofsted
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        if (postalCodeNoSpace.length > 3) {
                          var outcode = postalCodeNoSpace.substring(0, postalCodeNoSpace.length - 3);
                          var incode = postalCodeNoSpace.substring(postalCodeNoSpace.length - 3);

                          // Create new link to Nethouseprices
                          var newLink = document.createElement('a');
                          newLink.href = NETHOUSEPRICES_URL_BASE + '&outcode=' + outcode + '&incode=' + incode;
                          newLink.innerHTML = '[Nethouseprices]';
                          newLink.rel = 'nofollow';
                          newLink.target = 'nethousepricesWindow';
                          newLink.title = 'View past house prices for roads in this area (opens new window)';
                        }
                        
                        // Add new link to Nethouseprices
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        // Create new link to Neighbourhood Statistics
                        var newLink = document.createElement('a');
                        newLink.href = NEIGHBOURHOODSTATS_URL_BASE + postalCodeNoSpace;
                        newLink.innerHTML = '[Neighbourhood Statistics]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'neighbourhoodStatsWindow';
                        newLink.title = 'View neighbourhood statistics for this postal code (opens new window)';
                        
                        // Add new link to Neighbourhood Statistics
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        // Create new link to Mouseprice
                        var newLink = document.createElement('a');
                        newLink.href = MOUSEPRICE_URL_START + postalCodeNoSpace + MOUSEPRICE_URL_END;
                        newLink.innerHTML = '[Mouseprice]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'mousepriceWindow';
                        newLink.title = 'View past house prices for this postal code (opens new window)';
                        
                        // Add new link to Mouseprice
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        // Create new link to the Land Registry
                        var newLink = document.createElement('a');
                        newLink.href = LANDREG_URL_BASE + postalCodeNoSpace;
                        newLink.innerHTML = '[Land Registry]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'landRegistryWindow';
                        newLink.title = 'View Land Registry house price index for this region (opens new window)';
                        
                        // Add new link to the Land Registry
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        // Create new link to houseprices.co.uk
                        var newLink = document.createElement('a');
                        newLink.href = HOUSEPRICESCOUK_BASE + postalCodeNoSpace;
                        newLink.innerHTML = '[Houseprices.co.uk]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'housepricescoukWindow';
                        newLink.title = 'View past house prices for this postal code (opens new window)';
                        
                        // Add new link to houseprices.co.uk
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        // Create new link to Hometrack
                        var newLink = document.createElement('a');
                        newLink.href = HOMETRACK_URL_BASE + postalCodeNoSpace;
                        newLink.innerHTML = '[Hometrack]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'hometrackWindow';
                        newLink.title = 'View past house prices for this postal code (opens new window)';
                        
                        // Add new link to Hometrack
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                        
                        if ((typeof ogbNorthEast == 'object') && (ogbNorthEast != null)) {
                          // Create new link to flooding risk report
                          var newLink = document.createElement('a');
                          newLink.href = FLOODRISK_URL_BASE.replace(/<x>/g, ogbNorthEast.east).replace(/<y>/g, ogbNorthEast.north);
                          newLink.innerHTML = '[Flooding Risk]';
                          newLink.rel = 'nofollow';
                          newLink.target = 'floodingriskWindow';
                          newLink.title = 'View a report of the flooding risk at this postal code (opens new window)';
                          
                          // Add new link to flooding risk report
                          linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                          InsertSpaceOrBR(linkObj, true);
                        }

                        // Create new link to Council Tax Valuation List
                        var newLink = document.createElement('a');
                        newLink.href = COUNCIL_TAX_BAND_URL_BASE + postalCode;
                        newLink.innerHTML = '[Council Tax Band]';
                        newLink.rel = 'nofollow';
                        newLink.target = 'councilTaxBandWindow';
                        newLink.title = 'View council tax valuation list for this postal code (opens new window)';
                        
                        // Add new link to Council Tax Valuation List
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);

                        // Create links title
                        var newLink = document.createElement('strong');
                        newLink.innerHTML = 'Useful links (see <a target="moneysavingexpert" href="http://www.moneysavingexpert.com/mortgages/free-house-prices">moneysavingexpert</a>):';
                        
                        // Add links title
                        linkObj.element.parentNode.parentNode.insertBefore(newLink, linkObj.element.parentNode.nextSibling);
                        InsertSpaceOrBR(linkObj, true);
                      }
                    }
                
                    if (typeof lookingUpElement == 'object') {
                      lookingUpElement.parentNode.removeChild(lookingUpElement);
                    }
                  }
                });
              })(matches);
            }
          }
        }
      });
    })(mapLinks[linkIndex]);
  }

  var numPropertiesElement = document.getElementById('numberOfProperties');
  if ((numPropertiesElement != null) && (propertyLinks.length > 0)) {
    // Set base Yahoo Map URL
    var propertyYahooMapUrl = YAHOO_MAP_URL_BASE;

    // Set base Google Map URL
    var propertyGoogleMapKmlUrl = GOOGLE_MAP_KML_URL_BASE + '&fo=\\&n=Properties';
    
    // Set base Google Map non-KML URL
    var propertyGoogleMapNonKmlUrl = GOOGLE_MAP_NON_KML_URL_BASE;
    
    // Set base Bing Map URL depending on whether there are one or more properties
    var propertyBingUrl = (propertyLinks.length > 1) ? 
                          BING_MULTI_URL_BASE : 
                          BING_SINGLE_URL_BASE;

    // Create Yahoo Map link placeholder
    var yahooMapPropsElement = document.createElement('a');
    yahooMapPropsElement.innerHTML = '';

    // Create Google Maps non-KML link placeholder
    var googleMapNonKmlPropsElement = document.createElement('a');
    googleMapNonKmlPropsElement.innerHTML = '[Mapping properties...0/' + propertyLinks.length + ']';'';

    // Create Google Maps link placeholder
    var googleMapKmlPropsElement = document.createElement('a');
    googleMapKmlPropsElement.innerHTML = '';
    
    // Create Bing Map link placeholder
    var bingPropsElement = document.createElement('a');
    bingPropsElement.innerHTML = '';

    // Add Yahoo Maps link placeholder
    numPropertiesElement.parentNode.insertBefore(yahooMapPropsElement, numPropertiesElement.nextSibling);
    var newBr = document.createElement('span');
    newBr.innerHTML = '&nbsp;';
    numPropertiesElement.parentNode.insertBefore(newBr, numPropertiesElement.nextSibling);

    // Add Google Maps non-KML link placeholder
    numPropertiesElement.parentNode.insertBefore(googleMapNonKmlPropsElement, numPropertiesElement.nextSibling);
    var newBr = document.createElement('span');
    newBr.innerHTML = '&nbsp;';
    numPropertiesElement.parentNode.insertBefore(newBr, numPropertiesElement.nextSibling);

    // Add Google Maps KML link placeholder
    numPropertiesElement.parentNode.insertBefore(googleMapKmlPropsElement, numPropertiesElement.nextSibling);
    var newBr = document.createElement('span');
    newBr.innerHTML = '&nbsp;';
    numPropertiesElement.parentNode.insertBefore(newBr, numPropertiesElement.nextSibling);

    // Add Bing Map link placeholder
    numPropertiesElement.parentNode.insertBefore(bingPropsElement, numPropertiesElement.nextSibling);
    var newBr = document.createElement('span');
    newBr.innerHTML = '&nbsp;';
    numPropertiesElement.parentNode.insertBefore(newBr, numPropertiesElement.nextSibling);

    for (var linkIndex = 0; linkIndex < propertyLinks.length; linkIndex++) {
      (function(linkObj) {
        GM_xmlhttpRequest({
          method:	'GET',
          url: linkObj.url,
          onload: function(responseDetails) {
            mapLinksReceived++;
            googleMapNonKmlPropsElement.innerHTML = '[Mapping properties...' + mapLinksReceived + '/' + propertyLinks.length + ']';
            
            // Add the map coordinates to the link object
            var matches = /GetPointMap\('([-.0-9]+)', '([-.0-9]+)'/.exec(responseDetails.responseText);
            if ((matches != null) && (matches.length > 2)) {
              linkObj.coords = matches[2] + ',' + matches[1];
              linkObj.revcoords = matches[1] + ',' + matches[2];
            }
            
            // If this is the last property link, create a link to display all the properties on Google Maps
            if (mapLinksReceived == propertyLinks.length) {
              // Add the coordinates for each link to the Google Maps URL
              var coordsToMarkerNum = [];
              var numOfMarkers = 0;
              for (var linkIndex = 0; linkIndex < propertyLinks.length; linkIndex++) {
                if (typeof propertyLinks[linkIndex].coords != 'undefined') {
                  // Find out whether these coordinates have already been seen. If not, add them
                  // to the Google Maps URL and increment the current marker number
                  var markerNum = coordsToMarkerNum[propertyLinks[linkIndex].coords];
                  if (typeof markerNum == 'undefined') {
                    markerNum = numOfMarkers;
                    coordsToMarkerNum[propertyLinks[linkIndex].coords] = markerNum;
                    var propertyTitle = '';
                    var propertyPrice = '';
                    try {
                      // Get the property title and strip all unwanted characters / words.
                      propertyTitle = TrimTitleText(propertyLinks[linkIndex].element.innerHTML);

                      // Get the property price and strip all unwanted characters.
                      propertyPrice = TrimPriceText(propertyLinks[linkIndex].element.parentNode
                                                    .nextSibling.nextSibling.innerHTML);
                    } catch(err) {
                      fbLog('Error', err);
                    }
                    
                    // Update Bing URL
                    if (propertyLinks.length > 1) {
                      var titleForBing = propertyPrice === '' ? propertyTitle : propertyPrice + ': ' + propertyTitle;
                      propertyBingUrl += ((numOfMarkers > 0) ? '~' : '') + 'pos.'
                      propertyBingUrl += propertyLinks[linkIndex].coords.replace(',', '_')
                                       + '_' + titleForBing;
                    } else {
                      propertyBingUrl += propertyLinks[linkIndex].coords;
                    }

                    // Update Google Map Non-KML URL
                    var titleForGoogle = propertyPrice === '' ? propertyTitle : '£' + propertyPrice + ': ' + propertyTitle;
                    if (numOfMarkers == 0) {
                      propertyGoogleMapNonKmlUrl += '&saddr=' + titleForGoogle + ' @' + propertyLinks[linkIndex].coords;
                    } else if (numOfMarkers == 1) {
                      propertyGoogleMapNonKmlUrl += '&daddr=' + titleForGoogle + ' @' + propertyLinks[linkIndex].coords;
                    } else {
                      propertyGoogleMapNonKmlUrl += '+to:' + titleForGoogle + ' @' + propertyLinks[linkIndex].coords;
                    }

                    // Update Google Map KML URL
                    var description = titleForGoogle;
                    var photoAnchor = document.getElementById('prop' + propertyLinks[linkIndex].id);
                    if (photoAnchor != null) {
                      var photoElements = photoAnchor.getElementsByTagName('img');
                      if (photoElements.length > 0) {
                        description = '<![CDATA[<a href="' + encodeURIComponent(propertyLinks[linkIndex].element.href) + '"><img style="width:135px;height:90px;" src="' + encodeURIComponent(photoElements[0].src) + '"/></a>]]>';
                      }
                    }
                    propertyGoogleMapKmlUrl += '&pm' + markerNum + '=\\&n' + markerNum + '=' + titleForGoogle + '&d' + markerNum + '=' + description + '&po' + markerNum + '=\\&c' + markerNum + '=' + propertyLinks[linkIndex].revcoords + '&x' + markerNum + '=2';

                    // Update Yahoo Map URL
                    propertyYahooMapUrl += '&q' + (numOfMarkers + 1) + '=' + propertyLinks[linkIndex].coords;
                    
                    numOfMarkers++;
                    
                    // Google Maps only supports up to 25 markers using its "Get Directions" feature
                    if (numOfMarkers == 25) {
                      break;
                    }
                  }
                
                  // Add marker reference to aboutmyplace link text
                  propertyLinks[linkIndex].element.innerHTML += 
                      '<font color="red">[' + String.fromCharCode(CHAR_CODE_A + markerNum) + ']</font>';
                }
              }

              // Create new link to Bing
              bingPropsElement.href = propertyBingUrl;
              bingPropsElement.innerHTML = '[Bing Map]';
              bingPropsElement.rel = 'nofollow';
              bingPropsElement.target = 'bingWindow';
              bingPropsElement.title = 'View all these properties on a Bing Map (opens new window)';
              
              // Create new link to Google Maps
              googleMapKmlPropsElement.href = propertyGoogleMapKmlUrl;
              googleMapKmlPropsElement.innerHTML = '[Google Map]';
              googleMapKmlPropsElement.rel = 'nofollow';
              googleMapKmlPropsElement.target = 'googleMapKMLWindow';
              googleMapKmlPropsElement.title = 'View all these properties on a Google Map via KML (opens new window)';
              
              // Create new link to non-KML Google Maps
              googleMapNonKmlPropsElement.href = propertyGoogleMapNonKmlUrl;
              googleMapNonKmlPropsElement.innerHTML = '[Google Map Non-KML]';
              googleMapNonKmlPropsElement.rel = 'nofollow';
              googleMapNonKmlPropsElement.target = 'googleMapWindow';
              googleMapNonKmlPropsElement.title = 'View all these properties on a Google Map (opens new window)';

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
} catch(err) {
  fbLog('Error', err);
}
