// ==UserScript==
// @name GPSies+
// @namespace k2lab.org/gm/gpsies/
// @description Add some features to GPSies.com (route annotation)
// @author Kirill Kozlovskiy
// @include http://*.gpsies.com/map.do*
// @include http://*.gpsies.com/editTrack.do*
// @include http://*.gpsies.com/createTrack.do*
// @include http://*.gpsies.com/mapOnly.do*
// @match http://*.gpsies.com/map.do*
// @match http://*.gpsies.com/editTrack.do*
// @match http://*.gpsies.com/createTrack.do*
// @match http://*.gpsies.com/mapOnly.do*
// @exclude file://*
// @require http://code.jquery.com/jquery.min.js
// @grant none
// @version 2.01
// ==/UserScript==
/*
This code is licenced under the GPL
www.fsf.org/licensing/licenses/gpl.html
*/

this.$ = this.jQuery = jQuery.noConflict(true);

	var LOG = function () {};
//	var LOG = (! "console" in window) ? function () {} : console.log;


function GPSiesRouteAnnotation() {

	
	var __result_odo_multiplier__ = 0.001;
	var __result_odo_round_to__ = 2;
	var __probe_radius__ = 500;
	
	function props(obj) {
		result = "";
		for (property in obj) {
			result += property + ':' + obj[property]+'; ';
		}
	
		return result;
	}

	annotateRoute = function() {

		advWaypoint = function(wpt) {
			LOG("[GPSies+] adding wpt :", props(wpt));

			this.waypoint = wpt;
			this.distance = -1;

			this._latlng = new L.LatLng(wpt.lat, wpt.lon); 
			this._closesPoint = null;
			this._closesDist = -1;
	
			this.checkDistance = function (latlng, odo = -1) {
				d = latlng.distanceTo(this._latlng);
				if (this._closesDist < 0 || d < this._closesDist) {
					this._closesDist = d;
					this._closesPoint = latlng;
					this.distance = odo;
				}
			}

			this.getLatLng = function() {
				return this._latlng;
			}

			return this;
		}

		function formatWaypoint(wpt) {
			var distance = (wpt.distance * __result_odo_multiplier__).toFixed(__result_odo_round_to__);

			return ("[" + distance + "] " + wpt.waypoint.name + (wpt.waypoint.desc.length > 0 ? ": " + wpt.waypoint.desc : "" )); 
		}
	
		// Create array of waypoints to operate
		var _wpa = waypointsArray;
		var wpa = [];

		if (_wpa.size() <= 0) {
			LOG("[GPSies+] GPSiesRouteAnnotation - Nothing to do: no waypoints found!");
			return;
		}

//		LOG("[GPSies+] _wpa= ", _wpa);
		for (var wi=0; wi < _wpa.size(); wi++) { 
			wpa.push( new this.advWaypoint(_wpa[wi]) );
		}
//		LOG("[GPSies+] wpa= ", props(wpa));

		// Let's get the closes point to each WPT and calculate  some distance
		var polylineLL = polyline.getLatLngs();
		var totalDistance = 0;

		var currPnt = null;
		var prevPnt = null;

		if (polylineLL.size() > 0) {
			currPnt = polylineLL[0];
			prevPnt = polylineLL[0];
		}

		for (var i=0; i < polylineLL.size(); i++) { 
			currPnt = polylineLL[i];

			for (var wi=0; wi < wpa.length; wi++) {

//				// Chech for the nearest point
//				wpa[wi].checkDistance(currPnt, totalDistance);

				// Chech for the nearest projection
				var wpaPnt = wpa[wi].getLatLng();
				var projPnt = map.unproject ( L.LineUtil.closestPointOnSegment(
						map.project(wpaPnt), 
						map.project(prevPnt), 
						map.project(currPnt) 
					));

				var radius = wpaPnt.distanceTo(projPnt);
				if (radius <= __probe_radius__) {
//					LOG("i=",i,"; wi=",wi,"; totalDistance=",totalDistance);
					wpa[wi].checkDistance(projPnt, totalDistance + prevPnt.distanceTo(projPnt));
				}
			}
			totalDistance += currPnt.distanceTo(prevPnt);
			prevPnt = currPnt;
		}

		// Sorting by distance from start point
		wpa.sort(function(a, b) {
				return a.distance - b.distance;
			});
	
		result = [];
		for (var wi=0; wi < wpa.length; wi++) {
			// DEBUG
//            map.addLayer( new L.Marker(wpa[wi]._closesPoint, { title: wpa[wi].desc }) );

			if (wpa[wi].distance >= 0 ) {
				result.push( formatWaypoint(wpa[wi]) );
			}
		}
		
		return result;
	}

	updateAnnotation = function () {

		LOG("[GPSies+]  updating annotation...");

		__result_odo_multiplier__ = $("#odo_multiplier").val();
		__result_odo_round_to__ = $("#odo_round_to").val();
		__probe_radius__ = $("#probe_radius").val();

		$("#routeAnnotation").empty();
		$("#routeAnnotation").append('<p>'+this.annotateRoute().join('<br />')+'</p>');

		return false;
	}

	updateInterface = function () {

		if ($("#contentboxRouteAnnotation").length > 0) {
			LOG("[GPSies+] GPSiesRouteAnnotation WTF?! Got old interface. Are you cheating me?");
			$("#contentboxRouteAnnotation").remove();
		}

		// Check for the page elements
		if ($("#contentboxFlyoutChart").length > 0 ) {
			LOG("[GPSies+] map edit on editTrack.do detected!");

			$("#contentboxFlyoutChart").after('<div id="contentboxRouteAnnotation" class="contentbox" style="display: block;"><div class="contentinsidebox" id="routeAnnotationDiv"></div></div>');

	    	$("#routeAnnotationDiv").append('<h3>Route Annotation <small>(GPSies+)</small></h3>');

		} else if ($("#recommendFriend").length > 0 ) {
			LOG("[GPSies+]  map view on map.do detected!");

			$("#recommendFriend").after('<div id="contentboxRouteAnnotation"><fieldset id="fs_routeann" class="bigForm">'
				+ '<legend><span>Route Annotation <small>(GPSies+)</small></span></legend>'
				+ '<div id="routeAnnotationDiv"></div>'
				+ '</fieldset></div>'
			); 

		}

		if (! $("#routeAnnotationDiv").length > 0 ) {
			LOG("[GPSies+]  nothing to do - no known elements found!");
			return;
		}

		$("#routeAnnotationDiv").append(
'<table class="statistic"> \
<tbody> \
<tr> \
<td><label for="odo_multiplier">ODO Multiplier</label></td> \
<td><label for="odo_round_to">ODO Round</label></td> \
<td><label for="probe_radius">Probe radius, m</label></td> \
</tr><tr> \
<td><input id="odo_multiplier" class="smaller" type="text" onchange="" value="' + __result_odo_multiplier__ + '" name="odo_multiplier"></td> \
<td><input id="odo_round_to" class="smaller" type="text" onchange="" value="' + __result_odo_round_to__ + '" name="odo_round_to"></td> \
<td><input id="probe_radius" class="smaller" type="text" onchange="" value="' + __probe_radius__ + '" name="probe_radius"></td> \
</tr> \
</tbody> \
</table> \
');

		$("#routeAnnotationDiv").append('<div class="clear2 marginLeft"> \
<a id="runUpdateAnnotation" class="buttonStylish" onclick="return false;" href="#"> \
<span>Create/Update Annotation</span></a> \
</div> \
' ); 

		$("#runUpdateAnnotation").click(function() {
        	updateAnnotation();
			return false;
	    });

		$("#routeAnnotationDiv").append('<p></p><p><b>Annotation:</b></p>');
		$("#routeAnnotationDiv").append('<div id="routeAnnotation"><i>Nothing yet...</i></div>');

	}

    this.run = function() {
		LOG ("GPSies+ is loading... JQuery info:", $().jquery );

        updateInterface();
    };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function GPSiesWaypointToggler() {

    var __routeWaypoints = [ "Straight", "Left", "TSLL", "TSHL", "Right", "TSLR", "TSHR", "TU"  ];

    function isRouteWaypoint(wpt) {
        for (var i = 0, j = __routeWaypoints.length; i < j; i++) {
            if (__routeWaypoints[i] == wpt.type) {
                return true;
            }
        }
        return false;
    }

    toggleRouteWaypoints = function () {
    	LOG("[GPSies+] toggleRouteWaypoints ()");
    
        if (isWaypoints()) {
            for (var i = 0, j = waypointsArray.length; i < j; i++) {
                if (isRouteWaypoint(waypointsArray[i])) {
                    if (map.hasLayer(waypointsArray[i].marker)) {
                        map.removeLayer(waypointsArray[i].marker)
                    } else if (!map.hasLayer(waypointsArray[i].marker)) {
                        map.addLayer(waypointsArray[i].marker)
                    }
                }
            }
        } else {
        	LOG("[GPSies+] No waypoints found to toggle!");
        }
    };

	updateInterface = function () {

		if ($("#wptTogglerPane").length > 0) {
			LOG("[GPSies+] GPSiesWaypointToggler - WTF?! Got old interface. Are you cheating me?");
			$("#wptTogglerPane").remove();
		}

		// Check for the navigation pane
		if ($("#navMore").length > 0 ) {
			LOG("[GPSies+] map view detected!");

			$("li div input#waypointToggle").parent().parent()			
    			.after('<div id="wptTogglerPane" style="display: block;"></div>');

		}

		if (! $("div#wptTogglerPane").length > 0 ) {
			LOG("[GPSies+] GPSiesWaypointToggler - nothing to do - no known elements found!");
			return;
		}

		$("div#wptTogglerPane").append('<label style="vertical-align: text-bottom; cursor: pointer;" id="runToggleRouteWaypoints" onclick="return false;" href="#"> Toggle Route</label>' ); 
		
		$("#runToggleRouteWaypoints").click(function() {
		    toggleRouteWaypoints();
		    
			return false;
	    });
    };

    this.run = function() {
		LOG ("GPSies+ is loading... JQuery info: ", $().jquery );

        updateInterface();
    };

}

$(document).ready(function(){

    new GPSiesRouteAnnotation().run();
    
    $(window).load( function () { new GPSiesWaypointToggler().run(); });

});

