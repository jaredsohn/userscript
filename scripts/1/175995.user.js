// ==UserScript==
// @name        flickr photostream details
// @namespace   http://flickr.com/
// @description add "?details=1" tho photostream links
// @include     https://secure.flickr.com/*
// @include     http://www.flickr.com/*
// @include     http://flickr.com/*
// @version     1
// ==/UserScript==



var links = document.querySelectorAll ( 'a' ) ;
for ( var i = links.length-1;  i >= 0; --i ) { 
	var thisLink = links[i];
	var plainLink = thisLink.getAttribute( 'href' );
	if ( plainLink!=null && plainLink.match( /^\/photo/ ) ) {
		thisLink.setAttribute( 'href', plainLink+'?details=1' ) ;
	}
}
