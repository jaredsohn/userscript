// ==UserScript==
// @name           osmCoords
// @namespace      http://gcvote.com
// @description    Allows you to enter coordinates (Lat/Lon or DDD°MM.MMM) in the search field of openstreetmap.org
// @include        http://www.openstreetmap.org/*
// ==/UserScript==

var search_field=document.getElementById("search_field");
if(!search_field) return; // not on a page with map and search field

var marker, markers; // a place to remember our own marker and its layer

// We need to override the submit event of the form, but cannot delete
// the original listener, because anonymous listeners cannot be removed.
// The solution is to make a copy of the form, only without the listener.
var form=search_field.childNodes[1];
var query=document.getElementById("query");
newform=document.createElement("form");
for(i=0;i<form.childNodes.length;i++) {
	var oldNode=form.childNodes[i];
	var newNode=oldNode.cloneNode(true);
	var oid=oldNode.id;
	newNode.id=oldNode.id;
	newform.appendChild(newNode);
}
newform.method=form.method;
newform.action=form.action;
newform.addEventListener("submit",parseCoords,false); // Now we add OUR listener...
form.parentNode.replaceChild(newform,form); // ... and replace the original form with our fake.
newform.id=form.id;

function parseCoords(e) {
	// This is a listener that scans the search string for coordinates. It moves
	// the map if coordinates were present and calls the original listener otherwise.
	e.preventDefault(); // We do not want the default form submit action to start. Ever.
	var s=document.getElementById("query").value;
	// Look for coordinates in different formats. If one is found, the map is
	// moved there and the return value is "true", stopping the search.
	if(gotoDMM(s)) return; // Check for coordinates in DD MM.MMM format.
	if(gotoLatLon(s)) return; // Check for coordinates in DD.DDD format.
	if(gotoUTM(s)) return; // Check for coordinates in UTM format.
	// If we get here, then no coordinates were found and we start the original listener.
	// To get back to the page's (non-Greasemonkey) context without using unsafeWindow,
	// we fake a submit event on the original form after copying the value.
	query.value=s;
	var event=document.createEvent("Events");
	event.initEvent("submit", true, false);
	form.dispatchEvent(event);
}

function gotoDMM(s) {
	var re=/^\s*(N|S)\s*(\d+)\s*°?\s*(\d+)[\.|,](\d+)'?\s*(E|O|W)\s*(\d+)\s*°?\s*(\d+)[\.|,](\d+)'?\s*$/i;
	if(!re.exec(s)) return false;
	var ns=RegExp.$1;
	var nd=RegExp.$2;
	var nm=RegExp.$3;
	var nmm=RegExp.$4;
	var ew=RegExp.$5;
	var ed=RegExp.$6;
	var em=RegExp.$7;
	var emm=RegExp.$8;
	var lat=Number(nd)+(nm+"."+nmm)/60;if(ns=="S") lat=-lat;
	var lon=Number(ed)+(em+"."+emm)/60;if(ew=="W") lon=-lon;
	moveMap(lat,lon);
	return true;
}

function gotoLatLon(s) {
	var re=/^\s*([+|-]?)\s*(\d+)[\.|,](\d+)\s*([+|-]?)\s*(\d+)[\.|,](\d+)\s*$/;
	if(!re.exec(s)) return false;
	var slat=RegExp.$1;
	var lat=RegExp.$2;
	var latd=RegExp.$3;
	var slon=RegExp.$4;
	var lon=RegExp.$5;
	var lond=RegExp.$6;
	var lat=lat+"."+latd;if(slat=="-") lat=-lat;
	var lon=lon+"."+lond;if(slon=="-") lon=-lon;
	GM_log(lon+" "+lat);
	moveMap(lat,lon);
	return true;
}

function gotoUTM(s) {
	var re=/^\s*(\d\d)([A-Z])\s*E\s*(\d+)[\.|,]?(\d*)\s*N\s*(\d+)[\.|,]?(\d*)\s*$/i;
	if(!re.exec(s)) return false;
	var utmXZone=RegExp.$1;
	var utmYZone=RegExp.$2;
	var easting=Number(RegExp.$3+"."+RegExp.$4);
	var northing=Number(RegExp.$5+"."+RegExp.$6);
	var a = 6378137.00;
	var f = 1 / 298.2572235630;
	var PI=Math.PI;
	var ok = 0.9996;
	var fe = 500000.0;
	deg2rad = PI / 180.0;
	rad2deg = 180.0 / PI;

	recf = 1.0 / f;
	b = a * (recf - 1) / recf;
	eSquared = CalculateESquared(a, b);
	e2Squared = CalculateE2Squared(a, b);
	tn = (a - b) / (a + b);
	ap = a * (1.0 - tn + 5.0 * ((tn * tn) - (tn * tn * tn)) / 4.0 + 81.0 *
	    ((tn * tn * tn * tn) - (tn * tn * tn * tn * tn)) / 64.0);
	bp = 3.0 * a * (tn - (tn * tn) + 7.0 * ((tn * tn * tn)
	    - (tn * tn * tn * tn)) / 8.0 + 55.0 * (tn * tn * tn * tn * tn) / 64.0)
	    / 2.0;
	cp = 15.0 * a * ((tn * tn) - (tn * tn * tn) + 3.0 * ((tn * tn * tn * tn)
	    - (tn * tn * tn * tn * tn)) / 4.0) / 16.0;
	dp = 35.0 * a * ((tn * tn * tn) - (tn * tn * tn * tn) + 11.0
	    * (tn * tn * tn * tn * tn) / 16.0) / 48.0;
	ep = 315.0 * a * ((tn * tn * tn * tn) - (tn * tn * tn * tn * tn)) / 512.0;
	if ((utmYZone <= 'M') && (utmYZone >= 'C') ||
	    (utmYZone <= 'm') && (utmYZone >= 'c')) {
		    nfn = 10000000.0;
	} else {
	    nfn = 0;
	}
	tmd = (northing - nfn) / ok;
	sr = sphsr(a, eSquared, 0.0);
	ftphi = tmd / sr;
	for(i=0;i<=5;i++) {
	    t10 = sphtmd(ap, bp, cp, dp, ep, ftphi);
	    sr = sphsr(a, eSquared, ftphi);
	    ftphi = ftphi + (tmd - t10) / sr;
	}
	sr = sphsr(a, eSquared, ftphi);
	sn = sphsn(a, eSquared, ftphi);
	s = Math.sin(ftphi);
	c = Math.cos(ftphi);
	t = s / c;
	eta = e2Squared * (c * c);
	de = easting - fe;
	t10 = t / (2.0 * sr * sn * (ok * ok));
	t11 = t * (5.0 + 3.0 * (t * t) + eta - 4.0 * (eta * eta) - 9.0 * (t * t)
	    * eta) / (24.0 * sr * (sn * sn * sn) * (ok * ok * ok * ok));
	lat = ftphi - (de * de) * t10 + (de * de * de * de) * t11;
	t14 = 1.0 / (sn * c * ok);
	t15 = (1.0 + 2.0 * (t * t) + eta) / (6 * (sn * sn * sn) * c
	    * (ok * ok * ok));
	dlam = de * t14 - (de * de * de) * t15;
	olam = (utmXZone * 6 - 183.0) * deg2rad;
	lon = olam + dlam;

	lon = lon * rad2deg;
	lat = lat * rad2deg;
	GM_log(lon+" "+lat);
	moveMap(lat,lon);
	return true;
}

function CalculateESquared(a, b) {
  return ((a * a) - (b * b)) / (a * a);
}

function CalculateE2Squared(a, b) {
  return ((a * a) - (b * b)) / (b * b);
}

function denom(es, sphi) {
  var sinSphi = Math.sin(sphi);
  return Math.sqrt(1.0 - es * (sinSphi * sinSphi));
}

function sphsr(a, es, sphi) {
  var dn = denom(es, sphi);
  return a * (1.0 - es) / (dn * dn * dn);
}
function sphsn(a, es, sphi) {
  var sinSphi = Math.sin(sphi);
  return a / Math.sqrt(1.0 - es * (sinSphi * sinSphi));
}

function sphtmd(ap, bp, cp, dp, ep, sphi) {
  return (ap * sphi) - (bp * Math.sin(2.0 * sphi)) + (cp * Math.sin(4.0 * sphi))
     - (dp * Math.sin(6.0 * sphi)) + (ep * Math.sin(8.0 * sphi));
}

function moveMap(lat,lon) {
	var map=unsafeWindow.map;
	var ol=unsafeWindow.L;
	var ll=new unsafeWindow.L.LatLng(lat,lon);
	map.panTo(ll);
	if(!marker) {
		marker = new ol.Marker( ll ).addTo(map);
 	} else {
 		marker.setLatLng(ll);
 	}
}

