//
//  Adds link to generate LOC file from geocache page.
//  (C) Copyright 2007-2011 James Inge.  Released under the MIT License
//
//  v1.0.5	Fixed for more changes to geocaching.com
//  v1.04	Fixed for more changes to geocaching.com, converted to coord.info URLs.
//  v1.03	Fixed for more changes to geocaching.com, and added better error handling.
//  v1.02	Fixed for changes to geocaching.com
//  v1.01 	Made separate functions for getting the cache details, and adapted to changes in the geocaching.com page layout.
//

// ==UserScript==
// @name	Geocaching.com LOC Link
// @namespace	http://inge.org.uk/userscripts
// @description	Adds a link to generate a LOC file from a geocache page.
// @include	http://www.geocaching.com/seek/cache_details.aspx*
// @copyright	2011, James Inge (http://geo.inge.org.uk/)
// @license	MIT License; http://www.opensource.org/licenses/mit-license.php
// @version 1.0.5
// ==/UserScript==

(function() {
	function addGeoLink() {
		var destTarget = document.getElementById('ctl00_ContentBody_LatLon');
		var cacheName = getGCname();
		var cacheNum = getGCref();

    if (destTarget && cacheNum && cacheName) {
			locfmt = escape("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<loc version=\"1.0\" src=\"Groundspeak\">\n<waypoint>\n\t<name id=\"" + cacheNum + "\"><![CDATA[" + cacheName + "]]></name>\n\t<coord lat=\"" + unsafeWindow.mapLatLng.lat + "\" lon=\"" + unsafeWindow.mapLatLng.lng + "\"/>\n\t<type>Geocache</type>\n\t<link text=\"Cache Details\">http://coord.info/" + cacheNum + "</link>\n</waypoint></loc>");
			destTarget.innerHTML += " <a type=\"application/xml-loc\" title=\"Click to generate a LOC file from the coordinates.\" href=\"data:application/xml-loc," + locfmt +"\">LOC</a>";
		}
	}

	function getGCname() {
		var name = document.getElementById('ctl00_ContentBody_CacheName');
		if( name ) {
			return name.innerHTML;
		} else {
			GM_log("Couldn't work out cache name");
			return null;
		}
	}

	function getGCref() {
		var gccodeDiv = document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode");
		if( gccodeDiv ) {
			var gccode = gccodeDiv.innerHTML.match(/GC[A-Z0-9]+/);
			if( gccode ) {
				return gccode[0];
			}
		}
		GM_log("Couldn't work out GCcode");
		return null;
	}

	addGeoLink();
})();

