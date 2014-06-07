//	Reveals the true nature of Time's "Swampland"
//	Version 0.0.1
//
//	Copyright (c) 2008 LonewackoDotCom
//	Released under the GPL License
//
//	Reveals the true nature of Time's "Swampland"
//
// ==UserScript==
// @name          TigerSwamp
// @namespace     http://lonewacko.com/
// @description   Reveals the true nature of Swampland
// @include http://time-blog.com/swampland/*
// @include http://*.time-blog.com/swampland/*
// ==/UserScript==

var newName;
var rr = Math.random();

if ( rr < 0.25 ) {
	newName = "O Magazine";
}
else if ( rr < 0.5 ) {
	newName = "Tiger Beat";
}
else if ( rr < 0.75 ) {
	newName = "Huffington Post Auxiliary";
}
else {
	newName = "Cautionary Tale Magazine";
}

var elems = document.getElementsByTagName( "div" );
for ( i = 0; i < elems.length; i++ ) {
elem = elems[ i ];
var ih = elem.innerHTML;
if ( ih ) {
elem.innerHTML = doReplace( ih );
}
}

var elems = document.getElementsByTagName( "span" );
for ( i = 0; i < elems.length; i++ ) {
elem = elems[ i ];
var ih = elem.innerHTML;
if ( ih ) {
elem.innerHTML = doReplace( ih );
}
}

document.title = doReplace( document.title );

function doReplace( s ) {
s = s.replace( /Swampland/g, newName );
s = s.replace( /Jay Newton-Small/g, "The Intern" );
s = s.replace( /Michael Scherer/g, "The Intern2" );
s = s.replace( /Ana Marie Cox/g, "Wonkette" );
s = s.replace( /Joe Klein/g, "The World's Greatest Political Reporter of All Time and Author of Several Important Books" );

return s;
}
