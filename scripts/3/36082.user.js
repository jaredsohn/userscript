// ==UserScript==
// @author		tomasz.frelik (at) gmail.com
// @namespace	http://frelo.enzo.pl/userscript/
// @name		New York Times books bestsellers at amazon.com
// @description	Adds direct amazon.com links to New York Times book bestsellers lists
// @include		http://*.nytimes.com/*bestseller*
// ==/UserScript==

// ********************************************************************
// LICENSE
// You are allowed (and encouraged) to use and redistribute this script 
// in original form. To use or redistribute the script after any 
// modifications, or any derivatives of this script, you need a written
// consent from the author.
// ********************************************************************

main();	

function main() {

	divs = document.getElementsByTagName( 'div' );
	for ( var d in divs ) {
		if ( divs[d].className != 'CollDisplayName' ) {	
			continue;
		}
		
		var s = divs[d].nextSibling;
		while( s ) {
			if ( s.tagName == 'P' ) {
				var p = s;
				break;
			}
			s = s.nextSibling;
		}
		var c = p.firstChild;
		var pattern = new RegExp( '(\\s*[0-9]\\. )(.+)', 'm' );

		while ( c ) {

			var next_c = c.nextSibling;

			if ( c.nodeType == 3 ) {

				var t = new String( c.nodeValue );
				var matches = t.match( pattern );
				if ( matches ) {
					var first_part = matches[1];
					var second_part = matches[2];
					var search_string = encodeURIComponent( second_part );

					var l = document.createElement( 'a' );
					l.appendChild( document.createTextNode( second_part ));	
					l.href= "http://www.amazon.com/gp/search?ie=UTF8&keywords=" + search_string + "&tag=nyt-books-20&index=books";

					c.parentNode.insertBefore( document.createTextNode( first_part ), c );
					c.parentNode.insertBefore( l, c );
					p.removeChild( c );
				}

			}

			c = next_c;

		}
	}
}