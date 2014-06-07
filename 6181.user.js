// callto: pagesjaunes.fr
// version 1.1
// 2007-11-23
// Copyright 2006,2007 Thomas Papiernik
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
// 1.0  2006-10-01 initial version
// 1.1  2007-11-23 Change to match with new version of pagesjaunes.fr
//
// ==UserScript==
// @name          callto: pagesjaunes et pagesblanches
// @namespace     http://www.27300.net/greasemonkey/callto_pagesjaunes/
// @description   Recherche les numeros de telephone dans les pagesjaunes et ajoute un lien callto: pour permettre les appels vers Skype et autres. (Fonctionne seulement avec pagesjaunes.fr)
// @include       http://www.pagesjaunes.fr/*
// ==/UserScript==

( function() {

var getTels = function( node )
{
  /// Search for <b> Tags with only space and numbers
	var a = [];
	var re = new RegExp( '^[0-9- \.]*$' );
	var els = node.getElementsByTagName( "strong" );
	for ( var i=0 , j=els.length; i<j; i++ )
		if ( re.test( els[i].innerHTML ) ) 
		  a.push( els[i] );
	return a;

} // getTels

//<strong>phone number</strong>

	var tels = getTels( document );
	
	for ( j = 0; j < tels.length; j++ )
	{
	
		var telNumber = tels[j].innerHTML.replace( /[^0-9]*/g , '' );

    if (( telNumber.length == 10 ) &&
			  ( telNumber.substring( 0 , 1 ) == '0' ))
		{ // Ajoute +33 pour la France
		  telNumber = '+33' + telNumber.substring(1, telNumber.length) 
		}
				
		var wrapper = document.createElement( 'a' );
		wrapper.setAttribute( 'href' , 'callto://' + telNumber );
		wrapper.appendChild( tels[j].cloneNode( true ) );
						
		tels[j].parentNode.replaceChild( wrapper , tels[j] );
				
	} // for

} )();
