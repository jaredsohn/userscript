// ==UserScript==
// @name           Move to Geekdo.com
// @namespace      http://*
// @include        http://www.boardgamegeek.com/*
// @include        http://boardgamegeek.com/*
// ==/UserScript==

var loc = document.location.href; 
var myRegExp1 = "www.boardgamegeek.com";
var myRegExp2 = "boardgamegeek.com";
var replaceWith = "boardgame.geekdo.com";
var newloc = null;

var pos = loc.search( myRegExp1 ); 
if( pos != -1 ) {
	var newloc = loc.replace( myRegExp1, replaceWith );
} else {
	var pos = loc.search( myRegExp2 );
	if( pos != -1 ) {
		var newloc = loc.replace( myRegExp2, replaceWith );
	}
}
if( newloc != null ) {
	location.href = newloc; 
}
