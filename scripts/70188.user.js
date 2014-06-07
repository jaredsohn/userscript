// ==UserScript==
// @name           Telekom -> Google
// @namespace      http://GottZ.de
// @description    leitet fehlerhafte URL Eingaben zu Google.de um
// @include        http://navigationshilfe1.t-online.de/dnserror?url=*
// ==/UserScript==

 /*==============================*\
| Copyright 2010 by GottZ@GottZ.de |
|       all rights reserved        |
 \*==============================*/

String.prototype.splitAt = function( x ) {
	var y = this.indexOf( x );
	if( y == '-1' )
		return Array( this, false );
	x = ( y + 1 != this.length ) ? this.substring( y + 1, this.length ) : false;
	return Array( this.substring( 0, y ), x );
};

isset = function( x ) {
	return !( typeof x == 'undefined' );
};

var url = {
	get : function( x ) {
		x = x.splitAt( '?' );
		if( !x[1] ) return false;
		x = x[1].split( '&' );
		var y = new Array(), z;
		for( i in x ) {
			z = x[i].splitAt( '=' );
			y[z[0]] = z[1];
		};
		return y;
	}
};

var $_GET = url.get( location.href );

if( isset( $_GET['url'] ) ) location.replace( 'http://www.google.de/search?q=' + $_GET['url'] );