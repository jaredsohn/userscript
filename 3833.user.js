// Google hCalendar
// version 1.01
// 2006-04-23
// Copyright 2006, Scott Reynen
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details:
// <http://www.gnu.org/licenses/gpl.txt>
//
// Revision history:
// 1.0  2006-04-13 initial version
// 1.01 2006-04-23 added support for datetimes with space delimiter
//
// ==UserScript==
// @name          Google hCalendar
// @namespace     http://greasemonkey.makedatamakesense.com/googlehcalendar/
// @description   Finds vevents and adds a link to send them to Google Calendar
// @include       *
// ==/UserScript==

( function() {

var innerText = function( node )
{

  var regex = /<\S[^>]*>/g;
  var withHTML = node.innerHTML;
  
  return withHTML.replace( regex , '' );

} // innerText

var trim = function( inString ) 
{
  
  return inString.replace( /^\s+|\s+$/ , '' );
  
} // trime

// Adapted from http://www.forgetfoo.com/?blogid=4077

var getElementsByClassName = function( node , classname )
{

	var a = [];
	var re = new RegExp( '(^| )' + classname + '( |$)' );
	var els = node.getElementsByTagName( "*" );
	for ( var i=0 , j=els.length; i<j; i++ )
		if ( re.test( els[i].className ) ) a.push( els[i] );
	return a;

} // getElementsByClassName

// Adapted from http://delete.me.uk/2005/03/iso8601.html

Date.prototype.setISO8601 = function ( string )
{

    var regexp = "([0-9]{4})(-?([0-9]{2})(-?([0-9]{2})" +
        "([T ]([0-9]{2}):?([0-9]{2})(:?([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):?([0-9]{2})))?)?)?)?";

    var d = string.match( new RegExp( regexp ) );

    var offset = 0;
    var date = new Date( d[1] , 0 , 1 );

    if ( d[3] ) date.setMonth( d[3] - 1 );
    if ( d[5] ) date.setDate( d[5] );
    if ( d[7] ) date.setUTCHours( d[7] );
    if ( d[8] ) date.setUTCMinutes( d[8]);
    if ( d[10] ) date.setUTCSeconds( d[10]);
    if ( d[12] ) date.setMilliseconds( Number( '0.' + d[12] ) * 1000 );
    if ( d[14] ) 
    {
    
        offset = ( Number( d[16] ) * 60 ) + Number( d[17] );
        offset*= ( ( d[15] == '-' ) ? 1 : -1 );
        
    } // if

    // offset-= date.getTimezoneOffset();
    time = ( Number( date ) + ( offset * 60 * 1000 ) );
    this.setTime( Number( time ) );

} // Date.prototype.setISO8601

var parseDuration = function( duration )
{

	var regexp = "P(([0-9]+)D)?(T([0-9]+)([HM]))?";
	var d = duration.match( new RegExp( regexp ) );
	var response = 0;
	
	if ( d[2] ) response+= 60 * 24 * d[2];
	if ( d[4] ) response+= ( d[5] == 'H' ) ? 60 * d[4] : d[4];

	return response;

} // parseDuration

var googleDate = function( date )
{

	var year = date.getUTCFullYear();
	var month = date.getUTCMonth() + 1;
	if ( month < 10 ) month = '0' + month;
	var day = date.getUTCDate();
	if ( day < 10 ) day = '0' + day;
	var hours = date.getUTCHours();
	if ( hours < 10 ) hours = '0' + hours;
	var minutes = date.getUTCMinutes();
	if ( minutes < 10 ) minutes = '0' + minutes;
	var seconds = date.getUTCSeconds();
	if ( seconds < 10 ) seconds = '0' + seconds;
	
	return '' + year + month + day + 'T' + hours + minutes + seconds + 'Z';
	
} // googleDate

var addGoogleLink = function( event ) 
{

	var durations = getElementsByClassName( event , 'duration' );
	var duration = 60;
	
	if ( durations.length > 0 ) 
		duration = ( durations[0].title != '' ) ?
			parseDuration( durations[0].title ) :
			parseDuration( innerText( durations[0] ) );

	var dtStarts = getElementsByClassName( event , 'dtstart' );
	var dtStart = '';
	var dtEnd = '';

	if ( dtStarts.length > 0 ) 
	{
	
		var dtStartRaw = ( dtStarts[0].title != '' ) ?
			dtStarts[0].title : innerText( dtStarts[0] );
	
		dtStart = new Date();
		dtEnd = new Date();
		dtStart.setISO8601( trim( dtStartRaw ) );
		dtEnd.setISO8601( trim( dtStartRaw ) );
		dtEnd.setTime( Number( dtEnd ) + ( duration * 60 * 1000 ) );
		
	} // if
	
	var dtEnds = getElementsByClassName( event , 'dtend' );
	if ( dtEnds.length > 0 ) 
	{
	
		var dtEndRaw = ( dtEnds[0].title != '' ) ?
			dtEnds[0].title : innerText( dtEnds[0] );
	
		dtEnd = new Date();
		dtEnd.setISO8601( trim( dtEndRaw ) );
	
	} // if
	
	var locations = getElementsByClassName( event , 'location' );
	var location = ( locations.length > 0 ) ? 
		innerText( locations[0] ) : '';

	var summaries = getElementsByClassName( event , 'summary' );
	var summary = ( summaries.length > 0 ) ? 
		innerText( summaries[0] ) : '';
	
	var descriptions = getElementsByClassName( event , 'description' );
	var description = ( descriptions.length > 0 ) ? 
		innerText( descriptions[0] ) : '';
	

	var googleLink = document.createElement( 'a' );
	var googleImg = document.createElement( 'img' );
	
	googleLink.href = 'http://www.google.com/calendar/event?action=TEMPLATE&dates=' + googleDate( dtStart ) + '/' + googleDate( dtEnd ) + '&location=' + trim( location )  + '&text=' + trim( summary ) + '&details=' + trim( description );
	googleImg.src = 'http://www.google.com/calendar/images/ext/gc_button1.gif';
	googleImg.style.border = '0px';
	googleLink.appendChild( googleImg );

	event.appendChild( googleLink );

} // addGoogleLink

var vevents = getElementsByClassName( document , 'vevent' );

for ( var i = 0; i < vevents.length; i++ )
  addGoogleLink( vevents[i] );

} )();