// ==UserScript==
// @name		Facepunch Video Fixer
// @version		1.01
// @namespace	http://www.vertinode.nl
// @description	Re-enables clickable titles for embedded YouTube videos.
// @include		http://www.facepunch.com/*
// @include		http://facepunch.com/*
// ==/UserScript==

var videos = document.getElementsByTagName( "iframe" );

for ( var i = 0; i < videos.length; i++ )
{
	var m = videos[i].src.match( /^http:\/\/www.youtube.com\/embed\/(.*?)\?/ );
	if ( m != null ) {
		videos[i].src = "http://www.youtube.com/embed/" + m[1] + "?autohide=1&hd=1";
	}
}