// ==UserScript==
// @name           tripcode-colorizer
// @version        1.02
// @namespace      http://userscripts.org/users/133663
// @author         Sana
// @description    Assign colors to tripcodes on 4chan
// @include        http*://boards.4chan.org/*
// @run-at-document-end
// ==/UserScript==
// <Suigin> Jonesy
// <Suigin> I need a favor
// <Suigin> can you make this useful again? http://userscripts.org/scripts/show/13319
// I can't be assed to fix the old version so here's a quick rewrite from scratch

var trippin = document.getElementsByClassName("nameBlock");
for (var ind = 0; ind < trippin.length; ind++) {
	colorize(trippin[ind]);
}

function colorize (nameblock) {
	if (/<span class="postertrip">/.test(nameblock.innerHTML)) {
		var trip = /<span class="postertrip">!(.*?)<\/span>/.exec(nameblock.innerHTML)[1];
		var rojo = 4 * (worst_hashing_algorithm_ever(trip.substring(0,4)) % 64);
		var verde = 4 * (worst_hashing_algorithm_ever(trip.substring(4,8)) % 64);
		var azul = 4 * (worst_hashing_algorithm_ever(trip.substring(8)) % 64);
		for (var ind = 0; ind < nameblock.childNodes.length; ind++) {
			if (nameblock.childNodes[ind].style) {
				nameblock.childNodes[ind].style.setProperty("color","rgb("+rojo+", "+verde+", "+azul+")","important");
				for (var jnd = 0; jnd < nameblock.childNodes[ind].childNodes.length; jnd++) {
					if (nameblock.childNodes[ind].childNodes[jnd].style) {
						nameblock.childNodes[ind].childNodes[jnd].style.setProperty("color","rgb("+rojo+", "+verde+", "+azul+")","important");
					}
				}
			}
		}
	}
}
	
function worst_hashing_algorithm_ever (str) {
	var sum = 0;
	for (var ind = 0; ind < str.length; ind++) {
		sum += str.charCodeAt(ind);
	} return sum;
}