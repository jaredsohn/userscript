// ==UserScript==

// @name           Gametrailers Ad Movie Remove
// @namespace      http://www.stud.ntnu.no/~aase/

// @description    Removes interstitial ad movies from Gametrailers.com
// @include        http://www.gametrailers.com/player.php*
// ==/UserScript==



(function() {	
	// Uncomment the next lines if you subscribe to the RSS feed
	// and would prefer links to open to the Quicktime version instead
	// of the default WMV.
	/*
	var re = /^(http:\/\/www.gametrailers.com\/player.php\?r=1&type=)(wmv)(&id=\d+)/;
	var loc = window.location.toString();
	if (re.test(loc))
	{
		window.location = loc.replace(re, "$1mov$3");
		return;
	}
	*/
	
	window.setTimeout(function(){ 
		// Skip age check
		if (this.ageCheck) { 
			this.ageCheck(1, 1, 1900); 
			return;
		}
	
		// Skip ads
		if (this.flashProxy)
			flashProxy.call('mediaDonePlayer');
	}, 150);

})();

