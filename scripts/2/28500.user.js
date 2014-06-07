// ==UserScript==
// @name          Google Navigation Bar
// @namespace     http://www.maracaibodenoche.com
// @description   Add links to the navigation bar.
// @include       https://*.google.*
// @include	  http://*.google.*/*
// @include	  http://www.google.com
// @exclude 	  http://scholar.google.com/*
// ==/UserScript==

var AdSenseLink = document.createElement('a');
AdSenseLink.setAttribute('href', 'https://www.google.com/adsense/');
AdSenseLink.innerHTML = 'AdSense';
AdSenseLink.setAttribute('class', 'gb1'); //Thanks to JJQuin for the suggestion

var SecondLink = document.createElement('a');
SecondLink.setAttribute('href', 'http://www.userscripts.org/');
SecondLink.innerHTML = 'userscripts.org';


if (document.getElementById('gbar') != null) {
	document.getElementById('gbar').appendChild(AdSenseLink);
	document.getElementById('gbar').appendChild(SecondLink);
}

//Thanks to Mikado for helping me with this part
//This is necessary for the script to work in gmail 
else {
	 var watchit = function(e) {
		if (gbar = document.getElementById('gbar')) {
			document.body.removeEventListener('DOMNodeInserted', watchit, false);
			gbar.appendChild(AdSenseLink);
			gbar.appendChild(SecondLink);
		}
	}
	document.body.addEventListener('DOMNodeInserted', watchit, false);
}