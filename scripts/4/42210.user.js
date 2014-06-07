// ==UserScript==
// @name         Nexus War Door Spam Remover
// @namespace    http://nw.door.spam.removal/arundor
// @description  Removes door spam in Nexus War.
// @include      http://*nexuswar.com/map/*
// ==/UserScript==

var messages = document.getElementById('msgs');

removePetSpam();
messages.addEventListener('DOMNodeInserted', removePetSpam, false);

function removePetSpam() {
	var lines = messages.getElementsByTagName('li');

	for (i=lines.length-1; i>=0; i--) {
		if (lines[i].innerHTML.search(/(destroyed the door!<\/span>)|(repaired the door.<\/span>)/) != -1) {
			lines[i].parentNode.removeChild(lines[i]);
		}
	}
}