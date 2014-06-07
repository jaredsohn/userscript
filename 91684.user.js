// ==UserScript==
// @name		No Redirect
// @namespace	http://pennergame.de/
// @author		Bob_Dobalina
// @description	Entfernt den Redirector aus allen User-Links auf allen deutschen Pennergame-Seiten
// @include		http://pennergame.de/*
// @include		http://*.pennergame.de/*
// @version		0.95
// ==/UserScript==

// ********************************************************************************************************************

// alle Links checken und ggf. korrigieren
var i = -1;
var myLink = '';

while ( myLink = document.getElementsByTagName( 'a' )[++i].href ) {
	if ( myLink.search( /http:\/\/(\w+\.)*pennergame\.de\/redirect\/\?site=/i ) != -1 ) {
		myLink = myLink.replace( /http:\/\/(\w+\.)*pennergame\.de\/redirect\/\?site=/i, '' ) ;
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