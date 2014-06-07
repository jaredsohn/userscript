// ==UserScript==
// @name          Google Streetmap
// @description   Adds a streetmap link to google maps
// @include       http://maps.google.com/*
// @include       http://maps.google.co.uk/*
// ==/UserScript==

// Written by Crosbie Smith
// Licensed under the GNU General Public License (GPL)
//
// Version 1.1  - 20th February 2009
//
// 1.1 fix for change in Google map link
//
// This script incorporates 'jscoord.js', written by Jonathan Stott



function OSRefToMap() {
  return "x=" + this.easting + "&y=" + this.northing;
}


var allLinks, thisLink, pageLink;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
    if (thisLink.innerHTML.match(/Link/)) {
        pageLink = thisLink;
    }
}

allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
    if (thisLink.innerHTML.match(/Print/)) {
	var bar = thisLink.parentNode;
	var streetLink = document.createElement('a');
	bar.appendChild(streetLink);
	streetLink.innerHTML = "<u>Streetmap</u>";
	streetLink.href = pageLink.href;
	streetLink.addEventListener('click', function() {
	    streetLink.href = pageLink.href;
            pageLink.href.match(/(-?[\d\.]+),(-?[\d\.]+)/);
	    var lat = RegExp.$1;
	    var long = RegExp.$2;
	    var cord = new LatLng(lat, long);
	    var stref = cord.toOSRef().toMap();
		var tail = "&z=4";

		// special zone for London
		if (long > -0.36 && long < 0.13 && lat > 51.37 && lat < 51.66) {
		    tail = "&z=2&st=4";
		}
	    streetLink.href = "http://www.streetmap.co.uk/newmap.srf?" + stref +tail;

	}, true);
    }
}


// The remainder of this file is jscoord.js, written by Jonathan Stott
// Licensed under the GNU General Public License (GPL)  
//
// http://www.jstott.me.uk/jscoord/

//--------------------------------------------------------------------------
// JScoord
// jscoord.js
//
// (c) 2005 Jonathan Stott
//
// Created on 21-Dec-2005
//
// 1.1.1 - 16 Jan 2006
//  - Fixed radix bug in getOSRefFromSixFigureReference that would return
//    the incorrect reference if either the northing or the easting started
//    with a leading zero.
// 1.1 - 23 Dec 2005
//  - Added getOSRefFromSixFigureReference function.
// 1.0 - 11 Aug 2005
//  - Initial version created from PHPcoord v1.1
//--------------------------------------------------------------------------


// ================================================================== LatLng

function LatLng(lat, lng) {
  this.lat = lat;
  this.lng = lng;

  this.distance = LatLngDistance;

  this.toOSRef = LatLngToOSRef;
  this.toUTMRef = LatLngToUTMRef;

  this.WGS84ToOSGB36 = WGS84ToOSGB36;
  this.OSGB36ToWGS84 = OSGB36ToWGS84;

  this.toString = LatLngToString;
}

function LatLngToString() {
  return "(" + this.lat + ", " + this.lng + ")";
}



// =================================================================== OSRef

// References given with OSRef are accurate to 1m.
function OSRef(easting, northing) {
  this.easting  = easting;
  this.northing = northing;

  this.toLatLng = OSRefToLatLng;

  this.toString = OSRefToString;
  this.toSixFigureString = OSRefToSixFigureString;
  this.toMap = OSRefToMap;
}


function OSRefToString() {
  return "(" + this.easting + ", " + this.northing + ")";
}


function OSRefToSixFigureString() {
  var hundredkmE = Math.floor(this.easting / 100000);
  var hundredkmN = Math.floor(this.northing / 100000);
  var firstLetter = "";
  if (hundredkmN < 5) {
    if (hundredkmE < 5) {
      firstLetter = "S";
    } else {
      firstLetter = "T";
    }
  } else if (hundredkmN < 10) {
    if (hundredkmE < 5) {
      firstLetter = "N";
    } else {
      firstLetter = "O";
    }
  } else {
    firstLetter = "H";
  }

  var secondLetter = "";
  var index = 65 + ((4 - (hundredkmN % 5)) * 5) + (hundredkmE % 5);
  var ti = index;
  if (index >= 73) index++;
  secondLetter = chr(index);

  var e = Math.floor((this.easting - (100000 * hundredkmE)) / 100);
  var n = Math.floor((this.northing - (100000 * hundredkmN)) / 100);
  var es = e;
  if (e < 100) es = "0" + es;
  if (e < 10)  es = "0" + es;
  var ns = n;
  if (n < 100) ns = "0" + ns;
  if (n < 10)  ns = "0" + ns;

  return firstLetter + secondLetter + es + ns;
}


// ================================================================== UTMRef

function UTMRef(easting, northing, latZone, lngZone) {
  this.easting  = easting;
  this.northing = northing;
  this.latZone  = latZone;
  this.lngZone  = lngZone;

  this.toLatLng = UTMRefToLatLng;

  this.toString = UTMRefToString;
}


function UTMRefToString() {
  return this.lngZone + this.latZone + " " +
         this.easting + " " + this.northing;
}


// ================================================================== RefEll

function RefEll(maj, min) {
  this.maj = maj;
  this.min = min;
  this.ecc = ((maj * maj) - (min * min)) / (maj * maj);
}


// ================================================== Mathematical Functions

function sinSquared(x) {
  return Math.sin(x) * Math.sin(x);
}

function cosSquared(x) {
  return Math.cos(x) * Math.cos(x);
}

function tanSquared(x) {
  return Math.tan(x) * Math.tan(x);
}

function sec(x) {
  return 1.0 / Math.cos(x);
}

function deg2rad(x) {
  return x * (Math.PI / 180);
}

function rad2deg(x) {
  return x * (180 / Math.PI);
}

function chr(x) {
  var h = x.toString (16);
  if (h.length == 1)
    h = "0" + h;
  h = "%" + h;
  return unescape (h);
}

function ord(x) {
  var c = x.charAt(0);
  var i;
  for (i = 0; i < 256; ++ i) {
    var h = i.toString (16);
    if (h.length == 1)
      h = "0" + h;
    h = "%" + h;
    h = unescape (h);
    if (h == c)
      break;
  }
  return i;
}


// ========================================================= Other Functions

function LatLngDistance(to) {
  var er = 6366.707;

  var latFrom = deg2rad(this.lat);
  var latTo   = deg2rad(to.lat);
  var lngFrom = deg2rad(this.lng);
  var lngTo   = deg2rad(to.lng);

  var x1 = er * Math.cos(lngFrom) * Math.sin(latFrom);
  var y1 = er * Math.sin(lngFrom) * Math.sin(latFrom);
  var z1 = er * Math.cos(latFrom);

  var x2 = er * Math.cos(lngTo) * Math.sin(latTo);
  var y2 = er * Math.sin(lngTo) * Math.sin(latTo);
  var z2 = er * Math.cos(latTo);

  var d = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)+(z1-z2)*(z1-z2));

  return d;
}


// ==================================================== Conversion Functions

function OSGB36ToWGS84() {
  var airy1830 = new RefEll(6377563.396, 6356256.909);
  var a        = airy1830.maj;
  var b        = airy1830.min;
  var eSquared = airy1830.ecc;
  var phi = deg2rad(this.lat);
  var lambda = deg2rad(this.lng);
  var v = a / (Math.sqrt(1 - eSquared * sinSquared(phi)));
  var H = 0; // height
  var x = (v + H) * Math.cos(phi) * Math.cos(lambda);
  var y = (v + H) * Math.cos(phi) * Math.sin(lambda);
  var z = ((1 - eSquared) * v + H) * Math.sin(phi);

  var tx =        446.448;
  var ty =       -124.157;
  var tz =        542.060;
  var s  =         -0.0000204894;
  var rx = deg2rad( 0.00004172222);
  var ry = deg2rad( 0.00006861111);
  var rz = deg2rad( 0.00023391666);

  var xB = tx + (x * (1 + s)) + (-rx * y)     + (ry * z);
  var yB = ty + (rz * x)      + (y * (1 + s)) + (-rx * z);
  var zB = tz + (-ry * x)     + (rx * y)      + (z * (1 + s));

  var wgs84 = new RefEll(6378137.000, 6356752.3141);
  a        = wgs84.maj;
  b        = wgs84.min;
  eSquared = wgs84.ecc;

  var lambdaB = rad2deg(Math.atan(yB / xB));
  var p = Math.sqrt((xB * xB) + (yB * yB));
  var phiN = Math.atan(zB / (p * (1 - eSquared)));
  for (var i = 1; i < 10; i++) {
    v = a / (Math.sqrt(1 - eSquared * sinSquared(phiN)));
    phiN1 = Math.atan((zB + (eSquared * v * Math.sin(phiN))) / p);
    phiN = phiN1;
  }

  var phiB = rad2deg(phiN);

  this.lat = phiB;
  this.lng = lambdaB;
}

function WGS84ToOSGB36() {
  var wgs84 = new RefEll(6378137.000, 6356752.3141);
  var a        = wgs84.maj;
  var b        = wgs84.min;
  var eSquared = wgs84.ecc;
  var phi = deg2rad(this.lat);
  var lambda = deg2rad(this.lng);
  var v = a / (Math.sqrt(1 - eSquared * sinSquared(phi)));
  var H = 0; // height
  var x = (v + H) * Math.cos(phi) * Math.cos(lambda);
  var y = (v + H) * Math.cos(phi) * Math.sin(lambda);
  var z = ((1 - eSquared) * v + H) * Math.sin(phi);

  var tx =       -446.448;
  var ty =        124.157;
  var tz =       -542.060;
  var s  =          0.0000204894;
  var rx = deg2rad(-0.00004172222);
  var ry = deg2rad(-0.00006861111);
  var rz = deg2rad(-0.00023391666);

  var xB = tx + (x * (1 + s)) + (-rx * y)     + (ry * z);
  var yB = ty + (rz * x)      + (y * (1 + s)) + (-rx * z);
  var zB = tz + (-ry * x)     + (rx * y)      + (z * (1 + s));

  var airy1830 = new RefEll(6377563.396, 6356256.909);
  a        = airy1830.maj;
  b        = airy1830.min;
  eSquared = airy1830.ecc;

  var lambdaB = rad2deg(Math.atan(yB / xB));
  var p = Math.sqrt((xB * xB) + (yB * yB));
  var phiN = Math.atan(zB / (p * (1 - eSquared)));
  for (var i = 1; i < 10; i++) {
    v = a / (Math.sqrt(1 - eSquared * sinSquared(phiN)));
    phiN1 = Math.atan((zB + (eSquared * v * Math.sin(phiN))) / p);
    phiN = phiN1;
  }

  var phiB = rad2deg(phiN);

  this.lat = phiB;
  this.lng = lambdaB;
}

function OSRefToLatLng() {
  var airy1830 = new RefEll(6377563.396, 6356256.909);
  var OSGB_F0  = 0.9996012717;
  var N0       = -100000.0;
  var E0       = 400000.0;
  var phi0     = deg2rad(49.0);
  var lambda0  = deg2rad(-2.0);
  var a        = airy1830.maj;
  var b        = airy1830.min;
  var eSquared = airy1830.ecc;
  var phi      = 0.0;
  var lambda   = 0.0;
  var E        = this.easting;
  var N        = this.northing;
  var n        = (a - b) / (a + b);
  var M        = 0.0;
  var phiPrime = ((N - N0) / (a * OSGB_F0)) + phi0;
  do {
    M =
      (b * OSGB_F0)
        * (((1 + n + ((5.0 / 4.0) * n * n) + ((5.0 / 4.0) * n * n * n))
          * (phiPrime - phi0))
          - (((3 * n) + (3 * n * n) + ((21.0 / 8.0) * n * n * n))
            * Math.sin(phiPrime - phi0)
            * Math.cos(phiPrime + phi0))
          + ((((15.0 / 8.0) * n * n) + ((15.0 / 8.0) * n * n * n))
            * Math.sin(2.0 * (phiPrime - phi0))
            * Math.cos(2.0 * (phiPrime + phi0)))
          - (((35.0 / 24.0) * n * n * n)
            * Math.sin(3.0 * (phiPrime - phi0))
            * Math.cos(3.0 * (phiPrime + phi0))));
    phiPrime += (N - N0 - M) / (a * OSGB_F0);
  } while ((N - N0 - M) >= 0.001);
  var v = a * OSGB_F0 * Math.pow(1.0 - eSquared * sinSquared(phiPrime), -0.5);
  var rho =
    a
      * OSGB_F0
      * (1.0 - eSquared)
      * Math.pow(1.0 - eSquared * sinSquared(phiPrime), -1.5);
  var etaSquared = (v / rho) - 1.0;
  var VII = Math.tan(phiPrime) / (2 * rho * v);
  var VIII =
    (Math.tan(phiPrime) / (24.0 * rho * Math.pow(v, 3.0)))
      * (5.0
        + (3.0 * tanSquared(phiPrime))
        + etaSquared
        - (9.0 * tanSquared(phiPrime) * etaSquared));
  var IX =
    (Math.tan(phiPrime) / (720.0 * rho * Math.pow(v, 5.0)))
      * (61.0
        + (90.0 * tanSquared(phiPrime))
        + (45.0 * tanSquared(phiPrime) * tanSquared(phiPrime)));
  var X = sec(phiPrime) / v;
  var XI =
    (sec(phiPrime) / (6.0 * v * v * v))
      * ((v / rho) + (2 * tanSquared(phiPrime)));
  var XII =
    (sec(phiPrime) / (120.0 * Math.pow(v, 5.0)))
      * (5.0
        + (28.0 * tanSquared(phiPrime))
        + (24.0 * tanSquared(phiPrime) * tanSquared(phiPrime)));
  var XIIA =
    (sec(phiPrime) / (5040.0 * Math.pow(v, 7.0)))
      * (61.0
        + (662.0 * tanSquared(phiPrime))
        + (1320.0 * tanSquared(phiPrime) * tanSquared(phiPrime))
        + (720.0
          * tanSquared(phiPrime)
          * tanSquared(phiPrime)
          * tanSquared(phiPrime)));
  phi =
    phiPrime
      - (VII * Math.pow(E - E0, 2.0))
      + (VIII * Math.pow(E - E0, 4.0))
      - (IX * Math.pow(E - E0, 6.0));
  lambda =
    lambda0
      + (X * (E - E0))
      - (XI * Math.pow(E - E0, 3.0))
      + (XII * Math.pow(E - E0, 5.0))
      - (XIIA * Math.pow(E - E0, 7.0));

  return new LatLng(rad2deg(phi), rad2deg(lambda));
}


/**
 * Convert a latitude and longitude into an OSGB grid reference
 *
 * @param latitudeLongitude the latitude and longitude to convert
 * @return the OSGB grid reference
 * @since 0.1
 */
function LatLngToOSRef() {
  var airy1830 = new RefEll(6377563.396, 6356256.909);
  var OSGB_F0  = 0.9996012717;
  var N0       = -100000.0;
  var E0       = 400000.0;
  var phi0     = deg2rad(49.0);
  var lambda0  = deg2rad(-2.0);
  var a        = airy1830.maj;
  var b        = airy1830.min;
  var eSquared = airy1830.ecc;
  var phi = deg2rad(this.lat);
  var lambda = deg2rad(this.lng);
  var E = 0.0;
  var N = 0.0;
  var n = (a - b) / (a + b);
  var v = a * OSGB_F0 * Math.pow(1.0 - eSquared * sinSquared(phi), -0.5);
  var rho =
    a * OSGB_F0 * (1.0 - eSquared) * Math.pow(1.0 - eSquared * sinSquared(phi), -1.5);
  var etaSquared = (v / rho) - 1.0;
  var M =
    (b * OSGB_F0)
      * (((1 + n + ((5.0 / 4.0) * n * n) + ((5.0 / 4.0) * n * n * n))
        * (phi - phi0))
        - (((3 * n) + (3 * n * n) + ((21.0 / 8.0) * n * n * n))
          * Math.sin(phi - phi0)
          * Math.cos(phi + phi0))
        + ((((15.0 / 8.0) * n * n) + ((15.0 / 8.0) * n * n * n))
          * Math.sin(2.0 * (phi - phi0))
          * Math.cos(2.0 * (phi + phi0)))
        - (((35.0 / 24.0) * n * n * n)
          * Math.sin(3.0 * (phi - phi0))
          * Math.cos(3.0 * (phi + phi0))));
  var I = M + N0;
  var II = (v / 2.0) * Math.sin(phi) * Math.cos(phi);
  var III =
    (v / 24.0)
      * Math.sin(phi)
      * Math.pow(Math.cos(phi), 3.0)
      * (5.0 - tanSquared(phi) + (9.0 * etaSquared));
  var IIIA =
    (v / 720.0)
      * Math.sin(phi)
      * Math.pow(Math.cos(phi), 5.0)
      * (61.0 - (58.0 * tanSquared(phi)) + Math.pow(Math.tan(phi), 4.0));
  var IV = v * Math.cos(phi);
  var V = (v / 6.0) * Math.pow(Math.cos(phi), 3.0) * ((v / rho) - tanSquared(phi));
  var VI =
    (v / 120.0)
      * Math.pow(Math.cos(phi), 5.0)
      * (5.0
        - (18.0 * tanSquared(phi))
        + (Math.pow(Math.tan(phi), 4.0))
        + (14 * etaSquared)
        - (58 * tanSquared(phi) * etaSquared));

  N =
    I
      + (II * Math.pow(lambda - lambda0, 2.0))
      + (III * Math.pow(lambda - lambda0, 4.0))
      + (IIIA * Math.pow(lambda - lambda0, 6.0));
  E =
    E0
      + (IV * (lambda - lambda0))
      + (V * Math.pow(lambda - lambda0, 3.0))
      + (VI * Math.pow(lambda - lambda0, 5.0));

  return new OSRef(E, N);
}


/**
 * Convert an UTM reference to a latitude and longitude
 *
 * @param ellipsoid A reference ellipsoid to use
 * @param utm the UTM reference to convert
 * @return the converted latitude and longitude
 * @since 0.2
 */
function UTMRefToLatLng() {
  var wgs84 = new RefEll(6378137, 6356752.314);
  var UTM_F0   = 0.9996;
  var a = wgs84.maj;
  var eSquared = wgs84.ecc;
  var ePrimeSquared = eSquared / (1.0 - eSquared);
  var e1 = (1 - Math.sqrt(1 - eSquared)) / (1 + Math.sqrt(1 - eSquared));
  var x = this.easting - 500000.0;;
  var y = this.northing;
  var zoneNumber = this.lngZone;
  var zoneLetter = this.latZone;

  var longitudeOrigin = (zoneNumber - 1.0) * 6.0 - 180.0 + 3.0;

  // Correct y for southern hemisphere
  if ((ord(zoneLetter) - ord("N")) < 0) {
    y -= 10000000.0;
  }

  var m = y / UTM_F0;
  var mu =
    m
      / (a
        * (1.0
          - eSquared / 4.0
          - 3.0 * eSquared * eSquared / 64.0
          - 5.0
            * Math.pow(eSquared, 3.0)
            / 256.0));

  var phi1Rad =
    mu
      + (3.0 * e1 / 2.0 - 27.0 * Math.pow(e1, 3.0) / 32.0) * Math.sin(2.0 * mu)
      + (21.0 * e1 * e1 / 16.0 - 55.0 * Math.pow(e1, 4.0) / 32.0)
        * Math.sin(4.0 * mu)
      + (151.0 * Math.pow(e1, 3.0) / 96.0) * Math.sin(6.0 * mu);

  var n =
    a
      / Math.sqrt(1.0 - eSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  var t = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  var c = ePrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  var r =
    a
      * (1.0 - eSquared)
      / Math.pow(
        1.0 - eSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad),
        1.5);
  var d = x / (n * UTM_F0);

  var latitude = (
    phi1Rad
      - (n * Math.tan(phi1Rad) / r)
        * (d * d / 2.0
          - (5.0
            + (3.0 * t)
            + (10.0 * c)
            - (4.0 * c * c)
            - (9.0 * ePrimeSquared))
            * Math.pow(d, 4.0)
            / 24.0
          + (61.0
            + (90.0 * t)
            + (298.0 * c)
            + (45.0 * t * t)
            - (252.0 * ePrimeSquared)
            - (3.0 * c * c))
            * Math.pow(d, 6.0)
            / 720.0)) * (180.0 / Math.PI);

  var longitude = longitudeOrigin + (
    (d
      - (1.0 + 2.0 * t + c) * Math.pow(d, 3.0) / 6.0
      + (5.0
        - (2.0 * c)
        + (28.0 * t)
        - (3.0 * c * c)
        + (8.0 * ePrimeSquared)
        + (24.0 * t * t))
        * Math.pow(d, 5.0)
        / 120.0)
      / Math.cos(phi1Rad)) * (180.0 / Math.PI);

  return new LatLng(latitude, longitude);
}


/**
 * Convert a latitude and longitude to an UTM reference
 *
 * @param ellipsoid A reference ellipsoid to use
 * @param latitudeLongitude The latitude and longitude to convert
 * @return the converted UTM reference
 * @since 0.2
 */
function LatLngToUTMRef() {
  var wgs84 = new RefEll(6378137, 6356752.314);
  var UTM_F0   = 0.9996;
  var a = wgs84.maj;
  var eSquared = wgs84.ecc;
  var longitude = this.lng;
  var latitude = this.lat;

  var latitudeRad = latitude * (Math.PI / 180.0);
  var longitudeRad = longitude * (Math.PI / 180.0);
  var longitudeZone = Math.floor((longitude + 180.0) / 6.0) + 1;

  // Special zone for Norway
  if (latitude >= 56.0
    && latitude < 64.0
    && longitude >= 3.0
    && longitude < 12.0) {
    longitudeZone = 32;
  }

  // Special zones for Svalbard
  if (latitude >= 72.0 && latitude < 84.0) {
    if (longitude >= 0.0 && longitude < 9.0) {
      longitudeZone = 31;
    } else if (longitude >= 9.0 && longitude < 21.0) {
      longitudeZone = 33;
    } else if (longitude >= 21.0 && longitude < 33.0) {
      longitudeZone = 35;
    } else if (longitude >= 33.0 && longitude < 42.0) {
      longitudeZone = 37;
    }
  }

  var longitudeOrigin = (longitudeZone - 1) * 6 - 180 + 3;
  var longitudeOriginRad = longitudeOrigin * (Math.PI / 180.0);

  var UTMZone = getUTMLatitudeZoneLetter(latitude);

  ePrimeSquared = (eSquared) / (1 - eSquared);

  var n = a / Math.sqrt(1 - eSquared * Math.sin(latitudeRad) * Math.sin(latitudeRad));
  var t = Math.tan(latitudeRad) * Math.tan(latitudeRad);
  var c = ePrimeSquared * Math.cos(latitudeRad) * Math.cos(latitudeRad);
  var A = Math.cos(latitudeRad) * (longitudeRad - longitudeOriginRad);

  var M =
    a
      * ((1
        - eSquared / 4
        - 3 * eSquared * eSquared / 64
        - 5 * eSquared * eSquared * eSquared / 256)
        * latitudeRad
        - (3 * eSquared / 8
          + 3 * eSquared * eSquared / 32
          + 45 * eSquared * eSquared * eSquared / 1024)
          * Math.sin(2 * latitudeRad)
        + (15 * eSquared * eSquared / 256
          + 45 * eSquared * eSquared * eSquared / 1024)
          * Math.sin(4 * latitudeRad)
        - (35 * eSquared * eSquared * eSquared / 3072)
          * Math.sin(6 * latitudeRad));

  var UTMEasting =
    (UTM_F0
      * n
      * (A
        + (1 - t + c) * Math.pow(A, 3.0) / 6
        + (5 - 18 * t + t * t + 72 * c - 58 * ePrimeSquared)
          * Math.pow(A, 5.0)
          / 120)
      + 500000.0);

  var UTMNorthing =
    (UTM_F0
      * (M
        + n
          * Math.tan(latitudeRad)
          * (A * A / 2
            + (5 - t + (9 * c) + (4 * c * c)) * Math.pow(A, 4.0) / 24
            + (61 - (58 * t) + (t * t) + (600 * c) - (330 * ePrimeSquared))
              * Math.pow(A, 6.0)
              / 720)));

  // Adjust for the southern hemisphere
  if (latitude < 0) {
    UTMNorthing += 10000000.0;
  }

  return new UTMRef(UTMEasting, UTMNorthing, UTMZone, longitudeZone);
}

/**
 * Take a string formatted as a six-figure OS grid reference (e.g.
 * "TG514131") and return a reference to an OSRef object that represents
 * that grid reference. The first character must be H, N, S, O or T.
 * The second character can be any uppercase character from A through Z
 * excluding I.
 *
 * @param ref
 * @return
 * @since 1.1
 */
function getOSRefFromSixFigureReference(ref) {
  var char1 = ref.substring(0, 1);
  var char2 = ref.substring(1, 2);
  // Thanks to Nick Holloway for pointing out the radix bug here
  var east  = parseInt(ref.substring(2, 5), 10) * 100;
  var north = parseInt(ref.substring(5, 8), 10) * 100;
  if (char1 == 'H') {
    north += 1000000;
  } else if (char1 == 'N') {
    north += 500000;
  } else if (char1 == 'O') {
    north += 500000;
    east  += 500000;
  } else if (char1 == 'T') {
    east += 500000;
  }
  var char2ord = ord(char2);
  if (char2ord > 73) char2ord--; // Adjust for no I
  var nx = ((char2ord - 65) % 5) * 100000;
  var ny = (4 - Math.floor((char2ord - 65) / 5)) * 100000;
  return new OSRef(east + nx, north + ny);
}


/**
 *  Work out the UTM latitude zone from the latitude
 *
 * @param latitude
 * @return
 * @since 0.2
 */
function getUTMLatitudeZoneLetter(latitude) {
  if ((84 >= latitude) && (latitude >= 72)) return "X";
  else if (( 72 > latitude) && (latitude >=  64)) return "W";
  else if (( 64 > latitude) && (latitude >=  56)) return "V";
  else if (( 56 > latitude) && (latitude >=  48)) return "U";
  else if (( 48 > latitude) && (latitude >=  40)) return "T";
  else if (( 40 > latitude) && (latitude >=  32)) return "S";
  else if (( 32 > latitude) && (latitude >=  24)) return "R";
  else if (( 24 > latitude) && (latitude >=  16)) return "Q";
  else if (( 16 > latitude) && (latitude >=   8)) return "P";
  else if ((  8 > latitude) && (latitude >=   0)) return "N";
  else if ((  0 > latitude) && (latitude >=  -8)) return "M";
  else if (( -8 > latitude) && (latitude >= -16)) return "L";
  else if ((-16 > latitude) && (latitude >= -24)) return "K";
  else if ((-24 > latitude) && (latitude >= -32)) return "J";
  else if ((-32 > latitude) && (latitude >= -40)) return "H";
  else if ((-40 > latitude) && (latitude >= -48)) return "G";
  else if ((-48 > latitude) && (latitude >= -56)) return "F";
  else if ((-56 > latitude) && (latitude >= -64)) return "E";
  else if ((-64 > latitude) && (latitude >= -72)) return "D";
  else if ((-72 > latitude) && (latitude >= -80)) return "C";
  else return 'Z';
}

