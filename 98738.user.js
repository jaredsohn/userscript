// ==UserScript==
// @name			BetterTimetable
// @namespace		tests
// @description		Enhance the timetables at http://timetable.search.ch/ , adding 4 features.
// @version			0.7.1b
// @grant       	none
// @include			http://timetable.search.ch/*
// @include			http://fahrplan.search.ch/*
// @include			http://horaire.search.ch/*
// @include			http://orario.search.ch/*
// ==/UserScript==

/* This script can be found at http://userscripts.org/scripts/show/98738
 * 
 * As the timetable pages at search.ch may change a lot, this script is closer to a hack than to a well designed script.
 * When I have time, I try to update the script to follow the updates and modifications of the pages at search.ch
 * 
 * 4 enhancements are included (listed in the order they appear in the code):
 *  2) Navigate, expand and collapse results with keyboard
 *  3) Highlight the closest trip to the time defined by the user
 *  4) Add a vertical line to show the time defined by the user on the timeline
 *  1) Auto show the timeline on load
*/

var run = function ( $, window, document, undefined ) {	// Wraps the script, run only when jQuery is available (see end of script).
	
	if ( $( ".routes" ).length === 0 ) return;	// Check if we are on the right page (ie if there is a timetable on the page).
		
	// Add functions to jQuery:
	$.extend({
		// Return the parameters of an URL. Returns null if the parameter key is not found:
		// Taken from http://www.netlobo.com/comments/url_query_string_javascript and http://simonwillison.net/2006/Jan/20/escape/
		gup: function (key, asArray, url) { 	// optionally return an array of all matchs, optionally pass an URL to parse
			if (url === undefined) url = window.location.search;	// '===' is to distinguish from the case of url = ""
			else {		// compute the url.search by hand:
				var hash = url.indexOf('#');
				url = url.substring(url.indexOf('?'), hash !== -1 ? hash : url.length);
			}
			if(url.length <= 2) return asArray ? [] : null;	// Quick return.
			key = key.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&");	// Escape characters for the following Regex (especially '[' and ']' are needed for array extraction)
			var valueRegex = new RegExp("[\\?&]"+key+"=([^&]*)", "g"),
				value,
				values = [];
			while ((value = valueRegex.exec(url)) !== null)
				values.push(decodeURIComponent(value[1].replace(/\+/g, ' ')));	// decodeURIComponent doesn't recognize '+' as encoding for space
			if(asArray) return values;
			else if(values.length === 0) return null;
			else return values[values.length - 1]; 
		}
	});
	
	// An object to ease the reading of times
	var Time = function( time ) {
			time = parseInt( time, 10 ).toString();		// parseInt(*, 10) because: http://stackoverflow.com/questions/850341/workarounds-for-javascript-parseint-octal-bug
			for ( var i = time.length;  i < 4; i++) time = "0" + time;
			this.hours = parseInt( time.substr( 0, 2 ), 10 );
			this.minutes = parseInt( time.substr( 2, 2 ), 10 );
			
			this.change = function(hours, minutes) {	// NO CHECK ON FINAL RESULT !!! Hours could be more than 24... (But it is enough for this case)
				this.hours += hours;
				this.minutes += minutes;
				time = this.concatTime();
				return this;
			};
			this.concatTime = function( prettyPrint ) {
				return ( prettyPrint && this.hours < 10 ? "0" : "" ) + this.hours.toString()
					+ ( prettyPrint ? ":" : "" )
					+ ( this.minutes < 10 ? "0" : "" ) + this.minutes.toString();
			};
			this.toString = function() {
				return time;
			};
		};
	//window.Time = Time;	// For debugging
	
/* 2nd enhancement:
 * - Navigate, expand and collapse results with keyboard
 *   With auto loading of previous and following trips when needed.
 *   Use keys: up and down arrows, and return or right arrow to expand/collapse trips.
*/
	var num = $.gup( "num" ),
		pre = $.gup( "pre" ),
		totalTrips = -1,
		highlightedTrip = -1,
		Elem_routes_table = $( ".routes table:eq(0) > tr, .routes table:eq(0) > tbody > tr" ),	// In case there is no tbody (may depend on the browser)
		_highlightTrip = function( num ) {
			var start = num * 3 + 1,
				indexes = [start, start + 1];
			for(var i=0; i<indexes.length; i++) $(Elem_routes_table[indexes[i]]).css( { background: "#D2F2DB" } );
		},
		_unHighlightTrip = function( num ) {
			var start = num * 3 + 1,
				indexes = [start, start + 1];
			for(var i=0; i<indexes.length; i++) $(Elem_routes_table[indexes[i]]).css( { background: "" } );
		},
		highlightTrip = function( num ) {
			if ( highlightedTrip !== -1 ) _unHighlightTrip( highlightedTrip );
			_highlightTrip( num );
			highlightedTrip = num;
		},
		toggleExpandTrip = function( num ) {
			$( "img.oev_collapse_image:visible", Elem_routes_table[ num * 3 + 1 ] ).click();
		};
	
	// Find how many trips are on the page:
	if ( num ) totalTrips = parseInt( num, 10 );
	else if ( pre ) totalTrips = 4 + parseInt( pre, 10 );
	else totalTrips = 4;
	
	$( document ).keypress( function( e ) {
		if($( e.target ).is( ":input,a[href],area" ) ) return;	// Prevent action when the focus is on a form element or a link.
		if( e.keyCode === 38 ) {	// Up arrow key
			if ( highlightedTrip > 0 ) highlightTrip( highlightedTrip - 1 );
			else if ( highlightedTrip === 0 ) window.location = $( ".routes > div:last-child.sl_screenonly a:eq(0)" ).click().attr( "href" );
		}
		else if( e.keyCode === 40 ) {	// Down arrow key
			if ( highlightedTrip < totalTrips - 1 ) highlightTrip( highlightedTrip + 1 );
			else if ( highlightedTrip === totalTrips - 1 ) window.location = $( ".routes > div:last-child.sl_screenonly a:eq(1)" ).click().attr( "href" );
		}
		else if( e.keyCode === 13 || e.keyCode === 39 ) {	// Return key or right arrow key
			if ( highlightedTrip !== -1 ) toggleExpandTrip( highlightedTrip );
		}
		else return;
		return false;	// Prevent default action.
	});
	//console.log($( ".routes > div:last-child.sl_screenonly a" ), totalTrips);	// For debugging


/* 3rd enhancement:
 * - Highlight the trip that is the closest to the time defined by the user
*/
	var routemode = $( "#routemode :radio:checked" ).val(),
		time = $( "#routetime" ).val().replace( ":", "" ),
		i;
	if( !time ) {
		time = new Date( it_starttime );
		time = "" + time.getHours() + time.getMinutes();
	}
	time = new Time( time );
	if ( routemode === "depart" || routemode === "arrival" ) {
		var departs = [],
			arrivals = [],
			closesttrip;
		$( ".oev_compact.oev_tripoverview" ).each( function() {
			var tripTimes = $( ".collapse_open .oev_printbold", this ).text().replace( /:/g, "" ).split( "-" );
			departs.push( tripTimes[0] );
			arrivals.push( tripTimes[1] );
		});
		
		if ( routemode === "depart" ) {
			closesttrip = departs.length - 1;
			for ( i = closesttrip; i >= 0; i-- ) {
				if( departs[i] >= time ) closesttrip = i;
			}
			if ( departs[closesttrip] < time ) closesttrip = -1;
		}
		else if ( routemode === "arrival" ) {
			closesttrip = 0;
			for ( i = closesttrip; i < arrivals.length ; i++ ) {
				if ( arrivals[i] <= time ) closesttrip = i;
			}
			if ( arrivals[closesttrip] > time ) closesttrip = -1;
		}
		if ( closesttrip !== -1 ) highlightTrip( closesttrip );
	}
	//console.log(routemode, time, departs, arrivals, closesttrip);	// For debugging
	
	
/* 4th enhancement:
 * - Add a vertical line to show the time defined by the user on the timeline
*/
	//time = new Time( "1630" );	// For debugging
	var Elem_table_oev = $( "table.oev_compact" ),
		Elem_time_scale = $( "#oev_timeline_scale" ),
		startTime = new Time( Elem_time_scale.find( "td" ).first().text().replace( ":", "" ) ),
		secondTime = Elem_time_scale.find( "td:eq(1)" ).text().replace( ":", "" ),
		endTime = new Time( Elem_time_scale.find( "td" ).last().text().replace( ":", "" ) ),
		hoursStep = 0,
		minutesStep = 0;
	if( secondTime.length > 0 ) secondTime = new Time( secondTime );
	else {
		// Could be 15 minutes, but is is less likely...
		secondTime = new Time( startTime.toString() ).change( 1, 0 );
	}
	if( startTime.minutes === secondTime.minutes ) hoursStep = 1;
	else minutesStep = 15;
	endTime.change( hoursStep, minutesStep );
	var minutesOnScale = ( endTime.hours - startTime.hours ) * 60 + endTime.minutes - startTime.minutes,
		minutesUntilTime = ( time.hours - startTime.hours ) * 60 + time.minutes - startTime.minutes,
		Elem_verticalLine = $( "<div>", { css: { position: "absolute", top: 0,  width: 1, height: "100%", background: "#3A1", zIndex: 1 } } ).hide().appendTo(Elem_table_oev);
	
	Elem_verticalLine.append( $( "<div>", { text: time.concatTime( true ), css: { position: "absolute", bottom: 0, left: "3px", color: "#3A1" } } ) );
	
	var setVerticalLinePosition = function() {	// Note: setVerticalLinePosition is run at least once through the 1st enhancement, see below.
			//console.log( Elem_time_scale.position().left, Elem_time_scale.outerWidth());	// For debugging
			Elem_verticalLine.css( { left: Elem_time_scale.position().left,
							 marginLeft: minutesUntilTime * Elem_time_scale.outerWidth() / minutesOnScale } );
		},
		showVerticalLine = function() {
			setVerticalLinePosition();
			Elem_verticalLine.show();
		};
	
	// Note: search_state_modify() is defined in http://horaire.search.ch/itjs/sl_state.js
	// But I target its use from a click event handler on ".oev_timeline_toggle" in http://horaire.search.ch/itjs/service.js
	var original_search_state_modify = window.search_state_modify;
	window.search_state_modify = function( add ) {
		if( add.timeline ) {
			if( add.timeline === 2 ) {
				$( ".oev_leg:eq(0)" ).promise().done(function() {
					window.setTimeout( showVerticalLine, 0 );
				});
			}
			else Elem_verticalLine.hide();
		}
		original_search_state_modify.apply( window, arguments );
	};
	
	$( window ).resize( setVerticalLinePosition );
	
	//console.log(Elem_table_oev, Elem_time_scale, Elem_verticalLine, time, startTime, endTime, hoursStep, minutesStep, minutesUntilTime, minutesOnScale);	// For debugging


/* 1st enhancement:
 * - Auto show the timeline on load
*/
	var timeline_mode = env.timeline,
		Elem_oev_timeline_toggle = $( ".oev_timeline_toggle:eq(0)" );
	if( timeline_mode != 2 ) {
		$.fx.off = true;	// Temporarily disable animations, so that actions are performed instantly.
		while( timeline_mode != 2 ) {
			Elem_oev_timeline_toggle.click();	// There is no public access to a function that switches directly to the desired timeline_mode
			timeline_mode = (timeline_mode + 1) % 4;
		}
		$.fx.off = false;
	}
	else {
		$( ".oev_leg" ).stop( true, true );	// stop timeline_scale animation
		showVerticalLine();
	}
	
	// Fix a bug on the original page: the cells on the timeline don't have exactly the same width.
	Elem_time_scale.find( "td" ).css("width", "1%");
	
};	// End of the run function wrapping the script.



/* Since many scripts are loaded asynchronously, they may not be loaded when the DOM is ready (especially when reloading the page)
 * Solution: test until they are available. (give up after 10 sec.)
*/
var win = window,
	startTime = Date.now(),
	elapsedTime,
	tryWaits = [ {wait: 200, until: 800}, {wait: 50, until: 3000}, {wait: 200, until: 5000}, {wait: 500, until: 30000} ],
	tryRun = function () {
		elapsedTime = Date.now() - startTime;
		if ( win.jQuery	// Wait for jQuery
			&& win.search_state_modify	// Wait for http://horaire.search.ch/itjs/sl_state.js
			&& win.oev_init) {	// Wait for http://horaire.search.ch/itjs/service.js
			
			//console.log("Ready after: " + elapsedTime);	// For debugging
			win.jQuery( function() {
				run( win.jQuery, win, win.document );
			});
		}
		else {
			//console.log("elapsedTime: " + elapsedTime);	// For debugging
			while ( tryWaits[0] && elapsedTime > tryWaits[0].until ) tryWaits.shift();
			if ( tryWaits[0] ) win.setTimeout( tryRun, tryWaits[0].wait );
			else $.error( "Timeout: required scripts not loaded !" );
		}
	};

tryRun();