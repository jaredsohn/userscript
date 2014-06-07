// ==UserScript==
// @name        Disable Video/Music Autoplay on tagged/hi5
// @namespace   ekpyrotic_twist
// @description Automatically resets profile and embedded video autoplay to '0' for youtube clips on full user pages of tagged.com and hi5.com
// @include     http://www.hi5.com/profile.html?*
// @include     http://www.hi5.com/tagged/*
// @include     http://www.tagged.com/profile.html?*
// @include     /^http://www\.(tagged|hi5)\.com/*[^.html]/
// @grant       none
// @version     0.5
// ==/UserScript==

// function to set autoplay off
function autoplayOff( videos ) { if( videos ) { videos.setAttribute( "autoplay", "0" ); } }

// function to acquire embed tags (typically youtube videos)
function getEmbeds() { return( document.getElementsByTagName( "embed" ) ); }

// function to process embeds
function processEmbeds() {
	// get embedded tags
	var embeds = getEmbeds();

	// CASE : number of objects is no longer zero
	if( embeds.length == 0 && counter-- > 0 ) { window.setTimeout( processEmbeds, 500 ); }
	if( embeds.length > 0 ) { stopEmbeds( embeds ); }
}

// function to remove autoplay on embedded videos
function stopEmbeds( embeds ) {
	// handle each in turn
	for( var i = 0; i < embeds.length; i++ ) {
		// get element
		var embed = embeds[ i ];
		var attribute = "id" + i;
		embed.setAttribute( "id", attribute ); 
		
		// get movie src
		var src = embed.getAttribute( "src" );
		
		// replace the autostring
		var attribute = src.replace( /autoplay=1/g, "autoplay=0" );
		embed.setAttribute( "src", attribute ); 
	}
} 

// MAIN : code execution begins here
// counter
var counter = 20;

// get video section
var videos = document.getElementById( "videos" );

// stop profile autoplays
autoplayOff( videos ); 

// intercept and stop embedded autoplays
window.setTimeout( processEmbeds, 500 );