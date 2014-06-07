// ==UserScript==
// @name           Anti wordfilter @ 4chan
// @namespace      4chan.de-spoilerize
// @include        http://*.4chan.org/*
// ==/UserScript==

function fuckthepolice() {
	allspans = document.getElementsByTagName('span');
	bWords   = 'roody-poo,candy-ass,sigourney'.split(','); // Add or remove the censored words here
	rWords   = 'nigger,fag,moot'.split(','); // Remember (the 5th of November!): keep the indeces of the arrays in sync.
	for(var j = 0; j < allspans.length; j++) {
		for(var i = 0; i < bWords.length; i++) {
			if(allspans[j].innerHTML == bWords[i]) {
				allspans[j].innerHTML = rWords[i];
				allspans[j].style.backgroundColor = '';
				allspans[j].style.color = allspans[j].parentNode.style.color; // Greentext gets the wrong color, #care and hard to fix
			}
		}
	}
}

fuckthepolice();