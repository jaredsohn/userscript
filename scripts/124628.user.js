// ==UserScript==
// @name           TF2Outpost De-Circlejerk
// @namespace      Fiskie
// @description    Hide trades made by any user with a site rank, and removes certain aspects of custom styles.
// @include        http://www.tf2outpost.com/*
// @include        http://tf2outpost.com/*
// @version        1.5.3
// @copyright      2012, Catboy Studios
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @supported      Firefox 3.5+, Opera 10.50+, Chrome 4+
// ==/UserScript==

//Remove posts with donator ranks, except replies to a trade and trades on a user profile

if(document.location.href.search(/\/?(trade|user|offers)/) == -1){
	var i = 0;
	var i2 = 0;

	var trade = document.getElementsByClassName("trade");

	while(trade[i]){
		if(trade[i].innerHTML.search(/<span class="?(collector|donator|owner|vip|mod)/) != -1){
			trade[i].innerHTML="";
			trade[i].style.visibility = "hidden";
			trade[i].parentNode.removeChild(trade[i]);
			i2++;
			i=-1;
		}
		i++;
	}
}

i++;

//Remove cancerous pony backgrounds
document.body.style.background = "#2a2725 url('')";
//Remove Suttles's shitty taste in music
var notes = document.getElementsByClassName("notes");
i=0;
while(notes[i]){
	if(notes[i].innerHTML.search(/<iframe/) >= 0){
		//iframe found, do not want
		notes[i].parentNode.removeChild(notes[i]);
	}
	i++;
}
//Remove LOLSORANDUM audio loops
var audio = document.getElementsByTagName("audio");
i=0;
while(audio[i]){
	audio[i].parentNode.removeChild(audio[i]);
	i++;
}