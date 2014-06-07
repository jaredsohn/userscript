//
//  Adds link to generate LOC file containing all waypoints on geocache page.
//  (C) Copyright 2008-2010 James Inge.  Licensed under the MIT License.
//
//  v1.06 Fixed for yet more changes to geocaching.com.
//  v1.05 Optimised code, added waypoint type to LOC data.
//  v1.04	Fixed for yet more changes to geocaching.com.  Also added better error 
//		handling, more reliable parsing, and faster skipping of pages without
//		extra waypoints.  LOC link now appears above the waypoint table.
//  v1.03	Fixed for more changes to geocaching.com
//  v1.02	Fixed for changes to geocaching.com
//  v0.01 	Initial version.
//
// ==UserScript==
// @name	Geocaching.com Additional Waypoints LOC Link
// @namespace	http://inge.org.uk/userscripts
// @description	Adds a link to generate a LOC file containing details of any additional waypoints listed on the geocache page.
// @include	http://www.geocaching.com/seek/cache_details.aspx*
// @copyright	2008-2011, James Inge (http://geo.inge.org.uk/)
// @license	MIT License; http://www.opensource.org/licenses/mit-license.php
// @version 1.0.6
// ==/UserScript==

function addWPLink() {
	// Find Additional Waypoints heading
	var dest = document.getElementById('ctl00_ContentBody_WaypointsInfo');

	// Additional waypoints should only be present if the heading is also there. If they are, the script's link gets added to the heading,
	// otherwise, it exits quietly.

	if( dest ) {
		// Snapshot to select all available waypoint info
		var rows = document.evaluate("//img[@alt='available']/../..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if( rows.snapshotLength > 0 ) {
			var loc = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<loc version=\"1.0\" src=\"Groundspeak\">\n";
      var cells;
			for( var i = 0, l = rows.snapshotLength; i<l; i++ ) {
				cells = document.evaluate("td", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if( cells.snapshotLength != 8 ) {
					errorMsg( "Wrong number of waypoint info cells (" + cells.snapshotLength + ").");
				} else {
					loc += "<waypoint>\n\t<name id=\"" + stripPadding(cells.snapshotItem(4).innerHTML);
					loc += "\"><![CDATA[" + cells.snapshotItem(5).childNodes[1].innerHTML + "]]></name>\n";
					var coords = stripPadding(cells.snapshotItem(6).innerHTML);
					loc += "\t<coord lat=\"" + getLat(coords) + "\" lon=\"" + getLon(coords) + "\"/>\n";
					loc += "\t<type>" + cells.snapshotItem(2).childNodes[1].alt + "</type>\n";
					loc += "\t<link text=\"Waypoint details\">" + getURL(cells.snapshotItem(5)) + "</link>\n";
					loc += "</waypoint>\n";
				}
			}
			loc += "</loc>\n";
			dest.innerHTML += " <a title=\"Click to generate a LOC file from the additional coordinates.\" href=\"data:application/xml-loc," + escape(loc) +"\">[LOC]</a>";
		} // else Exit quietly - no waypoints with available coordinates.
	} // else Exit quietly - no additional waypoints.
}

function getURL( cell ) {
  var longurl = cell.childNodes[1].href;
  if( longurl ) {
  	return longurl.slice(0,longurl.indexOf('&'));
	} else {
		return "http://www.geocaching.com/seek/";
  }
}

function stripPadding( txt ) {
  return txt.replace( /&nbsp;/, " ").replace( /^\s+/, "" ).replace(/\s+$/, "" );
}

// These rely on the coordinate being in the format: N 50° 54.344 W 001° 24.110

function getLat(txt) {
	var c = /([NS]) (\d\d)° (\d\d.\d{3})/.exec(txt);
	if( c.length != 4 ) {
		GM_log("Could not decode coordinates");
		return null;
	}
	return (c[1]=='N'?1:-1) * ((c[2] * 1) + (c[3]/60));
}

function getLon(txt) {
	var c = /([EW]) (\d{3})° (\d\d.\d{3})/.exec(txt);
	if( c.length != 4 ) {
		GM_log("Could not decode coordinates");
		return null;
	}
	return (c[1]=='E'?1:-1) * ((c[2] * 1) + (c[3]/60));
}

function errorMsg ( msg ) {
	GM_log( msg +"'\n\nMost likely this is caused by a change in the Geocaching.com web page layout. Check userscripts.org to see if a new version of the script is available - in the meantime you may wish to disable the script via Greasemonkey, to stop this message popping up.");
}

addWPLink();