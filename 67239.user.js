// ==UserScript==
// @name           	Google Wave in Header
// @namespace      	wave_header
// @description    	Adds a link to google wave near the other Google shortcuts
// @include        	https://mail.google.com/*
// @include        	https://*.mail.google.com/*
// @include		http://www.google.*/*
// @include        	http://mail.google.com/*
// @include		http://www.google.*/*
// @include		http://google.*/*
// ==/UserScript==

//---------------------------------------------------------------------------------------
// DISCLAIMER: 	This script was only meant to get it to work the "quick and dirty" way.
//		One could say it's my greasemonkey "hello world"
//		It's working fine one my machine but has not been proof tested
//---------------------------------------------------------------------------------------


// Trick to get it to work with the way gmail loads
// It's pretty hacky, if you find anything better, feel free to correct it and let me know (@marcgg)
var done = false;
var timeout = 7;
while(!done && timeout > 0){
	window.setTimeout(function() { 
		whChangeHeaderLink();
	}, 1000);
	timeout--;
}

function whChangeHeaderLink(){	
	var navbar = document.getElementById('gbar');
	// If the navigation bar is available...
	if (navbar && !done) {
		// ... let's create the link to google wave ...
	    var waveLink = document.createElement("a");
		waveLink.setAttribute('href', 'http://wave.google.com');
		waveLink.setAttribute('target', '_blank');
		waveLink.setAttribute('class','gb1 qq');
		waveLink.innerHTML = 'Wave';
		// ... and add it in the list of links.
		var myElement = document.getElementById("gbar").childNodes[0].childNodes[4];
		myElement.parentNode.insertBefore(waveLink,myElement.nextSibling); 
		done = true;
	}
};