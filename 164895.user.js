// ==UserScript==
// @name          Refresh for 10minutemail.com
// @namespace     mz.10minutemail.com
// @description   Click on the refresh link every N(random) minutes
// @include       http://10minutemail.com/*
// @grant         GM_getValue
// @grant         GM_setValue
// @version       2.1
// ==/UserScript==

var link_string = new Array(
	"10 more minutes!",
	"altri 10 minuti!",
	"10 Minuten verl&auml;ngern! ",
	"Cliquez ici pour obtenir 10 minutes de plus.",
	"10 minutos m&aacute;s!",
	"10 Minuts m&eacute;s!"
	);

var progname="10MINUTE-CLICKER - ";


function link_click() {
	var link_found = false;

	var links = document.getElementsByTagName("a");
	for (var i in links) {
		for (var j = 0; j < link_string.length; j++) {
			if (links[i].innerHTML == link_string[j]) {
				console.log(progname + "INFO: clicking right now... :-)");
				link_found = true;
				links[i].click();
				break;
			}
		}
	}
	if (!link_found) {
		console.log(progname + "WARN: refresh link NOT found!");
		alert("WARNING: refresh link NOT found!\nPlease click it manually.");
	}

}

var timeout = Math.floor((Math.random() * 4) + 5); // from 5 to 8 minutes
console.log(progname + "INFO: click planned within " + timeout + " minutes.");
window.setTimeout(link_click, timeout * 1000 * 60);
