//
// ==UserScript==
// @name          psychonauts
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   psychonauts
// @include       http://psychonauts.ru/*
// @include       http://www.psychonauts.ru/*
// @exclude	      
// ==/UserScript==

var sotakone = document.getElementsByTagName("span");
var Boets = sotakone.length;
var Druggy = "";
var Dr_Legalize = null;
var grebenru = "";

document.getElementById("vote-counter").innerHTML = Math.floor(Math.random()*30);
for (var dmitmen = 0; dmitmen<Boets; dmitmen++) {
	if (sotakone[dmitmen].className.indexOf('rating')!=-1) {
		Druggy = Math.floor(Math.random()*120)-50;
		if (sotakone[dmitmen].parentNode.tagName=="DIV") {
			grebenru = sotakone[dmitmen].parentNode.className;
			if (grebenru.indexOf("vote-box")!=-1) {
				Dr_Legalize = "vote-box";
				if (grebenru.indexOf('voted')!=-1) Dr_Legalize = Dr_Legalize+" voted";
				if (Druggy<0) Dr_Legalize = Dr_Legalize + " negative";
				if (Druggy>0) Dr_Legalize = Dr_Legalize + " positive";
				sotakone[dmitmen].parentNode.className = Dr_Legalize;
				sotakone[dmitmen].innerHTML = (Druggy>0?"+"+Druggy:"&ndash;"+(-Druggy));
			} else sotakone[dmitmen].innerHTML = Druggy;
		} else sotakone[dmitmen].innerHTML = Druggy;
	}
}
