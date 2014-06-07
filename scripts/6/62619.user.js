// ==UserScript==
// @name           Anti-Twilight for FanFiction.Net
// @namespace      http://stendec.me/
// @description    Hide all signs of Twilight crossovers when browsing FanFiction.Net
// @include        http://www.fanfiction.net/*
// @exclude        http://www.fanfiction.net/~*
// @exclude        http://www.fanfiction.net/s/*
// @exclude        http://www.fanfiction.net/r/*
// ==/UserScript==

var myScript = function() {
	// Get all the z-list entries.
	var fics = document.querySelectorAll('.z-list');
	
	// Loop through them, searching for Twilight.
	var c = fics.length;
	for(var i=0; i<c; i++) {
		var t = fics[i].querySelector('.z-padtop2');
		if ( !t ) { continue; }
		t = t.innerHTML;
		
		// Chop off at Rated to avoid matching anything we don't want, in case for some reason &amp; Twilight ever shows up anywhere.
        // Though I doubt it would.
		t = t.substr(0, t.indexOf(' - Rated:'));
		if ( t.indexOf('Crossover - Twilight') === 0 || t.indexOf('&amp; Twilight') !== -1 ) {
			fics[i].style.display = 'none';
		}
	}
}

myScript();