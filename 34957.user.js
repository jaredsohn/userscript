// ==UserScript==
// @name           New York Times Title Case Authors
// @namespace      http://www.prism.gatech.edu/~mflaschen3
// @description    Makes name of New York Times authors title case for easier copying
// @include        *nytimes.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function toTitleCase( str ) {
    var i = 0, j = 0;
    var titleString = "";
    do {
	j = str.indexOf(" ", i) + 1;
	if ( j === 0 ) {
	    j =  str.length;
	}
	titleString += str.charAt(i).toUpperCase() + str.substring(i + 1, j).toLowerCase();
	i = j;
    } while( i < str.length );

    return titleString;
}

this.$(	'.byline [itemprop="name"]' ).text( function ( index, text ) {
	return toTitleCase( text );
} ).css( 'textTransform', 'uppercase' );
