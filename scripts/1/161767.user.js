// ==UserScript==
// @name          OKcupid Bangathon 9000
// @namespace     http://www.sandberx.com/okcupid-bangathon-9000/
// @description  Visits profiles okc thinks you'd be interested in 
// @include       http://*.okcupid.com/*
// @include       https://*okcupid.com/*
// ==/UserScript==

/*
REMEMBER: THIS SCRIPT WILL RUN UNTIL YOU TURN IT OFF

Visits profiles at random time intervals (at least 4 per minute)
*/

function go_to_profile(){
	var new_profile = document.getElementById("section_matches");
	var match = new_profile.childNodes[3];
	var ref = match.childNodes[1];
	var almost = ref.childNodes[1];
	var go = almost.getAttribute("href");
	var link = "http://www.okcupid.com" + go;
	window.location.replace(link);
};

setTimeout(go_to_profile, Math.random()*15000);