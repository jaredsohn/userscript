// ==UserScript==
// @name           LimitFacebook
// @namespace      gosual
// @include        about:blank#*
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com
// @include        http://www.facebook.com/*/*
// @include        http://*.facebook.com/*
// ==/UserScript==

var limitVisitFrequencyHours = 4; // allow a visit every x hours
var limitDurationMinutes = 20; // a visit can last a maximum of x minutes

function starter ()
{
	GM_log ( "Limiter started" );
	var def = new Date ();
	def.setTime ( def.getTime () - (limitVisitFrequencyHours*2)*60*60*1000 );
	var read = GM_getValue ( "lastVisit", def.getTime () );
	var sav = new Date ();
	sav.setTime ( read );
	GM_log ( "Last visit: " + sav );
	
	var freq = GM_getValue ( "limitVisitFrequencyHours", limitVisitFrequencyHours );
	var duration = GM_getValue ( "limitDurationMinutes", limitDurationMinutes );
	
	var cur = new Date ();
	if ( (cur.getTime () - sav.getTime ()) / (60*1000) <= duration )
	{
		var until = new Date ();
		until.setTime ( sav.getTime () + (60*1000)*duration );
		var s = "Allowed to continue current visit until " + until.getHours () + ":" + until.getMinutes () + ".";
		GM_log ( s );
		//top.location = "#"+s;
		window.status = s;
	}
	else if ( (cur.getTime () - sav.getTime ()) / (60*60*1000) >= freq )
	{
		var until = new Date ();
		until.setTime ( cur.getTime () + (60*1000)*freq );
		GM_setValue ( "lastVisit", "" + cur.getTime () );
		var s = "New visit allowed until " + until.getHours () + ":" + until.getMinutes () + ".";
		GM_log ( s );
		top.location = "#"+s;
		window.status = s;
	}
	else
	{
		var until = new Date ();
		until.setTime ( sav.getTime () + (60*60*1000)*freq );
		var s = "No new visit allowed, please wait until " + until.getHours () + ":" + until.getMinutes () + ".";
		GM_log ( s );
		//top.location = "#"+s;
		top.location = "about:blank#  "+s;
		window.status = s;
	}
	
	
	GM_registerMenuCommand ( "LimitFacebook Preferences", preferences );
}

function preferences ()
{
	var freq = GM_getValue ( "limitVisitFrequencyHours", limitVisitFrequencyHours );
	var duration = GM_getValue ( "limitDurationMinutes", limitDurationMinutes );
	
	freq = prompt ( "Allow a visit every x hours (default " + limitVisitFrequencyHours + ")", freq );
	if ( freq == null )
		freq = limitVisitFrequencyHours;
	GM_setValue ( "limitVisitFrequencyHours", freq );
	
	duration = prompt ( "A visit can last a maximum of x minutes (default " + duration + ")", duration );
	if ( duration == null )
		duration = limitDurationMinutes;
	GM_setValue ( "limitDurationMinutes", duration );
}


window.addEventListener ( 'load', starter, false );
//starter ();
