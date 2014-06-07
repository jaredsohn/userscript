// ==UserScript==
// @name            Telekom -> duckduckgo
// @description     leitet fehlerhafte URL Eingaben zu duckduckgo.com um
// @namespace       userscripts.org/users/
// @homepage        http://userscripts.org/scripts/show/171603
// @icon            http://s3.amazonaws.com/uso_ss/icon/129505/large.png?1368599692
// @updateURL       https://userscripts.org/scripts/source/171603.meta.js
// @downloadURL     https://userscripts.org/scripts/source/171603.user.js
// @grant           GM_addStyle
// @version         1.0
// @author          titaniumsenator
// ==/UserScript==


 /*==============================*\
| Copyright 2013 by titaniumsenator|
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

if( isset( $_GET['url'] ) ) location.replace( 'https://duckduckgo.com/?q=' + $_GET['url'] );