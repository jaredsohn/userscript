// ==UserScript==
// @name           Discworld MUD Board Ignore
// @description    Skips to the next post when attempting to view a post by Wallsy.
// @include        http://discworld.starturtle.net/lpc/secure/boards.c*note*
// ==/UserScript==

var links = document.getElementsByTagName( 'a' );

if ( links[84].href == "http://discworld.starturtle.net/lpc/secure/finger.c?player=Wallsy" ) {

	window.location.replace( links[75] );
}
