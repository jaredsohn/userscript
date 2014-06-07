// ==UserScript==
// @name           Bottom label <a name="bottom">
// @namespace      pl.ultr
// @include        http://*
// @include        https://*
// @include        file://*
// @description    Adds <a name="bottom"> tag to the end of every page.
// ==/UserScript==

// add #bottom label
var label = document.createElement( "a" );
label.setAttribute( "name", "bottom" );
document.body.appendChild( label );

// jump to newly created #bottom if requested
if( document.location.hash == "#bottom" )
	document.location.hash = document.location.hash;
