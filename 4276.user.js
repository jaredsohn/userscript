// callto: tel
// version 1.0
// 2006-06-20
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
// 1.0  2006-06-20 initial version
//
// ==UserScript==
// @name          callto: tell
// @namespace     http://greasemonkey.makedatamakesense.com/callto_tel/
// @description   Finds hcards with telephone numbers and adds callto: links to open calls in VOIP services. (Currently only matches 10 digits, or 11 digits starting with 1.)
// @include       *
// ==/UserScript==

( function() {

var getElementsByClassName = function( node , classname )
{

	var a = [];
	var re = new RegExp( '(^| )' + classname + '( |$)' );
	var els = node.getElementsByTagName( "*" );
	for ( var i=0 , j=els.length; i<j; i++ )
		if ( re.test( els[i].className ) ) a.push( els[i] );
	return a;

} // getElementsByClassName

var hcards = getElementsByClassName( document , 'vcard' );

for ( i = 0; i < hcards.length; i++ )
{

	var tels = getElementsByClassName( hcards[i] , 'tel' );
	
	for ( j = 0; j < tels.length; j++ )
	{
	
		var telNumber = tels[j].innerHTML.replace( /[^0-9]*/g , '' );
				
		if ( telNumber.length == 10 )
		{
		
			var wrapper = document.createElement( 'a' );
			wrapper.setAttribute( 'href' , 'callto:+1' + telNumber );
			wrapper.appendChild( tels[j].cloneNode( true ) );
							
			tels[j].parentNode.replaceChild( wrapper , tels[j] );
		
		
		} // if
		else if (
			( telNumber.length == 11 ) &&
			( telNumber.substring( 0 , 1 ) == '1' )
		) 
		{ 
		
			var wrapper = document.createElement( 'a' );
			wrapper.setAttribute( 'href' , 'callto:+' + telNumber );
			wrapper.appendChild( tels[j].cloneNode( true ) );

			tels[j].parentNode.replaceChild( wrapper , tels[j] );
		
		} // else if
		
	} // for

} // for

} )();