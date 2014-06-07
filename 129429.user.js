// ==UserScript==
// @version       0.0.2
// @namespace     inge.org.uk/userscripts
// @name          GC Easy Coordinate Entry
// @namespace	    inge.org.uk/userscripts
// @description   Makes it easier to enter the coordinates for a new Geocache.
// @include       http://www.geocaching.com/hide/report.aspx*
// @include       http://www.geocaching.com/hide/wptlist.aspx*
// @match         *://*.geocaching.com/hide/report.aspx*
// @match         *://*.geocaching.com/hide/wptlist.aspx*
// @license       MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright	    2012, James Inge (http://geo.inge.org.uk/)
// ==/UserScript==

(function() {
	var targets = document.evaluate("//table[@class='LatLongTable']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(targets.snapshotLength == 1) {
		var target = targets.snapshotItem(0);
		if(/report/.test(document.location)) {
			var dmsfield="ctl00$ContentBody$LatLong";
			var nfield="ctl00_ContentBody_LatLong:_selectNorthSouth";
			var efield="ctl00_ContentBody_LatLong:_selectEastWest";
			var dlatfield="ctl00_ContentBody_LatLong__inputLatDegs";
			var mlatfield="ctl00_ContentBody_LatLong__inputLatMins";
			var slatfield="ctl00_ContentBody_LatLong__inputLatSecs";
			var dlonfield="ctl00_ContentBody_LatLong__inputLongDegs";
			var mlonfield="ctl00_ContentBody_LatLong__inputLongMins";
			var slonfield="ctl00_ContentBody_LatLong__inputLongSecs";
		} else {
			var dmsfield="ctl00$ContentBody$WaypointEdit$uxCoordinates";
			var nfield="ctl00_ContentBody_WaypointEdit_uxCoordinates:_selectNorthSouth";
			var efield="ctl00_ContentBody_WaypointEdit_uxCoordinates:_selectEastWest";
			var dlatfield="ctl00_ContentBody_WaypointEdit_uxCoordinates__inputLatDegs";
			var mlatfield="ctl00_ContentBody_WaypointEdit_uxCoordinates__inputLatMins";
			var slatfield="ctl00_ContentBody_WaypointEdit_uxCoordinates__inputLatSecs";
			var dlonfield="ctl00_ContentBody_WaypointEdit_uxCoordinates__inputLongDegs";
			var mlonfield="ctl00_ContentBody_WaypointEdit_uxCoordinates__inputLongMins";
			var slonfield="ctl00_ContentBody_WaypointEdit_uxCoordinates__inputLongSecs";
		}
	} else {
		return;
	}
	var d = document.createElement('div');
	d.innerHTML = '<input type="text" name="EasyCoords_ip" id="EasyCoords_ip" style="width:200px" title="Paste coordinates here" /><input type="button" value="Fill" onclick="EasyCoords_complete();"/>';
	var s = document.createElement('script');
	s.innerHTML = [
		'function EasyCoords_complete() {\
			var lat=0,lon=0,north=1,east=-1;\
			var coords = document.getElementById("EasyCoords_ip").value;\
			var matches=coords.match(/(-?\\d{1,2}(?:\\.\\d+)?)\\s*,\\s*(-?\\d{1,3}(?:\\.\\d+)?)/);\
			if(matches && matches.length == 3) {\
				lat = matches[1]*1;\
				lon = matches[2]*1;\
				if( lat<0 ) {\
					north=-1;\
					lat*=-1;\
				}\
				if( lon>0 ) {\
					east=1;\
				} else {\
					lon*=-1;\
				}\
			} else {\
				matches=coords.match(/([NnSs])\\s*(\\d{1,2})\\u00B0?\\s+(\\d{1,2}(?:\\.\\d+)?)[\\u2032\\u0027]?\\s+([EeWw])\\s*(\\d{1,3})\\u00B0?\\s+(\\d{1,2}(?:\\.\\d+)?)/);\
				if(matches && matches.length == 7 ) {\
					lat = matches[2]*1+matches[3]/60;\
					lon = matches[5]*1+matches[6]/60;\
					if(/[sS]/.test(matches[1])) north = -1;\
					if(/[eE]/.test(matches[4])) east = 1;\
				}\
			}\
			switch(document.forms["aspnetForm"].',dmsfield,'.value * 1) {\
				case 2: {\
					document.getElementById("',nfield,'").value = north;\
					document.getElementById("',efield,'").value = east;\
					$("#',dlatfield,'").val(Math.floor(lat));\
					var latm = (lat - Math.floor(lat))*60;\
					$("#',mlatfield,'").val(Math.floor(latm));\
					$("#',slatfield,'").val((latm-Math.floor(latm))*60);\
					var lonm = (lon - Math.floor(lon))*60;\
					$("#',dlonfield,'").val(Math.floor(lon));\
					$("#',mlonfield,'").val(Math.floor(lonm));\
					$("#',slonfield,'").val((lonm-Math.floor(lonm))*60);\
					break;\
				}\
				case 1: {\
					document.getElementById("',nfield,'").value = north;\
					document.getElementById("',efield,'").value = east;\
					$("#',dlatfield,'").val(Math.floor(lat));\
					$("#',mlatfield,'").val(((lat - Math.floor(lat))*60).toFixed(3));\
					$("#',dlonfield,'").val(Math.floor(lon));\
					$("#',mlonfield,'").val(((lon - Math.floor(lon))*60).toFixed(3));\
					break;\
				}\
				case 0: {\
					document.getElementById("',nfield,'").value = north;\
					document.getElementById("',efield,'").value = east;\
					$("#',dlatfield,'").val(lat);\
					$("#',dlonfield,'").val(lon);\
					break;\
				}\
			}\
		}'
	].join("");
	document.documentElement.firstChild.appendChild(s);
	target.parentNode.insertBefore(d,target);
})();