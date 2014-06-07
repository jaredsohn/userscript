(function() {

// ==UserScript==
// @name          MutePunch
// @namespace     http://localhost.localdomain
// @icon          http://puu.sh/mleQ
// @description   Automatically mute webm videos on facepunch and enables a video controller.
// @copyright     SuperFancyGentleman
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.0.1
//
// @include   http://www.facepunch.com/*
// @include   http://facepunch.com/*
// ==/UserScript==

var videos = document.getElementsByTagName( "video" );
for ( i in videos ) {
	var vid = videos[i];
	console.log( vid );
	if ( vid && vid.parentNode ) {
		var newvid = document.createElement( "video" );
		newvid.src = vid.src;
		newvid.controls = true;
		newvid.className = "video-js vjs-default-skin";
		newvid.muted = true;
		newvid.volume = 0;
		vid.parentNode.insertBefore(newvid, vid);
		vid.parentNode.removeChild( vid );
	}
}

})();