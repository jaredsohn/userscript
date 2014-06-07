// ==UserScript==
// @name           StudiVZ/SchülerVZ/MeinVZ - Photo Download Link
// @namespace      http://www.dzitrone.de
// @description    Fügt einen Link zum herunterladen der Photos zum Photometabereich hinzu
// @include        http://*.studivz.net/Photos*
// @include        http://*.schuelervz.net/Photos*
// @include        http://*.meinvz.net/Photos*
// ==/UserScript==

div = document.getElementById("PhotoContainer");

if( div )
{
	link = div.getElementsByTagName("img")[0].src;
}
else
{
	return;
}

if( link != "" )
{
	tables = document.getElementsByTagName("table");

	for( i = 0; i < tables.length; i = i + 1 )
	{
		if( tables[i].getAttribute( "class" ) == "photo-metainfo" )
		{
			newtr = document.createElement( "tr" );
			tables[i].appendChild( newtr );
			newth = document.createElement( "th" );
			newth.innerHTML = "Download";
			newtr.appendChild( newth );
			newtd = document.createElement( "td" );
			newtr.appendChild( newtd );
			newa = document.createElement( "a" );
			newtd.appendChild( newa );
			newa.setAttribute( "href", link );
			newa.innerHTML = "here";
			newtd = document.createElement( "td" );
			newtd.setAttribute( "class", "action" );
			newtr.appendChild( newtd );
		}
	}
}