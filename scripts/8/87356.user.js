// ==UserScript==
// @name           ESPN FantasyCast Video Ad Remover
// @namespace      http://userscripts.org/users/229329
// @description    A script to remove the ad presented when viewing espn fantasycast for fantasy football.
// @include        http://games.espn.go.com/ffl/fantasycast*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

this.removead = function() {
	adelement = document.getElementById('overlayAd');
	if(adelement.className == "video"){
		window.sessionStorage.prestitialShown = true;
		if (adelement.className == 'iframe' || adelement.className == 'youtube') {
			adelement.parentNode.removeChild(adelement);
		} else if (adelement.className == 'video') {
			adelement.parentNode.removeChild(adelement);
		}
		overlaybg = document.getElementById('overlayAdBackground'); 
		overlaybg.parentNode.removeChild(overlaybg);
	}
} 
window.addEventListener ('DOMNodeInserted', removead, false);
