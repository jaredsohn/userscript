// ==UserScript==
// @name		Buzlas link.tl remover
// @namespace	http://Karamadde.net/
// @author		Cymeria
// @description	Buzlas.net sitesindeki url redirector link.tl kısaltmasını kaldırır
// @include		http://buzlas.net/*
// @include		http://*.buzlas.net/*
// @version		0.01
// ==/UserScript==

// ********************************************************************************************************************

var i = -1;
var myLink = '';

while ( myLink = document.getElementsByTagName( 'a' )[++i].href ) {
	if ( myLink.search( /http:\/\/(\w+\.)*link\.tl\/redirect\/\?site=/i ) != -1 ) {
		myLink = myLink.replace( /http:\/\/(\w+\.)*link\.tl\/redirect\/\?site=/i, '' ) ;
		if ( myLink.indexOf("http%3A%2F%2F") == 0 ) {
			myLink = myLink.replace( /%3A/gi, ":" );
			myLink = myLink.replace( /%2F/gi, "/" );
			myLink = myLink.replace( /%3F/gi, "?" );
			myLink = myLink.replace( /%3D/gi, "=" );
			myLink = myLink.replace( /%26/gi, "&" );
		}
		document.getElementsByTagName('a')[i].href = myLink;
		// GM_log( 'myLink: ' + myLink ); 
	}
}