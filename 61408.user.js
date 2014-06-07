// ==UserScript==
// @name          AutoSetZVV
// @description   Auto fills in ZVV informations
// @author        shellshock
// @version       2.1
// @namespace     http://userscripts.org/scripts/show/61408
// @include       http://www.zvv.ch/de/
// ==/UserScript==


// Script options
var start = "Zürich, Hegibachplatz";
var ziel = "Winterthur";
var zeitAnkunftChecked = true;
var zeitAnkunft = "08:00";


function AutoSetZVV() {
	document.getElementById("HFS_from").value = "";
	document.getElementById("HFS_from").value = start;
	document.getElementById("HFS_to").value = "";
	document.getElementById("HFS_to").value = ziel;
	
	if (zeitAnkunftChecked) {
		document.getElementById("typ_ankunft").checked = true;
		document.getElementById("time").value = zeitAnkunft;
	}
	
	document.getElementById("time").focus();
}

AutoSetZVV();