// Twitter has this Election Promotions banner on top of it's page,
// which can not be persistently removed.
// So let Greasemonkey take care of that...

// ==UserScript==
// @name           twitter no elections banner
// @namespace      joe.lapoutre.com/gm/twitter-noelections
// @description    Hide the elections banner on Twitter
// @include        http://twitter.com/*
// ==/UserScript==

(function remove() {
	var h1s = document.getElementsByTagName('h1');
	var electionBanner = h1s[0];
	if (electionBanner && electionBanner.getAttribute('class') == 'elections-promotion') {
		electionBanner.style.display = 'none';
	}
})();


// Plug: do you like music on the web and want it all in one place?
// watch Twones.com!
// Living in the Neterlands/Amsterdam area?
// @see twones.com/pages/jobs