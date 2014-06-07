// ==UserScript==
// @name Pandora Title Info 
// @namespace http://davidtsai.net78.net/
// @description Displays the song title and artist in the title bar on Pandora 
// @include http://www.pandora.com/
// @include http://www.pandora.com/station/play/*
// @version 0.4
// @run-at document-end
// ==/UserScript==

/**
 * Change Log 
 * 
 * Version 0.1 
 *  - First version 
 * 
 * Version 0.2 
 *  - Added case for no title found 
 * 
 * Version 0.3 
 *  - Added the station URL to the include list above 
 *
 * Version 0.4 
 *  - Added artist name to title bar (requested by eta235)
 */

setInterval(function(){
	if(document.getElementsByClassName("playerBarSong")[0].textContent){
		document.title = document.getElementsByClassName("playerBarSong")[0].textContent + " - " + document.getElementsByClassName("playerBarArtist")[0].textContent;
	}else{
		document.title = "Pandora Internet Radio";
	}
}, 1000);
