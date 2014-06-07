//
//  Works out the height of a geocache.
//
//  v0.0.1	First attempt!
//  v0.0.2	Updated for changes to geocaching.com layout.
//	v0.0.3	Updated for more changes to geocaching.com layout.
//	v1.0.4	Updated for changes to geocaching.com cache page URLS.
//

// ==UserScript==
// @name	Geocache Height
// @namespace	http://inge.org.uk/userscripts
// @description	Works out the height of a geocache in metres above sea level and adds it alongside the coordinates on the geocache listing.
// @include	http://www.geocaching.com/seek/cache_details.aspx*
// @include	http://www.geocaching.com/geocache/GC*
// @include	https://www.geocaching.com/seek/cache_details.aspx*
// @include	https://www.geocaching.com/geocache/GC*
// @copyright	2010-13, James Inge (http://geo.inge.org.uk/)
// @license	MIT License; http://www.opensource.org/licenses/mit-license.php
// @version	0.0.4
// ==/UserScript==

var srcTarget = document.getElementById('ctl00_ContentBody_lnkConversions');
var destTarget = document.getElementById('uxLatLon')?document.getElementById('uxLatLon'):document.getElementById('uxLatLonLink');

if (srcTarget && destTarget ) {
  var loc = srcTarget.href;
  lat = loc.slice(loc.search('lat=')+4);
  lat2 = lat.slice(0,lat.search('&'));
  lon = loc.slice(loc.search('&lon=')+5);
  lon2 = lon.slice(0,lon.search('&'));

  height_service_url = "http://maps.googleapis.com/maps/api/elevation/json?sensor=false&locations=" + lat2 + "," + lon2;

  GM_xmlhttpRequest({
    method: 'GET',
    url: height_service_url,
    onload: function(responseDetails) {
      response = JSON.parse(responseDetails.responseText);
      if( response.status == "OK" ) {
        e = Math.round( response.results[0].elevation );
        if( e < 0 ) {
          h = " " + e;
        } else {
          h = " +" + e;
        }
        h += "m";
        destTarget.innerHTML += h;
      } else {
        GM_log( "Request to Google Elevation API failed" );
      }
    }
  });
} else { GM_log("Unexpected geocache page layout."); }
