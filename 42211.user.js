// ==UserScript==
// @name         Nexus War Pet Spam Remover
// @namespace    http://nw.pet.spam.remover/arundor
// @description  Removes pet spam in Nexus War.
// @include      http://*nexuswar.com/map/*
// ==/UserScript==

var messages = document.getElementById('msgs');

removePetSpam();
messages.addEventListener('DOMNodeInserted', removePetSpam, false);

function removePetSpam() {
	var lines = messages.getElementsByTagName('li');

	for (i=lines.length-1; i>=0; i--) {
		if (lines[i].innerHTML.search(/class="petchat"/) != -1) {
			lines[i].parentNode.removeChild(lines[i]);
		}
	}
}