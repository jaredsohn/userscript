// ==UserScript==
// @name			YouTube 'Time' Menu Command
// @author			Erik Vold
// @namespace		youtubeTime
// @include			http://www.youtube.com/watch?*
// @version			0.1
// @datecreated		2009-07-21
// @lastupdated		2009-07-21
// @description		This userscript will allow you to skip to a specific point in a youtube video.
// ==/UserScript==

youtubeTime = function( str ) {
	if ( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ) {
		var str = unsafeWindow.ubiquityGMInput;

		// reset for next execution
		unsafeWindow.ubiquityGMInput = "";
	}
	else if ( !str ) {
		var str = prompt( "Go To Time:" );
	}

	// try 1st method
	var matches = String(str).match( /((\d*)h)?((\d*)m)?((\d*)s?)/ );
	if ( !matches ) {
		// try 2nd method
		matches = String(str).match( /((\d*)\:)((\d*)\:)((\d*))/ );
	}
	if ( matches ) {
		var seekTime = 0;
		seekTime += (matches[2] ? matches[2] : 0) * 3600;
		seekTime += (matches[4] ? matches[4] : 0) * 60;
		seekTime += (matches[6] ? matches[6] : 0) * 1;

		unsafeWindow.seekTo(seekTime,true);
		return true;
	}

	if ( !matches ) {
		// try 3rd method
		matches = String(str).match( /((\d*)\:)((\d*))/ );
	}
	if ( matches ) {
		var seekTime = 0;
		seekTime += (matches[2] ? matches[2] : 0) * 60;
		seekTime += (matches[4] ? matches[4] : 0) * 1;

		unsafeWindow.seekTo(seekTime,true);
		return true;
	}

	return false;
};

GM_registerMenuCommand( "Time", youtubeTime, "", "", "t" );