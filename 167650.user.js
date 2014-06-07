// ==UserScript==
// @name            Funnyjunk Thumb Script
// @description     Stuff
// @include         *funnyjunk.com*
// @version 1.3
// ==/UserScript==

var a = document.createElement('a');
var linkText = document.createTextNode("Thumbs Down");
a.appendChild(linkText);

with( a ) {
setAttribute( 'onclick', "$('a.thDn').click()" );
setAttribute( 'value', 'Thumbs Down' );
setAttribute( 'type', 'button' );
setAttribute( 'class', 'pinkButton' );
setAttribute( 'style', 'position: fixed; top: 40px; right: 43px;');
}

document.getElementsByTagName( 'body' )[ 0 ].appendChild( a );

//NEXT

var a = document.createElement('a');
var linkText = document.createTextNode("Remove Thumbs");
a.appendChild(linkText);

with( a ) {
setAttribute( 'onclick', "$('a.thUp_i').click(); $('a.thDn_i').click()" );
setAttribute( 'value', 're!' );
setAttribute( 'type', 'button' );
setAttribute( 'class', 'wheatButton' );
setAttribute( 'style', 'position: fixed; top: 40px; right: 240px;');
}


document.getElementsByTagName( 'body' )[ 0 ].appendChild( a );

//NEXT

var a = document.createElement('a');
var linkText = document.createTextNode("Thumbs Up");
a.appendChild(linkText);
with( a ) {
setAttribute( 'onclick', "$('a.thUp').click()" );
setAttribute( 'value', 'up' );
setAttribute( 'type', 'button' );
setAttribute( 'class', 'lightgreenButton' );
setAttribute( 'style', 'position: fixed; top: 40px; right: 150px;');
}


document.getElementsByTagName( 'body' )[ 0 ].appendChild( a );