// ==UserScript==
// @name           	gmapsosgrid
// @namespace      http://www.norcimo.com/mozilla/greasemonkey/
// @description	Handle OS Grid Reference Searches in Google Maps
// @description	v 1.0 Initial release. Search form functionality
// @description    v 1.1 Handles query strings
// @desciption	v 1.2 Further conversion to WGS-84 cooordinated system rather than OSGB36
// @description	v 1.3 Optionally handle - in grid ref
// @description    v 1.4 Included domains updated to match top level domains, rather than .co.uk
// @description    Added (optional) handling of all numeric references
// @include	http://maps.google.tld/*
// @copyright	2009, 2010 Ian Scott
// @author		Norcimo
// @attribution	Chris Veness http://www.movable-type.co.uk/scripts/latlong-gridref.html
// @licence	LGPL; http://creativecommons.org/licenses/LGPL/2.1/
// @version	1.4
// ==/UserScript==

(function() {


var DEBUG=false; //Set to true for debugging messages


 /*
 * extend Number object with methods for converting degrees/radians
 */
Number.prototype.toRad = function() {  // convert degrees to radians
  return this * Math.PI / 180;
}
Number.prototype.toDeg = function() {  // convert radians to degrees (signed)
  return this * 180 / Math.PI;
}
/*
 * pad a number with sufficient leading zeros to make it w chars wide
 */
Number.prototype.padLZ = function(w) {
  var n = this.toString();
  for (var i=0; i<w-n.length; i++) n = '0' + n;
  return n;
}

/*
* pad a number with trailing 5's to make it w charachters wide 
* (for centring grid ref squares)
*/

function padT5(s,w) {
	while (s.length<w) {
		s+='5';
	}
	return s;
}

// ellipse parameters
	var e = { WGS84:    { a: 6378137,     b: 6356752.3142, f: 1/298.257223563 },
          Airy1830: { a: 6377563.396, b: 6356256.910,  f: 1/299.3249646   } };

	// helmert transform parameters
	var h = { WGS84toOSGB36: { tx: -446.448,  ty:  125.157,   tz: -542.060,   // m
                           rx:   -0.1502, ry:   -0.2470,  rz:   -0.8421,  // sec
                           s:    20.4894 },                               // ppm
          OSGB36toWGS84: { tx:  446.448,  ty: -125.157,   tz:  542.060,
                           rx:    0.1502, ry:    0.2470,  rz:    0.8421,
                           s:   -20.4894 } };


var queryArray=new Array();
queryArray=parseQuery();// grab query string and check for anything looking like a grid ref
makeMenuToggle("allowSpaces",false,"Spaces On","Spaces Off","Toggle ");
makeMenuToggle("allowDashes",false,"Dashes On","Dashes Off","Toggle ");
makeMenuToggle("allow4Digits",false,"4 Digits On","4 Digits Off","Toggle ");
makeMenuToggle("allowNumeric",false,"All Numeric On","All Numeric OFf","Toggle ");
if (DEBUG) {
	GM_log("Running");
	if (queryArray) {
		GM_log("q :"+queryArray["q"]);
	} else {
		GM_log("No query array found");
	}
}

if (queryArray) {
	if (queryArray["q"]) {
		var searchTerm=decodeURI(queryArray["q"]);
		if (DEBUG) {
			GM_log("Decoded search term:"+searchTerm);
		}
		// Strip leading and trailing white space
		searchTerm=searchTerm.replace(/^\s*/,"");
		searchTerm=searchTerm.replace(/\s*$/,"");
		searchTerm=queryMassage(searchTerm);
		var isOS=checkSearchTerm(searchTerm);
		if (DEBUG) {
			GM_log("Is OS? : "+isOS);
		}
		if (isOS) {
			var latlon=OSGridToLatLong(searchTerm);
			var currentLoc=document.location.href;
			if (DEBUG) {
				GM_log("currentLoc : "+currentLoc);
				GM_log("Replacement"+currentLoc.replace(queryArray["q"],latlon));
			}
			document.location.href=currentLoc.replace(queryArray["q"],latlon);
		}
	}
}


// Also override the search form

var searchForm=document.getElementById("q_form");
//Check we have the search form


if (searchForm) {
	//we'll override google's own function called onSearch
	var oldonsearch=unsafeWindow.onSearch;
	unsafeWindow.onSearch=function(form) {
		var searchTerm=document.getElementById("q_d").value;
		searchTerm=queryMassage(searchTerm);
		if (checkSearchTerm(searchTerm)) {
			var latlon=OSGridToLatLong(searchTerm);
			document.getElementById("q_d").value=latlon[0]+","+latlon[1];
		}
		oldonsearch(form);
	}	
}

function queryMassage(searchTerm) {
	if (allowNumeric) {
		var osgrid=/^([0-9]+)\s*(%2c|,|\s)\s*([0-9]+)$/i;
		var matchedParts=osgrid.exec(searchTerm);
		if (matchedParts != null) {
			if (DEBUG) {
				GM_log("Looks like all numeric ref. Sanity checking");
			}
			// Sanity check - are the two numeric components the same length?
			if (DEBUG) {
				GM_log("First Part:"+matchedParts[1]);
				GM_log("Second Part:"+matchedParts[3]);
			}
			if (matchedParts[1].length==matchedParts[3].length) {
				// Deal with all numeric ref
				if (DEBUG) {
					GM_log("All numeric, with number digits ="+matchedParts[1].length);
				}
				// Slightly strange but convert to ref starting with letters as this is what the rest of the routines expect, though
				// it will actually eventually be converted back to numeric!
				var convertedRef=gridrefNumToLet(matchedParts[1],matchedParts[3],6);
				if (DEBUG) {
					GM_log("Converted to "+convertedRef);
				}
				if (convertedRef) {
					return convertedRef;
				}
			} else {
				if (DEBUG) {
					GM_log("Insane!");
				}
			}
		}
	}
	if (allowSpaces) {
		searchTerm=searchTerm.replace(/\s*/g,"");
	}
	if (allowDashes) {
		searchTerm=searchTerm.replace(/-/g,"");
	}
	return searchTerm;
}

function checkSearchTerm(searchTerm) {
	//checks searchTerm to see if it looks like an OS grid ref. Spaces and 4 digit rather than 6 are configurable options
	if (DEBUG) {
		GM_log("checking "+searchTerm);
	}
	var osgrid=/^[a-z]{2}[0-9]{6}$/i;
	if (allow4Digits) {
		osgrid=/^[a-z]{2}([0-9]{4}|[0-9]{6})$/i;
		}
	if (DEBUG) {
		GM_log("Checking eventual search "+searchTerm);
	}
	//looks like an os gridref?
	if (searchTerm.match(osgrid)) {
		return true;
	} else {
		return false;
	}
}

// Query string into array of key values

function parseQuery() {
	// Parse the current page query string into an array of string-value pairs
	if (!window.location.search)
		return null;
	var query=window.location.search.substr(1);
	var buildArray=new Array();
	var params=query.split('&');
	for (var p=0; p<params.length; p++) {
		var pos = params[p].indexOf('=');
		if (pos > 0) {
			var key = params[p].substring(0,pos);
			var val = params[p].substring(pos+1)
			buildArray[key]=val;
		}
	}
	
	return buildArray;
}

// From Greasemonkey Wiki

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}


// Following thanks to Chris Veness
// http://www.movable-type.co.uk/scripts/latlong-gridref.html

/*
 * convert OS grid reference to geodesic co-ordinates
 */
function OSGridToLatLong(gridRef) {
  var gr = gridrefLetToNum(gridRef);
  var E = gr[0], N = gr[1];

  var a = 6377563.396, b = 6356256.910;              // Airy 1830 major & minor semi-axes
  var F0 = 0.9996012717;                             // NatGrid scale factor on central meridian
  var lat0 = 49*Math.PI/180, lon0 = -2*Math.PI/180;  // NatGrid true origin
  var N0 = -100000, E0 = 400000;                     // northing & easting of true origin, metres
  var e2 = 1 - (b*b)/(a*a);                          // eccentricity squared
  var n = (a-b)/(a+b), n2 = n*n, n3 = n*n*n;

  var lat=lat0, M=0;
  do {
    lat = (N-N0-M)/(a*F0) + lat;

    var Ma = (1 + n + (5/4)*n2 + (5/4)*n3) * (lat-lat0);
    var Mb = (3*n + 3*n*n + (21/8)*n3) * Math.sin(lat-lat0) * Math.cos(lat+lat0);
    var Mc = ((15/8)*n2 + (15/8)*n3) * Math.sin(2*(lat-lat0)) * Math.cos(2*(lat+lat0));
    var Md = (35/24)*n3 * Math.sin(3*(lat-lat0)) * Math.cos(3*(lat+lat0));
    M = b * F0 * (Ma - Mb + Mc - Md);                // meridional arc

  } while (N-N0-M >= 0.00001);  // ie until < 0.01mm

  var cosLat = Math.cos(lat), sinLat = Math.sin(lat);
  var nu = a*F0/Math.sqrt(1-e2*sinLat*sinLat);              // transverse radius of curvature
  var rho = a*F0*(1-e2)/Math.pow(1-e2*sinLat*sinLat, 1.5);  // meridional radius of curvature
  var eta2 = nu/rho-1;

  var tanLat = Math.tan(lat);
  var tan2lat = tanLat*tanLat, tan4lat = tan2lat*tan2lat, tan6lat = tan4lat*tan2lat;
  var secLat = 1/cosLat;
  var nu3 = nu*nu*nu, nu5 = nu3*nu*nu, nu7 = nu5*nu*nu;
  var VII = tanLat/(2*rho*nu);
  var VIII = tanLat/(24*rho*nu3)*(5+3*tan2lat+eta2-9*tan2lat*eta2);
  var IX = tanLat/(720*rho*nu5)*(61+90*tan2lat+45*tan4lat);
  var X = secLat/nu;
  var XI = secLat/(6*nu3)*(nu/rho+2*tan2lat);
  var XII = secLat/(120*nu5)*(5+28*tan2lat+24*tan4lat);
  var XIIA = secLat/(5040*nu7)*(61+662*tan2lat+1320*tan4lat+720*tan6lat);

  var dE = (E-E0), dE2 = dE*dE, dE3 = dE2*dE, dE4 = dE2*dE2, dE5 = dE3*dE2, dE6 = dE4*dE2, dE7 = dE5*dE2;
  lat = lat - VII*dE2 + VIII*dE4 - IX*dE6;
  var lon = lon0 + X*dE - XI*dE3 + XII*dE5 - XIIA*dE7;

  return convertOSGB36toWGS84([lat.toDeg(), lon.toDeg()]); //modified to simply return array
}

/* 
 * convert standard grid reference ('SU387148') to fully numeric ref ([438700,114800])
 *   returned co-ordinates are in metres, centred on grid square for conversion to lat/long
 *
 *   note that northern-most grid squares will give 7-digit northings
 *   no error-checking is done on gridref (bad input will give bad results or NaN)
 */
 
function gridrefLetToNum(gridref) {
  // get numeric values of letter references, mapping A->0, B->1, C->2, etc:
  var l1 = gridref.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
  var l2 = gridref.toUpperCase().charCodeAt(1) - 'A'.charCodeAt(0);
  // shuffle down letters after 'I' since 'I' is not used in grid:
  if (l1 > 7) l1--;
  if (l2 > 7) l2--;

  // convert grid letters into 100km-square indexes from false origin (grid square SV):
  var e = ((l1-2)%5)*5 + (l2%5);
  var n = (19-Math.floor(l1/5)*5) - Math.floor(l2/5);

  // skip grid letters to get numeric part of ref, stripping any spaces:
  gridref = gridref.slice(2).replace(/ /g,'');

  // append numeric part of references to grid index:
  e += gridref.slice(0, gridref.length/2);
  n += gridref.slice(gridref.length/2);

  // normalise to 1m grid, rounding up to centre of grid square:
  switch (gridref.length) {
    case 6: e += '50'; n += '50'; break;
    case 8: e += '5'; n += '5'; break;
    // 10-digit refs are already 1m
  }

  return [e, n];
}

/*
 * convert numeric grid reference (in metres) to standard-form grid ref
 */
 
function gridrefNumToLet(e, n, digits) {
// Adapted to handle any length of digits, converting to 6 digits long
  if (e.length<6) {
	//pad to centre of square
	e=padT5(e,6);
	n=padT5(n,6);
  }
  while (e.length>6) {
	e=Math.round(e/10);
	n=Math.round(n/10);
  }
  // get the 100km-grid indices
  var e100k = Math.floor(e/100000), n100k = Math.floor(n/100000);
  
  if (e100k<0 || e100k>6 || n100k<0 || n100k>12) return '';

  // translate those into numeric equivalents of the grid letters
  var l1 = (19-n100k) - (19-n100k)%5 + Math.floor((e100k+10)/5);
  var l2 = (19-n100k)*5%25 + e100k%5;

  // compensate for skipped 'I' and build grid letter-pairs
  if (l1 > 7) l1++;
  if (l2 > 7) l2++;
  var letPair = String.fromCharCode(l1+'A'.charCodeAt(0), l2+'A'.charCodeAt(0));

  // strip 100km-grid indices from easting & northing, and reduce precision
  e = Math.floor((e%100000)/Math.pow(10,5-digits/2));
  n = Math.floor((n%100000)/Math.pow(10,5-digits/2));

  var gridRef = letPair + e.padLZ(digits/2) + n.padLZ(digits/2);

  return gridRef;
}

// More from the same place
// Convert from OSGB36 to WGS-84 (as used by Google and GPS etc)



// Adjusted to work with array and separate height
                 
function convertOSGB36toWGS84(latlon, H) {
	if (arguments.length<2)
		H=0;
  return convert(latlon, H, e.Airy1830, h.OSGB36toWGS84, e.WGS84);
}


function convert(latlon, H, e1, t, e2) {
	// -- convert polar to cartesian coordinates (using ellipse 1)
	
  latlon[0]= latlon[0].toRad(); latlon[1] = latlon[1].toRad(); 

  var a = e1.a, b = e1.b;

  var sinPhi = Math.sin(latlon[0]), cosPhi = Math.cos(latlon[0]);
  var sinLambda = Math.sin(latlon[1]), cosLambda = Math.cos(latlon[1]);

  var eSq = (a*a - b*b) / (a*a);
  var nu = a / Math.sqrt(1 - eSq*sinPhi*sinPhi);

  var x1 = (nu+H) * cosPhi * cosLambda;
  var y1 = (nu+H) * cosPhi * sinLambda;
  var z1 = ((1-eSq)*nu + H) * sinPhi;


  // -- apply helmert transform using appropriate params
  
  var tx = t.tx, ty = t.ty, tz = t.tz;
  var rx = t.rx/3600 * Math.PI/180;  // normalise seconds to radians
  var ry = t.ry/3600 * Math.PI/180;
  var rz = t.rz/3600 * Math.PI/180;
  var s1 = t.s/1e6 + 1;              // normalise ppm to (s+1)

  // apply transform
  var x2 = tx + x1*s1 - y1*rz + z1*ry;
  var y2 = ty + x1*rz + y1*s1 - z1*rx;
  var z2 = tz - x1*ry + y1*rx + z1*s1;


  // -- convert cartesian to polar coordinates (using ellipse 2)

  a = e2.a, b = e2.b;
  var precision = 4 / a;  // results accurate to around 4 metres

  eSq = (a*a - b*b) / (a*a);
  var p = Math.sqrt(x2*x2 + y2*y2);
  var phi = Math.atan2(z2, p*(1-eSq)), phiP = 2*Math.PI;
  while (Math.abs(phi-phiP) > precision) {
    nu = a / Math.sqrt(1 - eSq*Math.sin(phi)*Math.sin(phi));
    phiP = phi;
    phi = Math.atan2(z2 + eSq*nu*Math.sin(phi), p);
  }
  var lambda = Math.atan2(y2, x2);
  H = p/Math.cos(phi) - nu;

  return [phi.toDeg(), lambda.toDeg()];
}

})();